// import { registerUser } from '@/server/prisma/prisma-user-db'

// export async function POST(request: Request) {
//   const body = await request.json()
//   const { email, password } = body

//   try {
//     const user = await registerUser(email, password)

//     return Response.json({ username: user.email, msg: 'Есть контакт' })
//   } catch (error) {
//     return Response.json(
//       { error: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 400 }
//     )
//   }
// }
