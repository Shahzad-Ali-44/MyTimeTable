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
    firebaseToken: { type: String, default: "" }, 
})


export default mongoose.model("User", userSchema);