import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaFileInvoiceDollar,
  FaUsers,
  FaMoneyCheckAlt,
  FaCog,
  FaTachometerAlt,
  FaBars,
  FaTimes,
  FaChartBar,
  FaBox,
  FaUserShield,
  FaShoppingCart,
} from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { to: "/orders", label: "Orders", icon: <FaShoppingCart /> },
  { to: "/inventory", label: "Inventory", icon: <FaBox /> },
  { to: "/customers", label: "Customers", icon: <FaUsers /> },
  { to: "/payments", label: "Payments", icon: <FaMoneyCheckAlt /> },
  { to: "invoices", label: "Invoices", icon: <FaFileInvoiceDollar /> },
  { to: "/reports", label: "Reports", icon: <FaChartBar /> },
  { to: "/team", label: "Team", icon: <FaUserShield /> },
  { to: "/subscriptions", label: "Subscriptions", icon: <FaRepeat /> },
  { to: "/settings", label: "Settings", icon: <FaCog /> },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <div className="md:hidden flex justify-between items-center bg-white px-4 py-3 border-b border-gray-200 shadow-sm">
        <h1 className="text-xl font-bold text-gray-700">Billing Software</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-gray-700 focus:outline-none z-50 relative"
        >
          {isOpen ? <FaTimes /> : <FaBars className="text-gray-700" />}
        </button>
      </div>

      {/* Sidebar menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm px-4 py-6 z-40 transform transition-transform duration-300 ease-in-out 
    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    md:relative md:translate-x-0 md:h-auto md:block`}
      >
        <div className="text-2xl font-semibold text-gray-800 mb-8">
          <h1>Billing Software</h1>
        </div>
        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
              onClick={() => setIsOpen(false)} // auto-close on mobile
            >
              <span className="text-lg mr-3">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}
