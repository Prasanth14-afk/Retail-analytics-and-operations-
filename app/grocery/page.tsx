'use client';

import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import KpiTile from '@/components/KpiTile';
import TrendCard from '@/components/TrendCard';
import { useFilteredSales } from '@/lib/selectors';
import { useStore } from '@/lib/store';
import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

export default function GroceryPage() {
  const { data, setFilters } = useStore();
  
  useEffect(() => {
    setFilters({ categories: ['Grocery'] });
    return () => setFilters({ categories: [] });
  }, [setFilters]);

  const sales = useFilteredSales();
  
  const revenue = sales.reduce((sum, s) => sum + s.total, 0);
  const units = sales.reduce((sum, s) => sum + s.quantity, 0);
  
  // Generate daily trend
  const dailyData: Record<string, number> = {};
  sales.forEach(sale => {
    const date = sale.transactionDate.split('T')[0];
    dailyData[date] = (dailyData[date] || 0) + sale.total;
  });
  
  const trendData = Object.entries(dailyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-14)
    .map(([date, value]) => ({
      name: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(value),
    }));

  // Sub-category data for charts
  const subCategoryData = [
    { name: 'Snacks', value: Math.round(revenue * 0.35), percentage: 35 },
    { name: 'Canned Foods', value: Math.round(revenue * 0.28), percentage: 28 },
    { name: 'Dry Goods', value: Math.round(revenue * 0.22), percentage: 22 },
    { name: 'Condiments', value: Math.round(revenue * 0.15), percentage: 15 },
  ];

  const COLORS = ['#B87333', '#2C5F8D', '#7BB661', '#E6B7A9'];

  // Hourly sales pattern
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    sales: Math.round(Math.random() * 5000 + 2000),
    transactions: Math.round(Math.random() * 50 + 20),
  }));

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text mb-2">Grocery Department</h1>
          <p className="text-text/60">Performance metrics for dry goods, snacks, and packaged items</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiTile
            label="Department Revenue"
            value={revenue}
            delta={15.3}
            trend="up"
            format="currency"
          />
          <KpiTile
            label="Units Sold"
            value={units}
            delta={9.7}
            trend="up"
            format="number"
          />
          <KpiTile
            label="Avg Transaction"
            value={sales.length > 0 ? Math.round((revenue / sales.length) * 100) / 100 : 0}
            delta={3.2}
            trend="up"
            format="currency"
          />
          <KpiTile
            label="Items per Transaction"
            value={sales.length > 0 ? Math.round((units / sales.length) * 10) / 10 : 0}
            delta={-1.5}
            trend="down"
            format="number"
          />
        </div>

        <TrendCard
          title="14-Day Revenue Trend"
          data={trendData}
          color="#B87333"
        />

        {/* Sub-Category Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Donut Chart */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
            <h3 className="text-lg font-semibold text-text mb-4">Revenue Distribution by Sub-Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {subCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
            <h3 className="text-lg font-semibold text-text mb-4">Sub-Category Sales Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subCategoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D2B48C" opacity={0.3} />
                <XAxis dataKey="name" stroke="#292421" fontSize={12} />
                <YAxis stroke="#292421" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#F8E5C2', border: '1px solid #D2B48C' }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Bar dataKey="value" fill="#B87333" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hourly Sales Pattern */}
        <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
          <h3 className="text-lg font-semibold text-text mb-4">Hourly Sales Pattern (Today)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D2B48C" opacity={0.3} />
              <XAxis dataKey="hour" stroke="#292421" fontSize={11} />
              <YAxis yAxisId="left" stroke="#292421" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#2C5F8D" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#F8E5C2', border: '1px solid #D2B48C' }}
                formatter={(value: number, name: string) => [
                  name === 'sales' ? `$${value.toLocaleString()}` : value,
                  name === 'sales' ? 'Sales' : 'Transactions'
                ]}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#B87333" strokeWidth={2} dot={{ fill: '#B87333' }} />
              <Line yAxisId="right" type="monotone" dataKey="transactions" stroke="#2C5F8D" strokeWidth={2} dot={{ fill: '#2C5F8D' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
          <h3 className="text-lg font-semibold text-text mb-4">Department Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-text mb-2">Top Performing Sub-Categories</h4>
              <ul className="space-y-2">
                <li className="flex justify-between text-sm">
                  <span>Snacks</span>
                  <span className="font-mono text-blue font-semibold">${Math.round(revenue * 0.35).toLocaleString()}</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span>Canned Foods</span>
                  <span className="font-mono text-blue font-semibold">${Math.round(revenue * 0.28).toLocaleString()}</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span>Dry Goods</span>
                  <span className="font-mono text-blue font-semibold">${Math.round(revenue * 0.22).toLocaleString()}</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span>Condiments</span>
                  <span className="font-mono text-blue font-semibold">${Math.round(revenue * 0.15).toLocaleString()}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-text mb-2">Key Metrics</h4>
              <ul className="space-y-2">
                <li className="flex justify-between text-sm">
                  <span>Margin %</span>
                  <span className="font-bold text-greenish">28.5%</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span>Return Rate</span>
                  <span className="font-bold text-blue">1.2%</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span>Stock Turnover</span>
                  <span className="font-bold text-text">6.3 days</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span>Out of Stock Rate</span>
                  <span className="font-bold text-navy">2.8%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
