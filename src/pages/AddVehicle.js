import React from "react";
import { useState, useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";

function AddVehicle() {
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleImage, setVehicleImage] = useState("");
  const vehicleNameInputRef = useRef();
  const vehicleYearInputRef = useRef();
  const vehicleImageInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredName = vehicleNameInputRef.current.value;
    const enteredYear = vehicleYearInputRef.current.value;
    const enteredImage = vehicleImageInputRef.current.value;
    const vehicleId = Math.random();
    const newVehicle = {
      id: vehicleId,
      name: enteredName,
      year: enteredYear,
      img: enteredImage,
      services: [],
    };
    const vehiclesCollectionRef = collection(db, "vehicles");

    const addVehicleToDatabase = async () => {
      await addDoc(vehiclesCollectionRef, newVehicle);
    };
    addVehicleToDatabase();
  };

  return (
    <div className="loginPage">
      <div className="form-container">
        <div className="welcome-heading">Add Vehicle</div>
        <div className="welcome-subheading">
          Input information about your vehicle.
        </div>
        <form className="add-vehicle-form">
          <label>
            Vehicle Name:
            <input
              type="text"
              ref={vehicleNameInputRef}
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
            ></input>
          </label>
          <label>
            Year Model:
            <input
              type="text"
              ref={vehicleYearInputRef}
              value={vehicleYear}
              onChange={(e) => setVehicleYear(e.target.value)}
            ></input>
          </label>
          <label>
            Image Link:
            <input
              type="url"
              ref={vehicleImageInputRef}
              value={vehicleImage}
              onChange={(e) => setVehicleImage(e.target.value)}
            ></input>
          </label>
          <input type="submit" className="btn" onClick={submitHandler} />
        </form>
      </div>
    </div>
  );
}
export default AddVehicle;
