# Middleware Architecture

This document outlines the exact responsibilities of Next.js middleware in the Devireen Enterprise platform. The root `middleware.ts` acts as the first line of defense and session management layer before requests hit the Server Components or API routes.

## Core Responsibilities

### 1. Authentication & Session Refresh

- Every incoming request to protected or user-aware routes is intercepted by the middleware.
- The middleware utilizes `@supabase/ssr` to extract the JWT from cookies and validates it via `supabase.auth.getUser()`.
- If the session token is nearing expiration, the Supabase client automatically refreshes the token and the middleware ensures the new cookies are sent back to the client in the `NextResponse`.

### 2. Protected Routes (Future Implementation)

- **Admin & Staff**: Routes under `/admin/*` will explicitly check the user's role. Unauthenticated users will be redirected to `/admin/login`.
- **Customer Portal**: Future routes under `/account/*` or `/portal/*` will require an active customer session.

### 3. Role Validation

- The middleware will verify custom claims in the JWT or fetch the user's role from the `user_roles` table (cached in the session token) to prevent unauthorized access to privileged areas before rendering Server Components.

### 4. Redirect Rules

- **Guest Access**: If a user tries to access a protected route without a session, they will be redirected to the login page with a `?redirect=` parameter appended.
- **Onboarding**: Users missing required profile fields can be intercepted and redirected to an onboarding flow.

## Architecture

- Do NOT implement heavy database queries inside the Edge Middleware. Use it exclusively for validating secure HTTP-only cookies and JWTs.
- Business logic validation (e.g. checking if a user owns a specific quote) belongs in the Server Actions, not the Middleware.
