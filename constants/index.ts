export const PRODUCT_STATUS = {
  IN_STOCK: 'IN_STOCK',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
  PRE_ORDER: 'PRE_ORDER',
  DISCONTINUED: 'DISCONTINUED',
} as const;

export const QUOTE_STATUS = {
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  REVIEWING: 'REVIEWING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  FULFILLED: 'FULFILLED',
} as const;

export const ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  SALES_REP: 'SALES_REP',
  CUSTOMER: 'CUSTOMER',
} as const;

export const PERMISSIONS = {
  MANAGE_PRODUCTS: 'MANAGE_PRODUCTS',
  MANAGE_QUOTES: 'MANAGE_QUOTES',
  MANAGE_USERS: 'MANAGE_USERS',
  VIEW_REPORTS: 'VIEW_REPORTS',
} as const;

export const STORAGE_BUCKETS = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  BRANDS: 'brands',
  BLOG: 'blog',
  PAGES: 'pages',
  LOGOS: 'logos',
} as const;

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;
