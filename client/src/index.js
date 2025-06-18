export const invoices = [
  {
    invid: "INV-001",
    client: "John Doe",
    clientid: "",
    image: "",
    date: "2025-06-16",
    dueDate: "2025-07-01",
    amount: 500,
    status: "Paid",
    fromAddress: "Your Company Name\n123 Main St\nCity, State ZIP",
    toAddress: "John Doe\n456 Client Rd\nClient City, State ZIP",
    signatureImg:
      "https://t4.ftcdn.net/jpg/00/00/42/95/360_F_429547_YJTlwk2Ld5kYDAbtCUwFgzmatgUHEg.jpg",
    orders: [
      { name: "Website Design", quantity: 1, price: 300 },
      { name: "Hosting", quantity: 12, price: 10 },
    ],
  },
  {
    invid: "INV-002",
    client: "Acme Corp",
    clientid: "",
    image: "",
    date: "2025-06-14",
    dueDate: "2025-06-30",
    amount: 1250,
    status: "Unpainvid",
    fromAddress: "Your Company Name\n123 Main St\nCity, State ZIP",
    toAddress: "Acme Corp\n789 Business Ave\nBusiness City, State ZIP",
    signatureImg:
      "https://t4.ftcdn.net/jpg/00/00/42/95/360_F_429547_YJTlwk2Ld5kYDAbtCUwFgzmatgUHEg.jpg",
    orders: [
      { name: "App Development", quantity: 1, price: 1000 },
      { name: "Maintenance", quantity: 5, price: 50 },
    ],
  },
  {
    invid: "INV-003",
    client: "Jane Smith",
    clientid: "",
    image: "",
    date: "2025-05-28",
    dueDate: "2025-06-12",
    amount: 760,
    status: "Overdue",
    fromAddress: "Your Company Name\n123 Main St\nCity, State ZIP",
    toAddress: "Jane Smith\n321 Freelancer Ln\nRemote City, State ZIP",
    signatureImg:
      "https://t4.ftcdn.net/jpg/00/00/42/95/360_F_429547_YJTlwk2Ld5kYDAbtCUwFgzmatgUHEg.jpg",
    orders: [
      { id: 1, name: "Graphic Design", quantity: 2, price: 250 },
      { id: 2, name: "Consulting", quantity: 2, price: 130 },
    ],
  },
  {
    invid: "INV-004",
    client: "Beta LLC",
    clientid: "",
    image: "",
    date: "2025-06-10",
    dueDate: "2025-06-25",
    amount: 900,
    status: "Paid",
    fromAddress: "Your Company Name\n123 Main St\nCity, State ZIP",
    toAddress: "Beta LLC\n654 StartUp Blvd\nTech City, State ZIP",
    signatureImg:
      "https://t4.ftcdn.net/jpg/00/00/42/95/360_F_429547_YJTlwk2Ld5kYDAbtCUwFgzmatgUHEg.jpg",
    orders: [
      { name: "UI/UX Design", quantity: 1, price: 600 },
      { name: "Testing", quantity: 3, price: 100 },
    ],
  },
];

export const mockInventory = [
  {
    id: 1,
    name: "Espresso Coffee Beans",
    sku: "CF-001",
    category: "Beverages",
    quantity: 100,
    minStock: 25,
    price: 25.99,
    cost: 15.0,
    supplier: "Bean Roasters Ltd.",
    status: "in_stock",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=100&h=100&fit=crop",
    lastUpdated: "2025-06-10",
  },
  {
    id: 2,
    name: "Espresso Coffee Beans",
    sku: "CF-001",
    category: "Beverages",
    quantity: 100,
    minStock: 25,
    price: 25.99,
    cost: 15.0,
    supplier: "Bean Roasters Ltd.",
    status: "in_stock",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=100&h=100&fit=crop",
    lastUpdated: "2025-06-10",
  },
  {
    id: 3,
    name: "Whole Milk - 1 Gallon",
    sku: "MLK-001",
    category: "Dairy",
    quantity: 50,
    minStock: 10,
    price: 3.99,
    cost: 2.0,
    supplier: "Dairy Fresh Farms",
    status: "in_stock",
    image:
      "https://images.unsplash.com/photo-1582719478190-418d70b06c3b?w=100&h=100&fit=crop",
    lastUpdated: "2025-06-09",
  },
  {
    id: 4,
    name: "Croissant (Pack of 6)",
    sku: "PT-001",
    category: "Bakery",
    quantity: 30,
    minStock: 5,
    price: 8.49,
    cost: 5.0,
    supplier: "Golden Crust Bakery",
    status: "in_stock",
    image:
      "https://images.unsplash.com/photo-1601979031925-53a8c1a8847e?w=100&h=100&fit=crop",
    lastUpdated: "2025-06-08",
  },
  {
    id: 5,
    name: "12oz Takeaway Coffee Cups (Pack of 100)",
    sku: "CP-100",
    category: "Supplies",
    quantity: 80,
    minStock: 20,
    price: 12.99,
    cost: 7.5,
    supplier: "Cafe Supplies Inc.",
    status: "in_stock",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100&h=100&fit=crop",
    lastUpdated: "2025-06-11",
  },
];

export const orders = [
  {
    id: 1,
    orderNumber: "ORD-001",
    product: "Cofe",
    paymentMod: "Cod",
    quantity: "5",
    customerName: "John Doe",
    date: "2025-06-15",
    total: 250.5,
    status: "pending",
  },
  {
    id: 2,
    orderNumber: "ORD-002",
    product: "Tea",
    quantity: "1",
    paymentMod: "Razerpay",
    customerName: "Jane Smith",
    date: "2025-06-16",
    total: 120.0,
    status: "completed",
  },
];

export const customers = [
  {
    id: 1,
    customerId: "CUST-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    location: "New York, USA",
  },
  {
    id: 2,
    customerId: "CUST-002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    location: "London, UK",
  },
];

export const statusClasses = {
  Paid: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Overdue: "bg-red-100 text-red-800",
};
