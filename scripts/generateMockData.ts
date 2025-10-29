import { faker } from '@faker-js/faker';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';

// Set seed for reproducibility
faker.seed(42);

// Schemas
const StoreSchema = z.object({
  id: z.string(),
  name: z.string(),
  region: z.string(),
  city: z.string(),
  address: z.string(),
  sqft: z.number(),
  openDate: z.string(),
  manager: z.string(),
  status: z.enum(['active', 'maintenance', 'closed']),
  lat: z.number(),
  lng: z.number(),
});

const ProductSchema = z.object({
  id: z.string(),
  sku: z.string(),
  name: z.string(),
  category: z.string(),
  subCategory: z.string(),
  brand: z.string(),
  unitPrice: z.number(),
  costPrice: z.number(),
  supplierId: z.string(),
  weight: z.number().optional(),
  perishable: z.boolean(),
});

const SupplierSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  country: z.string(),
  deliveryCategories: z.array(z.string()),
  deliveryFrequency: z.enum(['daily', 'weekly', 'bi-weekly', 'monthly']),
  leadTimeDays: z.number(),
  minOrderValue: z.number(),
  rating: z.number(),
  contactPerson: z.string(),
  email: z.string(),
  phone: z.string(),
});

const CustomerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  loyaltyTier: z.enum(['bronze', 'silver', 'gold', 'platinum']),
  joinDate: z.string(),
  totalSpend: z.number(),
  visitCount: z.number(),
  lastVisit: z.string(),
  region: z.string(),
  preferredStore: z.string(),
});

const EmployeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  department: z.string(),
  storeId: z.string(),
  hireDate: z.string(),
  salary: z.number(),
  performance: z.number(),
  email: z.string(),
});

const SalesSchema = z.object({
  id: z.string(),
  transactionDate: z.string(),
  storeId: z.string(),
  productId: z.string(),
  customerId: z.string().optional(),
  quantity: z.number(),
  unitPrice: z.number(),
  discount: z.number(),
  total: z.number(),
  paymentMethod: z.enum(['cash', 'card', 'mobile', 'voucher']),
  promotionId: z.string().optional(),
});

const InventorySchema = z.object({
  id: z.string(),
  storeId: z.string(),
  productId: z.string(),
  quantity: z.number(),
  reorderLevel: z.number(),
  lastRestocked: z.string(),
  daysOfStock: z.number(),
  status: z.enum(['healthy', 'low', 'critical', 'overstock']),
});

const ReturnSchema = z.object({
  id: z.string(),
  saleId: z.string(),
  returnDate: z.string(),
  reason: z.string(),
  refundAmount: z.number(),
  condition: z.enum(['defective', 'unopened', 'damaged', 'expired']),
});

const FootfallSchema = z.object({
  id: z.string(),
  storeId: z.string(),
  date: z.string(),
  hour: z.number(),
  visitors: z.number(),
  conversions: z.number(),
});

const MarketingSchema = z.object({
  id: z.string(),
  campaignName: z.string(),
  channel: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  spend: z.number(),
  impressions: z.number(),
  clicks: z.number(),
  conversions: z.number(),
  revenue: z.number(),
});

const FinanceSchema = z.object({
  id: z.string(),
  date: z.string(),
  revenue: z.number(),
  cogs: z.number(),
  operatingExpenses: z.number(),
  profit: z.number(),
  margin: z.number(),
});

// Categories
const CATEGORIES = [
  { name: 'Grocery', subs: ['Dry Goods', 'Canned Foods', 'Condiments', 'Snacks'] },
  { name: 'Fresh Produce', subs: ['Fruits', 'Vegetables', 'Herbs', 'Organic'] },
  { name: 'Electronics', subs: ['Mobile', 'Computers', 'Audio', 'Appliances'] },
  { name: 'Apparel', subs: ['Mens', 'Womens', 'Kids', 'Footwear'] },
  { name: 'Pharmacy', subs: ['OTC', 'Prescriptions', 'Vitamins', 'First Aid'] },
  { name: 'Bakery', subs: ['Bread', 'Cakes', 'Pastries', 'Cookies'] },
  { name: 'Dairy', subs: ['Milk', 'Cheese', 'Yogurt', 'Butter'] },
  { name: 'Meat', subs: ['Beef', 'Chicken', 'Pork', 'Seafood'] },
];

