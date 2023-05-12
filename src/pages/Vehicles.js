import React from "react";

function Vehicles({ vehiclesList, getServices, getVehicleInfo }) {
  return (
    <div className="vehicles-container">
      {vehiclesList.map((vehicle) => {
        return (
          <div
            className="vehicle"
            onClick={() => {
              getVehicleInfo(vehicle.id);
              getServices(vehicle.id);
            }}
            key={vehicle.id}
          >
            <img
              className="vehicle-img"
              alt={vehicle.name}
              src={vehicle.img}
            ></img>
            <div className="vehicle-name">{vehicle.name} </div>
            <div className="vehicle-year"> {vehicle.year} </div>
          </div>
        );
      })}
    </div>
  );
}

export default Vehicles;
