import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { FaChevronDown} from "react-icons/fa";
import "./Admin.css";
import Unit from "./Unit/Unit";
import Product from "./Product/Product";
import Subcategory from "./subcategory/Subcategory";
import Category from "./Category/Category";
import SearchProducts from "./SearchProducts/SearchProducts";
import Dealer from "../Dealers/Dealer";
import Dashboard from "./Dashboard/Dashboard";
import Order from "./Order/Order";
import Vieworder from "../ViewOrder/Vieworder";
import AdminLogin from "../adminlogin/AdminLogin";



const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const navigate = useNavigate();

  // Logout function

  const logout = () => {
   
    // const token= localStorage.getItem("token")
    // if(!token){
    //   navigate("/adminlogin");
    // }
    localStorage.clear();
    // window.location.reload() // Clear stored data
    navigate("/adminlogin");
  };

  // Toggle Dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div  className="outer-box">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="header-wrapper">
        {/* Header */}
        <header className="header-box">
          {/* Page Title */}
          <h1 className="dashboard-title">Admin Dashboard</h1>

          {/* User Account Dropdown */}
          <div className="dropdown">
            <button
              onClick={toggleDropdown}
              className="admin-icons"
            >
              {/* < IoMdContact  className="admin-icon" /> */}
              <FaChevronDown className="down-icon" />
            </button>
            {dropdownOpen && (
              <div className="">
                <button
                  onClick={logout}
                  className="header-logout"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>
       

        {/* Main Content Area */}
        <div className="Routes">
          <Routes>
            <Route path="dashboard" element={<Dashboard/>} />
             <Route path="category" element={<Category/>} />
             <Route path="products" element={ <SearchProducts/>}/>
             <Route path="Subcategory/:id" element={ <Subcategory/>}/>
             <Route path="viewproducts/:id" element={<Product/>}/>
             <Route path="viewOrders/:id" element={<Vieworder/>}/>
             <Route path="orders" element={<Order/>}/>
              <Route path="dealers" element={<Dealer />} /> 
            <Route path="unit" element={<Unit />}/>
            {/* <Route path="logout" element={logout}/>  */}
            {/* // <Route path="disabled product" element={<EditProducts />} />  */}
            
          </Routes>
        </div>
        </div>
      </div>

  );
};

export default Admin;