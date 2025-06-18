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
    console.log("Selected filter:", selectedFilter);
  };

  const handleEditInvoice = useCallback((invoice) => {
    setEditInvoiceData(invoice);
    setShowInvoiceForm(true);
  }, []);

  const handleDeleteInvoice = (invoiceId) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      setInvoiceList((prev) => prev.filter((inv) => inv.id !== invoiceId));
      // If you are editing this invoice, close the form
      if (editInvoiceData && editInvoiceData.id === invoiceId) {
        setShowInvoiceForm(false);
        setEditInvoiceData(null);
      }
    }
  };

  const handleSave = (invoiceData) => {
    setInvoiceList((prev) => {
      if (editInvoiceData) {
        // Edit existing invoice
        return prev?.map((inv) =>
          inv.id === invoiceData.id ? invoiceData : inv
        );
      } else {
        // Add new invoice
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
      <div className="bg-white rounded-xl shadow-sm border p-4 border-gray-100">
        <PageHeader
          title="Invoices"
          filters={["All", "Paid", "Pending", "Overdue"]}
          onFilterChange={handleFilterChange}
          showSearch={true}
          renderActions={() => (
            <Button
              variant="primary"
              size="md"
              leftIcon={<FaPlus />}
              onClick={() => {
                setEditInvoiceData(null); // clear form for new invoice
                setShowInvoiceForm(true);
              }}
            >
              Add Invoice
            </Button>
          )}
        />
      </div>

      {/* Invoice Form Modal */}
      {showInvoiceForm && (
        <AddInvoiceForm
          isEdit={!!editInvoiceData}
          invoiceData={editInvoiceData}
          onSubmit={handleSave}
          onClose={handleClose}
          // clients={clients} // pass your clients here if available
          // projects={projects} // pass your projects here if available
        />
      )}

      {/* Invoice Table */}
      <div className="overflow-auto rounded-lg border border-gray-300 bg-white">
        <table className="w-full min-w-[600px]">
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
                  {inv?.products?.map((order) => order.name).join(", ")}
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
                <td className="py-3 flex items-center justify-center gap-8">
                  <Button
                    variant="secondary"
                    size="md"
                    className="text-blue-600 hover:text-blue-800 font-semibold text-left"
                    onClick={() => handleEditInvoice(inv)}
                  >
                    Edit
                  </Button>
                  <button
                    className="text-red-600 hover:text-red-800 font-semibold text-left"
                    onClick={() => handleDeleteInvoice(inv.invid)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <InvoiceDownloadButton invoice={inv} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesPage;
