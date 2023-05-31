import React from "react";
import { useState, useRef } from "react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase-config";
import { auth } from "../firebase-config";

function AddServices({ currentVehicle, setShowAddService, getServices }) {
  const [serviceName, setserviceName] = useState("");
  const [serviceYear, setserviceYear] = useState("");
  const [serviceImage, setserviceImage] = useState("");
  const serviceNameInputRef = useRef();
  const serviceYearInputRef = useRef();
  const serviceImageInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredName = serviceNameInputRef.current.value;
    const enteredYear = serviceYearInputRef.current.value;
    const enteredImage = serviceImageInputRef.current.value;
    const serviceId = Math.random();
    const newService = {
      id: serviceId,
      name: enteredName,
      date: enteredYear,
      img: enteredImage,
    };
    setShowAddService(false);
    getServices(currentVehicle.id);
    const addServiceToVehicle = async () => {
      const vehicleDoc = doc(
        db,
        "users",
        auth.currentUser.uid,
        "vehicles",
        currentVehicle.id
      );

      const updatedService = {
        services: arrayUnion(newService),
      };
      await updateDoc(vehicleDoc, updatedService);
    };
    addServiceToVehicle();
  };

  return (
    <div>
      <div className="form-container">
        <div className="welcome-heading">Add Service</div>
        <div className="welcome-subheading">
          Input information about your vehicle.
        </div>
        <form className="add-vehicle-form">
          <label>
            Service Name:
            <input
              type="text"
              ref={serviceNameInputRef}
              value={serviceName}
              onChange={(e) => setserviceName(e.target.value)}
            ></input>
          </label>
          <label>
            Service Date:
            <input
              type="date"
              ref={serviceYearInputRef}
              value={serviceYear}
              onChange={(e) => setserviceYear(e.target.value)}
            ></input>
          </label>
          <label>
            Image/Receipt Link:
            <input
              type="url"
              ref={serviceImageInputRef}
              value={serviceImage}
              onChange={(e) => setserviceImage(e.target.value)}
            ></input>
          </label>
          <input type="submit" className="btn" onClick={submitHandler} />
        </form>
      </div>
    </div>
  );
}
export default AddServices;
