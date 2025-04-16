import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(request: Request) {
    try {
        const { id, toggle } = await request.json()
        
        // Verify the setting is user-controllable
        const setting = await prisma.settings.findUnique({
            where: { id }
        })
        
        if (!setting || setting.value !== 'user') {
            return NextResponse.json(
                { error: "Not authorized to modify this setting" },
                { status: 403 }
            )
        }

        const updatedSetting = await prisma.settings.update({
            where: { id },
            data: { 
                toggle,
                updatedAt: new Date()
            }
        })

        return NextResponse.json(updatedSetting)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update setting" },
            { status: 500 }
        )
    }
}