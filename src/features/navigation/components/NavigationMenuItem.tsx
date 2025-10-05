'use client';

import Link from 'next/link';
import {
  SidebarMenuButton,
  SidebarMenuSubButton,
  SidebarMenuBadge,
} from '@/components/animate-ui/components/radix/sidebar';
import type { NavigationMenuItem, NavigationGroupItem } from '../types/navigationtype';

interface NavigationMenuItemProps {
  item: NavigationMenuItem | NavigationGroupItem;
  isActive: boolean;
  isSubItem?: boolean;
}

function NavigationMenuItem({ item, isActive, isSubItem = false }: NavigationMenuItemProps) {
  const ButtonComponent = isSubItem ? SidebarMenuSubButton : SidebarMenuButton;
  const Icon = item.icon;

  const buttonContent = (
    <>
      {Icon && <Icon />}
      <span>{item.label}</span>
      {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
    </>
  );

  const buttonProps = {
    isActive,
    onClick: item.type === 'item' ? item.onClick : undefined,
    className: isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : '',
  };

  if (item.href) {
    return (
      <ButtonComponent asChild {...buttonProps}>
        <Link href={item.href}>
          {buttonContent}
        </Link>
      </ButtonComponent>
    );
  }

  return (
    <ButtonComponent {...buttonProps}>
      {buttonContent}
    </ButtonComponent>
  );
}

export { NavigationMenuItem };