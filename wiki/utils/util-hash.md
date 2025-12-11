# Hash Utility

Путь: `src/server/utils/hash.util.ts`

## Назначение

Утилиты для хеширования и проверки паролей с использованием `bcrypt`.

## Интерфейс

### Входные данные

- `hashPassword(password: string)`: Хеширование пароля.
- `verifyPassword(password: string, hashedPassword: string)`: Проверка пароля.

### Выходные данные

- `hashPassword`: Возвращает хеш пароля.
- `verifyPassword`: Возвращает `true` или `false`.

## Логика работы (коротко)

- `hashPassword`: Использует `bcrypt.hash` с 10 раундами соли.
- `verifyPassword`: Использует `bcrypt.compare` для сравнения пароля с хешем.

## Где используется

- В `src/server/prisma/prisma-user-db.ts` для кастомной логики регистрации/входа.

## Примечания

- `better-auth` имеет встроенный механизм хеширования, поэтому эта утилита может быть избыточной.

## Источник изменений

- Автоматическая генерация
