# Database Setup Guide (Prisma 7 & Supabase)

This project uses **Prisma 7**, which introduces several changes from previous versions. Below is how the database connection is structured.

## 1. Connection Types
We use two different connection URLs from Supabase for better performance and reliability:

*   **DATABASE_URL (Pooling - Port 6543)**: Used by the **Application** during runtime. It uses a connection pooler so your app can handle many users without exhausting database connections.
*   **DIRECT_URL (Direct - Port 5432)**: Used by **Prisma (CLI)** for migrations and schema updates. This is required because pooling does not support the "locks" Prisma needs to update the database structure.

## 2. Configuration (`prisma.config.ts`)
In Prisma 7, setting the database URL in `schema.prisma` is deprecated. Instead, we use `prisma.config.ts` in the root of the project:
*   It tells the Prisma CLI to use the `DIRECT_URL` for any commands you run in the terminal (like `db push` or `migrate`).

## 3. Driver Adapters
Prisma 7 requires an explicit "Driver Adapter" to connect to PostgreSQL. We use `@prisma/adapter-pg`.
*   This is configured in `src/prisma/prisma.service.ts`.
*   It uses a standard `pg.Pool` to manage the lifecycle of database connections.

## 4. Environment Variables (.env)
*   `DATABASE_URL`: The Pooling string (ends with `:6543/postgres?pgbouncer=true`).
*   `DIRECT_URL`: The Direct string (ends with `:5432/postgres`).

## Key Commands
| Action | Command |
| :--- | :--- |
| **Sync DB with Schema** | `npx prisma db push` |
| **Reset Database** | `npx prisma migrate reset` |
| **Open Database UI** | `npx prisma studio` |
| **Update Client Types** | `npx prisma generate` |
