import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const InvoiceTemplate = ({ buyer, seller, header, itemsTable, taxesTable, total }) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        // Title
        doc.text(header.title, 14, 10);
        doc.text(header.subtitle, 14, 20);

        // Seller & Buyer Info
        doc.text("Seller:", 14, 40);
        doc.text(seller.name, 14, 50);
        doc.text(seller.addressLine1, 14, 60);
        doc.text(seller.addressLine2, 14, 70);

        doc.text("Buyer:", 110, 40);
        doc.text(buyer.name, 110, 50);
        doc.text(buyer.addressLine1, 110, 60);
        doc.text(buyer.addressLine2, 110, 70);

        // Table Data
        const tableColumn = ["Name of the customer","Address","Phone number", "Quantity","Name of the product", " Price","Gross Price","Disc %","Taxable Value", "VAT Rate"];
        const tableRows = [];

        itemsTable.forEach((item) => {
            tableRows.push([item.name, item.count, `${item.netPrice} PLN`, item.vatRate, `${item.grossValue} PLN`]);
        });

        doc.autoTable({
            startY: 90,
            head: [tableColumn],
            body: tableRows,
        });

        // Total
        doc.text(`Total Amount: ${total.totalValue} ${total.currency}`, 14, doc.autoTable.previous.finalY + 20);

        // Save the PDF
        doc.save("invoice.pdf");
    };

    return (
        <div>
            <h2>{header.title}</h2>
            <button onClick={generatePDF}>Download PDF</button>
        </div>
    );
};

export default InvoiceTemplate;
