import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json()

    const user = await prisma.user.findFirst({
      where: { phoneNumber }
    })

    if (!user) {
      return NextResponse.json({
        exists: false
      })
    }

    return NextResponse.json({
      exists: true
    })
  } catch (error) {
    console.error('Ошибка проверки телефона:', error)
    return NextResponse.json(
      {
        error: 'Ошибка сервера'
      },
      { status: 500 }
    )
  }
}
