'use client';

import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import KpiTile from '@/components/KpiTile';
import { useFilteredSales } from '@/lib/selectors';
import { useStore } from '@/lib/store';
import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, Line, Area, Legend } from 'recharts';

export default function ElectronicsPage() {
  const { setFilters } = useStore();
  
  useEffect(() => {
    setFilters({ categories: ['Electronics'] });
    return () => setFilters({ categories: [] });
  }, [setFilters]);

  const sales = useFilteredSales();
  const revenue = sales.reduce((sum, s) => sum + s.total, 0);
  const units = sales.reduce((sum, s) => sum + s.quantity, 0);

  // Category breakdown
  const categoryData = [
    { name: 'Mobile Phones', value: Math.round(revenue * 0.38), units: Math.round(units * 0.25) },
    { name: 'Computers', value: Math.round(revenue * 0.29), units: Math.round(units * 0.15) },
    { name: 'Audio', value: Math.round(revenue * 0.19), units: Math.round(units * 0.35) },
    { name: 'Appliances', value: Math.round(revenue * 0.14), units: Math.round(units * 0.25) },
  ];

  const COLORS = ['#2C5F8D', '#B87333', '#7BB661', '#E6B7A9'];

  // Monthly sales trend
  const monthlyData = [
    { month: 'Jan', sales: 45000, warranty: 28000, returns: 2200 },
    { month: 'Feb', sales: 52000, warranty: 31000, returns: 2800 },
    { month: 'Mar', sales: 48000, warranty: 29000, returns: 2400 },
    { month: 'Apr', sales: 61000, warranty: 38000, returns: 3100 },
    { month: 'May', sales: 55000, warranty: 34000, returns: 2700 },
    { month: 'Jun', sales: Math.round(revenue), warranty: Math.round(revenue * 0.62), returns: Math.round(revenue * 0.05) },
  ];

  return (
    <Layout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text mb-2">Electronics Department</h1>
          <p className="text-text/60">Mobile devices, computers, audio, and appliances</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KpiTile label="Department Revenue" value={revenue} delta={25.4} trend="up" format="currency" />
          <KpiTile label="Units Sold" value={units} delta={14.8} trend="up" format="number" />
          <KpiTile label="Avg Item Value" value={sales.length > 0 ? Math.round((revenue / units)) : 0} delta={8.9} trend="up" format="currency" />
          <KpiTile label="Warranty Attach Rate" value={67} delta={4.2} trend="up" format="percent" />
        </div>

        {/* Revenue Distribution & Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Donut Chart */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
            <h3 className="text-lg font-semibold text-text mb-4">Revenue by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - Units */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
            <h3 className="text-lg font-semibold text-text mb-4">Units Sold by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#D2B48C" opacity={0.3} />
                <XAxis type="number" stroke="#292421" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#292421" fontSize={11} width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#F8E5C2', border: '1px solid #D2B48C' }}
                  formatter={(value: number) => `${value.toLocaleString()} units`}
                />
                <Bar dataKey="units" fill="#2C5F8D" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Performance */}
        <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
          <h3 className="text-lg font-semibold text-text mb-4">6-Month Sales, Warranty & Returns Trend</h3>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D2B48C" opacity={0.3} />
              <XAxis dataKey="month" stroke="#292421" fontSize={12} />
              <YAxis stroke="#292421" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#F8E5C2', border: '1px solid #D2B48C' }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Legend />
              <Area type="monotone" dataKey="sales" fill="#2C5F8D" fillOpacity={0.3} stroke="#2C5F8D" name="Total Sales" />
              <Bar dataKey="warranty" fill="#7BB661" name="Warranty Sales" />
              <Line type="monotone" dataKey="returns" stroke="#B87333" strokeWidth={2} name="Returns" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
          <h3 className="text-lg font-semibold text-text mb-4">Top Selling Categories</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded-lg border border-border/20">
              <p className="text-xs text-text/60 mb-1">Mobile Phones</p>
              <p className="text-2xl font-bold text-blue font-mono">${Math.round(revenue * 0.38).toLocaleString()}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-border/20">
              <p className="text-xs text-text/60 mb-1">Computers</p>
              <p className="text-2xl font-bold text-blue font-mono">${Math.round(revenue * 0.29).toLocaleString()}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-border/20">
              <p className="text-xs text-text/60 mb-1">Audio</p>
              <p className="text-2xl font-bold text-blue font-mono">${Math.round(revenue * 0.19).toLocaleString()}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-border/20">
              <p className="text-xs text-text/60 mb-1">Appliances</p>
              <p className="text-2xl font-bold text-blue font-mono">${Math.round(revenue * 0.14).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
