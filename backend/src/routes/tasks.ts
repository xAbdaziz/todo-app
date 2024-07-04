import { Router, Request, Response } from 'express';

import tasksModel from '../db/tasksModel';
import passport from 'passport';

const tasksRouter: Router = Router();

tasksRouter.get('/', passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    try {
      //@ts-ignore
      const id = req.user?._id

      const tasks = await tasksModel.find({ ownerId: id })
      return res.send(tasks)
    } catch {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  })

tasksRouter.post('/', passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    try {
      //@ts-ignore
      const id = req.user?._id

      const { task } = req.body;
      if (!task) {
        return res.status(422).json({ message: "No task was provided" })
      }
      const taskExists = await tasksModel.exists({ task: task })
      if (!taskExists) {
        await tasksModel.create({ task: task, ownerId: id })
        return res.status(201).json({ message: 'Task Added!' })
      }
      return res.status(409).json({ message: 'Task already exists.' })
    } catch {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  })

tasksRouter.put('/:id', passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(422).json({ message: "No id was provided" })
      }
      const taskExists = await tasksModel.exists({ _id: id })
      if (!taskExists) {
        return res.status(404).json({ message: 'Task doesn\'t exists' })
      }
      await tasksModel.updateOne({ _id: id }, { isCompleted: req.query.completed })
      return res.json({ message: 'Task Updated!' })
    } catch {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  })

tasksRouter.delete('/:id', passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(422).json({ message: "No id was provided" })
      }
      const taskExists = await tasksModel.exists({ _id: id })
      if (!taskExists) {
        return res.status(404).json({ message: 'Task doesn\'t exists' })
      }
      await tasksModel.deleteOne({ _id: id })
      return res.json({ 'message': 'Task Deleted!' })
    } catch {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  })

export default tasksRouter
