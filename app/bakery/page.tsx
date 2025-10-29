'use client';

import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import KpiTile from '@/components/KpiTile';
import { useFilteredSales } from '@/lib/selectors';
import { useStore } from '@/lib/store';
import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell, ComposedChart, Area } from 'recharts';

export default function BakeryPage() {
  const { setFilters } = useStore();
  
  useEffect(() => {
    setFilters({ categories: ['Bakery'] });
    return () => setFilters({ categories: [] });
  }, [setFilters]);

  const sales = useFilteredSales();
  const revenue = sales.reduce((sum, s) => sum + s.total, 0);
  const units = sales.reduce((sum, s) => sum + s.quantity, 0);

  // Product mix
  const productData = [
    { name: 'Bread', value: Math.round(revenue * 0.35), units: 450 },
    { name: 'Cakes', value: Math.round(revenue * 0.28), units: 120 },
    { name: 'Pastries', value: Math.round(revenue * 0.22), units: 380 },
    { name: 'Cookies', value: Math.round(revenue * 0.15), units: 520 },
  ];

  const COLORS = ['#B87333', '#2C5F8D', '#7BB661', '#E6B7A9'];

  // Hourly baking schedule
  const productionData = [
    { hour: '4AM', produced: 180, sold: 0 },
    { hour: '6AM', produced: 250, sold: 45 },
    { hour: '8AM', produced: 150, sold: 120 },
    { hour: '10AM', produced: 100, sold: 85 },
    { hour: '12PM', produced: 120, sold: 95 },
    { hour: '2PM', produced: 80, sold: 75 },
    { hour: '4PM', produced: 60, sold: 50 },
    { hour: '6PM', produced: 0, sold: 30 },
  ];

  // Freshness tracking
  const freshnessData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    fresh: 98 - Math.round(Math.random() * 3),
    waste: 2 + Math.round(Math.random() * 3),
  }));

  return (
    <Layout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text mb-2">Bakery Department</h1>
          <p className="text-text/60">Fresh bread, cakes, pastries, and baked goods</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KpiTile label="Department Revenue" value={revenue} delta={13.9} trend="up" format="currency" />
          <KpiTile label="Items Baked Daily" value={units} delta={8.6} trend="up" format="number" />
          <KpiTile label="Freshness Compliance" value={98} delta={1.2} trend="up" format="percent" />
          <KpiTile label="Waste Percentage" value={3.2} delta={-2.8} trend="down" format="percent" />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Mix Donut Chart */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
            <h3 className="text-lg font-semibold text-text mb-4">Revenue by Product Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Production vs Sales */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
            <h3 className="text-lg font-semibold text-text mb-4">Hourly Production vs Sales</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D2B48C" opacity={0.3} />
                <XAxis dataKey="hour" stroke="#292421" fontSize={11} />
                <YAxis stroke="#292421" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#F8E5C2', border: '1px solid #D2B48C' }} />
                <Legend />
                <Bar dataKey="produced" fill="#B87333" name="Produced" radius={[8, 8, 0, 0]} />
                <Line type="monotone" dataKey="sold" stroke="#7BB661" strokeWidth={2} name="Sold" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Freshness & Waste Tracking */}
        <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
          <h3 className="text-lg font-semibold text-text mb-4">Weekly Freshness & Waste Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={freshnessData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D2B48C" opacity={0.3} />
              <XAxis dataKey="day" stroke="#292421" fontSize={12} />
              <YAxis stroke="#292421" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#F8E5C2', border: '1px solid #D2B48C' }} />
              <Legend />
              <Line type="monotone" dataKey="fresh" stroke="#7BB661" strokeWidth={3} name="Freshness %" dot={{ fill: '#7BB661', r: 5 }} />
              <Line type="monotone" dataKey="waste" stroke="#B87333" strokeWidth={3} name="Waste %" dot={{ fill: '#B87333', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
          <h3 className="text-lg font-semibold text-text mb-4">Bakery Performance</h3>
          <ul className="space-y-2 text-sm text-text/80">
            <li>✓ Custom cake orders: +35% this quarter</li>
            <li>✓ Artisan bread line: Best seller</li>
            <li>✓ Morning rush optimization reduced wait times by 18%</li>
            <li>✓ New gluten-free offerings launched successfully</li>
          </ul>
        </div>
      </motion.div>
    </Layout>
  );
}
