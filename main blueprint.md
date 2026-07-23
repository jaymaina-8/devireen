# DEVIREEN ENTERPRISE WEBSITE

# Project Blueprint

Version: 1.0

---

# 1. Project Overview

This project is the official company website for Devireen Enterprise.

The website is not a brochure website.

It is a modern digital procurement platform that allows businesses and individuals to discover products, request quotations, and communicate with sales representatives.

The platform must feel modern, trustworthy, extremely fast, and scalable.

Long-term, this project should evolve into a complete e-commerce platform.

---

# 2. About Devireen Enterprise

Company Name:
Devireen Enterprise

Industry:
Office Supplies
Stationery
School Accessories
Office Equipment

Location:
Nairobi CBD

Branches:
2

Warehouse:
None

Employees:
3

Years in Business:
5+

Delivery:
Nationwide (Kenya)

Business Type:
B2B + B2C

Revenue Split

60%
Bulk Business Orders

40%
Retail Customers

---

# 3. Vision

Build Kenya's most modern office supplies and stationery procurement platform.

The website should become the primary digital sales channel while positioning Devireen as a trusted supplier for businesses, schools, offices, NGOs, and retail customers.

The experience should feel closer to Amazon Business than a traditional company website.

---

# 4. Primary Objectives

The website must:

• Increase trust

• Generate quotation requests

• Showcase products professionally

• Improve Google rankings

• Support nationwide sales

• Be mobile-first

• Scale into full ecommerce

---

# 5. Target Customers

Primary

Businesses

Schools

Corporate Offices

NGOs

Government

Retail Shops

Secondary

Students

Parents

Walk-in Customers

---

# 6. Product Categories

Office Supplies

Office Equipment

School Accessories

Inventory Size

Approximately 500 products

Prices are publicly visible.

---

# 7. Ordering Workflow

Customer

↓

Browse Products

↓

Search Products

↓

View Product

↓

Add to Quote Cart

↓

Continue Shopping

↓

Submit Quote Request

↓

WhatsApp Opens

↓

Sales Representative Contacts Customer

↓

Invoice Generated

↓

Customer Pays via Paybill

↓

Delivery

---

# 8. Long-Term Roadmap

Phase 1

Product Catalogue

Quote System

CMS

SEO

Phase 2

Customer Accounts

Order Tracking

Wishlist

Inventory

Phase 3

Complete Ecommerce

Online Payments

Shipping Integration

Reviews

Coupons

Analytics

---

# 9. Technology Stack

Framework

Next.js (App Router)

Frontend

React

Tailwind CSS

Backend

Supabase

Database

PostgreSQL

Authentication

Supabase Auth

Storage

Supabase Storage

Hosting

Vercel

Deployment

GitHub + Vercel

---

# 10. Architecture

Frontend

Next.js

↓

API Layer

↓

Supabase

↓

Database

↓

Storage

↓

Authentication

All business logic must remain modular.

No tightly coupled code.

Every feature should be reusable.

---

# 11. Design Philosophy

Modern

Minimal

Professional

Fast

Clean

Data-driven

The interface should resemble premium SaaS products rather than traditional Kenyan business websites.

Products are always the hero.

Whitespace is preferred over clutter.

---

# 12. Color Palette

Primary

Blue

Secondary

White

Neutral Background

Light Gray

Typography

Dark Gray

Borders

Subtle Gray

Success

Green

Error

Red

Warning

Orange

Never overuse blue.

Use blue only to emphasize important actions.

---

# 13. UI Principles

Large whitespace

Consistent spacing

Rounded corners

Soft shadows

Minimal borders

Fast interactions

No unnecessary animations

Responsive everywhere

Accessibility first

---

# 14. Customer Experience

The website should optimize for speed.

Customers should locate products in seconds.

Searching should be easier than browsing.

The quote process must require the fewest possible clicks.

The website should feel effortless.

---

# 15. Homepage Structure

Hero

Search

Categories

Featured Products

Business Solutions

Why Choose Devireen

Brands

Testimonials

CTA

Footer

---

# 16. Navigation

Home

Products

Categories

Bulk Orders

About

Contact

Quote Cart

Search

---

# 17. Product Pages

Large Gallery

Price

SKU

Availability

Description

Specifications

Related Products

Add to Cart

Add to Quote

WhatsApp

---

# 18. Search

Search must support

Product Name

SKU

Brand

Category

Partial Matches

Autocomplete

Instant Results

---

# 19. Quote System

Quote Cart

↓

Customer Details

↓

Quote Request

↓

CRM

↓

WhatsApp

↓

Sales Follow-up

---

# 20. SEO Strategy

