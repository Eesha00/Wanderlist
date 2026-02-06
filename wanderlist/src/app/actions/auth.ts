'use server'

import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { signIn } from "@/lib/auth" // We import the signIn helper from our auth config
import { AuthError } from "next-auth"

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  // 1. Validate input
  if (!email || !password) {
    return { error: "Missing fields" }
  }

  // 2. Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    return { error: "Email already in use" }
  }

  // 3. Hash the password (encrypt it)
  const hashedPassword = await bcrypt.hash(password, 10)

  // 4. Create the user in the database
  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    }
  })

  // 5. Attempt to log them in immediately
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard" // Redirect to the main app after signup
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" }
        default:
          return { error: "Something went wrong" }
      }
    }
    throw error // Re-throw generic errors so Next.js can handle redirects
  }
}