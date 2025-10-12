import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role key for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, gymName, gymId, tenantId } = body;

    if (!email || !password || !gymName || !gymId || !tenantId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create auth user using admin client
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        role: 'admin',
        gym_name: gymName,
      }
    });

    if (authError || !authData.user) {
      console.error('❌ Error creating auth user:', authError);
      return NextResponse.json(
        { error: `Error creating auth user: ${authError?.message}` },
        { status: 500 }
      );
    }

    // Create user record in custom users table
    const { error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        id: authData.user.id,
        user_id: null,
        name: gymName,
        email: email,
        tenant_id: tenantId,
        gym_id: gymId,
        role_id: 1, // Admin role
        is_authenticated: true,
        hiring_date: new Date().toISOString().split('T')[0],
      });

    if (userError) {
      console.error('❌ Error creating user record:', userError);
      
      // Rollback: Delete auth user
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      
      return NextResponse.json(
        { error: `Error creating user record: ${userError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
      }
    });

  } catch (error) {
    console.error('❌ Error in create-user API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}