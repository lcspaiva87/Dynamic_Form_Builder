import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, title, logo, fields } = await request.json()

    const savedForm = await prisma.form.create({
      data: {
        name,
        title,
        logo,
        fields: fields,
      },
    })

    return NextResponse.json({ message: 'Form saved successfully', data: savedForm })
  } catch (error) {
    console.error('Error saving form:', error)
    return NextResponse.json({ message: 'Failed to save form' }, { status: 500 })
  }
}
export async function GET(req: NextRequest) {
   
    try {
      const forms = await prisma.form.findMany({
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