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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<DashboardLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/invoices" element={<InvoicesPage />} />
      {/* <Route path="/clients" element={<ClientsPage />} /> */}
      {/* <Route path="/payments" element={<PaymentsPage />} /> */}
      {/* <Route path="/settings" element={<SettingsPage />} /> */}
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
