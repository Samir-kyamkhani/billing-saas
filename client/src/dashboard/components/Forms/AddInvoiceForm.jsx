import React, { useState, useEffect } from "react";
import {
  Plus,
  X,
  User,
  FolderOpen,
  MapPin,
  DollarSign,
  Calendar,
  CreditCard,
  FileText,
} from "lucide-react";
import InputField from "../InputField";
import Button from "../Button";

const DEFAULT_CLIENT_IMG =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format";

// Mock Select component since react-select isn't available
const Select = ({
  options,
  value,
  onChange,
  placeholder,
  components,
  isClearable,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className={`w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white cursor-pointer flex items-center justify-between focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? (
          components?.SingleValue ? (
            <components.SingleValue data={value} />
          ) : (
            <span>{value.label}</span>
          )
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {components?.Option ? (
                <components.Option data={option} />
              ) : (
                option.label
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function AddInvoiceForm({
  onSubmit = () => {},
  onClose = () => {},
  isEdit = false,
  invoiceData = {},
  clients = [
    {
      clientid: 1,
      name: "John Doe",
      image: DEFAULT_CLIENT_IMG,
      address: "123 Main St, New York, NY",
    },
    {
      clientid: 2,
      name: "Jane Smith",
      image: DEFAULT_CLIENT_IMG,
      address: "456 Oak Ave, Los Angeles, CA",
    },
  ],
  projects = [
    { id: 1, title: "Website Redesign", client: { name: "John Doe" } },
    { id: 2, title: "Mobile App", client: { name: "Jane Smith" } },
  ],
}) {
  const clientOptions = clients.map((client) => ({
    value: client.id,
    label: client.name,
    image: client.image || DEFAULT_CLIENT_IMG,
    address: client.address || "",
  }));

  const projectOptions = projects.map((project) => ({
    value: project.id,
    label: `${project.title} / ${project.client?.name || ""}`,
  }));

  const [form, setForm] = useState({
    invid:
      invoiceData?.invid || `INV-${Math.floor(10000 + Math.random() * 90000)}`,
    client: null,
    project: null,
    clientAddress: "",
    amount: parseFloat(invoiceData?.amount) || "",
    discount: parseFloat(invoiceData?.discount) || "",
    tax: parseFloat(invoiceData?.tax) || "",
    issueDate:
      invoiceData?.issueDate?.slice(0, 10) ||
      new Date().toISOString().slice(0, 10),
    dueDate: invoiceData?.dueDate?.slice(0, 10) || "",
    notes: invoiceData?.notes || "",
    paymentGateway: invoiceData?.paymentGateway || "",
  });

  useEffect(() => {
    if (clients.length && invoiceData?.clientId) {
      const selectedClient = clientOptions.find(
        (c) => String(c.value) === String(invoiceData?.clientId)
      );
      if (selectedClient) {
        setForm((prev) => ({
          ...prev,
          client: selectedClient,
          clientAddress: selectedClient.address,
        }));
      }
    }

    if (projects.length && invoiceData?.projectId) {
      const selectedProject = projectOptions.find(
        (p) => String(p.value) === String(invoiceData?.projectId)
      );
      if (selectedProject) {
        setForm((prev) => ({
          ...prev,
          project: selectedProject,
        }));
      }
    }
  }, [clients, projects, invoiceData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["amount", "discount"];
    setForm((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? parseFloat(value) || 0 : value,
    }));
  };

  const handleClientChange = (selected) => {
    setForm((prev) => ({
      ...prev,
      client: selected,
      clientAddress: selected?.address || "",
    }));
  };

  const handleProjectChange = (selected) => {
    setForm((prev) => ({
      ...prev,
      project: selected,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.client || !form.project) {
      alert("Please select both a client and a project.");
      return;
    }

    const payload = {
      ...form,
      clientId: form.client.value,
      projectId: form.project.value,
    };

    onSubmit(payload);
    onClose();
  };

  const ClientOption = ({ data }) => (
    <div className="flex items-center space-x-3 w-full">
      <img
        src={data.image}
        alt={data.label}
        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-900 truncate">{data.label}</div>
        <div className="text-sm text-gray-500 truncate">{data.address}</div>
      </div>
    </div>
  );

  const ClientSingleValue = ({ data }) => (
    <div className="flex items-center space-x-2">
      <img
        src={data.image}
        alt={data.label}
        className="w-6 h-6 rounded-full object-cover"
      />
      <span className="font-medium">{data.label}</span>
    </div>
  );

  const totalAmount = form.amount - form.amount * (form.discount / 100);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm min-h-screen flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] md:max-h-[95vh]  overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {isEdit ? "Edit Invoice" : "Create New Invoice"}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              {isEdit
                ? "Update the invoice details"
                : "Enter the details for the new invoice"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Invoice ID */}
            <InputField
              label="Invoice ID"
              name="invid"
              value={form.invid}
              disabled
              readOnly
              icon={FileText}
            />

            {/* Client and Project Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <User className="inline h-4 w-4 mr-1" />
                  Client <span className="text-red-500">*</span>
                </label>
                <Select
                  options={clientOptions}
                  value={form.client}
                  onChange={handleClientChange}
                  placeholder="Select a client"
                  components={{
                    Option: ClientOption,
                    SingleValue: ClientSingleValue,
                  }}
                  isClearable
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <FolderOpen className="inline h-4 w-4 mr-1" />
                  Project <span className="text-red-500">*</span>
                </label>
                <Select
                  options={projectOptions}
                  value={form.project}
                  onChange={handleProjectChange}
                  placeholder="Select a project"
                  isClearable
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {" "}
              {/* Client Address */}
              <InputField
                label="Client Address"
                name="clientAddress"
                value={form.clientAddress}
                onChange={handleChange}
                placeholder="e.g., 123 Main Street, NY"
                icon={MapPin}
              />
              <InputField
                label="Tax (%)"
                name="tax"
                type="number"
                value={form.tax}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            {/* Amount and Discount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Amount"
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                required
                placeholder="0.00"
                icon={DollarSign}
              />
              <InputField
                label="Discount (%)"
                name="discount"
                type="number"
                value={form.discount}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            {/* Total Amount Display */}
            {form.amount > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Total Amount:
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
                {form.discount > 0 && (
                  <div className="text-sm text-gray-500 mt-1">
                    Original: ${form.amount.toFixed(2)} | Discount:{" "}
                    {form.discount}%
                  </div>
                )}
                {form.tax > 0 && (
                  <div className="text-sm text-gray-500 mt-1">
                    Original: ${form.amount.toFixed(2)} | tax: {form.tax}%
                  </div>
                )}
              </div>
            )}

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Issue Date"
                name="issueDate"
                type="date"
                value={form.issueDate}
                onChange={handleChange}
                required
                icon={Calendar}
              />
              <InputField
                label="Due Date"
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
                required
                icon={Calendar}
              />
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-between">
          {" "}
          <div className="bg-gray-50  flex flex-col sm:flex-row gap-3 sm:justify-between">
            <Button
              variant="close"
              size="icon"
              onClick={onClose}
              aria-label="Close"
              className="text-gray-700 px-4 py-2 bg-gray-300 border border-gray-400 hover:bg-gray-400 hover:border-gray-500 hover:text-gray-900 rounded-full transition-colors duration-200 ease-in-out"
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
              {isEdit ? "Update Invoice" : "Create Invoice"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
