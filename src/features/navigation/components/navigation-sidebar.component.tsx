'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarSeparator,
} from '@/shared/components/ui/sidebar';
import { NavigationSection } from '../types/navigation.types';
import { useNavigation } from '../hooks/use-navigation.hooks';
import { NavigationMenuItem } from './navigation-menu-item.component';

interface NavigationSidebarProps {
  className?: string;
}

function NavigationSidebar({ className }: NavigationSidebarProps) {
  const { navigationConfig, activeItemId } = useNavigation();

  const renderNavigationSection = (section: NavigationSection, showTitle = true) => (
    <SidebarGroup key={section.id}>
      {showTitle && section.title && (
        <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
      )}
      <SidebarMenu>
        {section.items.map((item) => {
          if (item.type === 'separator') {
            return <SidebarSeparator key={item.id} />;
          }

          if (item.type === 'group') {
            return (
              <SidebarMenuItem key={item.id}>
                <NavigationMenuItem
                  item={item}
                  isActive={false}
                />
                <SidebarMenuSub>
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.id}>
                      <NavigationMenuItem
                        item={subItem}
                        isActive={activeItemId === subItem.id}
                        isSubItem
                      />
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            );
          }

          return (
            <SidebarMenuItem key={item.id}>
              <NavigationMenuItem
                item={item}
                isActive={activeItemId === item.id}
              />
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );

  return (
    <Sidebar 
      className={className}
      collapsible="none" 
      variant="sidebar"
    >
      <SidebarHeader className="border-b">
        {renderNavigationSection(navigationConfig.header, false)}
      </SidebarHeader>
      
      <SidebarContent className="flex-1 overflow-auto">
        {navigationConfig.content.map((section) => 
          renderNavigationSection(section)
        )}
      </SidebarContent>
      
      <SidebarFooter className="border-t mt-auto">
        {renderNavigationSection(navigationConfig.footer, false)}
      </SidebarFooter>
    </Sidebar>
  );
}

export { NavigationSidebar };