import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null
        
        const user = await db.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user || !user.password) return null

        const passwordsMatch = await bcrypt.compare(
          credentials.password as string, 
          user.password
        )

        if (passwordsMatch) return user
        return null
      }
    })
  ],
  // THIS IS THE FIX FOR THE "TWO SCREENS" ISSUE:
  pages: {
    signIn: '/login', // Tells NextAuth to always send users here
    error: '/login',  // Send errors back to your custom page too
  },
  session: { strategy: "jwt" },
  callbacks: {
    session: async ({ session, token }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    }
  }
})