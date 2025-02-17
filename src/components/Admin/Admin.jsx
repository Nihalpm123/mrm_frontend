import React, { useState, useEffect } from "react";
// import EditProducts from "./AddProducts/EditProducts";
// import AllUsers from "./Users/AllUsers";
// import Category from "./Category/Category";
// import Orders from "./Allorders/Orders";
import { IoMdContact } from "react-icons/io";
import Sidebar from "./Sidebar/Sidebar";
import { Route, Routes, useNavigate } from "react-router-dom";

import { FaChevronDown } from "react-icons/fa";

// import { Sidebar } from "lucide-react";
// import SubCate from "./Category/SubCate";
// import SubCateProduct from "./Category/SubCateProduct";
// import Unit from "./Unit/Unit";
import "./Admin.css"
import Category from "./Category/category";
import Unit from "./Unit/Unit";

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const navigate = useNavigate();

  // Logout function
  // const logout = () => {
  //   localStorage.clear();
  //   window.location.reload() // Clear stored data
  //   navigate("/login"); // Redirect to login page
  // };

  // Toggle Dropdown
  // const toggleDropdown = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };

  // Close dropdown when clicking outside
  // useEffect(() => {
  //   const handleOutsideClick = (e) => {
  //     if (!e.target.closest(".dropdown")) {
  //       setDropdownOpen(false);
  //     }
  //   };
  //   document.addEventListener("click", handleOutsideClick);
  //   return () => document.removeEventListener("click", handleOutsideClick);
  // }, []);

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
              // onClick={toggleDropdown}
              className="admin-icons"
            >
              < IoMdContact  className="admin-icon" />
              <FaChevronDown className="down-icon" />
            </button>
            {dropdownOpen && (
              <div className="">
                <button
                  onClick={logout}
                  className=""
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
            <Route path="dashboard" element={<div>Dashboard</div>} />
             <Route path="category" element={<Category/>} />
            {/* <Route path="orders" element={<Orders />} />
            <Route path="dealers" element={<AllUsers />} /> */}
            <Route path="unit" element={<Unit />}/> 
            {/* // <Route path="disabled product" element={<EditProducts />} />  */}
            
          </Routes>
        </div>
        </div>
      </div>

  );
};

export default Admin;