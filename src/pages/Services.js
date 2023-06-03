import React from "react";
import AddService from "./AddService";
import { useState } from "react";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase-config";
import { auth } from "../firebase-config";
import { BiArrowBack } from "react-icons/bi";
import ServicesInfo from "./ServicesInfo";

function Services({
  servicesList,
  currentVehicle,
  setServicesList,
  getServices,
  setShowServices,
  showAddService,
  setShowAddService,
}) {
  const removeService = (id) => {
    const newServices = servicesList.filter((service) => service.id !== id);
    const targetService = servicesList.filter((service) => service.id === id);
    console.log(newServices);
    setServicesList(newServices);

    const removeServiceOnDatabase = async (id) => {
      console.log(targetService[0]);
      const vehicleDoc = doc(
        db,
        "users",
        auth.currentUser.uid,
        "vehicles",
        currentVehicle.id
      );
      await updateDoc(vehicleDoc, { services: arrayRemove(targetService[0]) });
    };
    removeServiceOnDatabase();
  };

  return (
    <div className="services">
      {!showAddService && (
        <BiArrowBack
          onClick={() => setShowServices(false)}
          className="services-back-btn"
          size={30}
        />
      )}

      {showAddService && (
        <AddService
          currentVehicle={currentVehicle}
          setShowAddService={setShowAddService}
          servicesList={servicesList}
          setServicesList={setServicesList}
          getServices={getServices}
          setShowServices={setShowServices}
        />
      )}
      {!showAddService && (
        <ServicesInfo
          currentVehicle={currentVehicle}
          servicesList={servicesList}
          removeService={removeService}
        />
      )}
      <div className="services-list-section">
        <div className="services-list-title"> Services Rendered</div>
        <div className="add-service-btn-container">
          {!showAddService && (
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
              Add Service
            </button>
          )}
        </div>
      </div>
      <div className="services-list">
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
    </div>
  );
}

export default Services;
