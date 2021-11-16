import mongoose from 'mongoose'

const userScheme = new mongoose.Schema({
  username: String,
  password: String
})
const userModel = mongoose.model('User', userScheme)

export default userModel