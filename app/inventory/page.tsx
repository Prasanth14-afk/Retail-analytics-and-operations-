'use client';

import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import DataTable from '@/components/DataTable';
import { useStore } from '@/lib/store';

export default function InventoryPage() {
  const { data } = useStore();
  
  if (!data) return <Layout><div>Loading...</div></Layout>;

  const inventory = data.inventory.map(inv => {
    const product = data.products.find(p => p.id === inv.productId);
    const store = data.stores.find(s => s.id === inv.storeId);
    const supplier = data.suppliers.find(sup => sup.id === product?.supplierId);
    
    return {
      ...inv,
      productName: product?.name || 'Unknown',
      category: product?.category || 'Unknown',
      storeName: store?.name || 'Unknown',
      supplierName: supplier?.name || 'Unknown',
      supplierLocation: supplier?.location || 'Unknown',
      leadTime: supplier?.leadTimeDays || 0,
    };
  });

  const statusCounts = inventory.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
                <div className="mb-8">
          <h1 className="text-4xl font-bold text-text mb-2">Inventory Management</h1>
          <p className="text-text/60">Stock levels, reorder points, and supplier details</p>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-greenish/10 border-2 border-greenish rounded-xl p-4">
            <p className="text-sm text-text/60 mb-1">Healthy Stock</p>
            <p className="text-3xl font-bold text-greenish font-mono">{statusCounts.healthy || 0}</p>
          </div>
          <div className="bg-copper/10 border-2 border-copper rounded-xl p-4">
            <p className="text-sm text-text/60 mb-1">Low Stock</p>
            <p className="text-3xl font-bold text-blue font-mono">{statusCounts.low || 0}</p>
          </div>
          <div className="bg-pink/10 border-2 border-pink rounded-xl p-4">
            <p className="text-sm text-text/60 mb-1">Critical</p>
            <p className="text-3xl font-bold text-pink font-mono">{statusCounts.critical || 0}</p>
          </div>
          <div className="bg-canvas/20 border-2 border-border rounded-xl p-4">
            <p className="text-sm text-text/60 mb-1">Overstock</p>
            <p className="text-3xl font-bold text-tan font-mono">{statusCounts.overstock || 0}</p>
          </div>
        </div>

        {/* Inventory Table */}
        <DataTable
          title="Inventory Overview"
          data={inventory.slice(0, 100)}
          columns={[
            { key: 'productName', label: 'Product' },
            { key: 'category', label: 'Category' },
            { key: 'storeName', label: 'Store' },
            { 
              key: 'quantity', 
              label: 'Quantity',
              render: (val) => <span className="font-mono font-bold">{val}</span>
            },
            { 
              key: 'status', 
              label: 'Status',
              render: (val) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  val === 'critical' ? 'bg-pink/20 text-pink' :
                  val === 'low' ? 'bg-copper/20 text-blue' :
                  val === 'overstock' ? 'bg-canvas/40 text-text' :
                  'bg-greenish/20 text-greenish'
                }`}>
                  {val.toUpperCase()}
                </span>
              )
            },
            { key: 'daysOfStock', label: 'Days of Stock' },
            { key: 'supplierName', label: 'Supplier' },
            { 
              key: 'supplierLocation', 
              label: 'Supplier Location',
              render: (val) => <span className="text-xs">{val}</span>
            },
            { 
              key: 'leadTime', 
              label: 'Lead Time',
              render: (val) => <span className="font-mono">{val}d</span>
            },
          ]}
          onExport={() => {
            const csv = [
              ['Product', 'Category', 'Store', 'Quantity', 'Status', 'Days of Stock', 'Supplier', 'Location', 'Lead Time'],
              ...inventory.map(i => [
                i.productName, i.category, i.storeName, i.quantity, i.status, 
                i.daysOfStock, i.supplierName, i.supplierLocation, i.leadTime
              ])
            ].map(row => row.join(',')).join('\n');
            
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'inventory.csv';
            a.click();
          }}
        />

        {/* Suppliers Summary */}
        <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
          <h3 className="text-lg font-semibold text-text mb-4">Supplier Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.suppliers.slice(0, 6).map(supplier => (
              <motion.div
                key={supplier.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-white rounded-lg border border-border/20"
              >
                <h4 className="font-semibold text-text mb-1">{supplier.name}</h4>
                <p className="text-xs text-text/60 mb-2">{supplier.location}, {supplier.country}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 bg-copper/10 text-blue rounded">
                    {supplier.deliveryFrequency}
                  </span>
                  <span className="text-xs text-text/60">{supplier.leadTimeDays}d lead</span>
                </div>
                <p className="text-xs text-text/60">
                  Delivers: {supplier.deliveryCategories.join(', ')}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-text/60">Rating:</span>
                  <span className="text-sm font-bold text-blue">{supplier.rating} ⭐</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
