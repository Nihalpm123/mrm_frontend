import React, { useEffect, useState,useRef } from "react";
import "./SearchProducts.css";
import { FaSearch, FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from "axios";
import { server } from "../../../server";

const SearchProducts = () => {
  const [searchProducts, setSearchProducts] = useState([]);
  const [search, setSearch] = useState("");
  const tableRef = useRef(null);

  useEffect(() => {
    axios.get(`${server}/get-products`).then((res) => {
      const newProducts = res.data.getAllproducts;
      setSearchProducts(newProducts);
    });
  }, []);

  const keys = [
    "productname",
    "productImage",
    "productDescription",
    "productquantity",
    "productMRP",
  ];

  return (
    <div>
      <div className="upper-addbox">
        <div className="searchbox">
          <input
            type="text"
            placeholder="search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="upper-addbtn">
          <FaSearch />
        </button>
      </div>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th>Sl.no</th>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>M.R.P</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchProducts
            .filter((product) =>
              Object.keys(product).some((key =>typeof product[key] === 'string' && product[key].toLowerCase().includes(search))
            ))
            .map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.productname}</td>
                <td><img src={product.productImage}className="img-preview"/></td>
                <td>{product.productDescription}</td>
                <td>{product.productquantity}</td>
                <td>{product.productMRP}</td>
                <td className="searchproduct-actions">
                    <button><FaEdit  color='white'  size="12px" /></button>
                    <button><RiDeleteBin5Fill   color='white' size="12px" /></button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchProducts;
