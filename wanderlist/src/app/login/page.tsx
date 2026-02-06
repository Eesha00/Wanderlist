'use client'

import Link from "next/link"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid email or password")
      setLoading(false)
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side: Image */}
      <div className="hidden lg:block w-1/2 relative bg-forest">
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 to-transparent" />
        <div className="absolute bottom-12 left-12 text-white p-8">
            <h2 className="font-serif text-4xl mb-4">Welcome Back</h2>
            <p className="text-white/80 font-light">Your journey continues here.</p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
        <div className="w-full max-w-md space-y-10">
          <div className="text-left">
            <h1 className="font-serif text-4xl text-forest mb-2">Log In</h1>
            <p className="text-forest/60">Access your bucket list.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-xs uppercase tracking-wider text-forest/50 mb-1">Email</label>
              <input name="email" type="email" required className="input-underline" />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-forest/50 mb-1">Password</label>
              <input name="password" type="password" required className="input-underline" />
            </div>

            {error && <p className="text-clay text-sm bg-clay/10 p-3 rounded">{error}</p>}

            <button disabled={loading} className="w-full bg-forest text-white py-4 rounded-lg hover:bg-forest/90 transition-all shadow-lg">
              {loading ? "Logging in..." : "Enter Wanderlist"}
            </button>
          </form>
          
          <div className="text-center space-y-4">
             {/* Clean Footer with no Google Button */}
             <p className="text-forest/60 text-sm">
                New here? <Link href="/register" className="text-clay hover:underline">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}