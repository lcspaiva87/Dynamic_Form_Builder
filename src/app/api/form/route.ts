import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, title, logo, fields } = await request.json()

    const savedForm = await prisma.form.create({
      data: {
        name,
        title,
        logo,
        fields,
      },
    })

    return NextResponse.json({
      message: 'Form saved successfully',
      data: savedForm,
    })
  } catch (error) {
    console.error('Error saving form:', error)
    return NextResponse.json(
      { message: 'Failed to save form' },
      { status: 500 },
    )
  }
}
export async function GET() {
  try {
    const forms = await prisma.form.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(forms)
  } catch (error) {
    console.error('Error fetching forms:', error)
    return NextResponse.json({ message: 'Failed to fetch forms' })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    await prisma.form.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({ message: 'Form deleted successfully' })
  } catch (error) {
    console.error('Error deleting form:', error)
    return NextResponse.json(
      { message: 'Failed to delete form' },
      { status: 500 },
    )
  }
}
export async function PATCH(request: Request) {
  try {
    const { id, ...data } = await request.json()

    const updatedForm = await prisma.form.update({
      where: {
        id,
      },
      data,
    })

    return NextResponse.json({
      message: 'Form updated successfully',
      data: updatedForm,
    })
  } catch (error) {
    console.error('Error updating form:', error)
    return NextResponse.json(
      { message: 'Failed to update form' },
      { status: 500 },
    )
  }
}
