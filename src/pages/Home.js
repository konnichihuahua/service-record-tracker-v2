import React, { useState } from "react";
import { useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import Vehicles from "./Vehicles";
import Services from "./Services";
import AddVehicle from "./AddVehicle";
import { auth } from "../firebase-config";

function Home() {
  const getVehicleInfo = (id) => {
    const vehicle = vehiclesList.filter((vehicle) => vehicle.id === id);
    setCurrentVehicle(vehicle[0]);
  };

  const [vehiclesList, setVehiclesList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [currentVehicle, setCurrentVehicle] = useState([]);
  const [showAddVehicle, setshowAddVehicle] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showAddService, setShowAddService] = useState(false);
  useEffect(() => {
    console.log("renders");
    const vehiclesCollectionRef = collection(
      db,
      "users",
      auth.currentUser.uid,
      "vehicles"
    );

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

  const getServices = async (id) => {
    const vehiclesCollectionRef = collection(
      db,
      "users",
      auth.currentUser.uid,
      "vehicles"
    );
    const data = await getDocs(vehiclesCollectionRef);
    const vehicles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const targetVehicle = vehicles.filter((vehicle) => vehicle.id === id);
    setServicesList(targetVehicle.map((vehicle) => vehicle.services)[0]);
  };

  return (
    <div className="App">
      <div className="main">
        {!showServices && (
          <div className="your-vehicles">
            <div>My Vehicles </div>
            <button
              className="add-vehicle-btn"
              onClick={() =>
                showAddVehicle
                  ? setshowAddVehicle(false)
                  : setshowAddVehicle(true)
              }
            >
              {showAddVehicle ? "-" : "+"}
            </button>
          </div>
        )}
        {showAddVehicle && (
          <AddVehicle
            setshowAddVehicle={setshowAddVehicle}
            getServices={getServices}
          />
        )}
        <div className="container">
          {!showServices && (
            <Vehicles
              className="vehicles-container"
              vehiclesList={vehiclesList}
              getServices={getServices}
              getVehicleInfo={getVehicleInfo}
              setVehiclesList={setVehiclesList}
              setServicesList={setServicesList}
              setCurrentVehicle={setCurrentVehicle}
              setShowServices={setShowServices}
            />
          )}
          {showServices && (
            <Services
              servicesList={servicesList}
              currentVehicle={currentVehicle}
              setServicesList={setServicesList}
              getServices={getServices}
              setShowServices={setShowServices}
              showAddService={showAddService}
              setShowAddService={setShowAddService}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
