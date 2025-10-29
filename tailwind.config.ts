import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Bright Pro Theme - Primary Colors
        blue: '#2F7CFF',
        teal: '#10D2C2',
        purple: '#6C5CE7',
        pink: '#F56FAE',
        orange: '#F58B3A',
        green: '#2ECC71',
        yellow: '#F6B93B',
        navy: '#1A237E',
        
        // Modern Gradient Sidebar Colors
        indigo: '#6366F1',
        violet: '#8B5CF6',
        hotpink: '#EC4899',
        lavender: '#C084FC',
        offwhite: '#F9FAFB',
        lightgray: '#F3F4F6',
        
        // Surface Colors
        canvas: '#F6F7FB',
        surface: '#FFFFFF',
        
        // Text Colors
        text: '#0B1020',
        mute: '#7A8596',
        border: '#E5E8EE',
        
        // Legacy colors (for gradual migration)
        blackish: '#292421',
        copper: '#B87333',
        tan: '#D2B48C',
        blush: '#E6B7A9',
        vanilla: '#F8E5C2',
        greenish: '#7BB661',
        mint: '#A8E6CF',
      },
      boxShadow: {
        soft: '0 8px 20px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 12px 32px rgba(0, 0, 0, 0.08)',
        copper: '0 0 18px rgba(184,115,51,0.25)',
      },
      borderRadius: {
        xl: '20px',
        '2xl': '24px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-blue-teal': 'linear-gradient(135deg, #2F7CFF 0%, #10D2C2 100%)',
        'gradient-navy-purple': 'linear-gradient(180deg, #1A237E 0%, #6C5CE7 100%)',
        'gradient-indigo-pink': 'linear-gradient(180deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
        'gradient-purple-blue': 'linear-gradient(180deg, #6C5CE7 0%, #2F7CFF 100%)',
        'gradient-pink-purple': 'linear-gradient(135deg, #F56FAE 0%, #6C5CE7 100%)',
        'gradient-orange-yellow': 'linear-gradient(135deg, #F58B3A 0%, #F6B93B 100%)',
        'gradient-multi': 'linear-gradient(90deg, #2F7CFF 0%, #10D2C2 50%, #6C5CE7 100%)',
      },
    },
  },
  plugins: [],
}
export default config
