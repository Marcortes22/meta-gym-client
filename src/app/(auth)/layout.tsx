'use client';

import { AuthProvider } from '@/features/auth/hooks/use-auth';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/animate-ui/components/radix/sidebar";
import { NavigationSidebar } from "@/features/navigation/components/Navigation";
import { usePathname } from 'next/navigation';
import { Separator } from "@/shared/components/ui/separator";

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
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Meta Gym</h2>
              </div>
            </header>
            <main className="flex-1 overflow-auto p-4">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
}