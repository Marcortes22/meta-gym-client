
import { SidebarInset, SidebarProvider, SidebarRail, SidebarTrigger } from "@/components/animate-ui/components/radix/sidebar";
import { NavigationSidebar } from "@/features/navigation/components/Navigation";

export default function Home() {
  return (
    <>
    <SidebarProvider>
      <NavigationSidebar />
      <SidebarRail />
      <SidebarInset>
        <SidebarTrigger />
        <main className="p-4">
          <h1>Welcome to Meta Gym</h1>
        </main>
      </SidebarInset>
    </SidebarProvider>
    </>
  );
}
