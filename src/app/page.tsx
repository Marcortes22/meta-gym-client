import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger } from "@/components/animate-ui/components/radix/sidebar";

export default function Home() {
  return (
    <>
<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>Item 1</SidebarMenuItem>
        <SidebarMenuItem>Item 2</SidebarMenuItem>
        <SidebarMenuItem>Item 3</SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Label 1</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>Item 1</SidebarMenuItem>
          <SidebarMenuItem>Item 2</SidebarMenuItem>
          <SidebarMenuItem>Item 3</SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Label 2</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>Item 1</SidebarMenuItem>
          <SidebarMenuItem>Item 2</SidebarMenuItem>
          <SidebarMenuItem>Item 3</SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>Item 1</SidebarMenuItem>
        <SidebarMenuItem>Item 2</SidebarMenuItem>
        <SidebarMenuItem>Item 3</SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
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
