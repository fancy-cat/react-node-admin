import mongoose from "mongoose"
const idsSchema = new mongoose.Schema({
  name: {type: String},
  id: {type: Number}
})
const idsModel = mongoose.model('Id', idsSchema)
export default idsModel