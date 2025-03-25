import React, { useState } from "react";
import "./Sidebar.css";
import { TbRulerMeasure } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import {
  BsCart3,
  BsPersonCircle,
  BsGrid1X2Fill,
  BsExclamationCircle,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsBagXFill,
} from "react-icons/bs";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { icon: <BsGrid1X2Fill />, label: "Dashboard", section: "dashboard" },
    { icon: <BsFillGrid3X3GapFill />, label: "Categories", section: "category" },
    { icon: <BsCart3 />, label: "Orders", section: "orders" },
    { icon: <BsPeopleFill />, label: "Dealers", section: "dealers" },
    { icon: <BsListCheck />, label: "Products", section: "Products" },
    { icon: <TbRulerMeasure />, label: "Unit", section: "unit" },
    { icon: <BsBagXFill />, label: "Disabled product", section: "disabled-product" },
    { icon: <BsExclamationCircle />, label: "Disabled variant", section: "disabled-product" },
    // { icon: <MdLogout />, label: "Logout", section: "logout" },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Sidebar Title & Toggle Button */}
      <div className="menu-title">
        {!isCollapsed && <div className="menutitle-inner"><img src="/mrmlogo.png" className="mrmlogo"/></div>
         }
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? <Bars3Icon  className="menu-icon"/> : <XMarkIcon className="close-icon" />}
        </button>
      </div>

      {/* Menu Items */}
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              {item.icon}
              {!isCollapsed && <Link to={`/admin/${item.section}`}>{item.label}</Link>}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;