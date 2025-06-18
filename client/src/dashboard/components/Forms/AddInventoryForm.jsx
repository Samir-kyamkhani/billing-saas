import React, { useState } from "react";
import {
  Plus,
  X,
  FileText,
  Layers,
  User,
  Package,
  DollarSign,
  Calendar,
  CheckCircle,
  Image as ImageIcon
} from "lucide-react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Button from "../Button";

const STATUS_OPTIONS = [
  { value: "in_stock", label: "In Stock" },
  { value: "low_stock", label: "Low Stock" },
  { value: "out_of_stock", label: "Out of Stock" },
];

const CATEGORIES = [
  { value: "Electronics", label: "Electronics" },
  { value: "Furniture", label: "Furniture" },
  { value: "Office Supplies", label: "Office Supplies" },
  { value: "Accessories", label: "Accessories" },
];

export default function AddInventoryForm({
  onSubmit,
  onClose,
  isEdit = false,
  itemData = {},
}) {
  const [form, setForm] = useState({
    id: itemData?.id || null,
    name: itemData?.name || "",
    sku: itemData?.sku || "",
    category: itemData?.category || "",
    supplier: itemData?.supplier || "",
    quantity: itemData?.quantity || 0,
    minStock: itemData?.minStock || 0,
    price: itemData?.price || 0,
    cost: itemData?.cost || 0,
    status: itemData?.status || "in_stock",
    image: itemData?.image || "",
    lastUpdated: itemData?.lastUpdated || new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["price", "cost", "quantity", "minStock"].includes(name)
        ? parseFloat(value) || 0
        : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form };
    onSubmit(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex min-h-screen items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] md:max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {isEdit ? "Edit Product" : "Add Inventory Item"}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              {isEdit
                ? "Update inventory details"
                : "Fill out product information"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <InputField
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Wireless Mouse"
            icon={Package}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="SKU"
              name="sku"
              value={form.sku}
              onChange={handleChange}
              required
              placeholder="SKU-12345"
              icon={FileText}
            />
            <InputField
              label="Supplier Name"
              name="supplier"
              value={form.supplier}
              onChange={handleChange}
              required
              placeholder="Tech Distributors Inc."
              icon={User}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              options={CATEGORIES}
              required
              icon={Layers}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Quantity in Stock"
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              required
            />
            <InputField
              label="Minimum Stock Level"
              name="minStock"
              type="number"
              value={form.minStock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Price ($)"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
              icon={DollarSign}
            />
            <InputField
              label="Cost per Unit ($)"
              name="cost"
              type="number"
              value={form.cost}
              onChange={handleChange}
              required
              icon={DollarSign}
            />
          </div>

          {/* Inside your AddInventoryForm component */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              <ImageIcon className="inline h-4 w-4 mr-1" />
              Upload Product Image
            </label>

            <div className="flex items-center gap-4">
              {form.image && (
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded border"
                />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setForm((prev) => ({
                        ...prev,
                        image: reader.result, // this is a base64-encoded preview
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="text-sm text-gray-600 border border-gray-300 rounded-lg p-2 w-full sm:w-auto"
              />
            </div>

            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG or GIF. Max size: 5MB.
            </p>
          </div>

          <InputField
            label="Last Updated"
            name="lastUpdated"
            type="date"
            value={form.lastUpdated}
            onChange={handleChange}
            required
            icon={Calendar}
          />
        </div>

        {/* Footer Buttons */}
        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-between">
          <Button
            variant="close"
            onClick={onClose}
            className="px-4 py-2 rounded-full"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            leftIcon={<Plus className="h-4 w-4" />}
            className="order-1 sm:order-2 flex-1 sm:flex-none"
          >
            {isEdit ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </div>
    </div>
  );
}