Every page must include

Meta Title

Meta Description

OpenGraph

Twitter Cards

Canonical URL

Structured Data

XML Sitemap

Robots.txt

SEO must never be optional.

---

# 21. Performance Goals

Google Lighthouse

Performance

95+

Accessibility

95+

SEO

100

Best Practices

95+

Largest Contentful Paint

Under 2 seconds

---

# 22. Mobile Experience

Mobile-first

Sticky Bottom Navigation

Large Tap Targets

Fast Loading

Optimized Images

---

# 23. Security

Use Row Level Security.

Never expose service keys.

Validate every request.

Sanitize all inputs.

Protect every admin route.

Secure file uploads.

Follow least-privilege principles.

---

# 24. Coding Standards

Always use TypeScript.

No any types unless absolutely unavoidable.

Prefer Server Components.

Client Components only when necessary.

Keep components small.

Single Responsibility Principle.

No duplicated code.

Reusable utilities.

Strict folder organization.

Readable code over clever code.

Document complex logic.

---

# 25. Folder Structure

/app

/components

/components/ui

/components/products

/components/cart

/components/navigation

/lib

/hooks

/actions

/services

/types

/styles

/public

---

# 26. CMS

Manage

Products

Categories

Brands

Pages

Homepage

Blog

Navigation

SEO

Settings

Media

Everything editable from the dashboard.

---

# 27. Future Features

Inventory

Orders

Invoices

Customers

Wishlists

Reviews

Discounts

Payments

Shipping

Notifications

Analytics

Customer Portal

These should influence today's architecture even if not implemented immediately.

---

# 28. Development Roadmap

Development must happen in the following order.

Phase 1

Application Setup

- Initialize Next.js project.
- Configure TypeScript.
- Configure Tailwind CSS.
- Configure ESLint and Prettier.
- Set up environment variables.
- Configure Git repository.
- Configure deployment to Vercel.

Phase 2

Backend

- Configure Supabase.
- Design PostgreSQL schema.
- Create migrations.
- Configure Row Level Security.
- Configure authentication.
- Configure storage buckets.
- Build reusable API layer.
- Implement server actions.
- Create seed data.

Phase 3

Frontend

- Implement design system.
- Build layouts.
- Build navigation.
- Build homepage.
- Build product catalogue.
- Build product pages.
- Build quote cart.
- Build search.
- Build CMS interface.
- Connect frontend to backend.

Phase 4

Polish

- Responsive optimization.
- Performance optimization.
- Accessibility improvements.
- SEO implementation.
- Image optimization.
- Error handling.
- Loading states.
- Empty states.
- Animations (only where they improve UX).
- Final UI refinement.

Phase 5

Security & Production Readiness

- Audit authentication.
- Validate authorization.
- Test RLS policies.
- Rate limiting where appropriate.
- Input validation.
- Secure uploads.
- Environment variable audit.
- Logging and monitoring.
- Backup strategy.
- Production deployment.
- Final testing.

---

# 29. Antigravity Rules

Antigravity MUST follow these rules.

1.

Never create placeholder content unless explicitly requested.

2.

Never generate fake statistics.

3.

Never sacrifice performance for visual effects.

4.

Always prioritize reusable architecture.

5.

Every component must have a clear responsibility.

6.

Avoid duplicated code.

7.

Prefer composition over inheritance.

8.

Accessibility is mandatory.

9.

SEO is mandatory.

10.

Mobile experience is equal in importance to desktop.

11.

Every page must feel production-ready before moving on.

12.

Never leave TODOs in completed work.

13.

Never break existing functionality.

14.

Maintain consistent naming conventions.

15.

Always think about future scalability.

16.

Follow Next.js best practices.

17.

Follow Supabase best practices.

18.

Write clean, maintainable code that another developer can understand quickly.

19.

If multiple implementations are possible, choose the one that offers the best balance of maintainability, scalability, performance, and developer experience.

20.

Treat this project as the foundation of a reusable B2B commerce platform for Blackpool Industry, not as a one-off client website.

---

# 30. Definition of Done

A feature is only complete when it:

- Functions correctly.
- Is responsive.
- Meets accessibility standards.
- Has appropriate loading and error states.
- Is integrated with the backend where applicable.
- Is documented if the logic is non-trivial.
- Does not introduce regressions.
- Passes linting and type checking.
- Is optimized for performance.
- Aligns with the project's design system and coding standards.

---

# End Goal

The final product should present Devireen Enterprise as a trusted, modern supplier while serving as the first production deployment of a reusable commerce platform that Blackpool Industry can adapt for future clients with minimal redevelopment.
