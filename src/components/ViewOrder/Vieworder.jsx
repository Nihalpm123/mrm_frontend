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
    
        // **Draw Outer Box**
    doc.rect(3,3,204,56); //x, y, width, height)

    // **Add Company Logo**
    const img = new Image();
    img.src = "/mrmlogo.png"; // Make sure this is in your public folder

    img.onload = function () {
        doc.addImage(img, "PNG", 4, 4, 45, 28);//top le

        // **Business Header - Centered**
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("MRM Garden Foodstuff Trading", 105, 30, { align: "center" });
        doc.text("LLC", 105, 36, { align: "center" });

        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        doc.text("Sama Building 504, AL BARSHA1, DUBAI, UAE", 105, 42, { align: "center" });
        doc.text("Ph: +971588779925  Email: sameermrm9925@gmail.com", 105, 48, { align: "center" });

        // **CheckBox Section (Right Side)**
        let checkBoxX = 150;
        let checkBoxY = 7;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.rect(checkBoxX, checkBoxY, 3, 3); 
        doc.text("Original for Recipient", checkBoxX + 5, checkBoxY + 3);
        
        doc.rect(checkBoxX, checkBoxY + 5, 3, 3)
        doc.text("Duplicate for Transporter", checkBoxX + 5, checkBoxY + 8);

        doc.rect(checkBoxX, checkBoxY + 10, 3, 3)
        doc.text("Triplicate for Supplier", checkBoxX + 5, checkBoxY + 12);

        // **Footer Sale & TRN**
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("SALE", 100, 56, { align: "center" });
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text("TRN: 100601424300003", 140, 56);

          // Invoice Details Section
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(`Invoice No: ${order._id || "N/A"}`, 5, 66);
      doc.text(`Invoice Date: ${new Date(order?.OrderDate).toLocaleDateString() || "N/A"}`, 5, 71);
      doc.text(`State:`, 5, 76);
      doc.text(`State code:`, 35, 76);
      doc.text(`Pay Mode: CASH`, 60, 76);
      doc.line(100, 59, 100, 80);
      doc.text(`Order No: ${order.orderNumber || "N/A"}`, 105, 66);
      doc.text(`Order Date: ${new Date(order?.OrderDate).toLocaleDateString() || "N/A"}`, 105, 71);
      doc.line(207, 59, 207, 80);
      doc.rect(3,80,204,180)
      doc.line(3, 82, 207, 82);//horizondal line  doc.line(x1, y1, x2, y2);
      // Receiver and Consignee Details
      doc.text("Details of Receiver | Billed to:", 5, 88);
      doc.line(100,82,100,112)//vertical line
      doc.text("Details of Consignee | Shipped to:", 105, 88);
      doc.line(3, 90, 207, 90);//horizondal line
      doc.setFont("helvetica", "normal");
      doc.text(`Customer: ${order.userDetails?.username || "N/A"}`, 5, 95);
      doc.text(",", 5, 100);
      doc.text(`Ph: ${order.mobileNumber || "N/A"}`, 5, 105);
      doc.text(`TRN: ${order.userDetails?.TRNno || "N/A"}`,5, 110);
      doc.line(3, 112, 207, 112);
    //   doc.line(3, 114, 207, 114);
      
       // **Table Header**
    const startY = 114;
    doc.setFontSize(9);
    const colWidths = [7, 40, 20, 13, 15, 20, 15, 23, 15, 17, 19];
    const headers = ["No", "Name of Product / Service", "Item Code", "Qty", "Rate", "Gross Amt", "Disc %", "Taxable Value", "VAT %", "VAT Amt", "Total"];
    
    let currentX = 3;
    headers.forEach((header, index) => {
        doc.rect(currentX, startY, colWidths[index], 8);
        doc.text(header, currentX + 2, startY + 5);
        currentX += colWidths[index];
    });

    // **Table Data (Mapped from `order.products`)**
    let dataStartY = startY + 10;
    order.products.forEach((product, index) => {
        let rowX = 3;
        const rowData = [
            index + 1,
            product.productname || "N/A",
            product.itemCode || "N/A",
            product.productquantity || "N/A",
            product.price?.toFixed(2) || "0.00",
            (product.price * product.productquantity).toFixed(2) || "0.00",
            product.discount || "0",
            (product.price * product.productquantity * (1 - product.discount / 100)).toFixed(2),
            "5.00",
            ((product.price * product.productquantity * (1 - product.discount / 100)) * 0.05).toFixed(2),
            ((product.price * product.productquantity * (1 - product.discount / 100)) * 1.05).toFixed(2)
        ];

        rowData.forEach((text, colIndex) => {
            doc.rect(rowX, dataStartY, colWidths[colIndex], 8);
            doc.text(text.toString(), rowX + 2, dataStartY + 5);
            rowX += colWidths[colIndex];
        });
        dataStartY += 8;
    });

    // **Total Calculation Section**
    const finalY = dataStartY + 5;
    doc.setFont("helvetica", "bold");
    doc.text(`Total Before VAT: ${order.TotalAmount?.toFixed(2) || "0.00"}`, 120, finalY);
    doc.text(`VAT Amount: ${(order.TotalAmount * 0.05).toFixed(2) || "0.00"}`, 120, finalY + 5);
    doc.text(`VAT Inclusive Amount: ${(order.TotalAmount * 1.05).toFixed(2) || "0.00"}`, 120, finalY + 10);
    doc.text(`Bill Amount: ${(order.TotalAmount * 1.05).toFixed(2) || "0.00"}`, 120, finalY + 15);

    // **Total Amount in Words**
           
    const amountInWords = `In Words: ${convertToWords(Math.floor(order.TotalAmount * 1.05))} Rupees Only`;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text(amountInWords, 20, finalY + 30);
              

    // **Bank Details**
    doc.setFont("helvetica", "bold");
    doc.text("Bank Details:", 10, finalY + 35);
    doc.setFont("helvetica", "normal");
    doc.text("Name: ", 10, finalY + 40);
    doc.text("A/C NO: ", 10, finalY + 45);
    doc.text("IFSC:", 10, finalY + 50);

    // **Footer**
    doc.text("Received By: _______________", 10, finalY + 60);
    doc.text("For MRM Garden Foodstuff Trading LLC", 140, finalY + 60);
    doc.text("Authorized Signature", 140, finalY + 70);
    doc.text("Powered by NEOPOS.", 140, finalY + 75);
   
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text("Thanks for doing business with us!", 20,240);
    
      // Save the PDF
      doc.save(`invoice_${order?._id || "order"}.pdf`);
}
const convertToWords = (num) => {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + " " + ones[num % 10];
    return num.toString();
};

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
