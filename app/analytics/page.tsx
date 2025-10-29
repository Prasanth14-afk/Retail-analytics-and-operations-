'use client';

import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import TrendCard from '@/components/TrendCard';
import { useStore } from '@/lib/store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export default function AnalyticsPage() {
  const { data } = useStore();
  
  if (!data) return <Layout><div>Loading...</div></Layout>;

  // Category distribution
  const categoryData = data.products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));
  
  const COLORS = ['#B87333', '#2C5F8D', '#7BB661', '#A8E6CF', '#D2B48C', '#E6B7A9', '#F8E5C2', '#292421'];

  // Regional sales
  const regionalSales = data.sales.reduce((acc, sale) => {
    const store = data.stores.find(s => s.id === sale.storeId);
    const region = store?.region || 'Unknown';
    acc[region] = (acc[region] || 0) + sale.total;
    return acc;
  }, {} as Record<string, number>);

  const regionalData = Object.entries(regionalSales).map(([name, value]) => ({
    name,
    value: Math.round(value),
  }));

  // Marketing performance
  const marketingData = data.marketing
    .slice(0, 8)
    .map(m => ({
      name: m.channel,
      roas: m.spend > 0 ? parseFloat((m.revenue / m.spend).toFixed(2)) : 0,
    }));

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text mb-2">Advanced Analytics</h1>
          <p className="text-text/60">Deep insights and data visualization</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-border/20">
            <p className="text-sm text-text/60 mb-1">Total Products</p>
            <p className="text-3xl font-bold text-blue font-mono">{data.products.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border/20">
            <p className="text-sm text-text/60 mb-1">Total Customers</p>
            <p className="text-3xl font-bold text-blue font-mono">{data.customers.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border/20">
            <p className="text-sm text-text/60 mb-1">Active Stores</p>
            <p className="text-3xl font-bold text-greenish font-mono">{data.stores.filter(s => s.status === 'active').length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border/20">
            <p className="text-sm text-text/60 mb-1">Total Suppliers</p>
            <p className="text-3xl font-bold text-text font-mono">{data.suppliers.length}</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Regional Sales Bar Chart */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
            <h3 className="text-lg font-semibold text-text mb-4">Sales by Region</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D2B48C" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#292421" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#292421" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#F8E5C2', 
                      border: '1px solid #B87333',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                  />
                  <Bar dataKey="value" fill="#B87333" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Product Category Distribution Donut */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
            <h3 className="text-lg font-semibold text-text mb-4">Product Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => entry.name}
                    outerRadius={80}
                    innerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Marketing ROAS Section - Full Width */}
        <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
          <h3 className="text-lg font-semibold text-text mb-4">Marketing ROAS by Channel</h3>
          
          {/* ROAS Bar Chart */}
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketingData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#D2B48C" opacity={0.3} />
                <XAxis type="number" stroke="#292421" style={{ fontSize: '12px' }} />
                <YAxis dataKey="name" type="category" stroke="#292421" style={{ fontSize: '12px' }} width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#F8E5C2', 
                    border: '1px solid #B87333',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`${value.toFixed(2)}x`, 'ROAS']}
                />
                <Legend />
                <Bar dataKey="roas" fill="#7BB661" radius={[0, 8, 8, 0]} name="Return on Ad Spend" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Marketing Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {marketingData.slice(0, 4).map((channel, idx) => (
              <motion.div
                key={channel.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-white rounded-lg border border-border/20"
              >
                <p className="text-xs text-text/60 mb-1">{channel.name}</p>
                <p className="text-2xl font-bold text-greenish font-mono">{channel.roas.toFixed(2)}x</p>
                <p className="text-xs text-text/60 mt-1">ROAS</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Customer Loyalty and Additional Marketing Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
            <h3 className="text-lg font-semibold text-text mb-4">Customer Loyalty Tiers</h3>
            <div className="space-y-3">
              {['platinum', 'gold', 'silver', 'bronze'].map(tier => {
                const count = data.customers.filter(c => c.loyaltyTier === tier).length;
                const percentage = (count / data.customers.length) * 100;
                return (
                  <div key={tier} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize font-medium text-text">{tier}</span>
                      <span className="font-mono text-blue">{count} ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-canvas/30 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`h-2 rounded-full ${
                          tier === 'platinum' ? 'bg-copper' :
                          tier === 'gold' ? 'bg-greenish' :
                          tier === 'silver' ? 'bg-mint' : 'bg-canvas'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Data Summary */}
        <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
          <h3 className="text-lg font-semibold text-text mb-4">Dataset Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="p-3 bg-white rounded-lg border border-border/20">
              <p className="text-xs text-text/60 mb-1">Suppliers</p>
              <p className="text-xl font-bold text-blue font-mono">{data.suppliers.length}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-border/20">
              <p className="text-xs text-text/60 mb-1">Stores</p>
              <p className="text-xl font-bold text-blue font-mono">{data.stores.length}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-border/20">
              <p className="text-xs text-text/60 mb-1">Products</p>
              <p className="text-xl font-bold text-blue font-mono">{data.products.length}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-border/20">
              <p className="text-xs text-text/60 mb-1">Customers</p>
              <p className="text-xl font-bold text-blue font-mono">{data.customers.length}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-border/20">
              <p className="text-xs text-text/60 mb-1">Employees</p>
              <p className="text-xl font-bold text-blue font-mono">{data.employees.length}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-border/20">
              <p className="text-xs text-text/60 mb-1">Sales</p>
              <p className="text-xl font-bold text-blue font-mono">{data.sales.length}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-border/20">
              <p className="text-xs text-text/60 mb-1">Inventory</p>
              <p className="text-xl font-bold text-blue font-mono">{data.inventory.length}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-border/20">
              <p className="text-xs text-text/60 mb-1">Returns</p>
              <p className="text-xl font-bold text-blue font-mono">{data.returns.length}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-border/20">
              <p className="text-xs text-text/60 mb-1">Footfall</p>
              <p className="text-xl font-bold text-blue font-mono">{data.footfall.length}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-border/20">
              <p className="text-xs text-text/60 mb-1">Marketing</p>
              <p className="text-xl font-bold text-blue font-mono">{data.marketing.length}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-border/20">
              <p className="text-xs text-text/60 mb-1">Finance</p>
              <p className="text-xl font-bold text-blue font-mono">{data.finance.length}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-copper/40 bg-copper/5">
              <p className="text-xs text-text/60 mb-1">TOTAL</p>
              <p className="text-xl font-bold text-blue font-mono">{data.metadata.totalRecords}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
