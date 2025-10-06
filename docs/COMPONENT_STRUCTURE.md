# Component Structure Documentation

## Directory Organization

This project follows a consistent structure for organizing components and related files.

### Shared Components (`src/shared/components/`)

All UI components from both shadcn/ui and animate-ui are stored in the shared directory:

```
src/shared/
├── components/
│   ├── ui/                    # UI components (shadcn/ui + animate-ui)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── sidebar.tsx       # animate-ui component
│   │   ├── sheet.tsx         # animate-ui component
│   │   └── tooltip-animate.tsx
│   └── primitives/            # Low-level primitives from animate-ui
│       ├── animate/
│       ├── base/
│       ├── effects/
│       └── radix/
└── hooks/                     # Shared hooks
    ├── use-controlled-state.tsx
    └── use-mobile.ts
```

### Feature Components (`src/features/`)

Feature-specific components follow this structure:

```
src/features/
└── navigation/
    ├── components/
    │   ├── navigation-sidebar.component.tsx
    │   └── navigation-menu-item.component.tsx
    ├── constants/
    │   └── navigation.constants.ts
    ├── hooks/
    │   └── use-navigation.hooks.ts
    ├── types/
    │   └── navigation.types.ts
    └── index.ts                # Barrel export
```

## Naming Conventions

Files should follow these naming conventions:

- **Components**: `*.component.tsx`
- **Hooks**: `*.hooks.ts` or `*.hooks.tsx`
- **Types**: `*.types.ts`
- **Constants**: `*.constants.ts`

## Component Installation

### shadcn/ui Components

```bash
npx shadcn@latest add button
# Installs to: src/shared/components/ui/button.tsx
```

### animate-ui Components

```bash
npx shadcn@latest add @animate-ui/sidebar
# Installs to: src/shared/components/ui/sidebar.tsx
```

Both types of components install to the same location (`@/shared/components/ui/`) for consistency.

## Import Patterns

### Importing from Shared Components

```typescript
import { Button } from '@/shared/components/ui/button';
import { Sidebar } from '@/shared/components/ui/sidebar';
```

### Importing from Features

```typescript
// Use barrel exports
import { NavigationSidebar, useNavigation } from '@/features/navigation';

// Or direct imports
import { NavigationSidebar } from '@/features/navigation/components/navigation-sidebar.component';
```

## Configuration

The `components.json` file configures where components are installed:

```json
{
  "aliases": {
    "components": "@/shared/components",
    "ui": "@/shared/components/ui",
    "hooks": "@/shared/hooks"
  },
  "registries": {
    "@animate-ui": {
      "url": "https://animate-ui.com/r/{name}.json",
      "aliases": {
        "components": "@/shared/components",
        "primitives": "@/shared/components/primitives",
        "radix": "@/shared/components/ui",
        "utils": "@/lib/utils"
      }
    }
  }
}
```

This ensures all components, regardless of their source, are organized consistently in the shared directory.
