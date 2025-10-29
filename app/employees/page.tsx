'use client';

import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import DataTable from '@/components/DataTable';
import { useStore } from '@/lib/store';
import { Award, TrendingUp, Users } from 'lucide-react';

export default function EmployeesPage() {
  const { data } = useStore();
  
  if (!data) return <Layout><div>Loading...</div></Layout>;

  const employees = data.employees.map(emp => {
    const store = data.stores.find(s => s.id === emp.storeId);
    return {
      ...emp,
      storeName: store?.name || 'Unknown',
      city: store?.city || 'Unknown',
    };
  });

  const avgSalary = employees.reduce((sum, e) => sum + e.salary, 0) / employees.length;
  const avgPerformance = employees.reduce((sum, e) => sum + e.performance, 0) / employees.length;

  // Staff by department
  const departmentData = Array.from(new Set(employees.map(e => e.department))).map(dept => {
    const deptEmployees = employees.filter(e => e.department === dept);
    const avgPerf = deptEmployees.reduce((sum, e) => sum + e.performance, 0) / deptEmployees.length;
    return {
      department: dept,
      count: deptEmployees.length,
      avgPerformance: avgPerf,
    };
  }).sort((a, b) => b.count - a.count);

  // Top performers this month (top 8 by performance)
  const topPerformers = [...employees]
    .sort((a, b) => b.performance - a.performance)
    .slice(0, 8);

  // Department colors
  const departmentColors: { [key: string]: string } = {
    'Grocery': '#2F7CFF',
    'Fresh Produce': '#10D2C2',
    'Electronics': '#6C5CE7',
    'Apparel': '#F56FAE',
    'Pharmacy': '#2ECC71',
    'Bakery': '#F58B3A',
    'Management': '#F6B93B',
    'Customer Service': '#A29BFE',
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        <div className="mb-2">
          <h1 className="text-4xl font-bold text-text mb-2">Employee Management</h1>
          <p className="text-mute">Workforce analytics and performance tracking</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="bg-white rounded-xl p-4 border border-border shadow-soft">
            <p className="text-sm text-mute mb-1">Total Employees</p>
            <p className="text-3xl font-bold text-blue font-mono">{employees.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border shadow-soft">
            <p className="text-sm text-mute mb-1">Avg Salary</p>
            <p className="text-3xl font-bold text-blue font-mono">${Math.round(avgSalary).toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border shadow-soft">
            <p className="text-sm text-mute mb-1">Avg Performance</p>
            <p className="text-3xl font-bold text-green font-mono">{avgPerformance.toFixed(1)}/5.0</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border shadow-soft">
            <p className="text-sm text-mute mb-1">Departments</p>
            <p className="text-3xl font-bold text-text font-mono">{new Set(employees.map(e => e.department)).size}</p>
          </div>
        </div>

        {/* Staff by Department & Top Performers */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {/* Staff by Department List */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text">Staff by Department</h3>
                <p className="text-xs text-mute">Employee distribution across departments</p>
              </div>
            </div>
            <div className="space-y-3">
              {departmentData.map((dept, idx) => (
                <motion.div
                  key={dept.department}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-4 bg-canvas/50 rounded-xl border border-border hover:border-blue/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: departmentColors[dept.department] || '#2F7CFF' }}
                    />
                    <span className="font-semibold text-text">{dept.department}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-blue font-mono">{dept.count}</span>
                    <span className="text-sm text-mute">employees</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Top Performers This Month */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow to-orange flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text">Top Performers This Month</h3>
                <p className="text-xs text-mute">Highest rated employees by performance</p>
              </div>
            </div>
            <div className="space-y-3">
              {topPerformers.map((employee, idx) => (
                <motion.div
                  key={employee.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-4 p-4 bg-canvas/50 rounded-xl border border-border hover:border-blue/30 transition-all group"
                >
                  {/* Rank Badge */}
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0
                    ${idx === 0 ? 'bg-gradient-to-br from-yellow to-orange text-white' : 
                      idx === 1 ? 'bg-gradient-to-br from-blue to-teal text-white' : 
                      idx === 2 ? 'bg-gradient-to-br from-purple to-pink text-white' : 
                      'bg-canvas text-text'}
                  `}>
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                  </div>

                  {/* Employee Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text text-sm truncate">{employee.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-mute truncate">{employee.role}</p>
                      <span className="text-xs text-mute">•</span>
                      <p className="text-xs text-blue font-medium">{employee.department}</p>
                    </div>
                  </div>

                  {/* Performance Score */}
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green" />
                      <span className="text-lg font-bold text-green font-mono">{employee.performance.toFixed(1)}</span>
                    </div>
                    <p className="text-xs text-mute">Performance</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Employee Table */}
        <DataTable
          title="Employee Directory"
          data={employees}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'role', label: 'Role' },
            { key: 'department', label: 'Department' },
            { key: 'storeName', label: 'Store' },
            { key: 'city', label: 'City' },
            { 
              key: 'salary', 
              label: 'Salary',
              render: (val) => <span className="font-mono">${val.toLocaleString()}</span>
            },
            { 
              key: 'performance', 
              label: 'Performance',
              render: (val) => (
                <span className={`font-bold ${val >= 4 ? 'text-green' : val >= 3 ? 'text-blue' : 'text-pink'}`}>
                  {val.toFixed(1)}
                </span>
              )
            },
            { key: 'hireDate', label: 'Hire Date' },
          ]}
          onExport={() => {
            const csv = [
              ['Name', 'Role', 'Department', 'Store', 'City', 'Salary', 'Performance', 'Hire Date', 'Email'],
              ...employees.map(e => [
                e.name, e.role, e.department, e.storeName, e.city, 
                e.salary, e.performance, e.hireDate, e.email
              ])
            ].map(row => row.join(',')).join('\n');
            
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'employees.csv';
            a.click();
          }}
        />
      </motion.div>
    </Layout>
  );
}
