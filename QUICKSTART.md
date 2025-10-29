# 🚀 HyperRetail - Quick Start Guide

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js) or **pnpm**
- A code editor (VS Code recommended)
- A modern browser (Chrome, Firefox, Safari, Edge)

## ⚡ 5-Minute Setup

### Step 1: Navigate to Project
```bash
cd /Users/prasanthkumar/Desktop/RetailHub
```

### Step 2: Install Dependencies (if not done)
```bash
npm install
```
*This installs Next.js, React, Tailwind, Framer Motion, Recharts, Zustand, and more.*

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Navigate to **http://localhost:3000**

**That's it! 🎉** Your HyperRetail application is now running!

## 🗺️ Navigating the Application

### Main Pages

1. **Executive Dashboard** (`/`) - Start here
   - Overview of all KPIs
   - Revenue trends
   - Top products
   - Active alerts

2. **Department Pages**
   - `/grocery` - Grocery department analytics
   - `/fresh-produce` - Fresh produce metrics
   - `/electronics` - Electronics sales
   - `/apparel` - Apparel & fashion
   - `/pharmacy` - Pharmacy operations
   - `/bakery` - Bakery performance

3. **Operational Pages**
   - `/inventory` - **Stock levels + Supplier details** ⭐
   - `/employees` - Employee directory
   - `/analytics` - Advanced visualizations
   - `/settings` - Theme & system info

### 🔍 Finding Supplier Information

**Where to see supplier details:**

1. Go to **Inventory** page (`/inventory`)
2. Look at the data table columns:
   - **Supplier** - Supplier name
   - **Supplier Location** - City where supplier is located
   - **Lead Time** - Days to delivery

3. Scroll down to **Supplier Information** section
4. View supplier cards showing:
   - Supplier name and location
   - Delivery frequency (daily/weekly/bi-weekly/monthly)
   - Lead time in days
   - Delivery categories (what they supply)
   - Rating (out of 5.0)

## 🎯 Key Features to Try

### 1. Check KPIs
- View real-time metrics on dashboard
- Notice sparklines showing trends
- See up/down arrows with % changes

### 2. Explore Departments
- Click any department in sidebar
- View department-specific KPIs
- Check 14-day revenue trends

### 3. View Inventory
- Go to Inventory page
- See status badges (Healthy, Low, Critical, Overstock)
- View supplier information for each product
- Export to CSV

### 4. Search & Filter
- Use search box in data tables
- Filter results in real-time
- Navigate with pagination

### 5. Export Data
- Click "Export CSV" button on tables
- Download employee or inventory data
- Open in Excel or Google Sheets

### 6. Test Responsiveness
- Resize your browser window
- Collapse the sidebar (button at bottom)
- Try on different screen sizes

## 📊 Understanding the Data

### Data Volume
- **12,636 total records** loaded locally
- **120 suppliers** with complete details
- **No API calls** - everything is local

### Supplier Data Includes
- ✅ Company name and ID
- ✅ Location (city) and country
- ✅ Delivery categories (what they supply)
- ✅ Delivery frequency (how often they deliver)
- ✅ Lead time (days until delivery)
- ✅ Minimum order value
- ✅ Quality rating (1-5 stars)
- ✅ Contact person, email, phone

### Product-Supplier Links
Every product in inventory shows:
- Which supplier provides it
- Where the supplier is located
- How long delivery takes

## 🎨 Customizing

### Regenerate Data
Want fresh data with different values?
```bash
npm run generate-data
```
This creates new mock data with the same structure.

### Change Colors
Edit `tailwind.config.ts` and `app/styles/theme.css`:
```css
--clr-copper: #B87333  /* Change this to your color */
```

### Add New Pages
1. Create `app/my-page/page.tsx`
2. Add to `lib/navigation.ts`
3. Create component and import Layout

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run generate-data` | Regenerate mock data |

## 🔍 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Data Not Loading
Check that `data/mockData.json` exists:
```bash
ls -la data/mockData.json
```

If missing, regenerate:
```bash
npm run generate-data
```

### Styles Not Applying
Clear Next.js cache:
```bash
rm -rf .next
npm run dev
```

## 📱 Mobile/Tablet Testing

### Test on Different Devices
1. Open Chrome DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Select device from dropdown
4. Test navigation and responsiveness

### Sidebar on Mobile
- Sidebar becomes a slide-in drawer
- Click hamburger menu to open
- Click outside to close

## 🎯 Tips for Best Experience

### For 4K Displays
- Use Chrome or Edge for best rendering
- Enable hardware acceleration
- Zoom to 100% for pixel-perfect clarity

### For Presentations
1. Start on Executive Dashboard
2. Show KPIs and trends
3. Navigate to Inventory page
4. Demonstrate supplier information
5. Show department analytics
6. End on Analytics page

### For Development
1. Keep terminal open to see build logs
2. Changes auto-reload in browser
3. Check console for any errors
4. Use React DevTools for debugging

## 📚 Learning Resources

### Project Structure
```
app/          → Pages (Next.js App Router)
components/   → Reusable UI components
lib/          → Logic, types, state
data/         → Mock data (12,636 records)
scripts/      → Data generation
```

### Key Files
- `app/page.tsx` - Executive Dashboard
- `components/Sidebar.tsx` - Navigation
- `lib/store.ts` - Global state
- `data/mockData.json` - All data

## 🎓 Next Steps

1. ✅ Explore all 11 pages
2. ✅ Check out supplier details in inventory
3. ✅ Export some data to CSV
4. ✅ Test on different screen sizes
5. ✅ Review the code structure
6. ✅ Read the full README.md
7. ✅ Check DESIGN_SYSTEM.md for styling guide
8. ✅ Review FEATURES.md for complete feature list

## 💡 Pro Tips

### Keyboard Shortcuts
- `Tab` - Navigate forward
- `Shift+Tab` - Navigate backward
- `Ctrl+/` - Focus search (in tables)
- `Esc` - Close modals/dropdowns

### Performance
- Data loads once at startup
- All operations are client-side
- No network latency
- Instant filtering and search

### Data Integrity
- All data is validated with Zod
- Relationships are maintained
- Dates are realistic
- Numbers follow real-world patterns

## 🚀 Production Deployment

Ready to deploy?

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Deploy to Vercel (recommended)
npm i -g vercel
vercel
```

## 📞 Support

Need help?
1. Check this guide
2. Read README.md
3. Review code comments
4. Check console for errors
5. Verify data files exist

---

**Enjoy exploring HyperRetail! 🛒✨**

Built with Next.js 14, React 18, Tailwind CSS, and ❤️
