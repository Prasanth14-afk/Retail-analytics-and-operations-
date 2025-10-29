'use client';

import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import KpiTile from '@/components/KpiTile';
import TrendCard from '@/components/TrendCard';
import { useFilteredSales } from '@/lib/selectors';
import { useStore } from '@/lib/store';
import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, Legend, Area, AreaChart } from 'recharts';

export default function FreshProducePage() {
  const { setFilters } = useStore();
  
  useEffect(() => {
    setFilters({ categories: ['Fresh Produce'] });
    return () => setFilters({ categories: [] });
  }, [setFilters]);

  const sales = useFilteredSales();
  const revenue = sales.reduce((sum, s) => sum + s.total, 0);
  const units = sales.reduce((sum, s) => sum + s.quantity, 0);

  // Product category performance
  const categoryData = [
    { name: 'Fruits', sales: Math.round(revenue * 0.38), freshness: 95, waste: 8 },
    { name: 'Vegetables', sales: Math.round(revenue * 0.42), freshness: 92, waste: 12 },
    { name: 'Organic', sales: Math.round(revenue * 0.20), freshness: 97, waste: 5 },
  ];

  // Freshness tracking over week
  const freshnessData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    freshness: Math.round(92 + Math.random() * 6),
    waste: Math.round(8 + Math.random() * 8),
  }));

  // Quality metrics radar
  const qualityMetrics = [
    { metric: 'Freshness', score: 94 },
    { metric: 'Quality', score: 91 },
    { metric: 'Availability', score: 88 },
    { metric: 'Variety', score: 85 },
    { metric: 'Organic %', score: 78 },
    { metric: 'Local Source', score: 82 },
  ];

  return (
    <Layout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text mb-2">Fresh Produce Department</h1>
          <p className="text-text/60">Fresh fruits, vegetables, and organic products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KpiTile label="Department Revenue" value={revenue} delta={18.7} trend="up" format="currency" />
          <KpiTile label="Units Sold" value={units} delta={12.3} trend="up" format="number" />
          <KpiTile label="Freshness Score" value={94} delta={2.1} trend="up" format="percent" />
          <KpiTile label="Waste Reduction" value={15} delta={-5.2} trend="down" format="percent" />
        </div>

        {/* Category Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart - Category Sales */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
            <h3 className="text-lg font-semibold text-text mb-4">Category Sales Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D2B48C" opacity={0.3} />
                <XAxis dataKey="name" stroke="#292421" fontSize={12} />
                <YAxis stroke="#292421" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#F8E5C2', border: '1px solid #D2B48C' }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Bar dataKey="sales" fill="#7BB661" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart - Quality Metrics */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
            <h3 className="text-lg font-semibold text-text mb-4">Quality Metrics Score</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={qualityMetrics}>
                <PolarGrid stroke="#D2B48C" />
                <PolarAngleAxis dataKey="metric" stroke="#292421" fontSize={11} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#292421" fontSize={10} />
                <Radar name="Score" dataKey="score" stroke="#7BB661" fill="#7BB661" fillOpacity={0.6} />
                <Tooltip contentStyle={{ backgroundColor: '#F8E5C2', border: '1px solid #D2B48C' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Freshness & Waste Tracking */}
        <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
          <h3 className="text-lg font-semibold text-text mb-4">Weekly Freshness & Waste Tracking</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={freshnessData}>
              <defs>
                <linearGradient id="colorFreshness" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7BB661" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#7BB661" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B87333" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#B87333" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#D2B48C" opacity={0.3} />
              <XAxis dataKey="day" stroke="#292421" fontSize={12} />
              <YAxis stroke="#292421" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#F8E5C2', border: '1px solid #D2B48C' }} />
              <Legend />
              <Area type="monotone" dataKey="freshness" stroke="#7BB661" fillOpacity={1} fill="url(#colorFreshness)" name="Freshness %" />
              <Area type="monotone" dataKey="waste" stroke="#B87333" fillOpacity={1} fill="url(#colorWaste)" name="Waste %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
          <h3 className="text-lg font-semibold text-text mb-4">Department Highlights</h3>
          <ul className="space-y-3 text-sm text-text/80">
            <li>✓ Organic produce sales up 22% vs last month</li>
            <li>✓ New supplier partnership reducing delivery times by 30%</li>
            <li>✓ Implemented smart shelf monitoring for perishables</li>
            <li>✓ Customer satisfaction rating: 4.8/5.0</li>
          </ul>
        </div>
      </motion.div>
    </Layout>
  );
}
