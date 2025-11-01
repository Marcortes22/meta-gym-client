"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { useGetGym, useUpdateGym } from '../hooks/use-gyms.hooks';
import { supabase } from '@/lib/supabase/client';
import { SchedulePicker } from '@/features/gym-registration/components/schedule-picker.component';
import type { DaySchedule, DayOfWeek } from '@/features/gym-registration/types/gym-registration.types';

export default function GymProfileForm() {
  const { data: gym, isLoading } = useGetGym();
  const updateMut = useUpdateGym();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  // null = not initialized from DB yet; prevents SchedulePicker from auto-initializing
  const [schedule, setSchedule] = useState<DaySchedule[] | null>(null);

  useEffect(() => {
    if (gym) {
      setName(gym.name ?? '');
      setAddress(gym.address ?? '');
      setEmail(gym.email ?? '');
      setLogoUrl(gym.logo_url ?? '');
      // initialize schedule from gym.schedule if present
      try {
        if (gym.schedule) {
          // support stringified JSON or an already-parsed array
          let parsed: unknown = gym.schedule;
          if (typeof gym.schedule === 'string') parsed = JSON.parse(gym.schedule);
          // normalize into an array with all days in canonical order
          const DAYS_KEYS: DayOfWeek[] = ['lunes','martes','miercoles','jueves','viernes','sabado','domingo'];
          if (Array.isArray(parsed)) {
            const arr = parsed as DaySchedule[];
            const byDay = new Map(arr.map((d) => [d.day, d]));
            const normalized = DAYS_KEYS.map((k) => byDay.get(k) ?? ({ day: k, isOpen: false, timeRanges: [] }));
            setSchedule(normalized as DaySchedule[]);
          }
        }
      } catch (err) {
        // ignore malformed schedule
        console.warn('Could not parse gym.schedule', err);
      }
      // phone may be stored elsewhere; try to read from schedule or other fields later
    }
  }, [gym]);

  async function handleSave(e?: React.FormEvent) {
    e?.preventDefault();
    setSaving(true);
    try {
  // if there is a local logo file, try to upload to storage (bucket: gym-logos)
  let uploadedUrl = logoUrl;
      if (logoFile && gym?.id) {
        try {
          const fileExt = logoFile.name.split('.').pop() ?? 'png';
          const key = `logos/${gym.id}.${fileExt}`;
          const { error: upErr } = await supabase.storage.from('gym-logos').upload(key, logoFile, { upsert: true });
          if (!upErr) {
            const { data: publicData } = supabase.storage.from('gym-logos').getPublicUrl(key);
            uploadedUrl = publicData.publicUrl;
          }
        } catch (err) {
          console.warn('Logo upload failed', err);
        }
      }

  await updateMut.mutateAsync({ name: name.trim(), address: address.trim(), email: email.trim(), logo_url: uploadedUrl.trim(), schedule: schedule ?? [] });
      alert('Perfil del gimnasio actualizado');
    } catch (err) {
      console.error(err);
      alert('Error al actualizar el gimnasio');
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) return <div>Cargando perfil del gimnasio…</div>;

  return (
    <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 max-w-3xl">
      <div className="flex items-start gap-6">
        <div className="w-28 h-28 bg-gray-100 rounded overflow-hidden flex items-center justify-center border">
          {logoFile ? (
            <img src={URL.createObjectURL(logoFile)} alt="logo preview" className="w-full h-full object-cover" />
          ) : logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt="logo" className="w-full h-full object-cover" />
          ) : (
            <div className="text-xs text-muted-foreground">Sin logo</div>
          )}
        </div>

        <div className="flex-1">
          <label className="text-sm text-muted-foreground">Logo (subir)</label>
          <label className="sr-only" htmlFor="gym-logo-input">Subir logo</label>
          <input id="gym-logo-input" type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0] ?? null; setLogoFile(f); if (f) setLogoUrl(''); }} />
          <div className="text-xs text-muted-foreground mt-1">Puedes pegar una URL en el campo de logo o subir un archivo para previsualizar y opcionalmente subir al almacenamiento.</div>
        </div>
      </div>

      <div>
        <label className="text-sm text-muted-foreground">Nombre del gimnasio</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label className="text-sm text-muted-foreground">Dirección</label>
        <Input value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>

      <div>
        <label className="text-sm text-muted-foreground">Teléfono</label>
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Opcional" />
      </div>

      <div>
        <label className="text-sm text-muted-foreground">Correo</label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
        <label className="text-sm text-muted-foreground">Logo URL</label>
        <Input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://..." />
      </div>

      <div>
        {schedule !== null ? (
          <SchedulePicker key={gym?.id ?? 'schedule-picker'} value={schedule} onChange={setSchedule as (s: DaySchedule[]) => void} />
        ) : (
          <div className="text-sm text-gray-500">Cargando horario...</div>
        )}
      </div>

      {/* Compact preview: shows each day and its current ranges (helpful to see what's saved) */}
      <div className="mt-4">
        <h4 className="text-sm font-semibold mb-2">Previsualización rápida</h4>
        <div className="grid grid-cols-1 gap-2">
          {(schedule ?? []).map((d) => (
            <div key={d.day} className="flex items-center justify-between p-3 border rounded">
              <div className="capitalize font-medium">{d.day}</div>
              <div className="text-sm text-gray-600">
                {d.isOpen ? (
                  <span>{d.timeRanges.map((r) => `${r.start}-${r.end}`).join(', ')}</span>
                ) : (
                  <span className="font-medium">Cerrado</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <details className="mt-3 text-xs text-gray-600">
          <summary className="cursor-pointer">Ver JSON crudo</summary>
          <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-auto">{JSON.stringify(schedule ?? [], null, 2)}</pre>
        </details>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="ghost" onClick={() => window.location.reload()} type="button">Cancelar</Button>
        <Button type="submit" disabled={saving || name.trim() === ''}>{saving ? 'Guardando…' : 'Guardar'}</Button>
      </div>
    </form>
  );
}
