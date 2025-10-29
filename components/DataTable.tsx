'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface DataRow {
  [key: string]: any;
}

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: DataRow) => React.ReactNode;
}

interface DataTableProps {
  data: DataRow[];
  columns: Column[];
  title?: string;
  onExport?: () => void;
}

export default function DataTable({ data, columns, title, onExport }: DataTableProps) {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const rowsPerPage = 10;

  const filtered = data.filter(row => 
    Object.values(row).some(val => 
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const paginatedData = filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white rounded-xl shadow-soft border border-border overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-border flex items-center justify-between bg-canvas">
        {title && (
          <motion.h3 
            className="text-xl font-bold text-text"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h3>
        )}
        
        <motion.div 
          className="flex items-center gap-3"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-white text-sm text-text focus:outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-all duration-200 shadow-sm hover:shadow"
          />
          
          {onExport && (
            <motion.button
              onClick={onExport}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-blue text-white rounded-lg text-sm font-semibold hover:bg-blue/90 transition-all duration-200 shadow-sm hover:shadow-soft"
            >
              Export CSV
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-canvas">
            <tr>
              {columns.map((col, idx) => (
                <motion.th 
                  key={col.key}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-6 py-4 text-left text-xs font-bold text-mute uppercase tracking-wider"
                >
                  {col.label}
                </motion.th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData.map((row, idx) => (
              <motion.tr
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                whileHover={{ 
                  backgroundColor: '#F6F7FB',
                  scale: 1.002
                }}
                className="transition-all duration-150 bg-white even:bg-canvas/30"
              >
                {columns.map(col => (
                  <td key={col.key} className="px-6 py-4 text-sm text-text font-medium">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-border flex items-center justify-between bg-canvas">
        <motion.p 
          className="text-sm text-mute font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filtered.length)} of {filtered.length} results
        </motion.p>
        
        <motion.div 
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg border border-border text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue hover:text-white hover:border-blue transition-all duration-200 bg-white text-text shadow-sm"
          >
            Previous
          </motion.button>
          <motion.button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg border border-border text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue hover:text-white hover:border-blue transition-all duration-200 bg-white text-text shadow-sm"
          >
            Next
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
