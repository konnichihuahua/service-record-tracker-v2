import React from "react";
import AddService from "./AddService";
import { useState } from "react";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase-config";

function Services({
  servicesList,
  currentVehicle,
  setServicesList,
  getServices,
}) {
  const [showAddService, setShowAddService] = useState(false);

  const removeService = (id) => {
    const newServices = servicesList.filter((service) => service.id !== id);
    const targetService = servicesList.filter((service) => service.id === id);
    console.log(newServices);
    setServicesList(newServices);

    const removeServiceOnDatabase = async (id) => {
      console.log(targetService[0]);
      const vehicleDoc = doc(db, "vehicles", currentVehicle.id);
      await updateDoc(vehicleDoc, { services: arrayRemove(targetService[0]) });
    };
    removeServiceOnDatabase();
  };

  return (
    <div className="services">
      <button
        className="add-service-btn"
        onClick={() => {
          if (showAddService === true) {
            setShowAddService(false);
          } else {
            setShowAddService(true);
          }
        }}
      >
        {" "}
        {showAddService ? "Close" : "Add Service"}{" "}
      </button>
      {showAddService && (
        <AddService
          currentVehicle={currentVehicle}
          setShowAddService={setShowAddService}
          servicesList={servicesList}
          setServicesList={setServicesList}
          getServices={getServices}
        />
      )}
      <div className="services-title"> SERVICE RECORD</div>
      <div className="services-vehicle-name">Vehicle Name:</div>{" "}
      {currentVehicle.name} Year Model: {currentVehicle.year} <br />
      Services Rendered:
      {servicesList.map((service) => {
        const { name, id, date } = service;

        return (
          <li key={id}>
            {" "}
            {name} {date}{" "}
            <button onClick={() => removeService(id)}> Remove</button>
          </li>
        );
      })}
    </div>
  );
}

export default Services;
