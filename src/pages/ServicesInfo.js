import React from "react";

function ServicesInfo({ removeService, currentVehicle }) {
  return (
    <div className="services-section">
      <div className="services-container-top">
        <div className="services-vehicle-name">{currentVehicle.name} </div>
        <div className="services-vehicle-year">{currentVehicle.year} </div>
        <img src={currentVehicle.img} className="services-vehicle-image"></img>
      </div>
    </div>
  );
}

export default ServicesInfo;
