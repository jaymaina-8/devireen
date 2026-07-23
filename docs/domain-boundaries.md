# Domain Boundaries

The Devireen Enterprise backend is structured around strict domain boundaries. Code within one domain should minimize direct coupling to the internal data structures of another domain.

## 1. Catalog Domain

- **Entities**: `Products`, `Categories`, `Brands`
- **Ownership**: Responsible for all product display, search, and catalog categorization.
- **Dependencies**: Depends lightly on Media.
- **Rules**: Catalog queries are heavily cached. The catalog should not care about stock levels directly (that belongs to Inventory).

## 2. Sales Domain

- **Entities**: `Quotes`, `Orders`, `Quote Items`
- **Ownership**: Handles the procurement workflow, pricing generation, and cart assembly.
- **Dependencies**: Strongly depends on Catalog for product references, and Customers for ownership.
- **Rules**: A quote item should snapshot the `unit_price` at the time of creation. It should not dynamically reference the catalog price forever.

## 3. Operations & Inventory Domain

- **Entities**: `Inventory`, `Warehouses`
- **Ownership**: Tracks physical goods.
- **Dependencies**: Depends on Catalog for SKUs.
- **Rules**: Inventory is the source of truth for stock levels. The Catalog domain queries Inventory to determine the `stock_status` display.

## 4. CRM & Customer Domain

- **Entities**: `Customers`, `Addresses`
- **Ownership**: Manages customer relationships, business terms, and contact info.
- **Dependencies**: Depends on Core Authentication (Profiles).

## 5. Content Management (CMS)

- **Entities**: `Pages`, `Media`, `Navigation`, `SEO`
- **Ownership**: Manages all non-product dynamic content.
- **Rules**: Highly decoupled. Other domains reference media URLs, but do not manage the media entities.

## 6. Core System

- **Entities**: `Profiles`, `Roles`, `Permissions`, `Settings`, `Logs`
- **Ownership**: Authentication, Authorization, Global Config.
- **Rules**: All domains depend on Core for RBAC and settings, but Core must never depend on the higher-level domains.
