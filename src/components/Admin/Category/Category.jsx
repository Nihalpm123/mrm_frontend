import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../../../server";
import "./category.css";
import { toast } from "react-toastify";
const Category = () => {
  const navigate=useNavigate()
  const [category, setCategory] = useState([]);
  const [categoryname, setCategoryname] = useState(null);
  const [categoryImage, setCategoryImage] = useState("");
  const [Hascategory, setHascategory] = useState(false);
  const [addcategoryOpen, setAddcategoryOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false)
  const [categoryId, setCategoryId] = useState("")

  useEffect(() => {
    axios
      .get(`${server}/get-category`)
      .then((res) => {
        const categoryWithoutSubcategory= res.data.getAllcategory.filter((category)=>
        !category.subCategory || category.subCategory.trim()==="")
        setCategory(categoryWithoutSubcategory)
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: { "Content-Type": "multipart/form-data" }, //used file,so we use content type as multipart(as application.json)
    };
    const categoryForm = new FormData();
    categoryForm.append("categoryname", categoryname);
    categoryForm.append("categoryImage", categoryImage);
    categoryForm.append("Hascategory", Hascategory);
    axios.post(`${server}/add-category`, categoryForm, config).then((res) => {
      const response=res.data.category;
      setCategory((data)=>[response,...data])
       toast.success("Category added!...");
      setCategoryname("");
      setCategoryImage("");
      setHascategory(false);
      setAddcategoryOpen(false)
    });
  };

  const handleDelete=(id)=>{
    if(
      window.confirm("Are you sure you want to delete this category?")) {
        axios.delete(`${server}/delete-category/${id}`).then((res)=>setCategory(
          (data)=>data.filter((item)=>item._id!==id)
        ))
      }
    
    
   
  }  


  const handleEdit = (item)=>{
    setEditOpen(true)
    setCategoryname(item.categoryname)
    setHascategory(item.Hascategory)
    setCategoryImage(item.categoryImage)
    setCategoryId(item._id)
  }

  const handleSubcategory=(id)=>{
    navigate(`/admin/subcategory/${id}`)
  }

  const handleView=(id)=>{
    navigate(`/admin/viewproducts/${id}`)
  }

  const handleOpenEdit = (e)=> {
    e.preventDefault();
    const config = {
      headers:{ "Content-Type": "multipart/form-data" }
    }

    const updateCategory = new FormData()

    updateCategory.append("categoryname",categoryname)

    if(categoryImage){
      updateCategory.append("categoryImage", categoryImage)

    }
    updateCategory.append("Hascategory", Hascategory)
    axios.patch(`${server}/edit-category/${categoryId}`,updateCategory,config).then((res)=>{
      console.log(res);
      
     if(res.data.message === "category updated") {
      const dataStore = res.data.updated
      setCategory((prevData)=> {
        return prevData.map((category)=>{
          if(category._id === dataStore._id){
            return {...Category,...dataStore}
          }
          return category
        })
      })


      toast.success("category edited")
      setEditOpen(false)
     }
      
    });
  }
  console.log(category);
  

  return (
    <div>
      <div className="upper-addbox">
        <button
          className="upper-addbtn"
          onClick={() => setAddcategoryOpen(!addcategoryOpen)}
        >
          +Add
        </button>
      </div>
      <div className="category-main">
        {category && category.length > 0 ? (
          <table className="category-table">
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Category Name</th>
                <th>Category Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {category.map((item,index)=>(
                     <tr key={index}>
                      <td>{index+1}</td>
                     <td className="categoryname">{item.categoryname}</td>
                     <td><img src={item.categoryImage} className="categoryImage"/></td>
                     <td className="action-box">
                     <button onClick={()=>handleEdit(item)} className="actionedit-btn">Edit</button>
                     <button onClick={()=>handleDelete(item._id)} className="actiondelete-btn">Delete</button>
                     {item.Hascategory===true?(
                      <button className="actionmanage-btn" onClick={()=>handleSubcategory(item._id)}>Manage Sub Category</button>
                      ):(
                        <button className="actionproduct-btn" onClick={()=>handleView(item._id)}>View Product</button>
                      )}
                     </td>
                   </tr>
              ))}
               </tbody>
          </table>
        ) : (
          <div>No category available</div>
        )}{" "}
      </div>

      {addcategoryOpen && (
        <div className="addcategory-wrapper">
          <form onSubmit={handleSubmit} className="addcategory-form">
          <button className="modelclose-btn" onClick={()=>setAddcategoryOpen(!addcategoryOpen)}>X</button>
            <label>category name:</label>
            <input
              type="text"
              value={categoryname}
              onChange={(e) => setCategoryname(e.target.value)}
              required
            />
            <label>category Image:</label>
            <input
              type="file"
              accept=".jpg,.png,.jpeg"
              className="categoryimage-add"
              onChange={(e) => setCategoryImage(e.target.files[0])}
              required
            />
            <div className="hascategory">
              <input
                type="checkbox"
                value={Hascategory}
                className="hascategory-checkbox"
                onChange={(e) => setHascategory(e.target.checked)}
                
              />
              <p>Has subcategory</p>
            </div>

            <button type="submit" className="addcategory-btn">
              Add Category
            </button>
          </form>
        </div>
      )}

      {editOpen && (
        <div className="addcategory-wrapper">
          <form onSubmit={handleOpenEdit} className="addcategory-form">
            <div className="modelclose-wrapper">
                <button className="modelclose-btn" onClick={()=>setEditOpen(!editOpen)}>X</button>
            </div>
            
            <label>category name:</label>
            <input
              type="text"
              value={categoryname}
              onChange={(e) => setCategoryname(e.target.value)}
              required
            />
            <label>category Image:</label>
            <input
              type="file"
              accept=".jpg,.png,.jpeg"
              className="categoryimage-add"
              onChange={(e) => setCategoryImage(e.target.files[0])}
          
            />
            <div className="hascategory">
              <input
                type="checkbox"
                value={Hascategory}
                className="hascategory-checkbox"
                onChange={(e) => setHascategory(e.target.checked)}
                
              />
              <p>Has subcategory</p>
            </div>

            <button type="submit" className="addcategory-btn">
              Update Category
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Category;


