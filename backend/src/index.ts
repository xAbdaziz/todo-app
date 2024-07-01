import mongoose from 'mongoose';

import express from 'express';
import cors from 'cors';

import 'dotenv/config'

import tasksRouter from './routes/tasks';

import passport from 'passport';
import jwtAuth from './jwtAuth';

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/tasks', tasksRouter)

async function main() {
  passport.use(jwtAuth)
  const mongoConnString = process.env.MONGO_CONN || ''
  await mongoose.connect(mongoConnString)
  app.listen(4000)
}

main()
