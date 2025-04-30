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
    firebaseTokens: {
        type: [
          {
            token: { type: String, required: true },
            deviceId: { type: String, required: true },
          }
        ],
        default: [],
      },
    timezone: { type: String },
})


export default mongoose.model("User", userSchema);