import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Dashboard from "./dashboard/pages/Dashboard.jsx";
import InvoicesPage from "./dashboard/pages/InvoicesPage.jsx";
import InventoryPage from "./dashboard/pages/InventoryPage.jsx";
import OrdersPage from "./dashboard/pages/OrdersPage.jsx";
import CustomersPage from "./dashboard/pages/CustomersPage.jsx";
import TeamPage from "./dashboard/pages/TeamPage.jsx";
import ReportsPage from "./dashboard/pages/ReportsPage.jsx";
import SubscriptionsPage from "./dashboard/pages/SubscriptionsPage.jsx";
import SettingsPage from "./dashboard/pages/SettingsPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<DashboardLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/invoices" element={<InvoicesPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/subscriptions" element={<SubscriptionsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      {/* <Route path="/payments" element={<PaymentsPage />} /> */}
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
