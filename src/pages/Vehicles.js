import React from "react";

function Vehicles({ vehiclesList, setShowServices }) {
  return (
    <div
      className="vehicles-container"
      onClick={() => {
        setShowServices(true);
      }}
    >
      {vehiclesList.map((vehicle) => {
        return (
          <div className="vehicle">
            <img className="vehicle-img" src={vehicle.img}></img>
            <div className="vehicle-name">{vehicle.name} </div>
            <div className="vehicle-year"> {vehicle.year} </div>
          </div>
        );
      })}
    </div>
  );
}

export default Vehicles;
