'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
  const router = useRouter()

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleRegister(event: React.FormEvent) {
    event.preventDefault();

    if (username.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      setMessage('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`http://${BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const res = await response.json();

      if (!response.ok) {
        setMessage(res.message);
        return;
      }

      setMessage('Registration successful. Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <form onSubmit={handleRegister} className="w-1/3">
        <div className="text-center pb-10">
          <h1 className="text-2xl">Register</h1>
          {message && <p className="text-red-500">{message}</p>}
        </div>
        <div className="text-center">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded"
          />
        </div>
        <div className="text-center">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded"
          />
        </div>
        <div className="text-center">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded"
          />
        </div>
        <div className="text-center py-3">
          <button type="submit" className="p-1 border border-black rounded">Register</button>
        </div>
      </form>
    </main>
  )
}
