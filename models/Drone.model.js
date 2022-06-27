
const { Schema, mongoose } = require('mongoose') 

const droneSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    propellers:Number,
    maxSpeed:Number
})

const DroneModel =mongoose.model('Drone', droneSchema)
module.exports = DroneModel