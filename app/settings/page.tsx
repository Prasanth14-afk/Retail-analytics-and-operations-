'use client';

import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useStore } from '@/lib/store';

export default function SettingsPage() {
  const { data } = useStore();

  const colorTokens = [
    { name: 'Black', hex: '#292421', var: '--clr-black' },
    { name: 'Copper', hex: '#B87333', var: '--clr-copper' },
    { name: 'Pink', hex: '#F2B8C6', var: '--clr-pink' },
    { name: 'Tan', hex: '#D2B48C', var: '--clr-tan' },
    { name: 'Blush', hex: '#E6B7A9', var: '--clr-blush' },
    { name: 'Vanilla', hex: '#F8E5C2', var: '--clr-vanilla' },
    { name: 'Green', hex: '#7BB661', var: '--clr-green' },
    { name: 'Mint', hex: '#A8E6CF', var: '--clr-mint' },
  ];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
                <div className="mb-8">
          <h1 className="text-4xl font-bold text-text mb-2">Settings</h1>
          <p className="text-text/60">System preferences and configuration</p>
        </div>

        {/* Theme Tokens */}
        <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
          <h3 className="text-lg font-semibold text-text mb-4">🎨 Brand Color Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colorTokens.map((token, idx) => (
              <motion.div
                key={token.hex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 bg-white rounded-xl border border-border/20"
              >
                <div
                  className="w-full h-16 rounded-lg mb-3 shadow-soft border border-blackish/10"
                  style={{ backgroundColor: token.hex }}
                />
                <p className="font-semibold text-text text-sm">{token.name}</p>
                <p className="text-xs text-text/60 font-mono mt-1">{token.hex}</p>
                <p className="text-xs text-text/40 font-mono">{token.var}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
          <h3 className="text-lg font-semibold text-text mb-4">✍️ Typography</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-text/60 mb-2">Display Font: Inter</p>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-text">The quick brown fox</p>
                <p className="text-2xl font-semibold text-text">jumps over the lazy dog</p>
                <p className="text-lg font-medium text-text">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p className="text-base text-text">abcdefghijklmnopqrstuvwxyz 0123456789</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-text/60 mb-2">Monospace Font: IBM Plex Mono</p>
              <div className="space-y-2 font-mono">
                <p className="text-2xl font-bold text-blue">$123,456.78</p>
                <p className="text-lg font-semibold text-greenish">+45.67% ↑</p>
                <p className="text-base text-text">0123456789 .,;:!?</p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Info */}
        {data && (
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
            <h3 className="text-lg font-semibold text-text mb-4">Data Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text/60">Dataset Version:</span>
                <span className="font-mono font-semibold text-blue">{data.metadata.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text/60">Generated:</span>
                <span className="font-mono text-text">
                  {new Date(data.metadata.generated).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text/60">Total Records:</span>
                <span className="font-mono font-bold text-blue">{data.metadata.totalRecords.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-greenish/10 border border-greenish rounded-lg">
              <p className="text-sm text-text">
                ✅ <strong>Mock Data Loaded Successfully</strong> - All {data.metadata.totalRecords} records are available locally. No API calls required.
              </p>
            </div>
          </div>
        )}

        {/* System Info */}
        <div className="bg-white rounded-xl p-6 shadow-soft border border-border/20">
          <h3 className="text-lg font-semibold text-text mb-4">💻 System Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text/60 mb-2">Framework</p>
              <ul className="space-y-1 text-sm text-text">
                <li>• Next.js 14</li>
                <li>• React 18</li>
                <li>• TypeScript</li>
              </ul>
            </div>
            <div>
              <p className="text-xs text-text/60 mb-2">Styling & Animation</p>
              <ul className="space-y-1 text-sm text-text">
                <li>• Tailwind CSS</li>
                <li>• Framer Motion</li>
                <li>• Custom Theme System</li>
              </ul>
            </div>
            <div>
              <p className="text-xs text-text/60 mb-2">Charts & Visualization</p>
              <ul className="space-y-1 text-sm text-text">
                <li>• Recharts</li>
                <li>• Custom Components</li>
              </ul>
            </div>
            <div>
              <p className="text-xs text-text/60 mb-2">State Management</p>
              <ul className="space-y-1 text-sm text-text">
                <li>• Zustand</li>
                <li>• Local JSON Data</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4K Notice */}
        <div className="bg-gradient-to-r from-copper/10 to-blush/10 border-2 border-copper/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🖥️</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">4K Resolution Ready</h3>
              <p className="text-sm text-text/80">
                This application is optimized for 4K displays (3840×2160). All typography, charts, 
                and UI elements are rendered with high pixel density for maximum clarity.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
