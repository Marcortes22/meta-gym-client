'use client';

import { AuthProvider } from '@/features/auth/hooks/use-auth';
import { SidebarProvider, SidebarInset } from "@/components/animate-ui/components/radix/sidebar";
import { NavigationSidebar } from "@/features/navigation/components/Navigation";
import { usePathname } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRegisterPage = pathname === '/register';

  if (isRegisterPage) {
    return (
      <AuthProvider>
        {children}
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <NavigationSidebar />
          <SidebarInset className="flex-1">
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
}