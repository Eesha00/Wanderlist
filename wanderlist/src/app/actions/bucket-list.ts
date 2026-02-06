'use server'

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addToBucketList(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return

  const title = formData.get("title") as string
  const country = formData.get("country") as string
  const notes = formData.get("notes") as string
  const category = formData.get("category") as string

  if (!title) return

  await db.bucketListItem.create({
    data: {
      title,
      country,
      notes,
      category: category || "DREAM", // Default to Dream if empty
      userId: session.user.id,
    }
  })

  revalidatePath("/dashboard")
}

export async function markAsComplete(id: string) {
    const session = await auth()
    if (!session?.user?.id) return

    await db.bucketListItem.update({
        where: { id, userId: session.user.id },
        data: { 
            isCompleted: true, 
            category: "COMPLETED", // Move to completed category
            completedAt: new Date() 
        }
    })
    
    revalidatePath("/dashboard")
}

export async function deleteItem(id: string) {
    const session = await auth()
    if (!session?.user?.id) return

    await db.bucketListItem.delete({
        where: { id, userId: session.user.id }
    })
    
    revalidatePath("/dashboard")
}