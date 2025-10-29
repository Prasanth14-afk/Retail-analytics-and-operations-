import { useStore } from './store';
import type { Sale, Product, Store, Inventory, Customer, Marketing, Finance } from './types';

// Get filtered sales
export const useFilteredSales = () => {
  const { data, filters } = useStore();
  if (!data) return [];
  
  return data.sales.filter(sale => {
    const saleDate = new Date(sale.transactionDate);
    const inDateRange = saleDate >= filters.dateRange[0] && saleDate <= filters.dateRange[1];
    const inStores = filters.storeIds.length === 0 || filters.storeIds.includes(sale.storeId);
    
    if (filters.categories.length > 0) {
      const product = data.products.find(p => p.id === sale.productId);
      if (!product || !filters.categories.includes(product.category)) return false;
    }
    
    return inDateRange && inStores;
  });
};

// Calculate KPIs
export const useKPIs = () => {
  const sales = useFilteredSales();
  const { data } = useStore();
  
  if (!data || sales.length === 0) {
    return {
      revenue: 0,
      itemsSold: 0,
      avgBasket: 0,
      stockHealth: 0,
    };
  }
  
  const revenue = sales.reduce((sum, s) => sum + s.total, 0);
  const itemsSold = sales.reduce((sum, s) => sum + s.quantity, 0);
  const transactions = new Set(sales.map(s => s.id)).size;
  const avgBasket = transactions > 0 ? revenue / transactions : 0;
  
  const healthyStock = data.inventory.filter(i => i.status === 'healthy').length;
  const stockHealth = data.inventory.length > 0 
    ? (healthyStock / data.inventory.length) * 100 
    : 0;
  
  return {
    revenue: Math.round(revenue),
    itemsSold,
    avgBasket: Math.round(avgBasket * 100) / 100,
    stockHealth: Math.round(stockHealth),
  };
};

// Get top products
export const useTopProducts = (limit = 10) => {
  const sales = useFilteredSales();
  const { data } = useStore();
  
  if (!data) return [];
  
  const productSales = sales.reduce((acc, sale) => {
    const existing = acc.get(sale.productId);
    if (existing) {
      existing.quantity += sale.quantity;
      existing.revenue += sale.total;
    } else {
      acc.set(sale.productId, { 
        productId: sale.productId, 
        quantity: sale.quantity, 
        revenue: sale.total 
      });
    }
    return acc;
  }, new Map());
  
  return Array.from(productSales.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit)
    .map(item => {
      const product = data.products.find(p => p.id === item.productId);
      return {
        ...item,
        name: product?.name || 'Unknown',
        category: product?.category || 'Unknown',
      };
    });
};

// Get low stock items
export const useLowStockItems = () => {
  const { data, filters } = useStore();
  if (!data) return [];
  
  return data.inventory
    .filter(i => {
      const lowStock = i.status === 'low' || i.status === 'critical';
      const inStores = filters.storeIds.length === 0 || filters.storeIds.includes(i.storeId);
      return lowStock && inStores;
    })
    .map(inv => {
      const product = data.products.find(p => p.id === inv.productId);
      const store = data.stores.find(s => s.id === inv.storeId);
      return {
        ...inv,
        productName: product?.name || 'Unknown',
        storeName: store?.name || 'Unknown',
      };
    })
    .sort((a, b) => a.quantity - b.quantity);
};

// Get sales by category
export const useSalesByCategory = () => {
  const sales = useFilteredSales();
  const { data } = useStore();
  
  if (!data) return [];
  
  const categoryMap = sales.reduce((acc, sale) => {
    const product = data.products.find(p => p.id === sale.productId);
    const category = product?.category || 'Unknown';
    
    if (!acc[category]) {
      acc[category] = { category, revenue: 0, quantity: 0 };
    }
    acc[category].revenue += sale.total;
    acc[category].quantity += sale.quantity;
    
    return acc;
  }, {} as Record<string, { category: string; revenue: number; quantity: number }>);
  
  return Object.values(categoryMap).sort((a, b) => b.revenue - a.revenue);
};

// Get customer segments
export const useCustomerSegments = () => {
  const { data } = useStore();
  if (!data) return [];
  
  const segments = data.customers.reduce((acc, customer) => {
    const tier = customer.loyaltyTier;
    if (!acc[tier]) {
      acc[tier] = { tier, count: 0, totalSpend: 0 };
    }
    acc[tier].count += 1;
    acc[tier].totalSpend += customer.totalSpend;
    return acc;
  }, {} as Record<string, { tier: string; count: number; totalSpend: number }>);
  
  return Object.values(segments);
};

// Get marketing ROAS
export const useMarketingROAS = () => {
  const { data, filters } = useStore();
  if (!data) return [];
  
  return data.marketing
    .filter(m => {
      const startDate = new Date(m.startDate);
      return startDate >= filters.dateRange[0] && startDate <= filters.dateRange[1];
    })
    .map(campaign => ({
      ...campaign,
      roas: campaign.spend > 0 ? campaign.revenue / campaign.spend : 0,
      ctr: campaign.impressions > 0 ? campaign.clicks / campaign.impressions : 0,
      conversionRate: campaign.clicks > 0 ? campaign.conversions / campaign.clicks : 0,
    }))
    .sort((a, b) => b.roas - a.roas);
};

// Get finance summary
export const useFinanceSummary = () => {
  const { data, filters } = useStore();
  if (!data) return null;
  
  const filtered = data.finance.filter(f => {
    const date = new Date(f.date);
    return date >= filters.dateRange[0] && date <= filters.dateRange[1];
  });
  
  const totals = filtered.reduce((acc, f) => ({
    revenue: acc.revenue + f.revenue,
    cogs: acc.cogs + f.cogs,
    opex: acc.opex + f.operatingExpenses,
    profit: acc.profit + f.profit,
  }), { revenue: 0, cogs: 0, opex: 0, profit: 0 });
  
  return {
    ...totals,
    margin: totals.revenue > 0 ? (totals.profit / totals.revenue) * 100 : 0,
    records: filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  };
};
