import { useState, useCallback, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { invoices as initialInvoices, statusClasses } from "../..";
import InvoiceDownloadButton from "../components/InvoiceDownloadButton";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import AddInvoiceForm from "../components/Forms/AddInvoiceForm";

const InvoicesPage = () => {
  const [invoiceList, setInvoiceList] = useState(initialInvoices);
  const [filter, setFilter] = useState("All");
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [editInvoiceData, setEditInvoiceData] = useState(null);

  const filteredInvoices = useMemo(() => {
    if (filter === "All") return invoiceList;
    return invoiceList.filter((inv) => inv.status === filter);
  }, [filter, invoiceList]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleEditInvoice = useCallback((invoice) => {
    setEditInvoiceData(invoice);
    setShowInvoiceForm(true);
  }, []);

  const handleDeleteInvoice = (invoiceId) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      setInvoiceList((prev) => prev.filter((inv) => inv.id !== invoiceId));
      if (editInvoiceData?.id === invoiceId) {
        setShowInvoiceForm(false);
        setEditInvoiceData(null);
      }
    }
  };

  const handleSave = (invoiceData) => {
    setInvoiceList((prev) => {
      if (editInvoiceData) {
        return prev.map((inv) => (inv.id === invoiceData.id ? invoiceData : inv));
      } else {
        return [...prev, invoiceData];
      }
    });
    setShowInvoiceForm(false);
    setEditInvoiceData(null);
  };

  const handleClose = () => {
    setShowInvoiceForm(false);
    setEditInvoiceData(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border  border-gray-100">
        <PageHeader
          title="Invoices"
          filters={["All", "Paid", "Pending", "Overdue"]}
          onFilterChange={handleFilterChange}
          showSearch
          renderActions={() => (
            <Button
              variant="primary"
              size="md"
              leftIcon={<FaPlus />}
              onClick={() => {
                setEditInvoiceData(null);
                setShowInvoiceForm(true);
              }}
            >
              Add Invoice
            </Button>
          )}
        />
      </div>

      {showInvoiceForm && (
        <AddInvoiceForm
          isEdit={!!editInvoiceData}
          invoiceData={editInvoiceData}
          onSubmit={handleSave}
          onClose={handleClose}
        />
      )}

      {/* Table for desktop */}
      <div className="hidden md:block overflow-auto rounded-lg border border-gray-300 bg-white">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-3">Invoice</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices?.map((inv) => (
              <tr
                key={inv.invid}
                className="border-t border-gray-300 text-sm text-gray-800"
              >
                <td className="px-4 py-3">{inv.invid}</td>
                <td className="px-4 py-3">{inv.client}</td>
                <td className="px-4 py-3">
                  {inv?.products?.map((p) => p.name).join(", ")}
                </td>
                <td className="px-4 py-3">{inv.date}</td>
                <td className="px-4 py-3">{inv.dueDate}</td>
                <td className="px-4 py-3">{inv.amount}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusClasses[inv.status] || "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEditInvoice(inv)}
                    >
                      Edit
                    </Button>
                    <button
                      className="text-red-600 hover:text-red-800 text-sm"
                      onClick={() => handleDeleteInvoice(inv.invid)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <InvoiceDownloadButton invoice={inv} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {filteredInvoices?.map((inv) => (
          <div
            key={inv.invid}
            className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-gray-800">{inv.invid}</h4>
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${
                  statusClasses[inv.status] || "bg-gray-200 text-gray-800"
                }`}
              >
                {inv.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              <strong>Client:</strong> {inv.client}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Orders:</strong>{" "}
              {inv?.products?.map((p) => p.name).join(", ")}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Date:</strong> {inv.date}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Due:</strong> {inv.dueDate}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Amount:</strong> {inv.amount}
            </p>

            <div className="flex flex-wrap justify-between items-center gap-3 pt-3">
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEditInvoice(inv)}
                >
                  Edit
                </Button>
                <button
                  className="text-red-600 text-sm font-medium"
                  onClick={() => handleDeleteInvoice(inv.invid)}
                >
                  Delete
                </button>
              </div>
              <InvoiceDownloadButton invoice={inv} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoicesPage;
