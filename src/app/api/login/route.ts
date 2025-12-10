// import { loginUser } from '@/server/prisma/prisma-user-db'

// export async function POST(request: Request) {
//   const { email, password } = await request.json()

//   try {
//     const user = await loginUser(email, password)
//     if (!user) throw new Error('User not found')

//     return Response.json({ name: user.name || user.email })
//   } catch (error) {
//     return Response.json(
//       { error: error instanceof Error ? error.message : 'Login failed' },
//       { status: 400 }
//     )
//   }
// }
