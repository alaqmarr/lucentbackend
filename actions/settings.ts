"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateSetting(id: string, newToggleValue: boolean) {
    try {
        await prisma.settings.update({
            where: { id },
            data: { 
                toggle: newToggleValue,
                updatedAt: new Date() 
            }
        })
        revalidatePath("/") // This will refresh the UI
        return { success: true }
    } catch (error) {
        console.error("Error updating setting:", error)
        return { success: false }
    }
}