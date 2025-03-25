import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { server } from "../../../server";
import { FaUser, FaBoxOpen } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dealers, setDealers] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const delivered = orders.filter((order) => order.status === "delivered");
  const pending = orders.filter((order) => order.status === "pending");
  const processing = orders.filter((order) => order.status === "processing");

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

  const handleVieworder = (id) => {
    navigate(`/admin/viewOrders/${id}`);
  };

  return (
    <>
      <div className="dashboard">
        <div className="items">
          <div className="icon">
            <FaUser />
          </div>
          <div className="details">
            <h4>Dealers</h4>
            <p className="box-p">{dealers.length}</p>
          </div>
        </div>
        <div className="items">
          <div className="icon">
            <FaFileInvoice />
          </div>
          <div className="details">
            <h4>Orders</h4>
            <p className="box-p">{orders.length}</p>
          </div>
        </div>

        <div className="items">
          <div className="icon">
            <FaBoxOpen />
          </div>
          <div className="details">
            <h4>Delivered</h4>
            <p className="box-p">{delivered.length}</p>
          </div>
        </div>

        <div className="items">
          <div className="icon">
            <MdOutlinePendingActions />
          </div>
          <div className="details">
            <h4>Pending Orders</h4>
            <p className="box-p">{pending.length}</p>
          </div>
        </div>
      </div>
      <div className="dashboard-wrapper">
        <div className="category-main">
          <h2 className="order-title">Recent Orders</h2>
          <table className="category-table">
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Date</th>
                <th>User Name</th>
                <th>Address</th>
                <th>Phone No</th>
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
                  <td>{order.userDetails.username}</td>
                  <td>{order.address}</td>
                  <td>{order.mobileNumber}</td>
                  <td>₹{order.TotalAmount}</td>
                  <td
                    className={`status ${
                      order.status === "delivered"
                        ? "status-delivered"
                        : order.status === "processing"
                        ? "status-processing"
                        : order.status === "pending"
                        ? "status-pending"
                        : "status-cancelled"
                    }`}
                  >
                    {order.status}
                  </td>

                  <td className="action-box">
                    <button
                      className="view-btn"
                      onClick={() => handleVieworder(order._id)}
                    >
                      View Order
                    </button>

                    {/* <button onClick={()=>handleVieworder(order._id)}>View Order</button> */}
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
