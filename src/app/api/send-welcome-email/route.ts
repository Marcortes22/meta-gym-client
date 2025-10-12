import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY is not configured');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, gymName, password, loginUrl } = body;

    if (!email || !gymName || !password || !loginUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>¡Bienvenido a Meta Gym!</title>
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🏋️‍♂️ ¡Bienvenido a Meta Gym!</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">${gymName}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #333; margin-top: 0;">¡Tu gimnasio ha sido registrado exitosamente! 🎉</h2>
            <p style="color: #666; line-height: 1.6;">
              Hemos registrado <strong>${gymName}</strong> en Meta Gym y generado tus credenciales de acceso. 
              Usa la información de abajo para crear tu cuenta de administrador y acceder a tu panel de control.
            </p>
          </div>

          <div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 20px; margin-bottom: 25px;">
            <h3 style="color: #1976d2; margin-top: 0;">🔐 Credenciales de Acceso</h3>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <div style="background: #fff; border: 2px solid #ff6b35; border-radius: 8px; padding: 15px; margin: 15px 0; text-align: center;">
              <p style="margin: 0 0 5px 0; font-size: 14px; color: #666;"><strong>Contraseña temporal:</strong></p>
              <p style="margin: 0; font-family: monospace; font-size: 18px; font-weight: bold; color: #d32f2f; letter-spacing: 1px;">${password}</p>
            </div>
            <p style="color: #666; font-size: 14px; margin-top: 15px;">
              ⚠️ <strong>Importante:</strong> Esta contraseña fue generada automáticamente. Te recomendamos cambiarla en tu primer inicio de sesión por seguridad.
            </p>
            <p style="color: #666; font-size: 14px; margin-top: 10px;">
              🔗 Usa estas credenciales para crear tu cuenta de usuario en el enlace de abajo.
            </p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${loginUrl}" 
               style="display: inline-block; background: #ff6b35; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px;">
               🚀 Crear Cuenta con Estas Credenciales
            </a>
          </div>

          <div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #f57c00; margin-top: 0;">🛠️ Próximos Pasos</h3>
            <ul style="color: #666; line-height: 1.8; padding-left: 20px;">
              <li>Personaliza el perfil de tu gimnasio</li>
              <li>Configura tus planes de membresía</li>
              <li>Invita a tu equipo de trabajo</li>
              <li>Comienza a registrar miembros</li>
            </ul>
          </div>

          <div style="border-top: 2px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 14px;">
            <p>¿Necesitas ayuda? Contáctanos en <a href="mailto:onboarding@brandondev.me" style="color: #ff6b35;">onboarding@brandondev.me</a></p>
            <p style="margin-top: 15px;">
              <strong>Meta Gym</strong> - Tu socio en la gestión deportiva<br>
              <small>Este email fue enviado automáticamente. Por favor no respondas a este mensaje.</small>
            </p>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Meta Gym <onboarding@brandondev.me>',
      to: [email],
      subject: `🏋️‍♂️ ¡Bienvenido a Meta Gym! - ${gymName}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      emailId: data?.id,
      message: 'Welcome email sent successfully'
    });

  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}