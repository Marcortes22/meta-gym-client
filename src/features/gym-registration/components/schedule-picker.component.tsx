'use client';

import * as React from 'react';
import { Button } from '@/shared/components/ui/button';
import type { DaySchedule, DayOfWeek } from '../types/gym-registration.types';

interface SchedulePickerProps {
  value: DaySchedule[];
  onChange: (schedule: DaySchedule[]) => void;
}

const DAYS: { key: DayOfWeek; label: string }[] = [
  { key: 'lunes', label: 'Lunes' },
  { key: 'martes', label: 'Martes' },
  { key: 'miercoles', label: 'Miércoles' },
  { key: 'jueves', label: 'Jueves' },
  { key: 'viernes', label: 'Viernes' },
  { key: 'sabado', label: 'Sábado' },
  { key: 'domingo', label: 'Domingo' },
];

function SchedulePicker({ value, onChange }: SchedulePickerProps) {
  React.useEffect(() => {
    if (value.length === 0) {
      const initialSchedule: DaySchedule[] = DAYS.map((day) => ({
        day: day.key,
        isOpen: false,
        timeRanges: [],
      }));
      onChange(initialSchedule);
    }
  }, [value, onChange]);

  const handleDayToggle = (dayKey: DayOfWeek) => {
    const updatedSchedule = value.map((daySchedule) => {
      if (daySchedule.day === dayKey) {
        return {
          ...daySchedule,
          isOpen: !daySchedule.isOpen,
          timeRanges: !daySchedule.isOpen ? [{ start: '08:00', end: '17:00' }] : [],
        };
      }
      return daySchedule;
    });
    onChange(updatedSchedule);
  };

  const handleAddTimeRange = (dayKey: DayOfWeek) => {
    const updatedSchedule = value.map((daySchedule) => {
      if (daySchedule.day === dayKey) {
        return {
          ...daySchedule,
          timeRanges: [
            ...daySchedule.timeRanges,
            { start: '08:00', end: '17:00' },
          ],
        };
      }
      return daySchedule;
    });
    onChange(updatedSchedule);
  };

  const handleRemoveTimeRange = (dayKey: DayOfWeek, index: number) => {
    const updatedSchedule = value.map((daySchedule) => {
      if (daySchedule.day === dayKey) {
        return {
          ...daySchedule,
          timeRanges: daySchedule.timeRanges.filter((_, i) => i !== index),
        };
      }
      return daySchedule;
    });
    onChange(updatedSchedule);
  };

  const handleTimeChange = (
    dayKey: DayOfWeek,
    index: number,
    field: 'start' | 'end',
    time: string
  ) => {
    const updatedSchedule = value.map((daySchedule) => {
      if (daySchedule.day === dayKey) {
        const updatedRanges = daySchedule.timeRanges.map((range, i) => {
          if (i === index) {
            return { ...range, [field]: time };
          }
          return range;
        });
        return { ...daySchedule, timeRanges: updatedRanges };
      }
      return daySchedule;
    });
    onChange(updatedSchedule);
  };


  const generateTimeOptions = () => {
    const options: string[] = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = h.toString().padStart(2, '0');
        const minute = m.toString().padStart(2, '0');
        options.push(`${hour}:${minute}`);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Horario del Gimnasio</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const allOpenSchedule: DaySchedule[] = DAYS.map((day) => ({
              day: day.key,
              isOpen: true,
              timeRanges: [{ start: '08:00', end: '17:00' }],
            }));
            onChange(allOpenSchedule);
          }}
          className="text-xs border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-medium"
        >
          Todos los días
        </Button>
      </div>

      <div className="space-y-3">
        {DAYS.map(({ key, label }) => {
          const daySchedule = value.find((d) => d.day === key) || {
            day: key,
            isOpen: false,
            timeRanges: [],
          };

          return (
            <div
              key={key}
              className="border-2 border-gray-200 rounded-lg p-4 bg-gradient-to-r from-gray-50 to-slate-50 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={daySchedule.isOpen}
                    onChange={() => handleDayToggle(key)}
                    className="h-5 w-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">
                    {label}
                  </span>
                </label>
                {daySchedule.isOpen && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddTimeRange(key)}
                    className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-100 font-medium"
                  >
                    + Agregar horario
                  </Button>
                )}
              </div>

              {daySchedule.isOpen && (
                <div className="space-y-2 pl-7">
                  {daySchedule.timeRanges.map((range, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="flex-1">
                          <label className="text-xs text-gray-700 mb-1 block font-medium">
                            Inicio
                          </label>
                          <select
                            value={range.start}
                            onChange={(e) =>
                              handleTimeChange(key, index, 'start', e.target.value)
                            }
                            title="Hora de inicio"
                            aria-label={`Hora de inicio para ${label}`}
                            className="w-full rounded-md border-2 border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          >
                            {timeOptions.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>

                        <span className="text-gray-600 font-medium mt-5">-</span>

                        <div className="flex-1">
                          <label className="text-xs text-gray-700 mb-1 block font-medium">
                            Fin
                          </label>
                          <select
                            value={range.end}
                            onChange={(e) =>
                              handleTimeChange(key, index, 'end', e.target.value)
                            }
                            title="Hora de fin"
                            aria-label={`Hora de fin para ${label}`}
                            className="w-full rounded-md border-2 border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          >
                            {timeOptions.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {daySchedule.timeRanges.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleRemoveTimeRange(key, index)}
                          className="mt-5 text-red-600 hover:text-red-700 hover:bg-red-100"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {!daySchedule.isOpen && (
                <p className="text-xs text-gray-600 pl-7 font-medium">Cerrado</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-400 rounded-lg p-4 mt-4">
        <p className="text-xs text-blue-900">
          <strong className="font-bold">Consejo:</strong> Puedes agregar múltiples horarios por día
          si tu gimnasio tiene horarios partidos (ej: 6:00-12:00 y 14:00-20:00)
        </p>
      </div>
    </div>
  );
}

export { SchedulePicker };