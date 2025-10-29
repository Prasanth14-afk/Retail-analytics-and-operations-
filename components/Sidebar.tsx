'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { NAV_ITEMS, NAV_GROUPS } from '@/lib/navigation';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -16, opacity: 0 }}
      animate={{ 
        x: 0, 
        opacity: 1,
        width: collapsed ? '4.5rem' : '18rem'
      }}
      transition={{ duration: 0.2 }}
      style={{
        background: 'linear-gradient(180deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)'
      }}
      className="fixed left-0 top-0 h-screen text-white border-r border-white/10 z-50 flex flex-col shadow-soft-lg"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-white to-white/90 flex items-center justify-center shadow-soft-lg">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 3L21 7.5V16.5L14 21L7 16.5V7.5L14 3Z" fill="url(#logo-gradient)" stroke="url(#logo-gradient-stroke)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="14" cy="12" r="3.5" fill="white"/>
                  <defs>
                    <linearGradient id="logo-gradient" x1="7" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2F7CFF"/>
                      <stop offset="1" stopColor="#10D2C2"/>
                    </linearGradient>
                    <linearGradient id="logo-gradient-stroke" x1="7" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6C5CE7"/>
                      <stop offset="1" stopColor="#2F7CFF"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">PulseRetail</h1>
                <p className="text-xs text-white/70 mt-0.5 font-medium">Analytics Hub</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex justify-center"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-white to-white/90 flex items-center justify-center shadow-soft-lg">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 3L21 7.5V16.5L14 21L7 16.5V7.5L14 3Z" fill="url(#logo-gradient)" stroke="url(#logo-gradient-stroke)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="14" cy="12" r="3.5" fill="white"/>
                  <defs>
                    <linearGradient id="logo-gradient" x1="7" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2F7CFF"/>
                      <stop offset="1" stopColor="#10D2C2"/>
                    </linearGradient>
                    <linearGradient id="logo-gradient-stroke" x1="7" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6C5CE7"/>
                      <stop offset="1" stopColor="#2F7CFF"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {NAV_GROUPS.map((group, groupIdx) => {
          const groupItems = NAV_ITEMS.filter(item => item.group === group);
          
          return (
            <div key={group} className={groupIdx > 0 ? 'mt-6' : ''}>
              {!collapsed && (
                <div className="px-3 mb-2">
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                    {group}
                  </p>
                </div>
              )}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.03 }}
                className="space-y-1"
              >
                {groupItems.map((item, idx) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                    >
                      <Link
                        href={item.href}
                        className={`
                          group relative flex items-center gap-3 px-4 py-2.5 rounded-xl
                          transition-all duration-200
                          ${isActive 
                            ? 'bg-white/95 text-indigo shadow-soft' 
                            : 'text-offwhite hover:bg-lavender/20 hover:text-white hover:shadow-lg'
                          }
                          ${collapsed ? 'justify-center' : ''}
                        `}
                      >
                        {/* Active indicator pill background */}
                        {isActive && !collapsed && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute inset-0 bg-white/95 rounded-xl"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                        
                        {/* Icon */}
                        <motion.div
                          whileHover={{ scale: 1.08, rotate: isActive ? 0 : 5 }}
                          className={`
                            shrink-0 relative z-10
                            ${isActive 
                              ? 'text-indigo' 
                              : 'text-offwhite group-hover:text-white'
                            }
                          `}
                        >
                          <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                        </motion.div>
                        
                        {/* Label */}
                        <AnimatePresence mode="wait">
                          {!collapsed && (
                            <motion.span
                              key="label"
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: 'auto' }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.15 }}
                              className={`
                                text-sm font-semibold whitespace-nowrap overflow-hidden relative z-10
                                ${isActive ? 'text-indigo' : 'text-lightgray'}
                              `}
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          );
        })}
      </nav>

      {/* Footer - Profile Card */}
      <div className="p-3 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              key="profile-expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/95 text-text rounded-xl p-3 mb-2 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold shadow-sm"
                  style={{
                    background: 'linear-gradient(180deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)'
                  }}
                >
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">John Doe</p>
                  <p className="text-xs text-mute truncate">Regional Manager</p>
                  <p className="text-xs text-indigo font-medium truncate">Store ST0001</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="profile-collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center mb-2"
            >
              <div className="w-10 h-10 rounded-full bg-white text-blue flex items-center justify-center shadow-soft">
                <User size={20} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-xl hover:bg-lavender/20 transition-colors text-offwhite hover:text-white"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <motion.div
            animate={{ rotate: collapsed ? 0 : 180 }}
            transition={{ duration: 0.2 }}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </motion.div>
        </button>
      </div>
    </motion.aside>
  );
}