const REGIONS = ['North', 'South', 'East', 'West', 'Central'];
const CITIES = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];

// Generate functions
function generateSuppliers(count: number) {
  const suppliers: z.infer<typeof SupplierSchema>[] = [];
  
  for (let i = 0; i < count; i++) {
    const categories = faker.helpers.arrayElements(CATEGORIES.map(c => c.name), { min: 1, max: 4 });
    
    suppliers.push({
      id: `SUP${String(i + 1).padStart(4, '0')}`,
      name: faker.company.name(),
      location: faker.location.city(),
      country: faker.location.country(),
      deliveryCategories: categories,
      deliveryFrequency: faker.helpers.arrayElement(['daily', 'weekly', 'bi-weekly', 'monthly'] as const),
      leadTimeDays: faker.number.int({ min: 1, max: 14 }),
      minOrderValue: faker.number.int({ min: 500, max: 5000 }),
      rating: parseFloat(faker.number.float({ min: 3.5, max: 5.0, precision: 0.1 }).toFixed(1)),
      contactPerson: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    });
  }
  
  return suppliers;
}

function generateStores(count: number) {
  const stores: z.infer<typeof StoreSchema>[] = [];
  
  for (let i = 0; i < count; i++) {
    stores.push({
      id: `ST${String(i + 1).padStart(4, '0')}`,
      name: `HyperRetail ${faker.helpers.arrayElement(CITIES)} ${faker.helpers.arrayElement(['Plaza', 'Mall', 'Center', 'Market'])}`,
      region: faker.helpers.arrayElement(REGIONS),
      city: faker.helpers.arrayElement(CITIES),
      address: faker.location.streetAddress(),
      sqft: faker.number.int({ min: 20000, max: 150000 }),
      openDate: faker.date.past({ years: 10 }).toISOString().split('T')[0],
      manager: faker.person.fullName(),
      status: faker.helpers.weightedArrayElement([
        { weight: 0.9, value: 'active' as const },
        { weight: 0.07, value: 'maintenance' as const },
        { weight: 0.03, value: 'closed' as const },
      ]),
      lat: Number(faker.location.latitude()),
      lng: Number(faker.location.longitude()),
    });
  }
  
  return stores;
}

function generateProducts(count: number, suppliers: z.infer<typeof SupplierSchema>[]) {
  const products: z.infer<typeof ProductSchema>[] = [];
  
  for (let i = 0; i < count; i++) {
    const category = faker.helpers.arrayElement(CATEGORIES);
    const costPrice = faker.number.float({ min: 1, max: 500, precision: 0.01 });
    const markup = faker.number.float({ min: 1.2, max: 2.5, precision: 0.01 });
    
    // Find supplier that delivers this category
    const suppliersForCategory = suppliers.filter(s => s.deliveryCategories.includes(category.name));
    const supplier = faker.helpers.arrayElement(suppliersForCategory.length > 0 ? suppliersForCategory : suppliers);
    
    products.push({
      id: `PRD${String(i + 1).padStart(5, '0')}`,
      sku: faker.string.alphanumeric(10).toUpperCase(),
      name: faker.commerce.productName(),
      category: category.name,
      subCategory: faker.helpers.arrayElement(category.subs),
      brand: faker.company.name(),
      unitPrice: parseFloat((costPrice * markup).toFixed(2)),
      costPrice: costPrice,
      supplierId: supplier.id,
      weight: category.name === 'Electronics' ? faker.number.float({ min: 0.1, max: 10, precision: 0.01 }) : undefined,
      perishable: ['Fresh Produce', 'Bakery', 'Dairy', 'Meat'].includes(category.name),
    });
  }
  
  return products;
}

