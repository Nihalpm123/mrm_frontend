import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { server } from "../../../server";
import { FaUser, FaBoxOpen } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";

const Dashboard = () => {
  const [dealers, setDealers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${server}/getusers`).then((res) => {
      setDealers(res.data.allUser);
    });
  }, []);

  useEffect(() => {
    axios.get(`${server}/get-order`).then((res) => {
      setOrders(res.data.getOrder);
    });
  }, []);

  console.log(orders);

  return (
    <>
      <div className="dashboard-wrapper">
        <div className="dashboard">
          <div className="items">
            <div className="icon">
              <FaUser />
            </div>
            Dealers
            <p>{dealers.length}</p>
          </div>
          <div className="items">
            <div className="icon">
              <FaFileInvoice />
            </div>
            orders
            <p>{orders.length}</p>
          </div>
          <div className="items">
            <div className="icon">
              <FaBoxOpen />
            </div>
            deliverd orders
          </div>
          <div className="items">
            <div className="icon">
              <MdOutlinePendingActions />
            </div>
            pending orders
          </div>
         
        </div>
        <div className="category-main">
            <h2 className="order-title">Recent Orders</h2>
            <table className="category-table">
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
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(order.OrderDate).toLocaleDateString()}</td>
                    <td>{order.userId}</td>
                    <td>{order.address}</td>
                    <td>{order.mobileNumber}</td>
                    <td>${order.TotalAmount}</td>
                    <td>{order.status}</td>
                    <td className="action-box">
                      <button>View Order</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </>
  );
};

export default Dashboard;
