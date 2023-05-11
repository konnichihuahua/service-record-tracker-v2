import React, { useState } from "react";
import { useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import Vehicles from "./Vehicles";
import Services from "./Services";
function Home() {
  const [vehiclesList, setVehiclesList] = useState([]);
  const [servicesList, setVehiclesServicesList] = useState([]);
  const [showServices, setShowServices] = useState(false);
  const vehiclesCollectionRef = collection(db, "vehicles");
  useEffect(() => {
    const getVehicles = async () => {
      const data = await getDocs(vehiclesCollectionRef);
      setVehiclesList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getVehicles();
  });

  return (
    <div className="main">
      <div className="form-container">
        <h2>Your Vehicles</h2>
        <div className="gradient"> </div>
        <Vehicles
          className="vehicles-container"
          vehiclesList={vehiclesList}
          setShowServices={setShowServices}
        />
        <Services />
      </div>
    </div>
  );
}

export default Home;
