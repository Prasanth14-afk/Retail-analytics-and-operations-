#  HyperRetail - Management Suite

A comprehensive hypermarket analytics and management platform built with **Next.js 14**, featuring **12,636+ mock records**, a premium **Black-Copper design system**, and **4K-ready** visualizations.

##  Features

###  **Data-Driven Analytics**
- **12,636 total records** generated locally (no API calls)
- 120 Suppliers with delivery details, locations, and ratings
- 500 Stores across multiple regions
- 1,500 Products with supplier information
- 800 Customers with loyalty tiers
- 200 Employees with performance tracking
- 2,000 Sales transactions
- 6,816 Inventory records
- Real-time KPIs, trends, and alerts

###  **Premium Design System**
- **Brand Palette**: Black (#292421), Copper (#B87333), Pink (#F2B8C6), Tan (#D2B48C), Blush (#E6B7A9), Vanilla (#F8E5C2), Green (#7BB661), Mint (#A8E6CF)
- **Typography**: Inter (UI) + IBM Plex Mono (numbers)
- **4K-Optimized**: Crystal-clear at 3840×2160
- **Smooth Animations**: Framer Motion with reduced-motion support

###  **Navigation**
Redesigned sidebar with:
- Collapsible design (280px → 72px)
- Active/hover/focus states with copper accents
- Profile card with role and store info
- 11 department and operational pages

###  **Pages & Features**

#### **Executive Dashboard** (`/`)
- KPI grid: Revenue, Items Sold, Avg Basket, Stock Health
- Revenue trends by category
- Top products by revenue
- Active alerts (low stock, sales dips, high returns)
- Critical & low stock items table

#### **Department Pages**
- **Grocery** (`/grocery`) - Dry goods, snacks, canned foods
- **Fresh Produce** (`/fresh-produce`) - Fruits, vegetables, organic
- **Electronics** (`/electronics`) - Mobile, computers, audio, appliances
- **Apparel & Fashion** (`/apparel`) - Men's, women's, kids, footwear
- **Pharmacy** (`/pharmacy`) - OTC, prescriptions, vitamins
- **Bakery** (`/bakery`) - Bread, cakes, pastries

Each department shows:
- Department-specific KPIs
- 14-day revenue trends
- Sub-category breakdowns
- Key performance metrics

#### **Operational Pages**
- **Inventory** (`/inventory`) - Stock levels, status tracking, supplier information with delivery categories, locations, lead times
- **Employees** (`/employees`) - Directory, performance tracking, department distribution
- **Analytics** (`/analytics`) - Advanced visualizations (bar charts, pie charts, ROAS analysis)
- **Settings** (`/settings`) - Theme preview, system info, data overview

###  **Technology Stack**

**Frontend Framework**
- Next.js 14 (App Router)
- React 18
- TypeScript

**Styling & Animation**
- Tailwind CSS with custom theme
- Framer Motion for animations
- Custom CSS variables

**Charts & Visualization**
- Recharts (line, area, bar, pie charts)
- Custom components (KpiTile, TrendCard, DataTable)

**State Management**
- Zustand for global state
- Custom selectors for derived data
- Local JSON data loading

**Data Generation**
- @faker-js/faker for realistic mock data
- Zod for schema validation
- Deterministic seed (42) for reproducibility

###  **Supplier Integration**

Every product is linked to a supplier with detailed information:
- Supplier name and ID
- Location and country
- Delivery categories (what they supply)
- Delivery frequency (daily, weekly, bi-weekly, monthly)
- Lead time in days
- Minimum order value
- Rating (out of 5.0)
- Contact person, email, and phone

**View supplier data:**
- Inventory page shows supplier for each product
- Supplier cards display all delivery details
- Export functionality includes supplier information

##  Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone or navigate to the project
cd RetailHub

# Install dependencies
npm install

# Generate mock data (already done, but you can regenerate)
npm run generate-data

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
RetailHub/
├── app/                    # Next.js 14 App Router
│   ├── page.tsx           # Executive Dashboard
│   ├── grocery/page.tsx   # Grocery Department
│   ├── inventory/page.tsx # Inventory Management
│   ├── employees/page.tsx # Employee Directory
│   ├── analytics/page.tsx # Advanced Analytics
│   ├── settings/page.tsx  # Settings & Theme
│   └── ...                # Other department pages
├── components/            # Reusable UI components
│   ├── Sidebar.tsx       # Navigation sidebar
│   ├── KpiTile.tsx       # KPI display card
│   ├── TrendCard.tsx     # Trend chart card
│   ├── DataTable.tsx     # Data table with export
│   ├── AlertCard.tsx     # Alert display
│   └── Layout.tsx        # App layout wrapper
├── lib/                   # Core logic
│   ├── types.ts          # TypeScript interfaces
│   ├── store.ts          # Zustand state management
│   ├── selectors.ts      # Data selectors
│   └── navigation.ts     # Nav configuration
├── data/                  # Mock data
│   ├── mockData.json     # Combined dataset (12,636 records)
│   └── mock/             # Individual entity files
│       ├── suppliers.json
│       ├── stores.json
│       ├── products.json
│       └── ...
├── scripts/
│   └── generateMockData.ts # Data generation script
├── app/styles/
│   └── theme.css         # CSS variables
└── tailwind.config.ts    # Tailwind configuration
```

##  Key Features

### **No API Calls**
All data is loaded from local JSON files. The app works completely offline after initial load.

### **Supplier Tracking**
Each product links to a supplier with:
- Delivery categories (what they supply)
- Location and contact info
- Lead times and minimum orders
- Quality ratings

### **4K Ready**
All components are optimized for high-DPI displays:
- Sharp typography at any size
- Vector-based charts scale perfectly
- Consistent spacing and sizing

### **Accessibility**
- WCAG AA contrast ratios
- Keyboard navigation support
- Focus indicators
- Reduced motion support
- ARIA labels where needed

### **Performance**
- Code splitting per route
- Lazy loading for heavy components
- Optimized bundle size
- Fast local data loading

##  Data Overview

| Entity | Count | Description |
|--------|-------|-------------|
| **Suppliers** | 120 | Suppliers with delivery details, locations, ratings |
| **Stores** | 500 | Retail locations across regions |
| **Products** | 1,500 | Items with supplier links |
| **Customers** | 800 | Customer profiles with loyalty tiers |
| **Employees** | 200 | Staff with roles and performance |
| **Sales** | 2,000 | Transaction records |
| **Inventory** | 6,816 | Stock levels per store/product |
| **Returns** | 150 | Return records with reasons |
| **Footfall** | 300 | Visitor and conversion data |
| **Marketing** | 150 | Campaign performance |
| **Finance** | 100 | Daily financial records |
| **TOTAL** | **12,636** | Total records |

##  Design Tokens

```css
--clr-black:   #292421  /* Base bg, primary text */
--clr-copper:  #B87333  /* Primary accent, buttons */
--clr-pink:    #F2B8C6  /* Secondary highlight */
--clr-tan:     #D2B48C  /* Surfaces, borders */
--clr-blush:   #E6B7A9  /* Hover states */
--clr-vanilla: #F8E5C2  /* Cards, panels */
--clr-green:   #7BB661  /* Success, positive */
--clr-mint:    #A8E6CF  /* Info, neutral */
```

## 🛠️ Customization

### Regenerate Data
```bash
npm run generate-data
```

### Modify Color Palette
Edit `tailwind.config.ts` and `app/styles/theme.css`

### Add New Pages
1. Create page in `app/[route]/page.tsx`
2. Add to navigation in `lib/navigation.ts`
3. Use Layout and components from `components/`

##  Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run generate-data # Regenerate mock data
```

## 🌟 Highlights

 **12,636+ mock records** - No APIs, all local  
 **120 suppliers** with delivery categories, locations, and details  
 **Black-Copper theme** - Premium, professional design  
 **4K-optimized** - Crystal clear at any resolution  
 **Smooth animations** - Framer Motion throughout  
 **Full TypeScript** - Type-safe codebase  
 **11 pages** - Departments, operations, analytics  
 **Collapsible sidebar** - Space-efficient navigation  
 **Export functionality** - CSV export for tables  
 **Accessibility** - WCAG AA compliant  

##  License

This project is for demonstration and educational purposes.

##  Support

For issues or questions, please review the code structure and documentation above.

---

**Built with  using Next.js 14, React 18, Tailwind CSS, Framer Motion, and Recharts**
