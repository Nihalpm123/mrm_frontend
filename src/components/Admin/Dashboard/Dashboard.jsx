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
          <div className='details'>
            <h4>Dealers</h4>
            <p>{dealers.length}</p>
          </div>
          
        </div>
        <div className='items'>
          <div className='icon'>
            <FaFileInvoice />
          </div> 
          <div className='details'>
            <h4>Orders</h4>
            <p>{dealers.length}</p>
          </div>
        </div>


        <div className='items'>
          <div className='icon'>
            <FaBoxOpen />
          </div>
          <div className='details'>
            <h4>Dealers</h4>
          </div>
          </div>


        <div className='items'>
          <div className='icon'>
            <MdOutlinePendingActions />
          </div>
          <div className='details'>
            <h4>Dealers</h4>
          </div>
          </div>
    </div>
    </>
  )
}

export default Dashboard