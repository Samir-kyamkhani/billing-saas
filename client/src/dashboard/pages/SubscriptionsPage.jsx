import React, { useState, useMemo } from "react";
import { User } from "lucide-react";
import Button from "../components/Button";
import { subscriptions as subscriptionData } from "../..";

const SubscriptionsTable = ({ subscriptions, onView, onPay }) => {
  return (
    <>
      {/* Table for md+ screens */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                {[
                  "Subscription ID",
                  "Customer",
                  "Plan",
                  "Status",
                  "Start",
                  "End",
                  "Actions",
                ].map((col) => (
                  <th
                    key={col}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscriptions.map((sub) => {
                const isExpired = new Date(sub.endDate) < new Date();
                const showPay = sub.status !== "paid" || isExpired;

                return (
                  <tr key={sub.id} className="text-sm text-gray-800">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {sub.subscriptionId}
                    </td>
                    <td className="px-6 py-4">{sub.customerName}</td>
                    <td className="px-6 py-4">{sub.plan}</td>
                    <td className="px-6 py-4 capitalize">{sub.status}</td>
                    <td className="px-6 py-4">{sub.startDate}</td>
                    <td className="px-6 py-4">{sub.endDate || "-"}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => onView(sub.id)}
                        >
                          View
                        </Button>
                        {showPay && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => onPay(sub.id)}
                          >
                            Pay
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid cards for mobile (below md) */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {subscriptions.map((sub) => {
          const isExpired = new Date(sub.endDate) < new Date();
          const showPay = sub.status !== "paid" || isExpired;

          return (
            <div
              key={sub.id}
              className="bg-white rounded-xl shadow-sm border border-gray-300 p-4 flex flex-col space-y-3"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-gray-900 font-semibold text-lg">
                  {sub.subscriptionId}
                </h4>
              </div>
              <p>
                <span className="font-semibold">Customer: </span>
                {sub.customerName}
              </p>
              <p>
                <span className="font-semibold">Plan: </span>
                {sub.plan}
              </p>
              <p>
                <span className="font-semibold">Status: </span>
                <span className="capitalize">{sub.status}</span>
              </p>
              <p>
                <span className="font-semibold">Start: </span>
                {sub.startDate}
              </p>
              <p>
                <span className="font-semibold">End: </span>
                {sub.endDate || "-"}
              </p>

              <div className="flex justify-between items-center">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onView(sub.id)}
                >
                  View
                </Button>
                {showPay && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onPay(sub.id)}
                  >
                    Pay
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState(subscriptionData);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) =>
      [sub.customerName, sub.plan]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [subscriptions, searchTerm]);

  const anyDue = useMemo(() => {
    return filteredSubscriptions.some((sub) => {
      const isExpired = new Date(sub.endDate) < new Date();
      return sub.status !== "paid" || isExpired;
    });
  }, [filteredSubscriptions]);

  const handleView = (id) => {
    const sub = subscriptions.find((s) => s.id === id);
    alert(`📄 Subscription Details:

Customer: ${sub.customerName}
Plan: ${sub.plan}
Status: ${sub.status}
Start: ${sub.startDate}
End: ${sub.endDate || "N/A"}`);
  };

  const handlePay = (id) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "paid" } : s))
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-900">Subscriptions</h1>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by customer or plan..."
            className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />

          {anyDue && (
            <Button
              variant="primary"
              size="md"
              onClick={() => alert("Redirect to billing/payments")}
            >
              Pay
            </Button>
          )}
        </div>
      </div>

      {/* Subscriptions Table or Cards */}
      <SubscriptionsTable
        subscriptions={filteredSubscriptions}
        onView={handleView}
        onPay={handlePay}
      />

      {/* Empty State */}
      {filteredSubscriptions.length === 0 && (
        <div className="bg-white rounded-xl text-center shadow-sm border border-gray-100 p-8">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No subscriptions found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
