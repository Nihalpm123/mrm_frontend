import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { server } from "../../server";
import "./ViewOrder.css";
import { toast } from "react-toastify";


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
    //   **Add Company Logo**
    const img = new Image();
    img.src = "/mrmlogo.png"; // Make sure this is in your public folder

    img.onload = function () {
        doc.addImage(img, "PNG", 4, 4, 45, 28);//top le
      doc.save(`invoice_${order?._id || "order"}.pdf`);
    };
}
    
    const handleStatusChange = () => {
        axios.patch(`${server}/update-order/${id}`, { status })
            .then((res) => {
                console.log(res);
                setOrder((prevOrder) => ({
                    ...prevOrder,
                    status: res.data.UpdatedOrder.status,
                }));
            })
            toast.success("Status updated!")
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
                                <th>Name</th>
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
                                        <option value="pending" className="pending">Pending</option>
                                        <option value="processing" className="processing">Processing</option>
                                        <option value="delivered" className="delivered">Delivered</option>
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
