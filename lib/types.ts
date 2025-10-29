export interface Store {
  id: string;
  name: string;
  region: string;
  city: string;
  address: string;
  sqft: number;
  openDate: string;
  manager: string;
  status: 'active' | 'maintenance' | 'closed';
  lat: number;
  lng: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  unitPrice: number;
  costPrice: number;
  supplierId: string;
  weight?: number;
  perishable: boolean;
}

export interface Supplier {
  id: string;
  name: string;
  location: string;
  country: string;
  deliveryCategories: string[];
  deliveryFrequency: 'daily' | 'weekly' | 'bi-weekly' | 'monthly';
  leadTimeDays: number;
  minOrderValue: number;
  rating: number;
  contactPerson: string;
  email: string;
  phone: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  joinDate: string;
  totalSpend: number;
  visitCount: number;
  lastVisit: string;
  region: string;
  preferredStore: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  storeId: string;
  hireDate: string;
  salary: number;
  performance: number;
  email: string;
}

export interface Sale {
  id: string;
  transactionDate: string;
  storeId: string;
  productId: string;
  customerId?: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'mobile' | 'voucher';
  promotionId?: string;
}

export interface Inventory {
  id: string;
  storeId: string;
  productId: string;
  quantity: number;
  reorderLevel: number;
  lastRestocked: string;
  daysOfStock: number;
  status: 'healthy' | 'low' | 'critical' | 'overstock';
}

export interface Return {
  id: string;
  saleId: string;
  returnDate: string;
  reason: string;
  refundAmount: number;
  condition: 'defective' | 'unopened' | 'damaged' | 'expired';
}

export interface Footfall {
  id: string;
  storeId: string;
  date: string;
  hour: number;
  visitors: number;
  conversions: number;
}

export interface Marketing {
  id: string;
  campaignName: string;
  channel: string;
  startDate: string;
  endDate: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

export interface Finance {
  id: string;
  date: string;
  revenue: number;
  cogs: number;
  operatingExpenses: number;
  profit: number;
  margin: number;
}

export interface MockData {
  suppliers: Supplier[];
  stores: Store[];
  products: Product[];
  customers: Customer[];
  employees: Employee[];
  sales: Sale[];
  inventory: Inventory[];
  returns: Return[];
  footfall: Footfall[];
  marketing: Marketing[];
  finance: Finance[];
  metadata: {
    generated: string;
    totalRecords: number;
    version: string;
  };
}

export interface Alert {
  id: string;
  type: 'low-stock' | 'sales-dip' | 'high-returns' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  storeId?: string;
  productId?: string;
  acknowledged: boolean;
  assignedTo?: string;
}

export interface KPI {
  label: string;
  value: string | number;
  delta: number;
  trend: 'up' | 'down' | 'neutral';
  sparkline?: number[];
}
