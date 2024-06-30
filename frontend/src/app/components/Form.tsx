'use client'
import { useState } from "react";

type ApiResponse = {
  message: string;
};

type FormProps = {
  fetchTasks: () => void;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Form({ fetchTasks }: FormProps) {
  const [taskName, setTaskName] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (taskName.trim() === '') {
      alert('Please enter a task.');
      return;
    }

    const req = await fetch(`http://${BACKEND_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: taskName })
    });
    const res: ApiResponse = await req.json();
    alert(res.message);
    if (req.status === 200) {
      fetchTasks()
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
        />
        <button type="submit" className="border border-black rounded py-1 px-1">Submit</button>
      </form>
    </main>
  );
}
