import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../server";

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
        <h2>All Orders</h2>
        <table className="category-table" >
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Date</th>
              <th>User ID</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Product Name</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) =>
              order.products.map((product, pIndex) => (
                <tr key={`${index}-${pIndex}`}>
                  {pIndex === 0 && (
                    <>
                      <td rowSpan={order.products.length} className="categoryname">{index + 1}</td>
                      <td rowSpan={order.products.length} className="categoryname">
                        {new Date(order.OrderDate).toLocaleDateString()}
                      </td>
                      <td rowSpan={order.products.length} className="categoryname">{order.userId}</td>
                      <td rowSpan={order.products.length} className="categoryname">{order.address}</td>
                      <td rowSpan={order.products.length} className="categoryname">{order.mobileNumber}</td>
                    
                    </>
                  )}
                  <td className="categoryname">{product.productname}</td>
                  <td className="categoryname">{product.unit || "-"}</td>
                  <td className="categoryname">{product.productquantity}</td>
                  <td className="categoryname">${product.price}</td>
                  {pIndex === 0 && (
                    <>
                    <td rowSpan={order.products.length} className="categoryname">${order.TotalAmount}</td>
                    <td rowSpan={order.products.length} className="categoryname">{order.status}</td></>
                    
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderList;
