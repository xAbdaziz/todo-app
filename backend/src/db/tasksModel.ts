import mongoose, { Schema } from "mongoose";
const tasksSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  ownerId : { type: Schema.Types.ObjectId, required: true },
  task: { type: String, required: true },
  isCompleted: { type: Boolean, required: true, default: false }
}, { collection: 'tasks' });

const tasksModel = mongoose.model('tasks', tasksSchema);
export default tasksModel