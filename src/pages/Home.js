import React, { useState } from "react";
import { useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import Vehicles from "./Vehicles";
import Services from "./Services";

function Home() {
  useEffect(() => {
    const vehiclesCollectionRef = collection(db, "vehicles");
    const getVehicles = async () => {
      const data = await getDocs(vehiclesCollectionRef);
      const allVehicles = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setVehiclesList(allVehicles);
    };
    getVehicles();
  }, []);

  const getVehicleInfo = (id) => {
    const vehicle = vehiclesList.filter((vehicle) => vehicle.id === id);
    setCurrentVehicle(vehicle[0]);
  };
  const [vehiclesList, setVehiclesList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [currentVehicle, setCurrentVehicle] = useState([]);

  const getServices = async (id) => {
    const vehiclesCollectionRef = collection(db, "vehicles");
    const data = await getDocs(vehiclesCollectionRef);
    const vehicles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const targetVehicle = vehicles.filter((vehicle) => vehicle.id === id);
    setServicesList(targetVehicle.map((vehicle) => vehicle.services)[0]);
    console.log(servicesList);
  };

  return (
    <div className="main">
      <div className="form-container">
        <h2>Your Vehicles</h2>
        <div className="gradient"> </div>
        <Vehicles
          className="vehicles-container"
          vehiclesList={vehiclesList}
          getServices={getServices}
          getVehicleInfo={getVehicleInfo}
        />
        <Services
          servicesList={servicesList}
          currentVehicle={currentVehicle}
          setServicesList={setServicesList}
        />
      </div>
    </div>
  );
}

export default Home;
