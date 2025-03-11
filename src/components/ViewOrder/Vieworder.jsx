import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { server } from "../../server";
import { useParams } from "react-router-dom";
import "./ViewOrder.css"
const Vieworder = () => {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
  const [status,setStatus]=useState("");


  useEffect(() => {
    axios.get(`${server}/get-order/${id}`).then((res) => {
       const Vieworders = res.data.getOrderID;
       setOrders(Vieworders);
    });
  }, [id]);

  const handleStatuschange=(id)=>{
    axios.patch(`${server}/update-order/${id}`,{status}).then((res)=>{
      console.log(res);
       const updatedOrder = res.data.UpdatedOrder
       setOrders((prevOrders) =>
        prevOrders.map((order) => 
          order._id === id ? { ...order, ...updatedOrder} : order
        )
      );
    })
  }
  return (
    <>
      {orders && orders.length > 0 ? (
        <table className="category-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>User Id</th>
              <th>Address</th>
              <th>Phone No</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{new Date(order.OrderDate).toLocaleDateString()}</td>
                <td>{order.userId}</td>
                <td>{order.address}</td>
                <td>{order.mobileNumber}</td>
                <td>{order.TotalAmount}</td>
                <td className="status_update"><select value={status} onChange={(e)=>setStatus(e.target.value)} className="order-select">
                  <option >pending</option>
                  <option >processing</option>
                  <option>delivered</option>
                  </select>
                  <button type="submit" className="status_updatebtn" onClick={()=>handleStatuschange(order._id)}>Update Status</button>
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
          {orders.map((order)=>order.products.map((product,index)=>(
            <tr key={index}>
              <td>{product.productname}</td>
              <td><img src={product.productImage}/></td>
              <td>{product.unit}</td>
              <td>{product.productquantity}</td>
              <td>{product.price}</td>
            </tr>)))}
          
        </tbody>
      </table>
    </>
  );
};

export default Vieworder;
