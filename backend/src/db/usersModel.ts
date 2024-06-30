import mongoose, { Schema } from "mongoose";
const todoSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  name: { type: String, required: true },
  password: { type: String, required: true }
}, { collection: 'users' });

const usersModel = mongoose.model('users', todoSchema);
export default usersModel