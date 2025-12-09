import prisma from '../prisma/prisma-singleton'

/**
 * Проверяет соединение с базой данных
 * @throws Error если нет соединения с БД
 */
export async function checkDatabaseConnection(): Promise<void> {
  try {
    // Выполняем простой запрос для проверки соединения
    await prisma.$queryRaw`SELECT 1`
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Неизвестная ошибка'
    console.error('[DB Connection Check] База данных недоступна:', errorMessage)
    throw new Error('Нет соединения с базой данных')
  }
}
