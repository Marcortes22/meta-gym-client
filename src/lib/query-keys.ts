
export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
  },
  gyms: {
    all: ['gyms'] as const,
    lists: () => [...queryKeys.gyms.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => 
      [...queryKeys.gyms.lists(), { filters }] as const,
    details: () => [...queryKeys.gyms.all, 'detail'] as const,
    detail: (id: number | string) => [...queryKeys.gyms.details(), id] as const,
    slug: (slug: string) => [...queryKeys.gyms.all, 'slug', slug] as const,
  },
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  members: {
    all: ['members'] as const,
    lists: () => [...queryKeys.members.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.members.lists(), { filters }] as const,
    details: () => [...queryKeys.members.all, 'detail'] as const,
    detail: (id: number | string) => [...queryKeys.members.details(), id] as const,
  },
  subscriptions: {
    all: ['subscriptions'] as const,
    lists: () => [...queryKeys.subscriptions.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.subscriptions.lists(), { filters }] as const,
    details: () => [...queryKeys.subscriptions.all, 'detail'] as const,
    detail: (id: number | string) => 
      [...queryKeys.subscriptions.details(), id] as const,
  },
  schedule: {
    all: ['schedule'] as const,
    gym: (gymId: number | string) => 
      [...queryKeys.schedule.all, 'gym', gymId] as const,
  },
} as const;
