const express = require('express');
const router = express.Router();
const DroneModel = require('../models/Drone.model')

// require the Drone model here

router.get('/drones',async (req, res, next) => {
  try {
    // Iteration #2: List the drones
    const droneList = await DroneModel.find()
    res.render('drones/list',{droneList})
  } catch (error) {
    console.log(error)
  }
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  console.log('Entra en get')
  res.render('drones/create-form')
  
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    const {name, propellers, maxSpeed} = req.body
    const newDrone = await DroneModel.create({
      name,
      propellers,
      maxSpeed
    })
    if (newDrone) res.redirect('/drones')
  } catch (error) {
    res.redirect('/drones/create')
    console.log(error)
  }
});

router.get('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const editDrone = await DroneModel.findById(req.params.id)
    res.render('drones/update-form.hbs',{editDrone})
  } catch (error) {
    console.log(error)
  }
  
});

router.post('/drones/:id/edit', async (req, res, next) => {
  try {
    const {name, propellers, maxSpeed} = req.body
    const editNewDrone = await DroneModel.findByIdAndUpdate({_id:req.params.id},{$set:{name, propellers, maxSpeed}})
    if(editNewDrone)res.render("drones/list")
  } catch (error) {
    console.log(error)
    res.send({message: "Error al actualizar"});
  }
});

router.post('/drones/:id/delete', async(req, res, next) => {
  try {
    const {id} = req.params
    const deleteModel = await DroneModel.findByIdAndDelete(id)
    if(deleteModel)res.render("drones/list")
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
