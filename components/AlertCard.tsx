'use client';

import { motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, Info, CheckCircle, X } from 'lucide-react';
import type { Alert } from '@/lib/types';

interface AlertCardProps {
  alert: Alert;
  onAcknowledge: (id: string) => void;
  onAssign: (id: string, assignee: string) => void;
}

export default function AlertCard({ alert, onAcknowledge, onAssign }: AlertCardProps) {
  const getSeverityStyles = () => {
    switch (alert.severity) {
      case 'critical':
        return 'bg-red-50 border-red-500 text-red-700';
      case 'high':
        return 'bg-copper/10 border-copper text-copper';
      case 'medium':
        return 'bg-tan/20 border-tan text-blackish';
      default:
        return 'bg-mint/10 border-mint text-greenish';
    }
  };

  const getIcon = () => {
    switch (alert.severity) {
      case 'critical':
        return <AlertCircle size={20} />;
      case 'high':
        return <AlertTriangle size={20} />;
      case 'medium':
        return <Info size={20} />;
      default:
        return <CheckCircle size={20} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`rounded-xl p-4 border-2 ${getSeverityStyles()} ${alert.acknowledged ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-semibold text-sm">{alert.title}</h4>
              <p className="text-xs opacity-80 mt-1">{alert.message}</p>
            </div>
            
            {!alert.acknowledged && (
              <button
                onClick={() => onAcknowledge(alert.id)}
                className="shrink-0 p-1 hover:bg-blackish/10 rounded transition-colors"
                aria-label="Acknowledge alert"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-xs mt-3">
            <span className="opacity-60">
              {new Date(alert.timestamp).toLocaleString()}
            </span>
            
            {alert.storeId && (
              <span className="px-2 py-0.5 bg-blackish/10 rounded">
                {alert.storeId}
              </span>
            )}
            
            {alert.acknowledged && (
              <span className="text-greenish font-medium">✓ Acknowledged</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
