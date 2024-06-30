'use client'
import React from 'react';
import ListItem from './ListItem';

type TaskItem = {
  _id: string;
  task: string;
  isCompleted: boolean;
};

type ListProps = {
  tasks: TaskItem[];
  fetchTasks: () => void;
};

export default function List({ tasks, fetchTasks }: ListProps) {
  return (
    <main>
      <div className="divide-y divide-dashed">
        {tasks.map(task => (
          <ListItem key={task._id} id={task._id} isCompleted={task.isCompleted} task={task.task} fetchTasks={fetchTasks} />
        ))}
      </div>
    </main>
  );
}
