import { loginUser } from '@/server/prisma/prisma-user-db'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  try {
    const user = await loginUser(email, password)
    if (!user) throw new Error('User not found')

    return Response.json({ name: user.name || user.email })
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Login failed' },
      { status: 400 }
    )
  }
}

// import { NextResponse } from 'next/server'
// import { getDB } from '../../../../../utils/api-routes'

// export async function POST(request: Request) {
//   try {
//     const { phoneNumber } = await request.json()

//     const db = await getDB()

//     const user = await db.collection('user').findOne({
//       phoneNumber
//     })

//     if (!user) {
//       return NextResponse.json({
//         exists: false
//       })
//     }

//     return NextResponse.json({
//       exists: true
//     })
//   } catch (error) {
//     console.error('Ошибка проверки телефона:', error)
//     return NextResponse.json(
//       {
//         error: 'Ошибка сервера'
//       },
//       { status: 500 }
//     )
//   }
// }
