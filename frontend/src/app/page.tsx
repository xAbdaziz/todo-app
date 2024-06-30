'use client'
import React, { useState, useEffect } from 'react';
import Form from "./components/Form";
import List from "./components/List";

type TaskItem = {
  _id: string;
  task: string;
  isCompleted: boolean;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch(`http://${BACKEND_URL}/tasks`);
    const data = await response.json();
    setTasks(data);
  };

  return (
    <main>
      <div className='container mx-auto py-20'>
        <p className="text-xl font-bold">Todo list:</p>
        <Form fetchTasks={fetchTasks} />
        <List tasks={tasks} fetchTasks={fetchTasks} />
      </div>
    </main>
  );
}
