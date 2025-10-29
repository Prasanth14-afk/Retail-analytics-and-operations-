'use client';

import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import KpiTile from '@/components/KpiTile';
import { useFilteredSales } from '@/lib/selectors';
import { useStore } from '@/lib/store';
import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

export default function PharmacyPage() {
  const { setFilters } = useStore();
  
  useEffect(() => {
    setFilters({ categories: ['Pharmacy'] });
    return () => setFilters({ categories: [] });
  }, [setFilters]);

  const sales = useFilteredSales();
  const revenue = sales.reduce((sum, s) => sum + s.total, 0);
  const units = sales.reduce((sum, s) => sum + s.quantity, 0);

  // Product category breakdown
  const categoryData = [
    { name: 'Prescription', value: Math.round(revenue * 0.55), color: '#2C5F8D' },
    { name: 'OTC Meds', value: Math.round(revenue * 0.25), color: '#B87333' },
    { name: 'Vitamins', value: Math.round(revenue * 0.12), color: '#7BB661' },
    { name: 'Personal Care', value: Math.round(revenue * 0.08), color: '#E6B7A9' },
  ];

  // Hourly prescription volume
  const hourlyData = [
    { hour: '8AM', prescriptions: 12, waitTime: 15 },
    { hour: '10AM', prescriptions: 28, waitTime: 10 },
    { hour: '12PM', prescriptions: 45, waitTime: 8 },
    { hour: '2PM', prescriptions: 38, waitTime: 7 },
    { hour: '4PM', prescriptions: 52, waitTime: 12 },
    { hour: '6PM', prescriptions: 35, waitTime: 9 },
    { hour: '8PM', prescriptions: 18, waitTime: 6 },
  ];

  // Customer satisfaction trend
  const satisfactionData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    rating: (4.5 + Math.random() * 0.5).toFixed(1),
    reviews: Math.round(20 + Math.random() * 15),
  }));

  return (
    <Layout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text mb-2">Pharmacy Department</h1>
          <p className="text-text/60">Over-the-counter medications, prescriptions, and health products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KpiTile label="Department Revenue" value={revenue} delta={16.8} trend="up" format="currency" />
          <KpiTile label="Prescriptions Filled" value={units} delta={9.4} trend="up" format="number" />
          <KpiTile label="Customer Wait Time" value={8.2} delta={-12.5} trend="down" format="number" />
          <KpiTile label="Service Rating" value={4.9} delta={0.3} trend="up" format="number" />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Distribution Donut */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
            <h3 className="text-lg font-semibold text-text mb-4">Revenue by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
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
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Hourly Volume & Wait Time */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
            <h3 className="text-lg font-semibold text-text mb-4">Hourly Prescription Volume</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D2B48C" opacity={0.3} />
                <XAxis dataKey="hour" stroke="#292421" fontSize={12} />
                <YAxis yAxisId="left" stroke="#292421" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#B87333" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#F8E5C2', border: '1px solid #D2B48C' }} />
                <Legend />
                <Bar yAxisId="left" dataKey="prescriptions" fill="#2C5F8D" name="Prescriptions" radius={[8, 8, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="waitTime" stroke="#B87333" strokeWidth={2} name="Wait Time (min)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Satisfaction Trend */}
        <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
          <h3 className="text-lg font-semibold text-text mb-4">Weekly Customer Satisfaction</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={satisfactionData}>
              <defs>
                <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7BB661" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#7BB661" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#D2B48C" opacity={0.3} />
              <XAxis dataKey="day" stroke="#292421" fontSize={12} />
              <YAxis yAxisId="left" domain={[4, 5]} stroke="#292421" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#2C5F8D" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#F8E5C2', border: '1px solid #D2B48C' }} />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="rating" stroke="#7BB661" fillOpacity={1} fill="url(#colorRating)" name="Rating" />
              <Line yAxisId="right" type="monotone" dataKey="reviews" stroke="#2C5F8D" strokeWidth={2} name="# Reviews" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
          <h3 className="text-lg font-semibold text-text mb-4">Health & Wellness Insights</h3>
          <ul className="space-y-2 text-sm text-text/80">
            <li>✓ Flu season preparations: Vaccine stock at 95% capacity</li>
            <li>✓ New telehealth consultation service launched</li>
            <li>✓ Average prescription turnaround: 8.2 minutes</li>
            <li>✓ Vitamin & supplement sales up 28%</li>
          </ul>
        </div>
      </motion.div>
    </Layout>
  );
}
