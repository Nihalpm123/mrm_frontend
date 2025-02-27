import React, { useEffect, useState } from "react";
import "./Unit.css";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../../server";

const Unit = () => {
  const [unitaddOpen, setUnitAddopen] = useState(false);
  const [unit,setUnit]=useState([])

  // useEffect(()=>{
  //   axios.get(`${server}/get-unit`).then((res)=>
      
  // },[])
  useEffect(()=>{
    axios.get(`${server}/get-unit`).then((res)=>{
      console.log(res);
      setUnit(res.data)
      
    })
  },[])
  const handleDelete=()=>{
    
  }
  
  
  const handleSubmit=(e)=>{
      e.preventDefault();
      toast.success("unit created!..");
      setUnit("");
      setUnitAddopen(false)
  }

  
  return (
    <div className="unit-container">
      <div className="Unitadd-btnWrappper">
        <h2 className="unit-title">Unit List</h2>
        <button
          className="Unitadd-btn"
          onClick={() => setUnitAddopen(!unitaddOpen)}
        >
          Add
        </button>
      </div>

      <div className="unitTable-wrapper">
        <table>
          <thead>
            <tr>
              <th>Sl.no</th>
              <th>Unit</th>
              <th>Action</th>
            </tr>
          </thead>
          {unit.map((item,index)=>(
            <tr>
              <td>{index+1}</td>
              <td>{item.unit}</td>
              <td className="action-box">
                  <button className="actionedit-btn">Edit</button>
                  <button className="actiondelete-btn" onClick={()=>handleDelete(item._id)}>Delete</button>
                </td>
              
            </tr>
          ))}
         
        </table>
      </div>
      {unitaddOpen && (
        <div className="unitmodel-wrapper">
          <div className="unit-model">
            <div className="editmodel-close">
              <h2>Add/Edit unit</h2>
              <p className="unitmodel-closebtn" onClick={(()=>setUnitAddopen(!unitaddOpen))}>X</p>
            </div>
            <div className="unitmodel-input">
              <label>Unit</label>
              <input type="text" placeholder="unit" onChange={(e)=>setUnit(e.target.value)}/>
            </div>
             <button type="submit" className="unitmodel-addbtn" onClick={handleSubmit}>Add</button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Unit;
