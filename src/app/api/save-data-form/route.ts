import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
export async function POST(request: Request) {
  try {
    const { formId, data } = await request.json()

    const savedForm = await prisma.formResponse.create({
      data: {
        formId,
        data,
      },
    })

    return NextResponse.json({ message: 'Form saved successfully', data: savedForm })
  } catch (error) {
    console.error('Error saving form:', error)
    return NextResponse.json({ message: 'Failed to save form' }, { status: 500 })
  }
}
export async function GET() {
   
  try {
    const forms = await prisma.formResponse.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(forms)
  } catch (error) {
    console.error('Error fetching forms:', error)
    return NextResponse.json({ message: 'Failed to fetch forms' })
  }

}