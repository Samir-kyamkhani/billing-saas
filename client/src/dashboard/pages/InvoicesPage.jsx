import { FaPlus } from "react-icons/fa";
import { invoices, statusClasses } from "../..";
import InvoiceDownloadButton from "../components/InvoiceDownloadButton";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";

const InvoicesPage = () => {
  return (
    <div className="">
      <PageHeader
        title="Invoices"
        filters={["All", "Paid", "Pending", "Overdue"]}
        onFilterChange={(filter) => console.log("Selected:", filter)}
        showSearch={true}
        renderActions={() => (
          <Button
            variant="primary"
            size="md"
            leftIcon={<FaPlus />}
            onClick={() => console.log("Clicked")}
          >
            Add Invoice
          </Button>
        )}
      />

      {/* Table */}
      <div className="overflow-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-3">Invoice</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, idx) => (
              <tr
                key={idx}
                className="border-t border-gray-200 text-sm text-gray-800"
              >
                <td className="px-4 py-3">{inv.id}</td>
                <td className="px-4 py-3">{inv.client}</td>
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
