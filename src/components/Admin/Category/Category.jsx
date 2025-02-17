import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../../server";
import "./category.css";
import { toast } from "react-toastify";
const Category = () => {
  const [category, setCategory] = useState([]);
  const [categoryname, setCategoryname] = useState(null);
  const [categoryImage, setCategoryImage] = useState("");
  const [Hascategory, setHascategory] = useState(false);
  const [addcategoryOpen, setAddcategoryOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${server}/get-category`)
      .then((res) => setCategory(res.data.getAllcategory));
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
    axios.delete(`${server}/delete-category/${id}`).then((res)=>setCategory(
      (data)=>data.filter((item)=>item._id!==id)
    ))
  }  
  

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
      <div>
        {category && category.length > 0 ? (
          <table>
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
                     <td>
                     <button onClick={()=>handleEdit}>Edit</button>
                     <button onClick={()=>handleDelete(item._id)}>Delete</button>
                     {item.Hascategory===true?(
                      <button>handle manage</button>
                      ):(
                        <button>view product</button>
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
    </div>
  );
};

export default Category;
