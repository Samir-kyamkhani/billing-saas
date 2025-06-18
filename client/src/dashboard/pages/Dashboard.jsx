import React from "react";
import {
  FiTrendingUp,
  FiBox,
  FiDollarSign,
  FiShoppingCart,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const Dashboard = () => {
  const summaryStats = [
    {
      title: "ORDERS",
      value: "1685",
      subtext: "Since last month",
      icon: <FiShoppingCart />,
    },
    {
      title: "REVENUE",
      value: "₹300,258",
      subtext: "Since last month",
      icon: <FiDollarSign />,
    },
    {
      title: "AVG PRICE",
      value: "₹15.8",
      subtext: "Since last month",
      icon: <FiTrendingUp />,
    },
    {
      title: "PRODUCT SOLD",
      value: "1547",
      subtext: "Since last month",
      icon: <FiBox />,
    },
  ];

  const chartData = [
    { name: "Week 1", orders: 400, sold: 240 },
    { name: "Week 2", orders: 300, sold: 139 },
    { name: "Week 3", orders: 200, sold: 980 },
    { name: "Week 4", orders: 278, sold: 390 },
  ];

  const transactions = [
    { id: "A10", name: "Transportation", date: "02/12/2021", amount: "₹10,000", status: "Success" },
    { id: "A04", name: "Order Shipment", date: "30/11/2021", amount: "₹20,000", status: "Success" },
    { id: "A05", name: "Cargo Export", date: "25/11/2021", amount: "₹15,000", status: "Delayed" },
  ];

  const pendingTransactions = [
    { id: "A/11", date: "08/12/2021", name: "Transportation of products" },
    { id: "A/08", date: "05/12/2021", name: "Cargo Export" },
    { id: "A/07", date: "05/12/2021", name: "Cargo Export" },
  ];

  return (
    <div className=" font-sans text-gray-800">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {summaryStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-gray-200/80 rounded-xl p-5 shadow hover:shadow-lg transition-all border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm text-gray-500 font-medium">{stat.title}</h4>
              <div className="text-indigo-600 text-xl">{stat.icon}</div>
            </div>
            <p className="text-3xl font-bold text-indigo-700">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.subtext}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart */}
          <div className=" bg-gray-200/80 rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-700">
                Summary in <span className="text-indigo-700">November</span>
              </h2>
              <div className="flex gap-4 text-sm text-slate-500">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-indigo-600 rounded-full mr-2" />
                  Orders
                </span>
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-sky-400 rounded-full mr-2" />
                  Sold
                </span>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="sold" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transactions Table */}
          <div className=" bg-gray-200/80 rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <a className="text-indigo-600 text-sm hover:underline" href="#">
                View All
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-indigo-100 text-indigo-700 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Recipient Name</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {transactions.map((t) => (
                    <tr key={t.id} className="hover:bg-indigo-50 transition">
                      <td className="px-4 py-3">{t.id}</td>
                      <td className="px-4 py-3">{t.name}</td>
                      <td className="px-4 py-3">{t.date}</td>
                      <td className="px-4 py-3">{t.amount}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            t.status === "Success"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 ">
          {/* Pending Transactions */}
          <div className="p-6 rounded-xl shadow bg-gray-200/80">
            <h3 className="text-lg font-semibold mb-4">Pending Transactions</h3>
            <ul className="space-y-4">
              {pendingTransactions.map((item) => (
                <li key={item.id} className="text-sm">
                  <div className="flex justify-between font-medium text-gray-700">
                    <span>{item.name}</span>
                    <span className="text-gray-400">{item.date}</span>
                  </div>
                 <Link to={""} className="text-indigo-600 text-xs underline">
                    View details
                 </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Budget Widget */}
          <div className="bg-gray-200/80 p-6 rounded-xl shadow text-center">
            <h3 className="font-semibold text-lg mb-4">Budget</h3>
            <div className="relative w-24 h-24 mx-auto mb-4">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  className="text-indigo-500"
                  strokeDasharray="48, 52"
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.8"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-indigo-600 font-semibold text-sm">
                48% Saved
              </div>
            </div>
            <p className="text-sm text-gray-600">Total spent: ₹30,000</p>
            <p className="text-sm text-gray-600">Money Saved: ₹40,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