function generateCustomers(count: number, stores: z.infer<typeof StoreSchema>[]) {
  const customers: z.infer<typeof CustomerSchema>[] = [];
  
  for (let i = 0; i < count; i++) {
    const joinDate = faker.date.past({ years: 5 });
    const visitCount = faker.number.int({ min: 1, max: 200 });
    const avgSpend = faker.number.float({ min: 20, max: 150, precision: 0.01 });
    
    customers.push({
      id: `CUS${String(i + 1).padStart(5, '0')}`,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      loyaltyTier: faker.helpers.weightedArrayElement([
        { weight: 0.5, value: 'bronze' as const },
        { weight: 0.3, value: 'silver' as const },
        { weight: 0.15, value: 'gold' as const },
        { weight: 0.05, value: 'platinum' as const },
      ]),
      joinDate: joinDate.toISOString().split('T')[0],
      totalSpend: parseFloat((visitCount * avgSpend).toFixed(2)),
      visitCount,
      lastVisit: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
      region: faker.helpers.arrayElement(REGIONS),
      preferredStore: faker.helpers.arrayElement(stores).id,
    });
  }
  
  return customers;
}

function generateEmployees(count: number, stores: z.infer<typeof StoreSchema>[]) {
  const employees: z.infer<typeof EmployeeSchema>[] = [];
  const roles = ['Manager', 'Assistant Manager', 'Cashier', 'Stock Clerk', 'Department Lead', 'Security', 'Janitor'];
  const departments = CATEGORIES.map(c => c.name).concat(['Administration', 'Security', 'Maintenance']);
  
  for (let i = 0; i < count; i++) {
    const role = faker.helpers.arrayElement(roles);
    const baseSalary = role === 'Manager' ? 80000 : role === 'Assistant Manager' ? 50000 : 35000;
    
    employees.push({
      id: `EMP${String(i + 1).padStart(4, '0')}`,
      name: faker.person.fullName(),
      role,
      department: faker.helpers.arrayElement(departments),
      storeId: faker.helpers.arrayElement(stores).id,
      hireDate: faker.date.past({ years: 8 }).toISOString().split('T')[0],
      salary: faker.number.int({ min: baseSalary * 0.8, max: baseSalary * 1.3 }),
      performance: parseFloat(faker.number.float({ min: 2.5, max: 5.0, precision: 0.1 }).toFixed(1)),
      email: faker.internet.email(),
    });
  }
  
  return employees;
}

function generateSales(count: number, stores: z.infer<typeof StoreSchema>[], products: z.infer<typeof ProductSchema>[], customers: z.infer<typeof CustomerSchema>[]) {
  const sales: z.infer<typeof SalesSchema>[] = [];
  
  for (let i = 0; i < count; i++) {
    const product = faker.helpers.arrayElement(products);
    const quantity = faker.number.int({ min: 1, max: 10 });
    const discount = faker.helpers.weightedArrayElement([
      { weight: 0.7, value: 0 },
      { weight: 0.2, value: faker.number.float({ min: 0.05, max: 0.15, precision: 0.01 }) },
      { weight: 0.1, value: faker.number.float({ min: 0.2, max: 0.4, precision: 0.01 }) },
    ]);
    const subtotal = product.unitPrice * quantity;
    const total = parseFloat((subtotal * (1 - discount)).toFixed(2));
    
    sales.push({
      id: `SL${String(i + 1).padStart(6, '0')}`,
      transactionDate: faker.date.recent({ days: 90 }).toISOString(),
      storeId: faker.helpers.arrayElement(stores).id,
      productId: product.id,
      customerId: faker.helpers.maybe(() => faker.helpers.arrayElement(customers).id, { probability: 0.6 }),
      quantity,
      unitPrice: product.unitPrice,
      discount,
      total,
      paymentMethod: faker.helpers.arrayElement(['cash', 'card', 'mobile', 'voucher'] as const),
      promotionId: discount > 0 ? `PROMO${faker.number.int({ min: 1, max: 20 })}` : undefined,
    });
  }
  
  return sales;
}

function generateInventory(stores: z.infer<typeof StoreSchema>[], products: z.infer<typeof ProductSchema>[]) {
  const inventory: z.infer<typeof InventorySchema>[] = [];
  let id = 1;
  
  // Each store has subset of products
  for (const store of stores) {
    const storeProducts = faker.helpers.arrayElements(products, faker.number.int({ min: 200, max: 500 }));
    
    for (const product of storeProducts) {
      const quantity = faker.number.int({ min: 0, max: 500 });
      const reorderLevel = faker.number.int({ min: 20, max: 100 });
      const daysOfStock = quantity > 0 ? faker.number.int({ min: 1, max: 60 }) : 0;
      
      let status: 'healthy' | 'low' | 'critical' | 'overstock';
      if (quantity === 0) status = 'critical';
      else if (quantity < reorderLevel) status = 'low';
      else if (quantity > reorderLevel * 5) status = 'overstock';
      else status = 'healthy';
      
      inventory.push({
        id: `INV${String(id++).padStart(6, '0')}`,
        storeId: store.id,
        productId: product.id,
        quantity,
        reorderLevel,
        lastRestocked: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
        daysOfStock,
        status,
      });
    }
  }
  
  return inventory;
}

