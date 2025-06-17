export const invoices = [
  {
    id: "INV-001",
    client: "John Doe",
    date: "2025-06-16",
    dueDate: "2025-07-01",
    amount: 500,
    status: "Paid",
    fromAddress: "Your Company Name\n123 Main St\nCity, State ZIP",
    toAddress: "John Doe\n456 Client Rd\nClient City, State ZIP",
    signatureImg:
      "https://t4.ftcdn.net/jpg/00/00/42/95/360_F_429547_YJTlwk2Ld5kYDAbtCUwFgzmatgUHEg.jpg",
    products: [
      { name: "Website Design", quantity: 1, price: 300 },
      { name: "Hosting", quantity: 12, price: 10 },
    ],
  },
  {
    id: "INV-002",
    client: "Acme Corp",
    date: "2025-06-14",
    dueDate: "2025-06-30",
    amount: 1250,
    status: "Unpaid",
    fromAddress: "Your Company Name\n123 Main St\nCity, State ZIP",
    toAddress: "Acme Corp\n789 Business Ave\nBusiness City, State ZIP",
    signatureImg:
      "https://t4.ftcdn.net/jpg/00/00/42/95/360_F_429547_YJTlwk2Ld5kYDAbtCUwFgzmatgUHEg.jpg",
    products: [
      { name: "App Development", quantity: 1, price: 1000 },
      { name: "Maintenance", quantity: 5, price: 50 },
    ],
  },
  {
    id: "INV-003",
    client: "Jane Smith",
    date: "2025-05-28",
    dueDate: "2025-06-12",
    amount: 760,
    status: "Overdue",
    fromAddress: "Your Company Name\n123 Main St\nCity, State ZIP",
    toAddress: "Jane Smith\n321 Freelancer Ln\nRemote City, State ZIP",
    signatureImg:
      "https://t4.ftcdn.net/jpg/00/00/42/95/360_F_429547_YJTlwk2Ld5kYDAbtCUwFgzmatgUHEg.jpg",
    products: [
      { name: "Graphic Design", quantity: 2, price: 250 },
      { name: "Consulting", quantity: 2, price: 130 },
    ],
  },
  {
    id: "INV-004",
    client: "Beta LLC",
    date: "2025-06-10",
    dueDate: "2025-06-25",
    amount: 900,
    status: "Paid",
    fromAddress: "Your Company Name\n123 Main St\nCity, State ZIP",
    toAddress: "Beta LLC\n654 StartUp Blvd\nTech City, State ZIP",
    signatureImg:
      "https://t4.ftcdn.net/jpg/00/00/42/95/360_F_429547_YJTlwk2Ld5kYDAbtCUwFgzmatgUHEg.jpg",
    products: [
      { name: "UI/UX Design", quantity: 1, price: 600 },
      { name: "Testing", quantity: 3, price: 100 },
    ],
  },
];

export const statusClasses = {
  Paid: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Overdue: "bg-red-100 text-red-800",
};
