import React, { useState } from "react";
import { Plus, X, User, Mail, Phone, MapPin, FileText } from "lucide-react";
import InputField from "../InputField";
import Button from "../Button";

export default function AddCustomerForm({
  onSubmit,
  onClose,
  isEdit = false,
  customerData = {},
}) {
  const [form, setForm] = useState({
    id: customerData?.id || null,
    customerId: customerData?.customerId || "",
    name: customerData?.name || "",
    email: customerData?.email || "",
    phone: customerData?.phone || "",
    location: customerData?.location || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form });
    onClose();
  };

  return (
    <div className="fixed inset-0  bg-black/50 backdrop-blur-sm flex items-center min-h-screen justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl  shadow-2xl w-full max-w-xl  max-h-[80vh] md:max-h-[95vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r  from-blue-600 to-blue-700 px-6 py-4  flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {isEdit ? "Edit Customer" : "Add New Customer"}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              {isEdit
                ? "Update customer information"
                : "Fill out the customer details"}
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
            label="Customer ID"
            name="customerId"
            value={form.customerId}
            onChange={handleChange}
            required
            placeholder="CUST-001"
            icon={FileText}
          />

          <InputField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            icon={User}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            icon={Mail}
          />

          <InputField
            label="Phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="123-456-7890"
            icon={Phone}
          />

          <InputField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="New York, USA"
            icon={MapPin}
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
            {isEdit ? "Update Customer" : "Add Customer"}
          </Button>
        </div>
      </form>
    </div>
  );
}
