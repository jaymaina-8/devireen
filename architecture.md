# Phase 2 — Database & Platform Architecture

## 1. Platform Overview

The Devireen Enterprise platform is architected as a modern, decoupled, serverless ecommerce application.

- **Frontend**: Next.js (App Router), React, Tailwind CSS, built for high performance and mobile-first responsiveness.
- **Backend & Database**: Supabase (PostgreSQL), providing an auto-generated API, Row Level Security (RLS), and real-time capabilities.
- **Storage**: Supabase Storage for optimized asset delivery.
- **Authentication**: Supabase Auth handling JWT session management securely.
- **Hosting & Deployment**: Vercel for seamless Next.js edge-network deployment, utilizing GitHub for CI/CD.
- **System Boundaries**: The Next.js server (Server Components/Actions) acts as a secure intermediary and BFF (Backend-for-Frontend) that interacts with Supabase, preventing raw database access from the client, except where explicitly permitted via RLS for performance.

## 2. Database Philosophy

To ensure longevity and scalability without major refactoring, the database adheres to these strict rules:

- **Naming Conventions**: `snake_case` for all schemas, tables, and columns. Plural for table names (e.g., `products`).
- **UUID Strategy**: All primary keys (`id`) use `uuid` (UUIDv4) by default. This prevents ID enumeration attacks and allows client-side ID generation.
- **Timestamps**: Every table must include `created_at` and `updated_at` `TIMESTAMPTZ` fields, automatically managed via Postgres triggers.
- **Soft Deletes**: Critical entities (e.g., `products`, `quotes`, `customers`) use a `deleted_at` nullable timestamp instead of hard `DELETE` commands, preserving historical auditability.
- **Audit Fields**: Operations-heavy tables include `created_by` and `updated_by` (UUIDs referencing profiles).
- **Normalization**: Target 3rd Normal Form (3NF). Use `JSONB` sparingly, only for truly unstructured or sparse data (e.g., product attributes).
- **Indexing**:
  - B-Tree indexes on all Foreign Keys.
  - GIN indexes on search vector columns.
  - Partial indexes for querying active/deleted items (e.g., `WHERE deleted_at IS NULL`).

## 3. Complete Entity List

**Catalog & Discovery**

- `products`: Core product catalog.
- `categories`: Hierarchical product categorization.
- `brands`: Manufacturers or brands.
- `product_images`: 1:N gallery images.
- `product_variants`: Future SKU variants (size, color).
- `product_tags`: M:N tagging system.

**Sales & Procurement**

- `quotes`: Requested quotations.
- `quote_items`: Individual items within a quote.
- `orders`: Future finalized purchases.
- `order_items`: Line items for orders.
- `payments`: Future payment transactions.
- `wishlists`: Saved product lists.
- `coupons` / `discounts`: Promotional rules.

**Users & Customers**

- `profiles`: Core user extension of Supabase `auth.users`.
- `customers`: CRM entity (companies or individuals).
- `addresses`: Billing and shipping addresses.

**Operations & Logistics**

- `inventory`: Stock ledger for multi-warehouse tracking.
- `warehouses`: Physical locations.
- `notifications`: System or user alerts.

**Content & CMS**

- `pages`: Dynamic landing pages.
- `blog_posts`: Future content marketing.
- `navigation`: Dynamic menu structures.
- `media`: Centralized asset references.
- `settings`: Global site configuration.
- `seo_metadata`: SEO overrides per entity.

**Security & Auditing**

- `roles`: RBAC roles.
- `permissions`: Granular capabilities.
- `role_permissions`: M:N role mapping.
- `user_roles`: M:N user mapping.
- `activity_logs`: User action tracking.
- `audit_logs`: Critical system event tracking.
- `sessions`: Captured login sessions.

## 4. Entity Relationships

- **Categories (1:N) Products**: A category can have many products. Deletion is `RESTRICT` to prevent orphaning products.
- **Brands (1:N) Products**: A brand has many products. `RESTRICT`.
- **Products (1:N) Product Images**: `CASCADE` delete; removing a product removes its images.
- **Quotes (1:N) Quote Items**: `CASCADE` delete.
- **Customers (1:N) Quotes**: `RESTRICT`. Quotes must survive customer record deletion for financial history.
- **Products (M:N) Categories**: Handled via `product_categories` mapping table to allow multiple categories per product in the future.
- **Self-referential (Categories)**: `parent_id` for infinite subcategories.

## 5. Product Architecture

The product system is designed to evolve from simple listings to complex ecommerce SKUs.

- **Core Fields**: `id`, `slug`, `sku`, `name`, `description`, `price`, `sale_price`.
- **Attributes**: A `JSONB` column stores varying specifications (e.g., `{"weight": "1kg", "color": "red"}`) without breaking the schema.
- **Variants**: `product_variants` will eventually handle distinct SKUs sharing a parent product, keeping `products` as the canonical display entity.
- **Stock Status**: Enum (`IN_STOCK`, `OUT_OF_STOCK`, `PRE_ORDER`) to decouple display logic from raw inventory numbers.
- **SEO**: Embedded `seo_title` and `seo_description` with fallbacks to generation.

## 6. Quote System Architecture

- **Lifecycle**:
  1. `DRAFT`: Customer assembling cart.
  2. `PENDING`: Submitted, awaiting review.
  3. `REVIEWING`: Sales rep actively building invoice.
  4. `APPROVED`: Pricing confirmed, sent to customer.
  5. `REJECTED`: Cancelled by either party.
  6. `FULFILLED`: Converted to paid order.
