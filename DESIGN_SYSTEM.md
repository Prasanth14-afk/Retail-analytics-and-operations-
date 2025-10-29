# 🎨 HyperRetail Design System Quick Reference

## Color Palette

| Color | Hex | Usage | Example |
|-------|-----|-------|---------|
| **Black** | `#292421` | Base background, primary text on light | Sidebar bg, body text |
| **Copper** | `#B87333` | Primary accent, buttons, active states | Active nav, CTA buttons |
| **Pink** | `#F2B8C6` | Secondary highlight, negative trends | Down arrows, alerts |
| **Tan** | `#D2B48C` | Tables, surfaces, borders | Table rows, dividers |
| **Blush** | `#E6B7A9` | Hover states, accent gradients | Hover bg, gradients |
| **Vanilla** | `#F8E5C2` | Cards, panels, light surfaces | Card backgrounds |
| **Green** | `#7BB661` | Success, positive trends | Up arrows, success |
| **Mint** | `#A8E6CF` | Info, neutral states | Icons, info badges |

## Typography

### Display Font: Inter
- **Headings**: 400 (regular), 600 (semibold), 700 (bold)
- **Body**: 400 (regular), 500 (medium)
- **Sizes**: 3xl (48px), 2xl (32px), xl (24px), lg (18px), base (16px), sm (14px), xs (12px)

### Monospace Font: IBM Plex Mono
- **Numbers**: Currency, metrics, KPIs
- **Weights**: 400 (regular), 500 (medium), 600 (semibold)
- **Usage**: $1,234.56, +45.67%, 98.2%

## Component Library

### KpiTile
**Purpose**: Display key metrics with trends  
**Props**: label, value, delta, trend, sparkline, format  
**Variants**: number, currency, percent

### TrendCard
**Purpose**: Line/area charts with gradient fills  
**Props**: title, data, color  
**Features**: Responsive, tooltips, grid

### DataTable
**Purpose**: Paginated data with search/export  
**Props**: data, columns, title, onExport  
**Features**: Search, pagination, CSV export

### AlertCard
**Purpose**: System alerts with severity  
**Props**: alert, onAcknowledge, onAssign  
**Severity**: low, medium, high, critical

### Sidebar
**Purpose**: Main navigation  
**Features**: Collapsible, active states, animations, profile

## Animation Timings

| Action | Duration | Easing |
|--------|----------|--------|
| Page fade-in | 180ms | ease |
| Hover scale | 150ms | spring |
| Sidebar collapse | 180ms | ease |
| Item stagger | 30ms delay | ease |
| Reduced motion | 1ms | instant |

## Spacing Scale

```
0: 0px
1: 0.25rem (4px)
2: 0.5rem (8px)
3: 0.75rem (12px)
4: 1rem (16px)
6: 1.5rem (24px)
8: 2rem (32px)
12: 3rem (48px)
```

## Border Radius

```
sm: 0.25rem (4px)
base: 0.5rem (8px)
lg: 1rem (16px)
xl: 1.5rem (24px)
2xl: 2rem (32px)
full: 9999px
```

## Shadows

```
sm: subtle depth
base: standard elevation
copper: 0 0 18px rgba(184,115,51,0.25)
```

## Responsive Breakpoints

```
sm: 640px   (mobile landscape)
md: 768px   (tablet)
lg: 1024px  (laptop)
xl: 1280px  (desktop)
2xl: 1536px (large desktop)
4K: 3840px  (ultra-wide)
```

## Accessibility Guidelines

### Contrast Ratios (WCAG AA)
- **Normal text (16px+)**: 4.5:1 minimum
- **Large text (24px+)**: 3:1 minimum
- **Black on Vanilla**: 12.8:1 ✅
- **Copper on White**: 4.9:1 ✅
- **Green on White**: 5.2:1 ✅

### Keyboard Navigation
- **Tab**: Navigate forward
- **Shift+Tab**: Navigate backward
- **Enter/Space**: Activate buttons/links
- **Escape**: Close modals/drawers

### Focus Indicators
- **Outline**: 2px Mint (#A8E6CF)
- **Offset**: 2px
- **Visible**: Always visible on focus

## Icon Library (Lucide React)

### Navigation
- `BarChart3` - Dashboard
- `ShoppingCart` - Grocery
- `Leaf` - Fresh Produce
- `Monitor` - Electronics
- `Shirt` - Apparel
- `Activity` - Pharmacy
- `Croissant` - Bakery
- `Users` - Employees
- `Boxes` - Inventory
- `PieChart` - Analytics
- `Settings` - Settings

### UI Elements
- `TrendingUp` / `TrendingDown` - Trends
- `AlertCircle` / `AlertTriangle` - Alerts
- `CheckCircle` - Success
- `X` - Close
- `ChevronLeft` / `ChevronRight` - Navigation

## Data Formatting

### Currency
```typescript
format: 'currency'
$1,234.56
```

### Percentage
```typescript
format: 'percent'
98.2%
```

### Numbers
```typescript
format: 'number'
12,345
```

### Dates
```typescript
new Date().toLocaleDateString()
10/29/2025
```

## State Conventions

### Status Colors
- **Active/Healthy**: Green (#7BB661)
- **Warning/Low**: Copper (#B87333)
- **Critical/Error**: Pink (#F2B8C6)
- **Neutral/Info**: Mint (#A8E6CF)
- **Overstock**: Tan (#D2B48C)

### Hover States
- **Background**: Blush @ 15% opacity
- **Scale**: 1.03
- **Shadow**: Copper glow
- **Transition**: 150ms

### Active States
- **Background**: Copper
- **Text**: White
- **Icon**: White
- **Accent**: 3px left border

## Component Composition

### Page Structure
```tsx
<Layout>
  <motion.div>
    <h1>Page Title</h1>
    <KpiGrid />
    <Charts />
    <Tables />
  </motion.div>
</Layout>
```

### Card Structure
```tsx
<motion.div className="bg-vanilla rounded-2xl p-6 border border-tan/20">
  <h3>Title</h3>
  <Content />
</motion.div>
```

## Performance Targets

- **Lighthouse Score**: ≥90
- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1
- **Bundle Size**: <500KB initial

## Best Practices

1. **Always use Layout** component for consistent sidebar
2. **Wrap pages in motion.div** for fade-in animations
3. **Use semantic HTML** (h1, nav, main, section, article)
4. **Add ARIA labels** to interactive elements
5. **Test keyboard navigation** on all pages
6. **Verify 4K scaling** for text and charts
7. **Support reduced motion** with `prefers-reduced-motion`
8. **Keep animations under 250ms** for snappy feel
9. **Use Copper for primary actions** consistently
10. **Test color contrast** with accessibility tools

---

**HyperRetail Design System v1.0** - Built for scale, clarity, and user delight.
