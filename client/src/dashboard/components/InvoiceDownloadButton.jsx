import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
// import companyLogo from "../assets/company-logo.png"; // Replace with your actual logo path

const companyLogo = "https://www.shutterstock.com/image-vector/creative-modern-img-letter-logo-260nw-1780496255.jpg";

const InvoiceDownloadButton = ({ invoice }) => {
  const handleDownload = async () => {
    const doc = new jsPDF();

    const primaryColor = "#3f51b5"; // Modern blue
    const textColor = "#212121";

    // Load logo
    const logo = new Image();
    logo.src =
      companyLogo || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    logo.onload = () => {
      // Add white background for clarity
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, 210, 297, "F");

      // === Logo on the left ===
      doc.addImage(logo, "PNG", 10, 10, 50, 25); // X: 10, Y: 10, Width: 50, Height: 25

      // === Invoice header on the right ===
      doc.setTextColor(primaryColor);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("INVOICE", 200, 20, { align: "right" }); // Right-aligned at edge (X: 200)

      // === Invoice details under header ===
      doc.setFontSize(11);
      doc.setTextColor(textColor);
      doc.setFont("helvetica", "normal");
      doc.text(`Invoice ID: ${invoice.id}`, 200, 30, { align: "right" });
      doc.text(`Date: ${invoice.date}`, 200, 36, { align: "right" });
      doc.text(`Due Date: ${invoice.dueDate}`, 200, 42, { align: "right" });

      // === Header dividing line ===
      doc.setDrawColor(primaryColor);
      doc.setLineWidth(1);
      doc.line(10, 48, 200, 48); // Adjusted Y to sit below text

      // Addresses section - side by side
      doc.setFontSize(12);

      // "From" section
      doc.setFont("helvetica", "bold");
      doc.text("From:", 10, 60);
      doc.setFont("helvetica", "normal");
      doc.text(invoice.fromAddress, 10, 66);

      // "To" section (shifted to the right)
      doc.setFont("helvetica", "bold");
      doc.text("To:", 110, 60); // Adjust X value to your preferred distance
      doc.setFont("helvetica", "normal");
      doc.text(invoice.toAddress, 110, 66);

      // Product Table
      autoTable(doc, {
        startY: 100,
        headStyles: {
          fillColor: primaryColor,
          textColor: 255,
          fontStyle: "bold",
        },
        styles: { font: "helvetica", fontSize: 11 },
        head: [["Product", "Quantity", "Price", "Total"]],
        body: invoice.products.map((item) => [
          item.name,
          item.quantity.toString(),
          `₹${item.price.toFixed(2)}`,
          `₹${(item.quantity * item.price).toFixed(2)}`,
        ]),
        theme: "striped",
        alternateRowStyles: { fillColor: "#f5f5f5" },
        margin: { left: 10, right: 10 },
      });

      const finalY = doc.lastAutoTable.finalY || 100;

      // Total amount box on left
      doc.setDrawColor(0); // black border
      doc.setFillColor(245, 245, 245); // light gray background
      doc.rect(10, finalY + 10, 80, 25, "F");
      doc.setFontSize(12);
      doc.setTextColor(0); // black text
      doc.setFont("helvetica", "bold");
      doc.text("Total Amount:", 15, finalY + 20);
      doc.setFont("helvetica", "normal");
      doc.text(`$${invoice.amount.toFixed(2)}`, 15, finalY + 30);

      // Status (no color, just plain box with border)
      doc.setDrawColor(0);
      //   doc.rect(10, finalY + 40, 80, 12); // bordered box, no fill
      doc.setFontSize(10);
      doc.setTextColor(0);
      doc.setFont("helvetica", "bold");
      doc.text(`Status: ${invoice.status}`, 15, finalY + 49);

      // Signature section (on right side)
      if (invoice.signatureImg) {
        const signature = new Image();
        signature.src = invoice.signatureImg;
        signature.onload = () => {
          // Right aligned signature
          doc.addImage(signature, "PNG", 120, finalY + 10, 60, 30);
          doc.setFontSize(10);
          doc.setFont("helvetica", "normal");
          doc.setTextColor(0);
          doc.text(
            "Authorized Signature",
            150,
            finalY + 45,
            null,
            null,
            "center"
          );

          addFooter(doc);
          doc.save(`invoice-${invoice.id}.pdf`);
        };
      } else {
        addFooter(doc);
        doc.save(`invoice-${invoice.id}.pdf`);
      }
    };

    function addFooter(doc) {
      doc.setFontSize(9);
      doc.setTextColor("#888");
      doc.text("Thank you for your business!", 105, 285, null, null, "center");
      doc.text(`Page 1 of 1`, 195, 285);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="ml-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
    >
      Download PDF
    </button>
  );
};

export default InvoiceDownloadButton;
