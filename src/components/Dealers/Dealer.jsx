import React, { useEffect, useState } from 'react'
import './Dealer.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../server';

const Dealer = () => {

  const navigate = useNavigate()
  const [owner, setOwner] = useState("")
  const [shopname, setShopname] = useState([]);
  const [phonenumber, setPhonenumber] = useState(null);
  const [whatsappnumber, setWhatsappnumber] = useState(null);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [addDealerOpen, setDealerOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false)
  const [trnnumber, setTrnnumber] = useState()
  const [dealers, setDealers] = useState([])
  const [dealersId, setDealersId] = useState("")
  
  useEffect(()=>{
    axios.get(`${server}/getusers`).then((res)=>{
      setDealers(res.data.allUser)
    })
  },[dealers])

  const handleDelete = (id) =>{
    axios.delete(`${server}/deleteuser/${id}`).then((res)=>{
      console.log(res);
      
      setDealers((preuser) => preuser.filter((user) => user._id !== id))
      
    })
  }

  const handleEdit = (item) =>{
    setDealerOpen(true)
    setOwner(item.username)
    setShopname(item.shopname)
    setPhonenumber(item.phonenumber)
    setWhatsappnumber(item.whatsappno)
    setAddress(item.address)
    setLocation(item.location)
    setTrnnumber(item.TRNno)
    setDealersId(item._id)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.patch(`${server}/updateuser/${dealersId}`,{
      username: owner,
      shopname: shopname,
      phonenumber: phonenumber,
      whatsappno: whatsappnumber,
      address: address,
      location: location,
      TRNno: trnnumber
    }).then((res)=>{
      console.log(res);
      const updatedData = res.data.user
      setDealers((predealers)=> predealers.map((dealers)=> dealers._id === updatedData._id ? {...dealers, ...updatedData}:dealers))
      setDealerOpen(false)
    })
  }
  

  return (
    <div>
    {/* <div className="upper-addbox">
      <button
        className="upper-addbtn"
        onClick={() => setDealerOpen(!addDealerOpen)}
      >
        +Add
      </button>
    </div> */}
       <h1>Dealers</h1>
    <div className="category-main">
      
        <table className="category-table">
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Owner</th>
              <th>Shop Name</th>
              <th>Phone Number</th>
              <th>Whatsapp Number</th>
              <th>Location</th>
              <th>Address</th>
              <th>TRN no</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
                {dealers.map((dealers, index)=>(
                  <tr key={dealers._id}>
                  <td>
                   {index+ 1}
                  </td>
                  <td className="categoryname">{dealers.username}</td>
                  <td className="categoryname">{dealers.shopname}</td>
                  <td className="categoryname">{dealers.phonenumber}</td>
                  <td className="categoryname">{dealers.whatsappno}</td>
                  <td className="categoryname">{dealers.location}</td>
                  <td className="categoryname">{dealers.address}</td>
                  <td className="categoryname">{dealers.TRNno}</td>
                  <td className="action-box">
                  <button className="actionedit-btn" onClick={() => handleEdit(dealers)}>Edit</button>
                  <button className="actiondelete-btn" onClick={()=> handleDelete(dealers._id)}>Delete</button>
                  </td>
                </tr>
                ))}
                   
             </tbody>
        </table>
    
      
    </div>

    {addDealerOpen && (
      <div className="addcategory-wrapper">
        <form className="addcategory-form" onSubmit={handleSubmit}>
        <button className="modelclose-btn" onClick={()=>setDealerOpen(!addDealerOpen)}>X</button>
          <label className="text">Owner:</label>
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
          />
          <label className="text">Shopname:</label>
          <input
            type="text"
            value={shopname}
            onChange={(e) => setShopname(e.target.value)}
            required
          />
          <label className="text">Phone Number:</label>
          <input
            type="number"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            required
          />
          <label className="text">Whatsapp Number:</label>
          <input
            type="number"
            value={whatsappnumber}
            onChange={(e) => setWhatsappnumber(e.target.value)}
            required
          />
          <label className="text">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label className="text">Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <label className="text">TRN no:</label>
          <input
            type="text"
            value={trnnumber}
            onChange={(e) => setTrnnumber(e.target.value)}
            required
          />
          <button type="submit" className="addcategory-btn">
            Update Dealer
          </button>
        </form>
      </div>
      )}
    
    
  </div>
  )
}

export default Dealer