function generateReturns(count: number, sales: z.infer<typeof SalesSchema>[]) {
  const returns: z.infer<typeof ReturnSchema>[] = [];
  
  for (let i = 0; i < count; i++) {
    const sale = faker.helpers.arrayElement(sales);
    
    returns.push({
      id: `RET${String(i + 1).padStart(5, '0')}`,
      saleId: sale.id,
      returnDate: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
      reason: faker.helpers.arrayElement(['Defective', 'Changed mind', 'Wrong item', 'Not as described', 'Expired']),
      refundAmount: sale.total * faker.number.float({ min: 0.5, max: 1.0, precision: 0.01 }),
      condition: faker.helpers.arrayElement(['defective', 'unopened', 'damaged', 'expired'] as const),
    });
  }
  
  return returns;
}

function generateFootfall(count: number, stores: z.infer<typeof StoreSchema>[]) {
  const footfall: z.infer<typeof FootfallSchema>[] = [];
  
  for (let i = 0; i < count; i++) {
    const visitors = faker.number.int({ min: 50, max: 800 });
    const conversionRate = faker.number.float({ min: 0.15, max: 0.4, precision: 0.01 });
    
    footfall.push({
      id: `FT${String(i + 1).padStart(5, '0')}`,
      storeId: faker.helpers.arrayElement(stores).id,
      date: faker.date.recent({ days: 90 }).toISOString().split('T')[0],
      hour: faker.number.int({ min: 8, max: 22 }),
      visitors,
      conversions: Math.floor(visitors * conversionRate),
    });
  }
  
  return footfall;
}

function generateMarketing(count: number) {
  const marketing: z.infer<typeof MarketingSchema>[] = [];
  const channels = ['Social Media', 'Email', 'Display Ads', 'Search', 'TV', 'Radio', 'Print'];
  
  for (let i = 0; i < count; i++) {
    const spend = faker.number.float({ min: 5000, max: 100000, precision: 0.01 });
    const impressions = faker.number.int({ min: 10000, max: 1000000 });
    const ctr = faker.number.float({ min: 0.01, max: 0.05, precision: 0.001 });
    const clicks = Math.floor(impressions * ctr);
    const convRate = faker.number.float({ min: 0.02, max: 0.1, precision: 0.001 });
    const conversions = Math.floor(clicks * convRate);
    const avgOrderValue = faker.number.float({ min: 50, max: 200, precision: 0.01 });
    
    marketing.push({
      id: `MKT${String(i + 1).padStart(4, '0')}`,
      campaignName: `${faker.commerce.productAdjective()} ${faker.commerce.product()} ${faker.helpers.arrayElement(['Sale', 'Promo', 'Launch', 'Event'])}`,
      channel: faker.helpers.arrayElement(channels),
      startDate: faker.date.recent({ days: 90 }).toISOString().split('T')[0],
      endDate: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
      spend,
      impressions,
      clicks,
      conversions,
      revenue: parseFloat((conversions * avgOrderValue).toFixed(2)),
    });
  }
  
  return marketing;
}

function generateFinance(count: number) {
  const finance: z.infer<typeof FinanceSchema>[] = [];
  
  for (let i = 0; i < count; i++) {
    const revenue = faker.number.float({ min: 100000, max: 500000, precision: 0.01 });
    const cogsPercent = faker.number.float({ min: 0.5, max: 0.7, precision: 0.01 });
    const opexPercent = faker.number.float({ min: 0.15, max: 0.25, precision: 0.01 });
    const cogs = revenue * cogsPercent;
    const opex = revenue * opexPercent;
    const profit = revenue - cogs - opex;
    
    finance.push({
      id: `FIN${String(i + 1).padStart(4, '0')}`,
      date: faker.date.recent({ days: 100 }).toISOString().split('T')[0],
      revenue: parseFloat(revenue.toFixed(2)),
      cogs: parseFloat(cogs.toFixed(2)),
      operatingExpenses: parseFloat(opex.toFixed(2)),
      profit: parseFloat(profit.toFixed(2)),
      margin: parseFloat(((profit / revenue) * 100).toFixed(2)),
    });
  }
  
  return finance;
}

