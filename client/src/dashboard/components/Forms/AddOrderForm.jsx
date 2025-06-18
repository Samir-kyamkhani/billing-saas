import React, { useState } from "react";
import {
  Plus,
  X,
  User,
  Calendar,
  CheckCircle,
  FileText,
  DollarSign,
} from "lucide-react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Button from "../Button";
import { PiRowsDuotone } from "react-icons/pi";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const paymentMod_OPTIONS = [
  { value: "Cod", label: "Cod" },
  { value: "Razerpay", label: "Razerpay" },
];

export default function AddOrderForm({
  onSubmit,
  onClose,
  isEdit = false,
  orderData = {},
}) {
  const [form, setForm] = useState({
    id: orderData?.id || null,
    orderNumber: orderData?.orderNumber || "",
    customerName: orderData?.customerName || "",
    productName: orderData?.productName || "",
    quantity: orderData?.quantity || 1,
    paymentMod: orderData?.paymentMod || "Cod",
    date: orderData?.date || new Date().toISOString().slice(0, 10),
    total: orderData?.total || 0,
    status: orderData?.status || "pending",
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "total" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl w-full max-h-[80vh] md:max-h-[95vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {isEdit ? "Edit Order" : "Add New Order"}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              {isEdit
                ? "Update order details"
                : "Fill out the order information"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 p-6 grid grid-cols-1 overflow-y-auto  sm:grid-cols-2 gap-4">
          <InputField
            label="Order Number"
            name="orderNumber"
            value={form.orderNumber}
            onChange={handleChange}
            required
            placeholder="ORD-00123"
            icon={FileText}
          />

          <InputField
            label="Customer Name"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            required
            placeholder="John Doe"
            icon={User}
          />

          <InputField
            label="Product Name"
            name="productName"
            value={form.productName}
            onChange={handleChange}
            required
            placeholder="Coffee"
            icon={PiRowsDuotone}
          />

          <InputField
            label="Quantity"
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            required
            min={0}
            step="1"
          />

          <SelectField
            label="Payment Method"
            name="paymentMod"
            value={form.paymentMod}
            onChange={handleChange}
            options={paymentMod_OPTIONS}
            required
            icon={CheckCircle}
          />

          <InputField
            label="Order Date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            icon={Calendar}
          />

          <InputField
            label="Total Amount ($)"
            name="total"
            type="number"
            value={form.total}
            onChange={handleChange}
            required
            icon={DollarSign}
            min={0}
            step="0.01"
          />

          <SelectField
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={STATUS_OPTIONS}
            required
            icon={CheckCircle}
          />
        </div>

        {/* Footer Buttons */}
        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-between">
          <Button
            variant="close"
            onClick={onClose}
            className="px-4 py-2 rounded-full"
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            leftIcon={<Plus className="h-4 w-4" />}
            className="order-1 sm:order-2 flex-1 sm:flex-none"
          >
            {isEdit ? "Update Order" : "Add Order"}
          </Button>
        </div>
      </form>
    </div>
  );
}
