import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },) {
   console.log("id",params.id)
  try {
    const idForm = params.id
    if (!idForm) {
      throw new Error('ID do Form é obrigatório.')
    }
    const forms = await prisma.form.findMany({
      where: {
        id: idForm
      }
    })

    return NextResponse.json(forms)
  } catch (error) {
    console.error('Error fetching forms:', error)
    return NextResponse.json({ message: 'Failed to fetch forms' })
  }

}