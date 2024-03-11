'use client'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import { signIn } from 'next-auth/react'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export const Form = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // const res = await signIn(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/candidates/login`, {
      //   redirect: false,
      //   email,
      //   password,
      //   callbackUrl
      // })
      const data = {
        email,
        password
      }
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/candidates/login`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log('Res', res)
      // if (!res?.error) {
      //   router.push(callbackUrl)
      // } else {
      //   setError('Invalid email or password')
      // }
    } catch (err: any) {}
  }

  return (
    <form className="space-y-12 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          className="w-full"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          className="w-full"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
        />
      </div>
      {error && <Alert>{error}</Alert>}
      <div className="w-full">
        <Button className="w-full" size="lg" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </form>
  )
}