// Main
async function main() {
  console.log('🚀 Generating mock data...\n');
  
  const dataDir = join(process.cwd(), 'data', 'mock');
  mkdirSync(dataDir, { recursive: true });
  
  // Generate all entities
  console.log('📦 Generating suppliers...');
  const suppliers = generateSuppliers(120);
  writeFileSync(join(dataDir, 'suppliers.json'), JSON.stringify(suppliers, null, 2));
  
  console.log('🏪 Generating stores...');
  const stores = generateStores(500);
  writeFileSync(join(dataDir, 'stores.json'), JSON.stringify(stores, null, 2));
  
  console.log('📦 Generating products...');
  const products = generateProducts(1500, suppliers);
  writeFileSync(join(dataDir, 'products.json'), JSON.stringify(products, null, 2));
  
  console.log('👥 Generating customers...');
  const customers = generateCustomers(800, stores);
  writeFileSync(join(dataDir, 'customers.json'), JSON.stringify(customers, null, 2));
  
  console.log('👷 Generating employees...');
  const employees = generateEmployees(200, stores);
  writeFileSync(join(dataDir, 'employees.json'), JSON.stringify(employees, null, 2));
  
  console.log('💰 Generating sales...');
  const sales = generateSales(2000, stores, products, customers);
  writeFileSync(join(dataDir, 'sales.json'), JSON.stringify(sales, null, 2));
  
  console.log('📊 Generating inventory...');
  const inventory = generateInventory(stores.slice(0, 20), products); // Limit to avoid too many records
  writeFileSync(join(dataDir, 'inventory.json'), JSON.stringify(inventory, null, 2));
  
  console.log('↩️  Generating returns...');
  const returns = generateReturns(150, sales);
  writeFileSync(join(dataDir, 'returns.json'), JSON.stringify(returns, null, 2));
  
  console.log('🚶 Generating footfall...');
  const footfall = generateFootfall(300, stores);
  writeFileSync(join(dataDir, 'footfall.json'), JSON.stringify(footfall, null, 2));
  
  console.log('📢 Generating marketing...');
  const marketing = generateMarketing(150);
  writeFileSync(join(dataDir, 'marketing.json'), JSON.stringify(marketing, null, 2));
  
  console.log('💵 Generating finance...');
  const finance = generateFinance(100);
  writeFileSync(join(dataDir, 'finance.json'), JSON.stringify(finance, null, 2));
  
  // Create merged file
  const mockData = {
    suppliers,
    stores,
    products,
    customers,
    employees,
    sales,
    inventory,
    returns,
    footfall,
    marketing,
    finance,
    metadata: {
      generated: new Date().toISOString(),
      totalRecords: suppliers.length + stores.length + products.length + customers.length + 
                    employees.length + sales.length + inventory.length + returns.length + 
                    footfall.length + marketing.length + finance.length,
      version: '1.0.0',
    },
  };
  
  writeFileSync(join(process.cwd(), 'data', 'mockData.json'), JSON.stringify(mockData, null, 2));
  
  console.log(`\n✅ Generated ${mockData.metadata.totalRecords} total records!`);
  console.log(`   - Suppliers: ${suppliers.length}`);
  console.log(`   - Stores: ${stores.length}`);
  console.log(`   - Products: ${products.length}`);
  console.log(`   - Customers: ${customers.length}`);
  console.log(`   - Employees: ${employees.length}`);
  console.log(`   - Sales: ${sales.length}`);
  console.log(`   - Inventory: ${inventory.length}`);
  console.log(`   - Returns: ${returns.length}`);
  console.log(`   - Footfall: ${footfall.length}`);
  console.log(`   - Marketing: ${marketing.length}`);
  console.log(`   - Finance: ${finance.length}`);
  console.log(`\n📁 Files saved to ${dataDir}`);
}

main().catch(console.error);
