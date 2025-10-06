import type { LucideIcon } from 'lucide-react';

interface BaseNavigationItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  href?: string;
  badge?: string | number;
}

interface NavigationGroupItem extends BaseNavigationItem {
  type: 'group';
  items: NavigationMenuItem[];
}

interface NavigationMenuItem extends BaseNavigationItem {
  type: 'item';
  isActive?: boolean;
  onClick?: () => void;
}

interface NavigationSeparatorItem {
  id: string;
  type: 'separator';
}

type NavigationItem = NavigationGroupItem | NavigationMenuItem | NavigationSeparatorItem;

interface NavigationSection {
  id: string;
  title?: string;
  items: NavigationItem[];
}

interface NavigationConfig {
  header: NavigationSection;
  content: NavigationSection[];
  footer: NavigationSection;
}

export type {
  NavigationItem,
  NavigationGroupItem,
  NavigationMenuItem,
  NavigationSeparatorItem,
  NavigationSection,
  NavigationConfig,
  BaseNavigationItem,
};