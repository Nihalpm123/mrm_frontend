import React, { useEffect, useState, useRef } from "react";
import "./SearchProducts.css";
import { FaSearch, FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";

const SearchProducts = () => {
  const [searchProducts, setSearchProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const [productname, setProductname] = useState("");
  const [productImage, setProductimage] = useState([]);
  const [productDescription, setProductdescription] = useState("");
  const [productquantity, setProductQuantity] = useState("");
  const [productMRP, setProductMRP] = useState("");
  const [productEdit, setProductEdit] = useState(false);
  const [productId, setProductId] = useState("");
  const [unit, setUnit] = useState("");

  useEffect(() => {
    axios.get(`${server}/get-products`).then((res) => {
      const newProducts = res.data.getAllproducts;
      setSearchProducts(newProducts);
    });
  }, []);

  useEffect(() => {
    if (!search) {
      setProduct(searchProducts);
    } else {
      const filterData = searchProducts.filter((product) =>
        product.productname.toLowerCase().includes(search)
      );
      setProduct(filterData);
    }
  }, [search, searchProducts]);

  const handleEdit = (product) => {
    setProductname(product.productname);
    setProductdescription(product.productDescription);
    setProductQuantity(product.productquantity);
    setProductMRP(product.productMRP);
    setUnit(product.unit);
    setProductId(product._id);

    const existingImages = product.productImage.map((img) => ({
      preview: img,
    }));
    setProductimage(existingImages);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setProductimage([...newImages]);
  };

  const handleOpenEdit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const updatedProducts = new FormData();
    updatedProducts.append("productname", productname);
    updatedProducts.append("productDescription", productDescription);
    updatedProducts.append("productquantity", productquantity);
    updatedProducts.append("productMRP", productMRP);
    updatedProducts.append("unit", unit);

    if (productImage.length > 0) {
      productImage.forEach((img) =>
        updatedProducts.append("productImage", img.file || img)
      );
    }

    try {
      const res = await axios.patch(
        `${server}/edit-product/${productId}`,
        updatedProducts,
        config
      );
      console.log("Updated Product Response:", res.data.updated);

      if (res.data.message === "product details updated!") {
        const updatedProduct = res.data.updated;

        setProduct((prevData) =>
          prevData.map(
            (prod) => (prod._id === updatedProduct._id ? updatedProduct : prod) // ✅ Updates the table immediately
          )
        );

        toast.success("Product edited successfully!");
        setProductEdit(false);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`${server}/delete-product/${id}`)
        .then((res) =>
          setProduct((data) => data.filter((product) => product._id !== id))
        );
    }
  };

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.productname}</td>
              <td>
                <img src={product.productImage[0]} className="img-preview" />
              </td>
              <td>{product.productDescription}</td>
              <td>{product.unit}</td>
              <td>{product.productquantity}</td>
              <td>{product.productMRP}</td>
              <td className="searchproduct-actions">
                <button>
                  <FaEdit
                    color="black"
                    size="20px"
                    onClick={() => {
                      handleEdit(product);
                      setProductEdit(!productEdit);
                    }}
                  />
                </button>
                <button>
                  <RiDeleteBin5Fill
                    color="black"
                    size="20px"
                    onClick={() => handleDelete(product._id)}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {productEdit && (
        <div className="Productmodel-wrapper">
          <form onSubmit={handleOpenEdit} className="productadd-form">
            <h1>Edit Product</h1>
            <button
              className="modelclose-btn"
              onClick={() => setProductEdit(!productEdit)}
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
              />
              </div>
             <div>
             <label>Product Description:</label>
              <textarea
                type="text"
                value={productDescription}
                onChange={(e) => setProductdescription(e.target.value)}
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
              onChange={handleImageChange}
            />
            
                </div>
            
           <div> <div>
              {productImage.length > 0 ? (
                productImage.map((item, index) => (
                  <img
                    className="img-preview"
                    key={index}
                    src={item.preview || item} //if no previewuse the existing image url
                    alt="preview"
                  />
                ))
              ) : (
                <p>no images selected</p>
              )}
            </div></div>
           </div>
           <div className="inner-div"><div><label>Quantity:</label>
            <input
              type="text"
              value={productquantity}
              onChange={(e) => setProductQuantity(e.target.value)}
            /></div> 
            <div> <label>M.R.P:</label>
            <input
              type="text"
              value={productMRP}
              onChange={(e) => setProductMRP(e.target.value)}
            /></div>
           </div>
           
            <button className="addcategory-btn">Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
