import VerifyEmail from '@/app/(auth)/(reg)/_components/VerifyEmail'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { Resend } from 'resend'
import prisma from '@/server/prisma/prisma-singleton'

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: 'Северяночка <onboarding@resend.dev>',
        to: user.email,
        subject: 'Подтвердите email',
        react: VerifyEmail({ username: user.name, verifyUrl: url })
      })
    },
    expiresIn: 86400,
    autoSignInAfterVerification: false
  },
  user: {
    additionalFields: {
      phone: { type: 'string', input: true, required: false }
    }
  }
})

// import VerifyEmail from '@/app/(auth)/(reg)/_components/VerifyEmail'
// import { betterAuth } from 'better-auth'
// import { mongodbAdapter } from 'better-auth/adapters/mongodb'
// import { MongoClient } from 'mongodb'
// import { Resend } from 'resend'

// const client = new MongoClient(process.env.DELIVERY_SHOP_DB_URL!)
// const db = client.db('delivery-shop')
// const resend = new Resend(process.env.RESEND_API_KEY)

// export const auth = betterAuth({
//   database: mongodbAdapter(db),
//   emailAndPassword: {
//     enabled: true,
//     requireEmailVerification: true
//   },
//   emailVerification: {
//     sendVerificationEmail: async ({ user, url }) => {
//       await resend.emails.send({
//         from: 'Северяночка <onboarding@resend.dev>',
//         to: user.email,
//         subject: 'Подтвердите email',
//         react: VerifyEmail({ username: user.name, verifyUrl: url })
//       })
//     },
//     expiresIn: 86400,
//     autoSignInAfterVerification: false
//   },
//   user: {
//     additionalFields: {
//       phoneNumber: { type: 'string', input: true, required: true },
//       surname: { type: 'string', input: true, required: true },
//       birthdayDate: { type: 'date', input: true, required: true },
//       region: { type: 'string', input: true, required: true },
//       location: { type: 'string', input: true, required: true },
//       gender: { type: 'string', input: true, required: true },
//       card: { type: 'string', input: true, required: false },
//       hasCard: { type: 'boolean', input: true, required: false }
//     }
//   }
// })
