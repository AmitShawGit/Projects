import { useState } from "react";
import { Link } from "react-router-dom";

let Sidebar = ({ collapseSidebar }) => {


  return (
    <>
      <div className={`${collapseSidebar ? 'hideSidebar' : "sidebar"}`}>
      <ul>
        <li>
          <Link to="/project/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/project/geolocation">Geo Location</Link>
        </li>
        {/* Dropdown  */}
        <li>
          <label htmlFor="check">Products</label>
          <input type="checkbox" id="check" className="d-none checkbox-menu" />
          <ul className="drop-down-menu">
            <li><Link to="/project/add-product">Add Product</Link></li>
            <li><Link to="/project/view-product">View Product</Link></li>

          </ul>
        </li>
      
          <li>
          <Link to="/project/create-post">Chat Bot</Link>
        </li>
          <li>
          <Link to="/project/dynamic-form">Dynamic Form</Link>
        </li>
      </ul>

        
    </div >
    </>
  );
};
export default Sidebar;
