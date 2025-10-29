'use client';

import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

interface TrendCardProps {
  title: string;
  data: Array<{ name: string; value: number }>;
  color?: string;
}

export default function TrendCard({ title, data, color = '#2F7CFF' }: TrendCardProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.005, y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="bg-white rounded-xl p-6 shadow-soft border border-border hover-lift"
    >
      <motion.h3 
        className="text-lg font-bold text-text mb-4"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h3>
      
      <motion.div 
        className="h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data}
            onMouseMove={(state) => {
              if (state.activeTooltipIndex !== undefined) {
                setHoveredIndex(state.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <defs>
              {/* Blue to Teal gradient for bright theme */}
              <linearGradient id="blueTealGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2F7CFF" stopOpacity={0.5}/>
                <stop offset="50%" stopColor="#10D2C2" stopOpacity={0.3}/>
                <stop offset="100%" stopColor="#10D2C2" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="blueTealStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2F7CFF"/>
                <stop offset="100%" stopColor="#10D2C2"/>
              </linearGradient>
              <filter id="glowBright">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#E5E8EE" 
              opacity={0.5}
              strokeWidth={1}
            />
            <XAxis 
              dataKey="name" 
              stroke="#7A8596" 
              style={{ fontSize: '12px', fontWeight: 500 }}
              tick={{ fill: '#7A8596' }}
              axisLine={{ stroke: '#E5E8EE', strokeWidth: 1.5 }}
            />
            <YAxis 
              stroke="#7A8596" 
              style={{ fontSize: '12px', fontWeight: 500 }}
              tick={{ fill: '#7A8596' }}
              axisLine={{ stroke: '#E5E8EE', strokeWidth: 1.5 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                border: '2px solid #2F7CFF',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(47,124,255,0.15)',
                backdropFilter: 'blur(10px)',
                padding: '12px 16px'
              }}
              labelStyle={{ fontWeight: 700, color: '#0B1020', marginBottom: '6px', fontSize: '13px' }}
              itemStyle={{ color: '#2F7CFF', fontWeight: 600, fontSize: '14px' }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
              cursor={{ stroke: '#2F7CFF', strokeWidth: 2, strokeDasharray: '5 5', opacity: 0.3 }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="url(#blueTealStroke)"
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#blueTealGradient)"
              dot={{ 
                fill: '#2F7CFF', 
                strokeWidth: 2.5, 
                r: 4,
                stroke: '#fff'
              }}
              activeDot={{ 
                r: 7, 
                fill: '#2F7CFF',
                stroke: '#fff',
                strokeWidth: 3,
                filter: 'url(#glowBright)'
              }}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}
