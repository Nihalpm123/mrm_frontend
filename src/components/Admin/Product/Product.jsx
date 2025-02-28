import React, { useEffect, useState } from 'react'
import "./Product.css"
import { server } from '../../../server';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const Product = () => {
  const {id}=useParams();
  const [productAdd,setProductadd]=useState(false);
  const [Products,setProducts]=useState ([]);
  const [productname,setProductname]=useState("");
  const [productImage,setProductimage]=useState([]);
  const [productDescription,setProductdescription]=useState("");
  const [productquantity,setProductQuantity]=useState("");
  const [productMRP,setProductMRP]=useState("");
  const [productCategory,setProductCategory]=useState(id || "")

  useEffect(()=>{
    
    axios.get(`${server}/get-product-category/${productCategory}`).then((res)=>{
      const products=res.data.getproductId;
      if(products && products.length >0){
        setProducts(products)
      }
      setProducts(products);
    });
  },[]);
  console.log(Products);
  

  const handleImage=(e)=>{
    if(e.target.files){
      const newfile= Array.from(e.target.files)
      setProductimage((prevsFiles)=>[...prevsFiles,...newfile])
    }
  }

 const handleSubmit =(e)=>{
  e.preventDefault();
  const config={
    headers:{"Content-Type":"multipart/form-data"},
  };

  const productForm= new FormData();
  productForm.append("productname",productname);
  productForm.append("productDescription",productDescription);

  productImage.forEach((file)=>{
    productForm.append("productImage",file)
  })
  productForm.append("productquantity",productquantity);
  productForm.append("productMRP",productMRP);
  if(productCategory){
    productForm.append("productCategory",productCategory);
  }
  axios.post(`${server}/add-product`,productForm,config).then((res)=>{
    const response=res.data.product;
    setProducts((data)=>[response,...data])
    toast.success("Products created!..");
    setProductname("");
    setProductimage("");
    setProductdescription("");
    setProductQuantity(""); 
    setProductMRP("");
    setProductadd(false);
  })
 } 
  return (
    <>
    <div>
      <div className='upper-addbox'>
        <button onClick={()=>setProductadd(!productAdd)} className='upper-addbtn'>Add</button>
      </div>
       <div>
        {Products && Products.length >0?(<table className='product-table'>
          <thead>
              <tr>
                <th>Sl.no</th>
                <th>Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>M.R.P</th>
              </tr>
          </thead>
          <tbody>
            {Products.map((item,index)=>(
                <tr key={index}>
                <td>{index+1}</td>
                 <td>{item.productname}</td>
                 <td><img src={item.productImage[0]} className='img-preview'/></td>
                 <td>{item.productDescription}</td>
                 <td>{item.productquantity}</td>
                 <td>{item.productMRP}</td>
              </tr>
            ))}
          

          </tbody>
        </table>):(
          <div>No Products available</div>
        )}{" "}
        
       </div>
      {productAdd && (
        <div className='Productmodel-wrapper'>
          <form onSubmit={handleSubmit} className='productadd-form'>
            <button className="modelclose-btn" onClick={()=>setProductadd(!productAdd)}>X</button>
            <label>Product Name:</label>
            <input type="text" value={productname} onChange={(e)=>setProductname(e.target.value)}required />
            <label>Product Description:</label>
            <textarea type="text" value={productDescription} onChange={(e)=>setProductdescription(e.target.value)} required/>
            <label>Product Image:</label>
            <input type='file' accept="image/*" multiple  onChange={handleImage } required/>
            <div>
              {productImage.map((item)=>(
                <img className='img-preview' src={URL.createObjectURL(item)}/>
              ))}
            </div>
            <label>Quantity:</label>
            <input type="text" value={productquantity} onChange={(e)=>setProductQuantity(e.target.value)} required />
            <label>M.R.P:</label>
            <input type="text" value={productMRP} onChange={(e)=>setProductMRP(e.target.value)} required/>
            <button>Add</button>
          </form>
        </div>
      ) }
     
    </div>
    </>
  )
}

export default Product