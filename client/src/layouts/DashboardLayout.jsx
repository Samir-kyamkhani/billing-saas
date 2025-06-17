import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../dashboard/components/Sidebar";
import Navbar from "../dashboard/components/Navbar";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Navbar />
        <main className="bg-gradient-to-br p-4 sm:p-6 from-gray-50 to-gray-100 overflow-auto min-h-[calc(100vh-64px)] w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