- **Workflow**: Customer submits a quote request > Redirects to WhatsApp with a pre-filled message + unique Quote ID > Sales rep pulls ID in CRM > Converts to Order.

## 7. Customer Architecture

- **Anonymous**: Stored via local storage/cookies for quote carts.
- **Retail Customers**: Basic profiles with email/phone.
- **Business Customers**: Extended fields (Company Name, KRA PIN, Credit Terms).
- **Future Portals**: Will allow B2B clients to view order history, download invoices, and reorder from saved lists.

## 8. Authentication Strategy

- **Mechanism**: Supabase Auth (JWT).
- **Admin/Staff**: Email + Password (mandatory 2FA in the future).
- **Customers**: Initial quote requests are guest/anonymous. In the future, Passwordless/Magic Link or Google OAuth will reduce friction for retail users.
- **Session Strategy**: Short-lived access tokens, HttpOnly secure cookies via Next.js middleware for server-side auth validation.

## 9. Authorization Strategy (RBAC)

- **Admin**: Superuser, unrestricted access.
- **Manager**: Catalog, Quotes, Users (cannot delete users or alter settings).
- **Sales**: Quotes, Customers, View-only Catalog.
- **Content Editor**: CMS, Blog, Pages, Media.
- **Customer**: Own quotes, own profile.
- Implemented via a `user_roles` linking table, consumed by RLS policies and Next.js middleware.

## 10. Row Level Security (RLS) Strategy

- **Public**: `SELECT` on active `products`, `categories`, `brands`, `pages`.
- **Anonymous**: `INSERT` on `quotes`, `quote_items` (using transient session IDs).
- **Authenticated (Customers)**: `SELECT` on `quotes` where `customer_id = auth.uid()`.
- **Staff (Admin/Manager)**: `ALL` on catalog, `ALL` on quotes.
- Enforced at the Postgres level, ensuring data cannot leak via API tampering.

## 11. Storage Architecture

- **Buckets**:
  - `products` (Public): Optimized WebP product images. Organized by `/products/{uuid}/`.
  - `brands`, `categories` (Public): Logos and banners.
  - `documents` (Private): Internal PDFs, KRA certificates, private quotes.
- **Optimization**: Images are transformed and cached via Next.js `next/image` to guarantee fast LCP.

## 12. Search Architecture

- **Immediate Implementation**: Postgres Full Text Search using `tsvector` on `name`, `sku`, `description`.
- **Autocomplete**: Leveraging `pg_trgm` (trigram matching) for partial string matching and typos.
- **Future Scale**: If catalog exceeds 50k items, migrate search index to Typesense or Algolia, decoupled via Supabase Webhooks.

## 13. SEO Architecture

- **Dynamic Metadata**: Next.js `generateMetadata` fetches canonical URLs, titles, and descriptions dynamically per product/category.
- **Structured Data**: JSON-LD injected into `<head>` for Products and Breadcrumbs to secure rich snippets.
- **Sitemap**: Auto-generated `sitemap.xml` driven by the database.

## 14. CMS Architecture

A bespoke Next.js Admin Dashboard built alongside the main app (`/admin`).

- **Modules**: Dashboard (KPIs), Products (CRUD), Quotes (Kanban or Table view), Settings.
- Utilizes optimistic UI updates and Server Actions for a fast, SPA-like feel.

## 15. API Architecture

- **Pattern**: Next.js Server Actions encapsulate all mutations. Repositories (e.g., `ProductRepository`) encapsulate all Supabase queries.
- **Validation**: `Zod` schemas validate every input on both the client (forms) and server (actions).
- **Caching**: Next.js Data Cache (`unstable_cache`) and `revalidatePath`/`revalidateTag` used heavily to cache product lists while allowing instant invalidation on CMS updates.

## 16. Performance Strategy

- **Database**: Lean queries, fetching only necessary columns.
- **Frontend**: Heavy use of React Server Components to ship zero JS to the client for static UI.
- **Streaming**: React Suspense boundaries wrap slow database queries (e.g., Recommended Products) so the main page paints instantly.

## 17. Security Architecture

- **Zero Trust**: Client-side is untrusted. All logic executes on the server.
- **Secrets Management**: Vercel Environment Variables. Service Role Key is NEVER exposed to the browser.
- **XSS/CSRF**: Next.js inherently protects against XSS (React escaping) and CSRF (Server Actions have built-in validation).

## 18. Future Expansion

The decoupled repository layer and normalized database mean adding Inventory Management simply requires new tables linked to `product_variants`. Online payments (M-Pesa, Stripe) can be integrated by replacing the manual Quote fulfillment flow with a secure checkout mutation.

## 19. Risks & Mitigation

- **Risk**: Supabase/PostgreSQL bottleneck on complex full-text search.
  - **Mitigation**: Implement `pg_trgm` and proper indexing early. Plan for external search if load increases.
- **Risk**: Next.js cache poisoning or stale data.
  - **Mitigation**: Strict use of `revalidateTag` in every CMS mutation to ensure cache coherency.

## 20. Final Review

The architecture strikes a balance between rapid development (utilizing Supabase and Server Actions) and enterprise-grade scalability. The strict adherence to normalized Postgres schemas and a decoupled repository pattern ensures that Devireen Enterprise can scale from a quote-based procurement site to a multi-branch automated ecommerce platform without a complete rewrite.
