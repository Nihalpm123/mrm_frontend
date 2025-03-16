import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
import { server } from "../../server";
import "./ViewOrder.css";

const Vieworder = () => {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios.get(`${server}/get-order/${id}`).then((res) => {
      console.log(res);
      setOrders(res.data.getOrderID);
    });
  }, [id]);

  const handleStatusChange = (id) => {
    axios.patch(`${server}/update-order/${id}`, { status }).then((res) => {
      console.log(res);
      const updatedOrder = res.data.UpdatedOrder;
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, ...updatedOrder } : order
        )
      );
    });
  };

 
  return (
    <>
      {orders.length > 0 ? (
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
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.OrderDate).toLocaleDateString()}</td>
                <td>{order.userDetails.username}</td>
                <td>{order.address}</td>
                <td>{order.mobileNumber}</td>
                <td>{order.TotalAmount}</td>
                <td className="status_update"> 
                  <select value={status} onChange={(e) => setStatus(e.target.value) } >
                    <option>pending</option>
                    <option>processing</option>
                    <option>delivered</option>
                  </select>
                  <button onClick={() => handleStatusChange(order._id)} className="status_updatebtn">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No order available</div>
      )}
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
          {orders.map((order) =>
            order.products.map((product, index) => (
              <tr key={index}>
                <td>{product.productname}</td>
                <td>
                  <img src={product.productImage} />
                </td>
                <td>{product.unit}</td>
                <td>{product.productquantity}</td>
                <td>{product.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button className="invoice-btn" >
        <FaArrowDown /> Download Invoice
      </button>
    </>
  );
};

export default Vieworder;

