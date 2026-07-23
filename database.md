# Database Architecture

## Core Tables

- profiles
- products
- categories
- brands
- product_images
- quotes
- quote_items
- customers
- pages
- blog_posts
- navigation
- settings

## Product Fields

id, slug, sku, name, description, category_id, brand_id, price,
sale_price, stock_status, featured, seo_title, seo_description,
created_at, updated_at.

## Relationships

Category 1:N Products Brand 1:N Products Quote 1:N Quote Items

## Storage Buckets

- products
- categories
- brands
- blog
- pages
- logos

## Security

- Row Level Security on every table
- Service role never exposed
- Public read only where required
- Admin CRUD protected by auth and policies

## Future Ready

Schema prepared for: orders, payments, reviews, inventory, wishlists,
discounts, shipping, notifications.
