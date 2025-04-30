import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    firebaseTokens: { type: [String], default: [] }, 
    deviceId: { type: String, required: true },
    timezone: { type: String },
})


export default mongoose.model("User", userSchema);