import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function Vehicles({
  vehiclesList,
  getServices,
  getVehicleInfo,
  setVehiclesList,
  setServicesList,
  setCurrentVehicle,
}) {
  const removeVehicle = async (id) => {
    const newVehicles = vehiclesList.filter((vehicle) => vehicle.id !== id);
    await deleteDoc(doc(db, "vehicles", id));
    setVehiclesList(newVehicles);
    setServicesList([]);
    setCurrentVehicle([]);
  };
  return (
    <div className="vehicles-container">
      {vehiclesList.map((vehicle) => {
        return (
          <div className="vehicle" key={vehicle.id}>
            <img
              className="vehicle-img"
              alt={vehicle.name}
              src={vehicle.img}
              onClick={() => {
                getVehicleInfo(vehicle.id);
                getServices(vehicle.id);
              }}
            ></img>
            <div className="vehicle-name">{vehicle.name} </div>
            <div className="vehicle-year"> {vehicle.year} </div>
            <button onClick={() => removeVehicle(vehicle.id)}>
              {" "}
              remove vehicle
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Vehicles;
