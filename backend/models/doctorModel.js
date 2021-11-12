import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  id: {type: String},
  name: {type: String},
  age: {type: Number},
  mobile: {type: Number},
  hospital: {type: String},
  department: {type: String},
});

const doctorModel = mongoose.model('Doctor', doctorSchema)

export default doctorModel