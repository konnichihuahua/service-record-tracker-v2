import React from "react";

function ServicesInfo({ removeService, currentVehicle, servicesList }) {
  return (
    <div>
      <div className="services-title"> SERVICE RECORDS</div>
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

export default ServicesInfo;
