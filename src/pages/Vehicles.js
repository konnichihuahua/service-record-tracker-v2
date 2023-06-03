import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { FcCalendar } from "react-icons/fc";
import { auth } from "../firebase-config";
import { AiOutlineDoubleRight } from "react-icons/ai";
function Vehicles({
  vehiclesList,
  getServices,
  getVehicleInfo,
  setVehiclesList,
  setServicesList,
  setCurrentVehicle,
  setShowServices,
}) {
  const removeVehicle = async (id) => {
    const newVehicles = vehiclesList.filter((vehicle) => vehicle.id !== id);
    await deleteDoc(doc(db, "users", auth.currentUser.uid, "vehicles", id));
    setVehiclesList(newVehicles);
    setServicesList([]);
    setCurrentVehicle([]);
  };
  return (
    <div className="vehicles-container">
      {vehiclesList.map((vehicle) => {
        return (
          <div
            className="vehicle"
            onClick={() => {
              getVehicleInfo(vehicle.id);
              getServices(vehicle.id);
              setShowServices(true);
            }}
            key={vehicle.id}
          >
            <div className="vehicle-img-container">
              <img
                className="vehicle-img"
                alt={vehicle.name}
                src={vehicle.img}
              />
            </div>
            <div className="vehicle-info">
              <div className="vehicle-name">{vehicle.name} </div>
              <div className="vehicle-year">
                <FcCalendar /> Year Model: {vehicle.year}{" "}
              </div>
            </div>
            <div className="remove-btn-container">
              {/* <button
                className="remove-vehicle-btn"
                onClick={(e) => {
                  removeVehicle(vehicle.id);
                  e.stopPropagation();
                }}
              >
                x
              </button> */}
              <AiOutlineDoubleRight size={20} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Vehicles;
