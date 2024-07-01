import { Router, Request, Response } from 'express';

import tasksModel from '../db/tasksModel';

const tasksRouter: Router = Router();

tasksRouter.get('/', async (req: Request, res: Response) => {
  const tasks = await tasksModel.find({})
  return res.send(tasks)
})

tasksRouter.post('/', async (req: Request, res: Response) => {
  const { task } = req.body;
  const taskExists = await tasksModel.exists({ task: task })
  if (!taskExists) {
    await tasksModel.create({ task: task })
    return res.json({ 'message': 'Task Added!' })
  }
  return res.status(403).json({ 'message': 'Task already exists.' })
})

tasksRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const taskExists = await tasksModel.exists({ _id: id })
  if (!taskExists) {
    return res.json({ 'message': 'Task doesn\'t exists' })
  }
  await tasksModel.updateOne({ _id: id }, { isCompleted: req.query.completed })
  return res.json({ 'message': 'Task Updated!' })
})

tasksRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const taskExists = await tasksModel.exists({ _id: id })
  if (!taskExists) {
    return res.json({ 'message': 'Task doesn\'t exists' })
  }
  await tasksModel.deleteOne({ _id: id })
  return res.json({ 'message': 'Task Deleted!' })
})

export default tasksRouter
