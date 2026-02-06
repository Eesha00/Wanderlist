'use client'

import Link from "next/link"
import { registerUser } from "@/app/actions/auth"
import { useActionState } from "react"

export default function RegisterPage() {
  const [state, action, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    return await registerUser(formData)
  }, null)

  return (
    <div className="min-h-screen flex bg-background">
      
      {/* Left Side: Editorial Image (Hidden on mobile) */}
      <div className="hidden lg:block w-1/2 relative">
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop")' }}
        >
             <div className="absolute inset-0 bg-forest/10" />
        </div>
        <div className="absolute bottom-12 left-12 text-white p-8 max-w-lg">
            <h2 className="font-serif text-4xl mb-4">"To travel is to live."</h2>
            <p className="text-white/80 font-light">— Hans Christian Andersen</p>
        </div>
      </div>

      {/* Right Side: The Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-left">
            <h1 className="font-serif text-4xl text-forest mb-2">Join Wanderlist</h1>
            <p className="text-forest/60">Start your personal travel journal today.</p>
          </div>

          <form action={action} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-forest/50 mb-1">Full Name</label>
              <input name="name" type="text" placeholder="Alice Explorer" className="input-underline" />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-wider text-forest/50 mb-1">Email Address</label>
              <input name="email" type="email" placeholder="alice@example.com" className="input-underline" />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-forest/50 mb-1">Password</label>
              <input name="password" type="password" placeholder="••••••••" className="input-underline" />
            </div>

            {state?.error && (
              <p className="text-clay text-sm bg-clay/10 p-3 rounded">{state.error}</p>
            )}

            <button 
              disabled={isPending}
              className="w-full bg-clay text-white py-4 rounded-lg font-medium hover:bg-clay/90 transition-all shadow-lg shadow-clay/20"
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-forest/60 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-clay hover:underline font-medium">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}