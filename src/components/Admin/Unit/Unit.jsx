import React, { useState } from "react";
import "./Unit.css";

const Unit = () => {
  const [unitaddOpen, setUnitAddopen] = useState(false);
  const units = [
    { unit: "MTR" },
    { unit: "SETT" },
    { unit: "LTR" },
    { unit: "Roll" },
    { unit: "No" },
    { unit: "KG" },
    { unit: "None of the above" },
  ];
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
          <tbody className="unitTable-bodywrapper">
            {units.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.unit}</td>
                <td className="action-box">
                  <button className="actionedit-btn">Edit</button>
                  <button className="actiondelete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
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
              <input type="text" placeholder="unit" />
            </div>
            
              <button className="unitmodel-addbtn">Add</button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Unit;
