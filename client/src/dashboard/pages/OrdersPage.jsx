import React, { useState, useMemo } from "react";
import { Eye, Edit3, Trash2, Package } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import { orders as product } from "../..";
import AddOrderForm from "../components/Forms/AddOrderForm";
// import AddOrderForm from "../components/Forms/AddOrderForm"; // Optional form

const statusLabels = {
  Cod: {
    label: "Cod",
    class: "bg-green-100 text-green-800 border-green-200",
  },
  Razerpay: {
    label: "Razerpay",
    class: "bg-purple-100 text-purple-800 border-purple-200",
  },
  pending: {
    label: "Pending",
    class: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  processing: {
    label: "Processing",
    class: "bg-blue-100 text-blue-800 border-blue-200",
  },
  completed: {
    label: "Completed",
    class: "bg-green-100 text-green-800 border-green-200",
  },
  cancelled: {
    label: "Cancelled",
    class: "bg-red-100 text-red-800 border-red-200",
  },
};

const StatusBadge = ({ status }) => {
  const config = statusLabels[status] || {};
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full border ${config.class}`}
    >
      {config.label}
    </span>
  );
};

const OrdersTable = ({ orders, onEdit, onDelete, onView }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {[
              "Order Id",
              "Customer",
              "Product",
              "quantity",
              "Payment Mod",
              "Date",
              "Total",
              "Status",
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
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-medium text-gray-900">
                {order.orderNumber}
              </td>
              <td className="px-6 py-4">{order.customerName}</td>
              <td className="px-6 py-4">{order.product}</td>
              <td className="px-6 py-4">{order.quantity}</td>
              <td className="px-6 py-4">
                <StatusBadge status={order.paymentMod} />
              </td>
              <td className="px-6 py-4">{order.date}</td>
              <td className="px-6 py-4">${order.total.toFixed(2)}</td>
              <td className="px-6 py-4">
                <StatusBadge status={order.status} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-8 space-x-1">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => onView(order.id)}
                  >
                    View
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    className="text-blue-600 hover:text-blue-800 font-semibold text-left"
                    onClick={() => onEdit(order.id)}
                  >
                    Edit
                  </Button>
                  <button
                    className="text-red-600 hover:text-red-800 font-semibold text-left"
                    onClick={() => onDelete(order.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default function OrdersPage() {
  const [orders, setOrders] = useState(product);
  const [showOrderForm, setshowOrderForm] = useState("");
  const [editOrdereData, setEditOrdereData] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  const handleEdit = (id) => console.log("Edit order:", id);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
    }
  };
  const handleView = (id) => console.log("View order:", id);

  const handleSaveOrder = (orderData) => {
    console.log("Saved order:", orderData);
    setshowOrderForm(false);
    setEditOrdereData(null);
  };

  const handleCloseOrderForm = () => {
    setshowOrderForm(false);
    setEditOrdereData(null);
  };
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
        <PageHeader
          title="Orders"
          filters={["Pending", "Processing", "Completed", "Cancelled"]}
          showSearch
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          renderActions={() => (
            <Button
              variant="primary"
              size="md"
              leftIcon={<FaPlus />}
              onClick={() => {
                setEditOrdereData(null);
                setshowOrderForm(true);
              }}
            >
              New Order
            </Button>
          )}
        />
      </div>

      {showOrderForm && (
        <AddOrderForm
          isEdit={!!editOrdereData}
          invoiceData={editOrdereData}
          onSubmit={handleSaveOrder}
          onClose={handleCloseOrderForm}
        />
      )}

      <OrdersTable
        orders={filteredOrders}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No orders found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filters
          </p>
          <Button variant="primary" size="md">
            Add Order
          </Button>
        </div>
      )}
    </div>
  );
}
