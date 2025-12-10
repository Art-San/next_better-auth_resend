import VerifyEmail from '@/app/(auth)/(reg)/_components/VerifyEmail'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { Resend } from 'resend'
import prisma from '@/server/prisma/prisma-singleton'

// Инициализация клиента Resend с использованием API-ключа из переменных окружения
const resend = new Resend(process.env.RESEND_API_KEY)

// Экспорт сконфигурированного экземпляра betterAuth
export const auth = betterAuth({
  // Настройка адаптера базы данных.
  // Мы используем Prisma для работы с PostgreSQL.
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),

  // Конфигурация стратегии аутентификации по email и паролю
  emailAndPassword: {
    // Включаем этот метод аутентификации
    enabled: true,
    // Минимальная требуемая длина пароля
    minPasswordLength: 6,
    // Обязательное требование подтверждения email после регистрации
    requireEmailVerification: true
  },

  // Настройка процесса подтверждения email
  emailVerification: {
    // Функция для отправки письма с подтверждением.
    // Вызывается после успешной регистрации пользователя.
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: 'Северяночка <onboarding@resend.dev>', // Адрес отправителя
        to: user.email, // Email получателя (зарегистрированного пользователя)
        subject: 'Подтвердите email', // Тема письма
        // Тело письма в виде React-компонента
        react: VerifyEmail({ username: user.name, verifyUrl: url })
      })
    },
    // Срок действия токена для подтверждения email (в секундах). 86400 = 24 часа.
    expiresIn: 86400,
    // Отключаем автоматический вход в систему после подтверждения email.
    // Пользователю нужно будет войти вручную.
    autoSignInAfterVerification: false
  }
})
