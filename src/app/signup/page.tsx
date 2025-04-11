'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [form, setForm] = useState({ email: '', username: '', password: '' })
  const router = useRouter()

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSignup = async () => {
    const api = process.env.NEXT_PUBLIC_SIGNUP_URL;
    const res = await fetch(`${api}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    

    if (res.ok) {
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("username", form.username);
      
      alert('Signup successful! Welcome to Tourgenie')
      router.push('/plan')
    } else {
      const issue = await res.json()
      alert(`Signup failed: ${JSON.stringify(issue)}`)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <h2 className="text-3xl font-bold mb-4">📝 Sign Up</h2>
      <div className="w-full max-w-sm space-y-4">
        <input
          className="w-full p-3 rounded-xl text-black"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="w-full p-3 rounded-xl text-black"
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          className="w-full p-3 rounded-xl text-black"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button
          className="w-full p-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold"
          onClick={handleSignup}
        >
          Sign Up
        </button>
        <p className="text-center mt-2">
          Already have an account?{' '}
          <a href="/login" className="text-blue-300 underline">Login</a>
        </p>
      </div>
    </div>
  )
}
