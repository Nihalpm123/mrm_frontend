import React, { useEffect, useState } from "react";
import "./Product.css";
import { server } from "../../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [productAdd, setProductadd] = useState(false);
  const [Products, setProducts] = useState([]);
  const [productname, setProductname] = useState("");
  const [productImage, setProductimage] = useState([]);
  const [productDescription, setProductdescription] = useState("");
  const [productquantity, setProductQuantity] = useState("");
  const [productMRP, setProductMRP] = useState("");
  const [productCategory, setProductCategory] = useState(id || "");
  const [unit, setUnit] = useState("");
  const [Unitdata, setUnitdata] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/get-product-category/${productCategory}`)
      .then((res) => {
        const products = res.data.getproductId;
        if (products && products.length > 0) {
          setProducts(products);
        }
        setProducts(products);
      });
  }, []);

  useEffect(() => {
    axios.get(`${server}/get-unit`).then((res) => {
      setUnitdata(res.data);
    });
  }, []);
  console.log(unit);

  const handleImage = (e) => {
    if (e.target.files) {
      const newfile = Array.from(e.target.files);
      setProductimage((prevsFiles) => [...prevsFiles, ...newfile]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const productForm = new FormData();
    productForm.append("productname", productname);
    productForm.append("productDescription", productDescription);

    productImage.forEach((file) => {
      productForm.append("productImage", file);
    });
    productForm.append("productquantity", productquantity);
    productForm.append("productMRP", productMRP);
    productForm.append("unit", unit);
    if (productCategory) {
      productForm.append("productCategory", productCategory);
    }
    axios.post(`${server}/add-product`, productForm, config).then((res) => {
      const response = res.data.product;
      setProducts((data) => [response, ...data]);
      toast.success("Products created!..");
      setProductname("");
      setProductimage([]);
      setProductdescription("");
      setProductQuantity("");
      setProductMRP("");
      setUnit("");
      setProductadd(false);
    });
  };
  return (
    <>
      <div>
        <div className="upper-addbox">
          <button
            onClick={() => setProductadd(!productAdd)}
            className="upper-addbtn"
          >
            Add
          </button>
        </div>
        <div>
          {Products && Products.length > 0 ? (
            <table className="product-table">
              <thead>
                <tr>
                  <th>Sl.no</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Unit</th>
                  <th>Quantity</th>
                  <th>M.R.P</th>
                </tr>
              </thead>
              <tbody>
                {Products.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.productname}</td>
                    <td>
                      <img src={item.productImage[0]} className="img-preview" />
                    </td>
                    <td>{item.productDescription}</td>
                    <td>{item.unit}</td>
                    <td>{item.productquantity}</td>
                    <td>{item.productMRP}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No Products available</div>
          )}{" "}
        </div>
        {productAdd && (
          <div className="Productmodel-wrapper">
            <form onSubmit={handleSubmit} className="productadd-form">
              <h1>Add Product</h1>
              <button
                className="modelclose-btn"
                onClick={() => setProductadd(!productAdd)}
              >
                X
              </button>
              <div className="inner-div">
                <div>
                <label>Product Name:</label>
                  <input
                    type="text"
                    value={productname}
                    onChange={(e) => setProductname(e.target.value)}
                    required
                  />
                </div>
                <div>
                  

                  <label>Product Description:</label>
                  <textarea
                    type="text"
                    value={productDescription}
                    onChange={(e) => setProductdescription(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="inner-div">
                <div>
                <label>Product Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImage}
                  required
                />
                
                 <div>
                  {productImage.map((item) => (
                    <img
                      className="img-preview"
                      src={URL.createObjectURL(item)}
                    />
                  ))}
                </div>
                </div>
                
                
               <div className="unit-div"><label>Unit:</label>
                <select value={unit} onChange={(e) => setUnit(e.target.value)} className="select-unit">
                  <option value="" ></option>
                  {Unitdata.map((item, index) => (
                    <option  key={index}>
                      {item.unit}
                    </option>
                  ))}
                </select></div>
                
              </div>
              <div className="inner-div">
                <div><label>Quantity:</label>
                <input
                  type="text"
                  value={productquantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                  required
                /></div>
                <div>
                <label>M.R.P:</label>
                <input
                  type="text"
                  value={productMRP}
                  onChange={(e) => setProductMRP(e.target.value)}
                  required
                />
                </div>
                
              </div>

              <button className="addcategory-btn">Add</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
