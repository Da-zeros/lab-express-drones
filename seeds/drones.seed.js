require('dotenv/config');

const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
  ];

// insertar la en la BD
//Requiero el modelo y moongose para usar los metodos del modelo 
const DroneModel = require ("../models/Drone.model")
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((response) => {
    console.log("conectados a la Dase de Datos");
    return DroneModel.insertMany(drones);
  })
  .then((response) => {
    console.log("Dones agregados correctamente");
    // hacer la desconeccion
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });