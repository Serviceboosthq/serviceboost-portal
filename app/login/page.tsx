'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    if (data.session) {
      router.push('/dashboard')
    } else {
      alert('No session returned.')
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 10, width: 320 }}
      />

      <div style={{ height: 12 }} />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: 10, width: 320 }}
      />

      <div style={{ height: 16 }} />

      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          background: '#dc2626',
          color: 'white',
          padding: '10px 16px',
          borderRadius: 6,
          border: 'none',
          cursor: 'pointer',
          width: 320,
        }}
      >
        {loading ? 'Logging in…' : 'Login'}
      </button>
    </div>
  )
}