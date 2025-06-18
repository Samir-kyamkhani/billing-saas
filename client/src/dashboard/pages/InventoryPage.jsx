import React, { useState, useMemo, useCallback } from "react";
import { Eye, Edit3, Trash2, MoreVertical, Package } from "lucide-react";
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
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
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
                <div className="text-xs text-gray-500">
                  Min: {item.minStock}
                </div>
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
                <div className="flex items-center gap-8 space-x-1">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => onView(item.id)}
                  >
                    View
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    className="text-blue-600 hover:text-blue-800 font-semibold text-left"
                    onClick={() => onEdit(item.id)}
                  >
                    Edit
                  </Button>
                  <button
                    className="text-red-600 hover:text-red-800 font-semibold text-left"
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

  const [showInventoryForm, setshowInventoryForm] = useState(false);
  const [editInventoryeData, setEditInventoryeData] = useState(null);

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

  const handleEdit = useCallback((invoice) => {
    setEditInventoryeData(invoice);
    setshowInventoryForm(true);
  }, []);

  const handleDelete = (invoiceId) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      setInvoiceList((prev) => prev.filter((inv) => inv.id !== invoiceId));
      // If you are editing this invoice, close the form
      if (editInvoiceData && editInvoiceData.id === invoiceId) {
        setshowInventoryForm(false);
        setEditInventoryeData(null);
      }
    }
  };
  const handleView = (item) => console.log("View item:", item);

  const handleSaveInvoice = (invoiceData) => {
    console.log("Saved invoice:", invoiceData);
    setshowInventoryForm(false);
    setEditInventoryeData(null);
  };

  const handleCloseInvoiceForm = () => {
    setshowInventoryForm(false);
    setEditInventoryeData(null);
  };

  return (
    <div>
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
        <PageHeader
          title="Inventory"
          filters={statusFilters}
          categories={categories}
          onFilterChange={() => {}}
          showSearch={true}
          renderActions={() => (
            <Button
              variant="primary"
              size="md"
              leftIcon={<FaPlus />}
              onClick={() => {
                setEditInventoryeData(null);
                setshowInventoryForm(true);
              }}
            >
              Add Inventory
            </Button>
          )}
        />
      </div>

      {showInventoryForm && (
        <AddInventoryForm
          isEdit={!!editInventoryeData}
          invoiceData={editInventoryeData}
          onSubmit={handleSaveInvoice}
          onClose={handleCloseInvoiceForm}
        />
      )}

      {/* <div className="flex items-center justify-between text-sm text-gray-600 my-4">
        <p>
          Showing {filteredInventory.length} of {inventory.length} products
        </p>
        {(searchTerm ||
          selectedCategory !== "All" ||
          selectedStatus !== "All") && (
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setSelectedStatus("All");
            }}
            className="text-blue-600 hover:text-blue-700"
          >
            Clear filters
          </button>
        )}
      </div> */}

      <InventoryTable
        items={filteredInventory}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {filteredInventory.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ||
            selectedCategory !== "All" ||
            selectedStatus !== "All"
              ? "Try adjusting your search or filters"
              : "Get started by adding your first product"}
          </p>
          <button
            onClick={() => setshowInventoryForm(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Inventory
          </button>
        </div>
      )}
    </div>
  );
}
