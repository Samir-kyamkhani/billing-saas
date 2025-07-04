import React, { useState, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { User } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import AddCustomerForm from "../components/Forms/AddCustomerForm"; // You need to create this
import { customers as customerData } from "../.."; // Sample data source

const CustomersTable = ({ customers, onEdit, onDelete, onView }) => (
  <div className=" overflow-hidden">
    <div className="overflow-x-auto ">
      {/* Table for medium and up screens */}
      <table className="w-full min-w-[600px] bg-white rounded-xl shadow-sm border overflow-hidden hidden sm:table">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            {[
              "Customer ID",
              "Name",
              "Email",
              "Phone",
              "Location",
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
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="border-t border-gray-300 text-sm text-gray-800"
            >
              <td className="px-6 py-4 font-medium text-gray-900">
                {customer.customerId}
              </td>
              <td className="px-6 py-4">{customer.name}</td>
              <td className="px-6 py-4">{customer.email}</td>
              <td className="px-6 py-4">{customer.phone}</td>
              <td className="px-6 py-4">{customer.location}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-4 space-x-1">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => onView(customer.id)}
                  >
                    View
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    className="text-blue-600 hover:text-blue-800 font-semibold text-left"
                    onClick={() => onEdit(customer.id)}
                  >
                    Edit
                  </Button>
                  <button
                    className="text-red-600 hover:text-red-800 font-semibold text-left"
                    onClick={() => onDelete(customer.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Card layout for small screens */}
      <div className="sm:hidden space-y-4 py-2">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="mb-2">
              <span className="font-semibold text-gray-700">Customer ID: </span>
              <span>{customer.customerId}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">Name: </span>
              <span>{customer.name}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">Email: </span>
              <span>{customer.email}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">Phone: </span>
              <span>{customer.phone}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Location: </span>
              <span>{customer.location}</span>
            </div>
            <div className="flex gap-4">
              <Button variant="primary" size="sm" onClick={() => onView(customer.id)}>
                View
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="text-blue-600 hover:text-blue-800 font-semibold"
                onClick={() => onEdit(customer.id)}
              >
                Edit
              </Button>
              <button
                className="text-red-600 hover:text-red-800 font-semibold"
                onClick={() => onDelete(customer.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function CustomersPage() {
  const [customers, setCustomers] = useState(customerData);
  const [showForm, setShowForm] = useState(false);
  const [editCustomerData, setEditCustomerData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  const handleEdit = (id) => {
    const customer = customers.find((c) => c.id === id);
    setEditCustomerData(customer);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers((prev) => prev?.filter((c) => c.id !== id));
    }
  };

  const handleView = (id) => console.log("View customer:", id);

  const handleSaveCustomer = (data) => {
    if (editCustomerData) {
      // Edit existing
      setCustomers((prev) =>
        prev.map((c) => (c.id === data.id ? { ...c, ...data } : c))
      );
    } else {
      // Add new customer
      setCustomers((prev) => [...prev, { ...data, id: Date.now() }]);
    }

    setShowForm(false);
    setEditCustomerData(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditCustomerData(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <PageHeader
          title="Customers"
          showSearch
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          renderActions={() => (
            <Button
              variant="primary"
              size="md"
              leftIcon={<FaPlus />}
              onClick={() => {
                setEditCustomerData(null);
                setShowForm(true);
              }}
            >
              New Customer
            </Button>
          )}
        />
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 max-w-md mx-auto w-full">
          <AddCustomerForm
            isEdit={!!editCustomerData}
            customerData={editCustomerData}
            onSubmit={handleSaveCustomer}
            onClose={handleCloseForm}
          />
        </div>
      )}

      <CustomersTable
        customers={filteredCustomers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {filteredCustomers.length === 0 && (
        <div className="bg-white rounded-xl text-center shadow-sm border border-gray-100 p-8">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No customers found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filters
          </p>
          <Button variant="primary" size="md" onClick={() => setShowForm(true)}>
            Add Customer
          </Button>
        </div>
      )}
    </div>
  );
}
