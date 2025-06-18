import { useMemo } from "react";
import {
  Users,
  FileText,
  Package,
  CreditCard,
  ShoppingCart,
  ShieldCheck,
  BarChart,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";

// Sample Data Sources (replace with real data or props/state)
import {
  customers,
  invoices,
  mockInventory,
  orders,
  team,
  subscriptions,
} from "../..";

export default function ReportsPage() {
  // Summary metrics
  const metrics = useMemo(() => {
    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const totalInventoryValue = mockInventory.reduce(
      (sum, item) => sum + item.price * item.stock,
      0
    );

    return {
      totalCustomers: customers.length,
      activeSubscriptions: subscriptions?.filter((s) => s.status === "active")
        .length,
      totalRevenue,
      totalOrders: orders.length,
      totalInventoryValue,
      teamSize: team.length,
    };
  }, []);

  // Recent activity
  const recentInvoices = useMemo(
    () => invoices.slice(-5).reverse(),
    [invoices]
  );
  const recentOrders = useMemo(() => orders.slice(-5).reverse(), [orders]);
  const lowStockItems = useMemo(
    () => mockInventory.filter((i) => i.stock < 5),
    [mockInventory]
  );

  return (
    <div className="space-y-8">
      <PageHeader title="Reports & Analytics" />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          icon={Users}
          label="Total Customers"
          value={metrics.totalCustomers}
        />
        <MetricCard
          icon={ShieldCheck}
          label="Active Subscriptions"
          value={metrics.activeSubscriptions}
        />
        <MetricCard
          icon={CreditCard}
          label="Total Revenue"
          value={`$${metrics.totalRevenue.toFixed(2)}`}
        />
        <MetricCard
          icon={ShoppingCart}
          label="Total Orders"
          value={metrics.totalOrders}
        />
        <MetricCard
          icon={Package}
          label="Inventory Value"
          value={`$${metrics.totalInventoryValue.toFixed(2)}`}
        />
        <MetricCard
          icon={FileText}
          label="Team Size"
          value={metrics.teamSize}
        />
      </div>

      {/* Tables / Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityTable
          title="Recent Invoices"
          data={recentInvoices}
          columns={["Invoice ID", "Customer", "Amount"]}
        />
        <ActivityTable
          title="Recent Orders"
          data={recentOrders}
          columns={["Order ID", "Customer", "Total"]}
        />
        <ActivityTable
          title="Low Stock Items"
          data={lowStockItems}
          columns={["Product", "Stock", "Price"]}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end pt-4">
        <Button variant="primary" leftIcon={<BarChart />}>
          Export Report
        </Button>
      </div>
    </div>
  );
}

// --- Components ---
const MetricCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-4 flex items-center gap-4">
    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <h4 className="text-sm text-gray-600">{label}</h4>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

const ActivityTable = ({ title, data, columns }) => (
  <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-4">
    <h3 className="text-md font-semibold text-gray-800 mb-3">{title}</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-gray-600">
            {columns.map((col) => (
              <th
                key={col}
                className="text-left px-2 py-2 uppercase text-xs font-semibold"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="border-t border-gray-100 text-gray-800">
              {columns.map((col) => (
                <td key={col} className="px-2 py-1">
                  {item[col.toLowerCase().replace(/\s+/g, "")] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
