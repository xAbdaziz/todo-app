import mongoose from 'mongoose';

import express from 'express';
import cors from 'cors';

import 'dotenv/config'

import tasksRouter from './routes/tasks';
import authRouter from './routes/auth';

import passport from 'passport';
import jwtAuth from './jwtAuth';

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize())

app.use('/tasks', tasksRouter)
app.use('/auth', authRouter)

async function main() {
  passport.use(jwtAuth)
  const mongoConnString = process.env.MONGO_CONN || ''
  await mongoose.connect(mongoConnString)
  app.listen(4000)
}

main()
