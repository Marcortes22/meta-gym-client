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
} from '@/components/animate-ui/components/radix/sidebar';
import { NavigationSection } from '../types/navigationtype';
import { useNavigation } from '../hooks/useNavigation';
import { NavigationMenuItem } from './NavigationMenuItem';

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
    <Sidebar className={className}>
      <SidebarHeader>
        {renderNavigationSection(navigationConfig.header, false)}
      </SidebarHeader>
      
      <SidebarContent>
        {navigationConfig.content.map((section) => 
          renderNavigationSection(section)
        )}
      </SidebarContent>
      
      <SidebarFooter>
        {renderNavigationSection(navigationConfig.footer, false)}
      </SidebarFooter>
    </Sidebar>
  );
}

export { NavigationSidebar };