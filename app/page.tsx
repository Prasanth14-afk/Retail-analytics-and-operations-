'use client';

import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import KpiTile from '@/components/KpiTile';
import TrendCard from '@/components/TrendCard';
import DataTable from '@/components/DataTable';
import AlertCard from '@/components/AlertCard';
import { useKPIs, useTopProducts, useLowStockItems, useSalesByCategory } from '@/lib/selectors';
import { useStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import type { Alert } from '@/lib/types';
import { 
  TrendingUp, TrendingDown, Download, FileText, Calendar, 
  Users, ShoppingCart, Building2, Award, Activity, Target,
  ArrowUpRight, Clock, Zap
} from 'lucide-react';

export default function ExecutiveDashboard() {
  const kpis = useKPIs();
  const topProducts = useTopProducts(5);
  const lowStock = useLowStockItems();
  const salesByCategory = useSalesByCategory();
  const { alerts, acknowledgeAlert, assignAlert, data } = useStore();
  const [generatedAlerts, setGeneratedAlerts] = useState(false);

  // Generate sample alerts from data
  useEffect(() => {
    if (data && !generatedAlerts && lowStock.length > 0) {
      const criticalStockAlerts: Alert[] = lowStock.slice(0, 3).map((item, idx) => ({
        id: `alert-${idx}`,
        type: 'low-stock' as const,
        severity: item.status === 'critical' ? 'critical' as const : 'high' as const,
        title: `${item.status === 'critical' ? 'Critical' : 'Low'} Stock Alert`,
        message: `${item.productName} at ${item.storeName} has only ${item.quantity} units remaining`,
        timestamp: new Date().toISOString(),
        storeId: item.storeId,
        productId: item.productId,
        acknowledged: false,
      }));

      criticalStockAlerts.forEach(alert => useStore.getState().addAlert(alert));
      setGeneratedAlerts(true);
    }
  }, [data, lowStock, generatedAlerts]);

  // Generate trend data from sales
  const trendData = salesByCategory.slice(0, 7).map(cat => ({
    name: cat.category.substring(0, 10),
    value: Math.round(cat.revenue),
  }));

  // Store Performance Leaderboard
  const storePerformance = data?.stores.map(store => {
    const storeSales = data.sales.filter(s => s.storeId === store.id);
    const revenue = storeSales.reduce((sum, s) => sum + (s.total || 0), 0);
    const transactions = storeSales.length;
    return { ...store, revenue, transactions };
  }).sort((a, b) => b.revenue - a.revenue) || [];

  const topStores = storePerformance.slice(0, 5);
  const bottomStores = storePerformance.slice(-5).reverse();

  // Business Metrics
  const totalRevenue = kpis.revenue;
  const lastMonthRevenue = totalRevenue * 0.89; // Simulated
  const yoyGrowth = 23.5; // Simulated
  const momGrowth = ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
  const profitMargin = 18.7; // Simulated
  const customerCount = data?.sales.length || 0;
  const avgCustomerValue = totalRevenue / customerCount;

  // Forecasting
  const forecastedRevenue = totalRevenue * 1.12; // 12% projected growth
  const forecastedTransactions = customerCount * 1.08;

  // Employee Satisfaction (Simulated based on performance)
  const avgEmployeePerformance = (data?.employees.reduce((sum, e) => sum + e.performance, 0) || 0) / (data?.employees.length || 1);
  const employeeSatisfaction = (avgEmployeePerformance / 5) * 100;

  // Recent Activity
  const recentActivity = [
    { id: 1, type: 'sale', message: 'Large transaction completed at Downtown Store', time: '2 mins ago', icon: ShoppingCart, color: 'text-green' },
    { id: 2, type: 'employee', message: 'New employee Sarah Johnson hired in Electronics', time: '15 mins ago', icon: Users, color: 'text-blue' },
    { id: 3, type: 'inventory', message: 'Stock replenishment order placed for Fresh Produce', time: '1 hour ago', icon: Building2, color: 'text-teal' },
    { id: 4, type: 'alert', message: 'Critical stock alert resolved at Westside Store', time: '2 hours ago', icon: Zap, color: 'text-orange' },
  ];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="mb-2">
          <h1 className="text-4xl font-bold text-text mb-2">Executive Dashboard</h1>
          <p className="text-mute">Real-time insights across all stores and departments</p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <KpiTile
            label="Total Revenue"
            value={kpis.revenue}
            delta={12.5}
            trend="up"
            format="currency"
            sparkline={[45, 52, 48, 58, 53, 61, 65]}
            color="blue"
          />
          <KpiTile
            label="Items Sold"
            value={kpis.itemsSold}
            delta={8.2}
            trend="up"
            format="number"
            sparkline={[120, 135, 128, 145, 142, 158, 165]}
            color="teal"
          />
          <KpiTile
            label="Avg Basket Size"
            value={kpis.avgBasket}
            delta={-2.1}
            trend="down"
            format="currency"
            sparkline={[85, 82, 88, 84, 81, 79, 78]}
            color="purple"
          />
          <KpiTile
            label="Stock Health"
            value={kpis.stockHealth}
            delta={5.3}
            trend="up"
            format="percent"
            sparkline={[72, 74, 73, 76, 78, 79, 82]}
            color="green"
          />
        </div>

        {/* Quick Actions & Key Metrics Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border">
            <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-blue to-blue/90 text-white rounded-xl hover:shadow-lg transition-all group">
                <span className="font-semibold">Generate Report</span>
                <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-teal to-teal/90 text-white rounded-xl hover:shadow-lg transition-all group">
                <span className="font-semibold">Schedule Meeting</span>
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-purple to-purple/90 text-white rounded-xl hover:shadow-lg transition-all group">
                <span className="font-semibold">Export Dashboard</span>
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-orange to-orange/90 text-white rounded-xl hover:shadow-lg transition-all group">
                <span className="font-semibold">View Analytics</span>
                <ArrowUpRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Business Metrics */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border">
            <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-green" />
              Business Metrics
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-mute">YoY Growth</span>
                  <span className="text-xl font-bold text-green font-mono">+{yoyGrowth}%</span>
                </div>
                <div className="h-2 bg-canvas rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green to-teal" style={{ width: `${yoyGrowth}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-mute">MoM Growth</span>
                  <span className="text-xl font-bold text-blue font-mono">+{momGrowth.toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-canvas rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue to-teal" style={{ width: `${momGrowth}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-mute">Profit Margin</span>
                  <span className="text-xl font-bold text-purple font-mono">{profitMargin}%</span>
                </div>
                <div className="h-2 bg-canvas rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple to-pink" style={{ width: `${profitMargin}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-mute">Employee Satisfaction</span>
                  <span className="text-xl font-bold text-yellow font-mono">{employeeSatisfaction.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-canvas rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow to-orange" style={{ width: `${employeeSatisfaction}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Metrics */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border">
            <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-teal" />
              Customer Metrics
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-canvas/50 rounded-lg">
                <p className="text-xs text-mute mb-1">Avg Transaction Value</p>
                <p className="text-2xl font-bold text-blue font-mono">${avgCustomerValue.toFixed(2)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green" />
                  <span className="text-xs text-green font-semibold">+8.2% vs last month</span>
                </div>
              </div>
              <div className="p-3 bg-canvas/50 rounded-lg">
                <p className="text-xs text-mute mb-1">Total Customers</p>
                <p className="text-2xl font-bold text-teal font-mono">{customerCount.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green" />
                  <span className="text-xs text-green font-semibold">+12.5% vs last month</span>
                </div>
              </div>
              <div className="p-3 bg-canvas/50 rounded-lg">
                <p className="text-xs text-mute mb-1">Customer Retention</p>
                <p className="text-2xl font-bold text-purple font-mono">87.3%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green" />
                  <span className="text-xs text-green font-semibold">+3.1% vs last month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Store Performance Leaderboard & Forecasting */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {/* Top Performing Stores */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border">
            <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow" />
              Top Performing Stores
            </h3>
            <div className="space-y-3">
              {topStores.map((store, idx) => (
                <motion.div
                  key={store.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-canvas/50 rounded-xl border border-border hover:border-green/30 transition-all"
                >
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm
                    ${idx === 0 ? 'bg-gradient-to-br from-yellow to-orange text-white' : 
                      idx === 1 ? 'bg-gradient-to-br from-blue to-teal text-white' : 
                      idx === 2 ? 'bg-gradient-to-br from-purple to-pink text-white' : 
                      'bg-canvas text-text'}
                  `}>
                    #{idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text text-sm truncate">{store.name}</p>
                    <p className="text-xs text-mute">{store.city}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green font-mono text-sm">${(store.revenue / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-mute">{store.transactions} sales</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <h4 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-orange" />
                Needs Attention
              </h4>
              <div className="space-y-2">
                {bottomStores.slice(0, 3).map((store, idx) => (
                  <div key={store.id} className="flex items-center justify-between p-2 bg-orange/5 rounded-lg border border-orange/20">
                    <p className="text-sm text-text font-medium truncate">{store.name}</p>
                    <p className="text-sm text-orange font-mono font-semibold">${(store.revenue / 1000).toFixed(0)}K</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Forecasting Widget */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border">
            <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue" />
              Next Month Forecast
            </h3>
            <div className="space-y-5">
              <div className="p-4 bg-gradient-to-br from-blue/10 to-teal/10 rounded-xl border border-blue/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text">Projected Revenue</span>
                  <TrendingUp className="w-5 h-5 text-blue" />
                </div>
                <p className="text-3xl font-bold text-blue font-mono mb-1">${(forecastedRevenue / 1000).toFixed(0)}K</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-mute">Current: ${(totalRevenue / 1000).toFixed(0)}K</span>
                  <span className="text-xs font-semibold text-green">+12% growth</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple/10 to-pink/10 rounded-xl border border-purple/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text">Projected Transactions</span>
                  <ShoppingCart className="w-5 h-5 text-purple" />
                </div>
                <p className="text-3xl font-bold text-purple font-mono mb-1">{Math.round(forecastedTransactions).toLocaleString()}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-mute">Current: {customerCount.toLocaleString()}</span>
                  <span className="text-xs font-semibold text-green">+8% growth</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-orange/10 to-yellow/10 rounded-xl border border-orange/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text">Seasonal Trend</span>
                  <Target className="w-5 h-5 text-orange" />
                </div>
                <p className="text-xl font-bold text-orange mb-1">Q4 Holiday Season</p>
                <p className="text-xs text-mute">Expected 25-30% increase in Electronics & Apparel</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white rounded-xl p-6 shadow-soft border border-border">
          <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity, idx) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3 p-3 bg-canvas/30 rounded-lg hover:bg-canvas/50 transition-all"
              >
                <div className={`w-10 h-10 rounded-lg bg-canvas flex items-center justify-center ${activity.color}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text font-medium">{activity.message}</p>
                  <p className="text-xs text-mute mt-0.5">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <TrendCard
            title="Revenue by Category"
            data={trendData}
            color="#2F7CFF"
          />
          
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border">
            <h3 className="text-lg font-bold text-text mb-4">Top Products by Revenue</h3>
            <div className="space-y-3">
              {topProducts.map((product, idx) => (
                <motion.div
                  key={product.productId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-3 bg-canvas/50 rounded-lg border border-border hover:border-blue/30 transition-all"
                >
                  <div>
                    <p className="font-semibold text-text text-sm">{product.name}</p>
                    <p className="text-xs text-mute">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue font-mono">${product.revenue.toLocaleString()}</p>
                    <p className="text-xs text-mute">{product.quantity} units</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        {alerts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-text mb-4">Active Alerts</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {alerts.slice(0, 4).map((alert, idx) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <AlertCard
                    alert={alert}
                    onAcknowledge={acknowledgeAlert}
                    onAssign={assignAlert}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Low Stock Table */}
        {lowStock.length > 0 && (
          <DataTable
            title="Critical & Low Stock Items"
            data={lowStock.slice(0, 10)}
            columns={[
              { key: 'productName', label: 'Product' },
              { key: 'storeName', label: 'Store' },
              { 
                key: 'quantity', 
                label: 'Quantity',
                render: (val, row) => {
                  const qty = Number(val) || 0;
                  const status = row.status as string;
                  const colorClass = status === 'critical' 
                    ? 'text-red-600' 
                    : status === 'low' 
                    ? 'text-yellow-600' 
                    : 'text-green-600';
                  return <span className={`font-mono font-bold ${colorClass}`}>{qty.toLocaleString()}</span>;
                }
              },
              { 
                key: 'status', 
                label: 'Status',
                render: (val) => {
                  const status = val as string;
                  const bgColor = status === 'critical' 
                    ? 'bg-red-100 text-red-700 border border-red-300' 
                    : status === 'low' 
                    ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' 
                    : 'bg-green-100 text-green-700 border border-green-300';
                  return (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bgColor}`}>
                      {status.toUpperCase()}
                    </span>
                  );
                }
              },
              { 
                key: 'daysOfStock', 
                label: 'Days of Stock',
                render: (val, row) => {
                  const days = Number(val) || 0;
                  const status = row.status as string;
                  const colorClass = status === 'critical' 
                    ? 'text-red-600' 
                    : status === 'low' 
                    ? 'text-yellow-600' 
                    : 'text-green-600';
                  return <span className={`font-mono font-bold ${colorClass}`}>{days.toFixed(1)}</span>;
                }
              },
            ]}
          />
        )}
      </motion.div>
    </Layout>
  );
}
