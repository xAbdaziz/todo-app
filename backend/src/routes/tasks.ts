import { Router, Request, Response } from 'express';

import tasksModel from '../db/tasksModel';

const tasksRouter: Router = Router();

tasksRouter.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await tasksModel.find({})
    return res.send(tasks)
  } catch {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

tasksRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { task } = req.body;
    const taskExists = await tasksModel.exists({ task: task })
    if (!taskExists) {
      await tasksModel.create({ task: task })
      return res.json({ 'message': 'Task Added!' })
    }
    return res.status(400).json({ message: 'Task already exists.' })
  } catch {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

tasksRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const taskExists = await tasksModel.exists({ _id: id })
    if (!taskExists) {
      return res.json({ 'message': 'Task doesn\'t exists' })
    }
    await tasksModel.updateOne({ _id: id }, { isCompleted: req.query.completed })
    return res.json({ 'message': 'Task Updated!' })
  } catch {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

tasksRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const taskExists = await tasksModel.exists({ _id: id })
    if (!taskExists) {
      return res.status(400).json({ 'message': 'Task doesn\'t exists' })
    }
    await tasksModel.deleteOne({ _id: id })
    return res.json({ 'message': 'Task Deleted!' })
  } catch {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

export default tasksRouter
