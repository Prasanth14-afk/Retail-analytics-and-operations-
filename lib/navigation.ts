import { 
  BarChart3, 
  ShoppingCart, 
  Leaf, 
  Monitor, 
  Shirt, 
  Activity, 
  Croissant, 
  Users, 
  Boxes, 
  PieChart, 
  Settings,
  type LucideIcon 
} from 'lucide-react';

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  group?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Executive Dashboard', icon: BarChart3, href: '/', group: 'Overview' },
  { label: 'Grocery', icon: ShoppingCart, href: '/grocery', group: 'Departments' },
  { label: 'Fresh Produce', icon: Leaf, href: '/fresh-produce', group: 'Departments' },
  { label: 'Electronics', icon: Monitor, href: '/electronics', group: 'Departments' },
  { label: 'Apparel & Fashion', icon: Shirt, href: '/apparel', group: 'Departments' },
  { label: 'Pharmacy', icon: Activity, href: '/pharmacy', group: 'Departments' },
  { label: 'Bakery', icon: Croissant, href: '/bakery', group: 'Departments' },
  { label: 'Employees', icon: Users, href: '/employees', group: 'Operations' },
  { label: 'Inventory', icon: Boxes, href: '/inventory', group: 'Operations' },
  { label: 'Analytics', icon: PieChart, href: '/analytics', group: 'Insights' },
  { label: 'Settings', icon: Settings, href: '/settings', group: 'System' },
];

export const NAV_GROUPS = ['Overview', 'Departments', 'Operations', 'Insights', 'System'];
