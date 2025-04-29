import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  taskTime: { type: String, required: true },
  taskDescription: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  notified: { type: Boolean, default: false }
});

export default mongoose.model("Task", taskSchema);
