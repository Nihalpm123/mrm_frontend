import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { server } from "../../server";
import "./ViewOrder.css";


const ViewOrder = () => {
    const [order, setOrder] = useState(null);
    const { id } = useParams();
    const [status, setStatus] = useState("");
    const[user,setUser]=useState(null);

    useEffect(() => {
        axios.get(`${server}/get-order/${id}`)
            .then((res) => {
                console.log(res.data.getOrderID);
                
                setOrder(res.data.getOrderID);
                
                
            })
            .catch((err) => console.error("Error fetching order:", err));
        
    }, [id]);
    
    
    const generatePDF = () => {
      if (!order) return;
    
      const doc = new jsPDF();
    
      // Header Section
      const img = new Image();
      img.src = "/mrmlogo.png"; // ✅ Correct path from "public" folder
      
      img.onload = function () {
        doc.addImage(img, "PNG", 4, 4, 50, 30); // Add image to PDF

         // Position for bullets at the top-right side
    const pageWidth = doc.internal.pageSize.width; // Get page width
    const bulletX = pageWidth - 65; // Adjust X position near right margin
    const bulletY = 5; // Adjust Y position

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    // Add checkbox-style bullet points
    doc.text("Original for Recipient", bulletX, bulletY);
    doc.text("Duplicate for Transporter", bulletX, bulletY + 5);
    doc.text("Triplicate for Supplier", bulletX, bulletY + 10);

    
        // Continue generating the invoice **after the image is loaded**
        addTextAndTable(doc);
      };
    };

    const addTextAndTable = (doc) => {

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("MRM Garden Foodstuff Trading ", 60, 35);
      doc.text("LLC", 90, 40);
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.text("Sama Building 504, AL BARSHA1, DUBAI, UAE", 60, 50);
      doc.text("Ph: +971588779925  Email: sameermrm9925@gmail.com", 50, 55);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("SALE ", 100, 63);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("TRN: 100601424300003", 150, 63);
    
      // Invoice Details Section
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(`Invoice No: ${order._id || "N/A"}`, 5, 70);
      doc.text(`Invoice Date: ${new Date(order?.OrderDate).toLocaleDateString() || "N/A"}`, 5, 75);
      doc.text(`Order No: ${order.orderNumber || "N/A"}`, 105, 70);
      doc.text(`Order Date: ${new Date(order?.OrderDate).toLocaleDateString() || "N/A"}`, 105, 75);
      doc.text(`State:`, 5, 80);
      doc.text(`State code:`, 35, 80);
      doc.text(`Pay Mode: CASH`, 60, 80);
    
      // Receiver and Consignee Details
      doc.text("Details of Receiver | Billed to:", 5, 90);
      
      doc.setFont("helvetica", "normal");
      doc.text(`Customer: ${order.userDetails?.username || "N/A"}`, 5, 100);
      doc.text(",", 5, 95);
      doc.text(`Ph: ${order.mobileNumber || "N/A"}`, 5, 105);
      doc.text(`TRN: ${order.userDetails?.TRNno || "N/A"}`,5, 110);
      doc.text("Details of Consignee | Shipped to:", 105, 90);
    
      // doc.setFont("helvetica", "bold");
      // doc.text("Details of Consignee | Shipped to:", 120, 55);
      // doc.setFont("helvetica", "normal");
      // doc.text(`Customer: ${order.consignee?.name || "N/A"}`, 120, 60);
      // doc.text(`Phone: ${order.consignee?.mobile || "N/A"}`, 120, 65);
      // doc.text(`Address: ${order.consignee?.address || "N/A"}`, 120, 70);
    
      // Table Header & Data
      const tableColumnHeaders = [
        "No", "Item Code", "Product Name", "Qty", "Unit", "Rate", "Gross Amt", "Disc %", "Taxable Value", "VAT %", "VAT Amt", "Total"
      ];
      
      const tableData = order.products?.map((product, index) => [
        index + 1,
        product.itemCode || "N/A",
        product.productname || "N/A",
        product.productquantity || "N/A",
        product.unit || "N/A",
        product.price?.toFixed(2) || "0.00",
        (product.price * product.productquantity).toFixed(2) || "0.00",
        product.discount || "0",
        (product.price * product.productquantity * (1 - (product.discount / 100))).toFixed(2),
        "5.00",
        ((product.price * product.productquantity * (1 - (product.discount / 100))) * 0.05).toFixed(2),
        ((product.price * product.productquantity * (1 - (product.discount / 100))) * 1.05).toFixed(2)
        
      ]);
    
      autoTable(doc, {
        startY: 120,
        head: [tableColumnHeaders],
        body: tableData,
        theme: "striped",
        headStyles: { fillColor: [255, 255, 255], textColor: [0,0,0], fontStyle: "bold" },
        alternateRowStyles: { fillColor: [255, 255, 255] },
        styles: { fontSize: 8 }
      });
    
      const finalY = doc.lastAutoTable.finalY + 0;
    
      // Summary Section
      doc.setFont("helvetica", "bold");
      doc.text(`Total Before VAT: ${order.TotalAmount?.toFixed(2) || "0.00"}`, 5, finalY);
      doc.text(`VAT Amount: ${(order.TotalAmount * 0.05).toFixed(2) || "0.00"}`, 5, finalY + 5);
      doc.text(`VAT Inclusive Amount: ${(order.TotalAmount * 1.05).toFixed(2) || "0.00"}`, 5, finalY + 10);
      doc.text(`Balance Due: ${(order.TotalAmount * 1.05).toFixed(2) || "0.00"}`, 5, finalY + 20);
    
      // Convert Total to Words
      const numberToWords = (num) => {
        const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
        const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
        const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    
        if (num < 10) return ones[num];
        if (num < 20) return teens[num - 10];
        if (num < 100) return tens[Math.floor(num / 10)] + " " + ones[num % 10];
        return num.toString(); // Fallback for large numbers
      };
    
      const amountInWords = `In Words: ${numberToWords(Math.floor(order.TotalAmount * 1.05))} Rupees Only`;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.text(amountInWords, 20, finalY + 30);
    
      // Bank Details Section
      // doc.setFont("helvetica", "bold");
      // doc.text("Bank Details:", 120, finalY);
      // doc.setFont("helvetica", "normal");
      // doc.text("Bank: Emirates Islamic", 120, finalY + 5);
      // doc.text("Account No: 000XXXXXX12", 120, finalY + 10);
      // doc.text("IFSC Code: EI12345678", 120, finalY + 15);
    
      // Footer Section
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.text("Thanks for doing business with us!", 20,250);
      doc.text("Authorised Signature", 150,270);
    
      // Save the PDF
      doc.save(`invoice_${order?._id || "order"}.pdf`);
    };
    
    const handleStatusChange = () => {
        axios.patch(`${server}/update-order/${id}`, { status })
            .then((res) => {
                console.log(res);
                setOrder((prevOrder) => ({
                    ...prevOrder,
                    status: res.data.UpdatedOrder.status,
                }));
            })
            .catch((err) => console.error("Error updating status:", err));
    };

    return (
        <>
            {order ? (
                <>
                    <table className="category-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>User Name</th>
                                <th>Address</th>
                                <th>Phone No</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{new Date(order?.OrderDate).toLocaleDateString()}</td>
                                <td>{order.userDetails.username || "No User"}</td>
                                {/* <td>{order?.userDetails?.username}</td> */}
                                <td>{order?.address}</td>
                                <td>{order?.mobileNumber}</td>
                                <td>{order?.TotalAmount?.toFixed(2)}</td>
                                <td className="status_update">
                                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                    <button onClick={handleStatusChange} className="status_updatebtn">
                                        Update
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="category-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Unit</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.products?.map((product, index) => (
                                <tr key={index}>
                                    <td>{product?.productname || "N/A"}</td>
                                    <td>
                                        <img src={product?.productImage || ""} alt={product?.productname || "Product"} />
                                    </td>
                                    <td>{product?.unit || "N/A"}</td>
                                    <td>{product?.productquantity || "N/A"}</td>
                                    <td>{product?.price?.toFixed(2) || "0.00"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button type="submit" onClick={generatePDF} className="invoice-btn">
                        <FaArrowDown /> Download Invoice
                    </button>
                </>
            ) : (
                <div>No order available</div>
            )}
        </>
    );
};

export default ViewOrder;
