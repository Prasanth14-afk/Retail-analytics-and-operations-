'use client';

import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import KpiTile from '@/components/KpiTile';
import { useFilteredSales } from '@/lib/selectors';
import { useStore } from '@/lib/store';
import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts';

export default function ApparelPage() {
  const { setFilters } = useStore();
  
  useEffect(() => {
    setFilters({ categories: ['Apparel'] });
    return () => setFilters({ categories: [] });
  }, [setFilters]);

  const sales = useFilteredSales();
  const revenue = sales.reduce((sum, s) => sum + s.total, 0);
  const units = sales.reduce((sum, s) => sum + s.quantity, 0);

  // Size distribution
  const sizeData = [
    { size: 'XS', sold: 120, returned: 15 },
    { size: 'S', sold: 280, returned: 22 },
    { size: 'M', sold: 450, returned: 35 },
    { size: 'L', sold: 380, returned: 28 },
    { size: 'XL', sold: 250, returned: 19 },
    { size: 'XXL', sold: 150, returned: 12 },
  ];

  // Category performance
  const categoryData = [
    { name: "Men's Wear", sales: Math.round(revenue * 0.35), margin: 42 },
    { name: "Women's Wear", sales: Math.round(revenue * 0.40), margin: 45 },
    { name: "Kids", sales: Math.round(revenue * 0.15), margin: 38 },
    { name: "Footwear", sales: Math.round(revenue * 0.10), margin: 48 },
  ];

  // Customer satisfaction metrics
  const satisfactionData = [
    { metric: 'Quality', score: 88 },
    { metric: 'Fit', score: 82 },
    { metric: 'Variety', score: 85 },
    { metric: 'Pricing', score: 78 },
    { metric: 'Style', score: 91 },
    { metric: 'Service', score: 87 },
  ];

  return (
    <Layout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text mb-2">Apparel & Fashion</h1>
          <p className="text-text/60">Men's, women's, kids clothing and footwear</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KpiTile label="Department Revenue" value={revenue} delta={11.2} trend="up" format="currency" />
          <KpiTile label="Units Sold" value={units} delta={7.9} trend="up" format="number" />
          <KpiTile label="Return Rate" value={8.5} delta={-1.3} trend="down" format="percent" />
          <KpiTile label="Customer Satisfaction" value={4.6} delta={0.2} trend="up" format="number" />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Size Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
            <h3 className="text-lg font-semibold text-text mb-4">Size Distribution & Returns</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sizeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D2B48C" opacity={0.3} />
                <XAxis dataKey="size" stroke="#292421" fontSize={12} />
                <YAxis stroke="#292421" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#F8E5C2', border: '1px solid #D2B48C' }} />
                <Legend />
                <Bar dataKey="sold" fill="#2C5F8D" name="Units Sold" radius={[8, 8, 0, 0]} />
                <Bar dataKey="returned" fill="#B87333" name="Returned" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Customer Satisfaction Radar */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
            <h3 className="text-lg font-semibold text-text mb-4">Customer Satisfaction Metrics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={satisfactionData}>
                <PolarGrid stroke="#D2B48C" />
                <PolarAngleAxis dataKey="metric" stroke="#292421" fontSize={11} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#292421" fontSize={10} />
                <Radar name="Score" dataKey="score" stroke="#2C5F8D" fill="#2C5F8D" fillOpacity={0.6} />
                <Tooltip contentStyle={{ backgroundColor: '#F8E5C2', border: '1px solid #D2B48C' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
          <h3 className="text-lg font-semibold text-text mb-4">Category Sales & Margins</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D2B48C" opacity={0.3} />
              <XAxis dataKey="name" stroke="#292421" fontSize={12} />
              <YAxis yAxisId="left" stroke="#292421" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#7BB661" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#F8E5C2', border: '1px solid #D2B48C' }} />
              <Legend />
              <Bar yAxisId="left" dataKey="sales" fill="#2C5F8D" name="Sales ($)" radius={[8, 8, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#7BB661" strokeWidth={3} name="Margin %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
          <h3 className="text-lg font-semibold text-text mb-4">Seasonal Trends</h3>
          <p className="text-sm text-text/80 mb-4">Current season shows strong performance in casual wear and sportswear categories.</p>
          <ul className="space-y-2 text-sm text-text/80">
            <li>• Summer collection clearance: 65% sold</li>
            <li>• Fall collection launch: +45% week-over-week</li>
            <li>• Footwear category: Best performer this quarter</li>
          </ul>
        </div>
      </motion.div>
    </Layout>
  );
}
