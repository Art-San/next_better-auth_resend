import VerifyEmail from '@/app/(auth)/(reg)/_components/VerifyEmail'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { Resend } from 'resend'
import prisma from '@/server/prisma/prisma-singleton'
import { phoneNumber } from 'better-auth/plugins'

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
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
  plugins: [
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }) => {
        console.log(`[DEBUG] Отправка OTP: ${code} для ${phoneNumber}`)
      },
      // sendOTP: async ({ phoneNumber, code }) => {
      //   try {
      //     const response = await fetch(
      //       `https://sms.ru/sms/send?api_id=${process.env.SMS_API_ID}&to=${phoneNumber}&msg=Ваш код подтверждения от "Северяночки": ${code}&json=1`
      //     );

      //     const result = await response.json();

      //     if (result.status !== "OK") {
      //       throw new Error(result.status || "Ошибка отправки SMS");
      //     }
      //   } catch (error) {
      //     console.error("Ошибка отправки SMS:", error);
      //     throw error;
      //   }
      // },
      signUpOnVerification: {
        getTempEmail: (phoneNumber) => {
          return `${phoneNumber}@delivery-shop.ru`
        },
        getTempName: (phoneNumber) => {
          return phoneNumber
        }
      },
      allowedAttempts: 3,
      otpLength: 4,
      expiresIn: 300,
      requireVerification: true
    })
  ]
})
