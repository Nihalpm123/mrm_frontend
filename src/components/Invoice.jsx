import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../server";

const InvoicePreview = () => {
    const [orders, setOrders] = useState([]);
    const { id } = useParams();


     useEffect(() => {
        axios.get(`${server}/get-order/${id}`).then((res) => {
          console.log(res);
          setOrders(res.data.getOrderID);
        });
      }, [id]);
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add invoice header
    doc.text(`Invoice ID : ${order._id}`, 20, 20);
    doc.text(`Customer Name : ${order.userDetails.username}`, 20, 30);
    doc.text(`Customer Address : ${order.address}`, 20, 40);
    doc.text(
      `Invoice Date : ${new Date(order.createdAt).toLocaleDateString()}`,
      20,
      50
    );
    doc.text(`Total Amount : $${order.TotalAmount.toFixed(2)}`, 20, 60);

    // Add table for product details
    const tableColumnHeaders = [
      "Product Name",
      "Quantity",
      "Unit",
      "Price (Rs)",
      "Total (Rs)",
    ];
    const tableRows = order.products.map((product) => [
      product.productname,
      product.productquantity,
      product.unit,
      product.price.toFixed(2),
      order.TotalAmount.toFixed(2),
    ]);

    doc.autoTable({
      startY: 70, // Start below the invoice details
      head: [tableColumnHeaders],
      body: tableRows,
    });

    // Save the PDF file
    doc.save(`invoice_${order._id}.pdf`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-[0px_0px_4px_0px_#00000040] rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Invoice Preview
        </h2>
        {orders.map((order,index)=>(
            <> <div className="mb-4 space-y-2">
            <p className="text-gray-600">
              <span className="font-semibold">Order ID: </span>
              {order.userDetails._id}
            </p>
            {/* <p className="text-gray-600">
              <span className="font-semibold">Customer Name: </span>
              {order.userDetails.username}
            </p> */}
            <p className="text-gray-600">
              <span className="font-semibold">Customer Address: </span>
              {order.address}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Invoice Date: </span>
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Total Amount: </span>${" "}
              {order.total}
            </p>
          </div>
          <button
            onClick={generatePDF}
            className="w-full bg-neutral-700 text-white px-4 py-3 rounded-md hover:bg-neutral-800 transition font-semibold text-lg"
          >
            Download as PDF
          </button></>
        ))}
       
      </div>
    </div>
  );
};

export default InvoicePreview;