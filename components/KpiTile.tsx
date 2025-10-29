'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

interface KpiTileProps {
  label: string;
  value: string | number;
  delta: number;
  trend: 'up' | 'down' | 'neutral';
  sparkline?: number[];
  format?: 'number' | 'currency' | 'percent';
  color?: 'blue' | 'teal' | 'purple' | 'orange' | 'green' | 'pink' | 'yellow';
}

export default function KpiTile({ 
  label, 
  value, 
  delta, 
  trend, 
  sparkline,
  format = 'number',
  color = 'blue'
}: KpiTileProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.-]/g, ''));
  
  // Animated counter
  useEffect(() => {
    let start = 0;
    const end = numericValue;
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = start + (end - start) * easeOutQuart;
      
      setDisplayValue(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [numericValue]);

  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return `$${Math.round(val).toLocaleString()}`;
      case 'percent':
        return `${Math.round(val)}%`;
      default:
        return Math.round(val).toLocaleString();
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={20} className="text-white" />;
      case 'down':
        return <TrendingDown size={20} className="text-white" />;
      default:
        return <Minus size={20} className="text-white" />;
    }
  };

  const getColorClasses = () => {
    const colors = {
      blue: { bg: 'bg-blue', hoverBg: 'hover:bg-blue/90' },
      teal: { bg: 'bg-teal', hoverBg: 'hover:bg-teal/90' },
      purple: { bg: 'bg-purple', hoverBg: 'hover:bg-purple/90' },
      orange: { bg: 'bg-orange', hoverBg: 'hover:bg-orange/90' },
      green: { bg: 'bg-green', hoverBg: 'hover:bg-green/90' },
      pink: { bg: 'bg-pink', hoverBg: 'hover:bg-pink/90' },
      yellow: { bg: 'bg-yellow', hoverBg: 'hover:bg-yellow/90' }
    };
    return colors[color];
  };

  const colorClasses = getColorClasses();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ 
        scale: 1.02, 
        y: -2
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 25,
        mass: 0.5
      }}
      className={`${colorClasses.bg} ${colorClasses.hoverBg} text-white rounded-xl p-6 shadow-soft transition-all duration-200 relative overflow-hidden group`}
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <motion.p 
              className="text-sm text-white/80 font-semibold mb-2 tracking-wide"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {label}
            </motion.p>
            <motion.h3 
              className="text-4xl font-bold text-white font-mono tracking-tight"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              {formatValue(displayValue)}
            </motion.h3>
          </div>
          
          {sparkline && sparkline.length > 0 && (
            <motion.div 
              className="w-20 h-12 opacity-70"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.7, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparkline.map((val, i) => ({ value: val }))}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="white"
                    strokeWidth={2.5}
                    dot={false}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </div>

        <motion.div 
          className="flex items-center gap-2 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="bg-white/20 rounded-full p-1"
          >
            {getTrendIcon()}
          </motion.div>
          <span className="text-base font-bold text-white">
            {delta > 0 ? '+' : ''}{delta}%
          </span>
          <span className="text-xs text-white/70 font-medium">vs last period</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
