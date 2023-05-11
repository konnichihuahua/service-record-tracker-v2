import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function Services() {
  const addVehicleToDatabase = async (id, name) => {
    console.log("meow");
    const vehicleDoc = doc(db, "vehicles", "kk2huV0ecGuSa9HZqElY");
    const updatedService = { name: "dominar400" };
    await updateDoc(vehicleDoc, updatedService);
  };
  return (
    <div>
      <button onClick={addVehicleToDatabase}> Add Service Test</button>
    </div>
  );
}

export default Services;
