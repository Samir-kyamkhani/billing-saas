import React, { useState, useMemo, useCallback } from "react";
import { Package } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import { FaPlus } from "react-icons/fa";
import AddInventoryForm from "../components/Forms/AddInventoryForm";
import { mockInventory } from "../..";

const categories = [
  "All",
  "Electronics",
  "Furniture",
  "Office Supplies",
  "Accessories",
];
const statusFilters = ["All", "In Stock", "Low Stock", "Out of Stock"];

const StatusBadge = ({ status }) => {
  const config =
    {
      in_stock: {
        label: "In Stock",
        class: "bg-green-100 text-green-800 border-green-200",
      },
      low_stock: {
        label: "Low Stock",
        class: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      out_of_stock: {
        label: "Out of Stock",
        class: "bg-red-100 text-red-800 border-red-200",
      },
    }[status] || {};

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full border ${config.class}`}
    >
      {config.label}
    </span>
  );
};

const InventoryTable = ({ items, onEdit, onDelete, onView }) => (
  <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px]">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {["Product", "Category", "Stock", "Price", "Status", "Actions"].map(
              (col) => (
                <th
                  key={col}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {item.category}
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">
                  {item.quantity}
                </div>
                <div className="text-xs text-gray-500">Min: {item.minStock}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">
                  ${item.price}
                </div>
                <div className="text-xs text-gray-500">Cost: ${item.cost}</div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={item.status} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onView(item.id)}
                  >
                    View
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onEdit(item.id)}
                  >
                    Edit
                  </Button>
                  <button
                    className="text-red-600 hover:text-red-800 text-sm"
                    onClick={() => onDelete(item.id)}
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

export default function InventoryPage() {
  const [inventory, setInventory] = useState(mockInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [showInventoryForm, setShowInventoryForm] = useState(false);
  const [editInventoryData, setEditInventoryData] = useState(null);

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "In Stock" && item.status === "in_stock") ||
        (selectedStatus === "Low Stock" && item.status === "low_stock") ||
        (selectedStatus === "Out of Stock" && item.status === "out_of_stock");
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [inventory, searchTerm, selectedCategory, selectedStatus]);

  const handleEdit = useCallback((id) => {
    const item = inventory.find((inv) => inv.id === id);
    setEditInventoryData(item);
    setShowInventoryForm(true);
  }, [inventory]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setInventory((prev) => prev.filter((item) => item.id !== id));
      if (editInventoryData?.id === id) {
        setShowInventoryForm(false);
        setEditInventoryData(null);
      }
    }
  };

  const handleView = (id) => console.log("View item:", id);

  const handleSaveInventory = (itemData) => {
    console.log("Saved item:", itemData);
    setShowInventoryForm(false);
    setEditInventoryData(null);
    // Here you can add logic to update or add item in the inventory list
  };

  const handleCloseInventoryForm = () => {
    setShowInventoryForm(false);
    setEditInventoryData(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <PageHeader
          title="Inventory"
          filters={statusFilters}
          categories={categories}
          onFilterChange={() => {}}
          showSearch={true}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          renderActions={() => (
            <Button
              variant="primary"
              size="md"
              leftIcon={<FaPlus />}
              onClick={() => {
                setEditInventoryData(null);
                setShowInventoryForm(true);
              }}
            >
              Add Inventory
            </Button>
          )}
        />
      </div>

      {showInventoryForm && (
        <AddInventoryForm
          isEdit={!!editInventoryData}
          invoiceData={editInventoryData}
          onSubmit={handleSaveInventory}
          onClose={handleCloseInventoryForm}
        />
      )}

      {/* Desktop Table */}
      <InventoryTable
        items={filteredInventory}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {/* Mobile Cards */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {filteredInventory.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-2"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{item.name}</div>
                <div className="text-xs text-gray-500">SKU: {item.sku}</div>
              </div>
              <StatusBadge status={item.status} />
            </div>

            <div className="text-sm text-gray-600">
              <strong>Category:</strong> {item.category}
            </div>
            <div className="text-sm text-gray-600">
              <strong>Stock:</strong> {item.quantity} (Min: {item.minStock})
            </div>
            <div className="text-sm text-gray-600">
              <strong>Price:</strong> ${item.price} <br />
              <small className="text-gray-500">Cost: ${item.cost}</small>
            </div>

            <div className="flex justify-between items-center pt-3 gap-2">
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </Button>
                <button
                  className="text-red-600 text-sm font-medium"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
              <Button variant="primary" size="sm" onClick={() => handleView(item.id)}>
                View
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredInventory.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm !== "" ||
            selectedCategory !== "All" ||
            selectedStatus !== "All"
              ? "Try adjusting your search or filters"
              : "Get started by adding your first product"}
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setEditInventoryData(null);
              setShowInventoryForm(true);
            }}
          >
            Add Inventory
          </Button>
        </div>
      )}
    </div>
  );
}
