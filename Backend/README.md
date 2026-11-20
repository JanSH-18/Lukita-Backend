# Lukita - Backend (unido)

Node.js + Express 5 + Prisma 7 (adapter Neon) con esquema `lukita`.
Incluye Swagger en `/api-docs` y los retos de clase en `/api/saludo`, `/api/yo`, `/api/edad/:anio`.

## Arrancar
1. `cp .env.example .env` y completar `DATABASE_URL` (Neon, sin `?schema=`) y `JWT_SECRET`.
2. `npm install`
3. `npx prisma generate`
4. `npm run dev`

## Render
- Root Directory: la carpeta donde está este `package.json`
- Build Command: `npm install && npx prisma generate`
- Start Command: `npm start`
- Variables: `DATABASE_URL`, `JWT_SECRET` (obligatorias) y las opcionales de `.env.example`

## Importante
- NO correr `prisma migrate reset`: puede borrar el esquema `lukita`.
- Las tablas vienen de `Lukita-BD.sql`; no se usan migraciones de Prisma. Si cambia la BD: `npx prisma db pull`.
- Si `lukita.perfiles` no tiene la columna `ruc`: `alter table lukita.perfiles add column ruc varchar(11);`
