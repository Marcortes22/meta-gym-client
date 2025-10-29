'use client';

import { usePathname } from 'next/navigation';
import { useMemo, useCallback } from 'react';
import { NAVIGATION_CONFIG } from '../constants/navigationconstant';
import { NavigationConfig, NavigationItem } from '../types/navigationtype';


interface UseNavigationReturn {
  navigationConfig: NavigationConfig;
  activeItemId: string | null;
  isItemActive: (href?: string) => boolean;
}

function useNavigation(): UseNavigationReturn {
  const pathname = usePathname();

  const isItemActive = useCallback((href?: string): boolean => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  }, [pathname]);

  const activeItemId = useMemo(() => {
    const findActiveItem = (items: NavigationItem[]): string | null => {
      for (const item of items) {
        if (item.type === 'item' && isItemActive(item.href)) {
          return item.id;
        }
        if (item.type === 'group' && item.items) {
          const activeSubItem = findActiveItem(item.items);
          if (activeSubItem) return activeSubItem;
        }
      }
      return null;
    };

    const allItems: NavigationItem[] = [
      ...NAVIGATION_CONFIG.header.items,
      ...NAVIGATION_CONFIG.content.flatMap(section => section.items),
      ...NAVIGATION_CONFIG.footer.items,
    ];

    return findActiveItem(allItems);
  }, [isItemActive]);

  return {
    navigationConfig: NAVIGATION_CONFIG,
    activeItemId,
    isItemActive,
  };
}

export { useNavigation };