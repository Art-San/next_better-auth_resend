import prisma from '@/lib/db'
import { hashPassword, verifyPassword } from '../utils/hash.util'

export async function registerUser(email: string, password: string) {
  try {
    // Проверка уникальности почты
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw Error('Email занят')
    }

    // Хэширование пароля
    const hashedPassword = await hashPassword(password)

    // Создание пользователя
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: email
      }
    })

    return newUser
  } catch (err) {
    throw err
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw new Error('Не верный email или пароль')
    }

    if (!user.password) {
      throw new Error('Не верный email или пароль')
    }

    const isValid = await verifyPassword(password, user.password)

    if (!isValid) {
      throw new Error('Не верный email или пароль')
    }

    return user
  } catch (err) {
    throw err
  }
}
