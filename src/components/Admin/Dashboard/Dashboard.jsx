import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import axios from 'axios'
import { server } from '../../../server'
import { FaUser,FaBoxOpen } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";

const Dashboard = () => {

  const [dealers, setDealers] = useState([])
  const [orders, setOrders] = useState([])


  useEffect(()=>{
    axios.get(`${server}/getusers`).then((res)=>{
      setDealers(res.data.allUser)
    })
  },[])

  const orderSearch = () =>{
    axios.get(`${server}/get-order`).then((res)=>{
      console.log(res);
      
      setOrders(res.data.getOrder)
    })
  }

  useEffect(()=>{
    orderSearch()
  },[])

  console.log(orders);
  
  return (
    <>
    <div className='dashboard'>
        
        <div className='items'>
          <div className='icon'>
            <FaUser />
          </div> 
          Dealers
          <p>{dealers.length}</p>
        </div>
        <div className='items'>
          <div className='icon'>
            <FaFileInvoice />
          </div> 
          orders
          <p>{orders.length}</p>
        </div>
        <div className='items'>
          <div className='icon'>
            <FaBoxOpen />
          </div>
          deliverd orders
          </div>
        <div className='items'>
          <div className='icon'>
            <MdOutlinePendingActions />
          </div>
          pending orders
          </div>
    </div>
    </>
  )
}

export default Dashboard