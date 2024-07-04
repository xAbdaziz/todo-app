'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    try {

      if (username.trim() === '' || password.trim() === '') {
        setMessage('Please enter a username and password')
        return
      }

      const response = await fetch(`http://${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const res = await response.json();

      if (!response.ok) {
        setMessage(res.message)
        return
      }

      document.cookie = `token=${res.token}; path=/`;
      setMessage('')
      router.push('/')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="w-1/3">
        <div className="text-center pb-10">
          <h1 className="text-2xl">Login</h1>
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
        <div className="text-center py-3">
          <button type="submit" className="p-1 border border-black rounded">Login</button>
        </div>
      </form>
    </main>
  )
}