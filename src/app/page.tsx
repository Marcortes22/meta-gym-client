
'use client';

import { LoginForm } from '@/features/auth/components/login-form.component';
import { AuthProvider } from '@/features/auth/hooks/use-auth';

export default function Home() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <LoginForm />
      </div>
    </AuthProvider>
  );
}
