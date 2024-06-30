import mongoose from 'mongoose';

import express from 'express';
import cors from 'cors';

import 'dotenv/config'

import tasksModel from "./db/tasksModel";
//import usersModel from './db/usersModel';

import passport from 'passport';
import jwtAuth from './jwtAuth';

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/tasks', async (req, res) => {
  const tasks = await tasksModel.find({})
  return res.send(tasks)
})

app.post('/tasks', async (req, res) => {
  const { task } = req.body;
  const taskExists = await tasksModel.exists({ task: task})
  if (!taskExists) {
    await tasksModel.create({ task: task })
    return res.json({ 'message': 'Task Added!' })
  }
  return res.status(403).json({ 'message': 'Task already exists.' })
})

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params
  const taskExists = await tasksModel.exists({ _id: id})
  if(!taskExists){
    return res.json({'message': 'Task doesn\'t exists'})
  }
  await tasksModel.updateOne({ _id: id }, { isCompleted: req.query.completed })
  return res.json({ 'message': 'Task Updated!' })
})

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params
  const taskExists = await tasksModel.exists({ _id: id})
  if(!taskExists){
    return res.json({'message': 'Task doesn\'t exists'})
  }
  await tasksModel.deleteOne({ _id: id })
  return res.json({ 'message': 'Task Deleted!' })
})

async function main() {
  passport.use(jwtAuth)
  const mongoConnString = process.env.MONGO_CONN || ''
  await mongoose.connect(mongoConnString)
  app.listen(4000)
}

main()
