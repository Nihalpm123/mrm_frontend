import React, { useEffect, useState } from "react";
import "./Unit.css";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../../server";

const Unit = () => {
  const [unitaddOpen, setUnitAddopen] = useState(false);
  const [uniteditOpen,setUnitEditopen]=useState(false);
  const [unitdata, setUnitdata] = useState([]);
  const [unit, setUnit] = useState("");
  const [unitId,setunitId]=useState("");

 
  useEffect(() => {
    axios.get(`${server}/get-unit`).then((res) => {
      setUnitdata(res.data);
    });
  }, []);

 const handleDelete=(id)=>{
  if(window.confirm("Are you want to delete this unit?")){
    axios.delete(`${server}/delete-unit/${id}`).then((res)=>setUnitdata((data)=>data.filter((item)=>item._id!== id)))
  }
 }

 const  handleEdit=(item)=>{
  setUnit(item.unit);
  setunitId(item._id);
 }

 const handleOpenEdit=(e)=>{
  e.preventDefault();
  axios.patch(`${server}/edit-unit/${unitId}`,{unit}).then((res)=>{
    if(res.data.message === "unit details updated!.."){
      const newUnit=res.data.updated;
      setUnitdata((prev)=>{
        return prev.map((item)=>{
          if(item._id ===newUnit._id){
            return {...item,...newUnit}
          }
          return item;
        })
      });
      toast.success("Unit details updated!");
      setUnitEditopen(false);
    }
  })
 
 }


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${server}/add-unit`, {
       unit,
      })
      .then((res) => {
        console.log(res);
        const response = res.data.addUnit;
        setUnitdata((data) => [response, ...data]);
        toast.success("unit created!..");
        setUnit("");
        setUnitAddopen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <table className="unit-table">
          <thead>
            <tr>
              <th>Sl.no</th>
              <th>Unit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {unitdata.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.unit}</td>
              <td className="action-box">
                <button className="actionedit-btn"onClick={()=>{
                  handleEdit(item);
                  setUnitEditopen(true);
                  }}>Edit</button>
                <button
                  className="actiondelete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      {unitaddOpen && (
        <div className="unitmodel-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="unit-model">
              <div className="editmodel-close">
                <h2>Add/Edit unit</h2>
                <p
                  className="unitmodel-closebtn"
                  onClick={() => setUnitAddopen(!unitaddOpen)}
                >
                  X
                </p>
              </div>
              <div className="unitmodel-input">
                <label>Unit</label>
                <input
                  type="text"
                  placeholder="unit"
                  onChange={(e) => setUnit(e.target.value)}
                />
              </div>
              <button type="submit" className="unitmodel-addbtn">
                Add
              </button>
            </div>
          </form>
        </div>
      )}
      {uniteditOpen && (<div className="unitmodel-wrapper">
          <form onSubmit={handleOpenEdit}>
            <div className="unit-model">
              <div className="editmodel-close">
                <h2>Add/Edit unit</h2>
                <p
                  className="unitmodel-closebtn"
                  onClick={() => setUnitEditopen(!uniteditOpen)}
                >
                  X
                </p>
              </div>
              <div className="unitmodel-input">
                <label>Unit</label>
                <input
                  type="text"
                  placeholder="unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                />
              </div>
              <button type="submit" className="unitmodel-addbtn">
                Update
              </button>
            </div>
          </form>
        </div>)}
    </div>
  );
};

export default Unit;
