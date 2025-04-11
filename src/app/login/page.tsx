'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const api = process.env.NEXT_PUBLIC_LOGIN_URL;
    const res = await fetch(`${api}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", data.username);
      // localStorage.setItem('token', data.access)
      alert('Login successful!')
      router.push('/plan')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <h2 className="text-3xl font-bold mb-4">🔐 Login</h2>
      <div className="w-full max-w-sm space-y-4">
        <input
          className="w-full p-3 rounded-xl text-black"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full p-3 rounded-xl text-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="w-full p-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="text-center mt-2">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-300 underline">Sign up</a>
        </p>
      </div>
    </div>
  )
}
