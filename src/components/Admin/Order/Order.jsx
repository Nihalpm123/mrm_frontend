import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../server";
import "./order.css"
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    axios.get(`${server}/get-order`).then((res) => {
      setOrders(res.data.getOrder);
    });
  }, []);

  const handleVieworder=(id)=>{
    navigate(`/admin/viewOrders/${id}`)
  }
  return (
    <>
      <div className="category-main">
        <h2 className="order-title">All Orders</h2>
        <table className="category-table" >
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Date</th>
              <th>User ID</th>
              <th>Address</th>
              <th>Phone No</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) =>(
              <tr key={index}>
                <td >{index + 1}</td>
                <td>{new Date(order.OrderDate).toLocaleDateString()}</td>
                <td>{order.userId}</td>
                <td>{order.address}</td>
                <td>{order.mobileNumber}</td>
                <td>{order.TotalAmount}</td>
                <td>{order.status}</td>
                <td className="action-box"><button onClick={()=>handleVieworder(order._id)}>View Order</button></td>
              </tr>
            )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderList;
