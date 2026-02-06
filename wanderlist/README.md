# Wanderlist

A calm, aspirational travel bucket-list web app, personal travel journal + planner built with Next.js (App Router), Tailwind CSS, Prisma and Auth.js.

## Quick start

1. Install dependencies
```bash
npm install

2.DATABASE_URL="postgresql://user:pass@localhost:5432/wanderlist?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<random-secret>"
# Optional (Google provider)
GOOGLE_ID="<id>"
GOOGLE_SECRET="<secret>"

3.npx prisma generate
npx prisma migrate dev --name init

4.npm run dev

Key scripts
Start dev: npm run dev
Build: npm run build
Start (production): npm run start
Important files
Prisma schema: prisma/schema.prisma
Auth helpers: src/app/actions/auth.ts
Bucket-list actions: src/app/actions/bucket-list.ts
Dashboard / pages: src/app/dashboard/
Notes
Ensure DATABASE_URL and NEXTAUTH_SECRET are set for local and production environments.
When changing Prisma models: run npx prisma migrate dev then npx prisma generate.
Deploy by setting required environment variables on your host, then npm run build and npm run start. 