import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../server";

import "./Order.css";

import "./order.css"


const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${server}/get-order`).then((res) => {
      setOrders(res.data.getOrder);
    });
  }, []);

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
              {/* <th>Product Name</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>Price</th> */}
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
                <td>${order.TotalAmount}</td>
                <td>{order.status}</td>
                <td className="action-box"><button>View Order</button></td>
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
