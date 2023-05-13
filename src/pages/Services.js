import React from "react";
import AddService from "./AddService";
import { useState } from "react";

function Services({ servicesList, currentVehicle, setServicesList }) {
  const [showAddService, setShowAddService] = useState(false);

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
        />
      )}
      <div className="services-title"> SERVICE RECORD</div>
      <div className="services-vehicle-name">Vehicle Name:</div>{" "}
      {currentVehicle.name} <br /> Year Model: {currentVehicle.year} <br />
      Services Rendered:
      {servicesList.map((service) => {
        const { name, id, date } = service;

        return (
          <li key={id}>
            {" "}
            {name} {date}
          </li>
        );
      })}
    </div>
  );
}

export default Services;
