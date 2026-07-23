# Phase 4 — Design Language & UX Foundation

This document serves as the visual constitution and single source of truth for the Devireen Enterprise platform. It establishes the rules, tokens, and UX guidelines that must be strictly followed when constructing the UI Component Library (Phase 5) and all future features.

---

## Section 1 — Brand Philosophy

**Brand Personality:** Professional, authoritative, efficient, and trustworthy.
**Visual Tone:** Clean, structural, and data-driven. The interface should feel like a premium B2B SaaS platform (e.g., Stripe, modern Amazon Business), avoiding the cluttered look of traditional local storefronts.
**Emotional Goals:** Instill confidence that Devireen Enterprise can handle large-scale, high-value corporate procurement reliably.
**User Perception:** Fast, effortless, and transparent.
**Design Principles:** The products are the hero; the UI exists only to facilitate discovery and action. Blue is used for trust and action, not decoration.

---

## Section 2 — Design Principles

1. **Simplicity over Decoration:** UI elements must have a functional purpose. Avoid unnecessary gradients, complex borders, or decorative patterns.
2. **Products before Graphics:** Product images and data take precedence. The interface fades into the background.
3. **Search before Browsing:** In B2B procurement, buyers usually know what they want. Search is prominent, instant, and forgiving.
4. **Information Hierarchy:** Crucial data (SKU, Price, Stock) must be instantly scannable without hunting.
5. **Progressive Disclosure:** Hide complex options (like advanced filtering or detailed specs) until requested by the user to reduce cognitive load.
6. **Consistency:** A button behaves exactly the same way on the homepage as it does in the CMS dashboard.
7. **Accessibility:** The platform must be usable by everyone. Contrast, keyboard navigation, and screen reader support are non-negotiable.
8. **Predictability:** Use established UX patterns. Do not invent new ways to add items to a cart or submit forms.
9. **Performance-first:** Design decisions must not compromise load times (e.g., avoiding heavy animation libraries).

---

## Section 3 — Color System

Colors are defined in HEX and will be translated to CSS variables for dynamic theming (e.g., future dark mode).

**Primary Colors (Trust & Action)**

- `Primary Base`: `#2563EB` (Blue 600) — Primary buttons, active states, key links.
- `Primary Hover`: `#1D4ED8` (Blue 700) — Button hover states.
- `Primary Light`: `#EFF6FF` (Blue 50) — Selected row backgrounds, active nav items.

**Secondary Colors**

- `Secondary Base`: `#0F172A` (Slate 900) — Used sparingly for high-contrast secondary actions (e.g., "Save to Wishlist").

**Neutral & Surface Palette**

- `Background`: `#F8FAFC` (Slate 50) — The main app background.
- `Surface`: `#FFFFFF` (White) — Cards, modals, dropdowns.
- `Text Main`: `#0F172A` (Slate 900) — Primary headings.
- `Text Body`: `#334155` (Slate 700) — Standard paragraph and UI text.
- `Text Muted`: `#64748b` (Slate 500) — Secondary text, placeholders, SKUs.

**Borders**

- `Border Subtle`: `#E2E8F0` (Slate 200) — Standard card borders, dividers.
- `Border Strong`: `#CBD5E1` (Slate 300) — Input borders, active dividers.

**Semantic Colors**

- `Success`: `#16A34A` (Green 600) — In-stock badges, success toasts.
- `Warning`: `#EA580C` (Orange 600) — Low stock, pending states.
- `Error`: `#DC2626` (Red 600) — Out of stock, validation errors, destructive actions.
- `Info`: `#0284C7` (Sky 600) — Informational alerts.
- `Disabled`: `#94A3B8` (Slate 400) text on `#F1F5F9` (Slate 100) background.

---

## Section 4 — Typography

**Font Family**: `Inter` (Sans-serif) for all UI text to maximize legibility in data tables and catalogs.

**Scale & Hierarchy**

- `Display` (Marketing/Hero): 48px, Bold (700), Line Height: 1.1, Tracking: -0.02em
- `H1` (Page Title): 30px, Semibold (600), Line Height: 1.2, Tracking: -0.01em
- `H2` (Section Header): 24px, Semibold (600), Line Height: 1.3
- `H3` (Card Title): 20px, Semibold (600), Line Height: 1.4
- `Body Large`: 18px, Regular (400), Line Height: 1.5
- `Body Base` (Standard): 16px, Regular (400), Line Height: 1.5
- `Body Small` (Captions): 14px, Regular (400), Line Height: 1.5
- `Labels / Legal`: 12px, Medium (500), Line Height: 1.5, Tracking: 0.02em (Uppercase for tiny labels)

**Rules for Long-form Content**
Reading width should never exceed `65ch` (characters) to prevent eye strain. Use `prose` (Tailwind Typography) for blog posts and CMS pages.

---

## Section 5 — Spacing System

Based strictly on an **8px grid**.

**Scale**

- `2px` (micro adjustments)
- `4px` (tight relationship, e.g., icon + text)
- `8px` (base unit, list items)
- `12px` (inner padding for buttons/inputs)
- `16px` (standard container inner padding)
- `24px` (card spacing, form groups)
- `32px` (section padding on mobile)
- `48px`, `64px`, `96px` (macro section spacing on desktop)

**Whitespace Philosophy**
Whitespace is an active design element. Elements that relate to each other should be physically closer (Gestalt principle of proximity). Generous outer padding ensures the interface does not feel cramped.

---

## Section 6 — Layout System

- **Maximum Content Width**: `1280px` (`max-w-7xl`). Prevents the UI from stretching uncomfortably on ultra-wide monitors.
- **Grid Columns**: 12-column responsive grid.
- **Sidebar Width**: `256px` (`w-64`) for CMS admin panels and category filters.
- **Header Height**: `64px` (mobile), `72px` (desktop).
- **Footer Spacing**: `64px` top padding, `32px` bottom padding.
- **Page Structure**: `Header` -> `Breadcrumbs` -> `Main Content` (with optional Sidebar) -> `Footer`.

---

## Section 7 — Border Radius

Rounded corners establish a modern, approachable aesthetic.

- `none` (0px): Full-bleed banners, structural backgrounds.
- `sm` (4px): Badges, checkboxes, tooltips.
- `md` (8px): **Default.** Buttons, inputs, standard product cards.
- `lg` (12px): Modals, large feature cards, dropdown menus.
- `xl` (16px): Bottom sheets on mobile.
- `full` (9999px): Avatars, pill-shaped tags.

---

## Section 8 — Shadows

Shadows indicate elevation and interactivity. Do not use shadows for purely decorative purposes.

- `sm` (`0 1px 2px 0 rgba(0,0,0,0.05)`): Subtle depth for input fields or sticky headers.
- `md` (`0 4px 6px -1px rgba(0,0,0,0.1)`): Standard elevation for hovered cards and dropdown menus.
- `lg` (`0 10px 15px -3px rgba(0,0,0,0.1)`): High elevation for Modals, Drawers, and critical Popovers.
- `none`: Use flat borders (`Border Subtle`) for default un-hovered cards to keep the UI clean.

---

## Section 9 — Borders

- **Border Width**: Strictly `1px` for all standard borders. `2px` for focus rings.
- **Dividers**: Use `#E2E8F0` (Border Subtle) to separate list items or sections.
- **Cards**: Flat with a `1px` subtle border. On hover, the border may shift to `#CBD5E1` alongside a shadow increase.
- **Inputs**: `1px` subtle border by default. On focus: `2px` Primary Blue ring (`ring-primary-500`).

---

## Section 10 — Iconography

- **Library**: `lucide-react`
- **Style**: Minimalist, unbranded, line-based.
- **Stroke Width**: Strictly `2px`.
- **Sizes**:
  - `16px`: Inline with small text or buttons.
  - `20px`: Standard icon size.
  - `24px`: Primary navigation icons.
- **Usage**: Never use filled icons unless representing an "Active/Selected" state (e.g., a filled star for favorites).
- **Decorative**: Use sparingly. Icons must aid comprehension.

---

## Section 11 — Imagery

- **Photography Style**: Clean, well-lit, isolated on white or light gray backgrounds. No distracting lifestyles unless it's a Hero banner.
- **Product Photography**: Standardized to a `1:1` (square) aspect ratio. Must have a transparent or pure `#FFFFFF` background.
- **Aspect Ratios**:
  - Products: `1:1`
  - Hero/Banners: `16:9` or `21:9`
  - Blog/Articles: `16:9`
- **Image Optimization**: All images must be served via Next.js `next/image` using WebP format, properly sized with `sizes` attributes for responsive loading.
- **Empty States**: Use minimal, monochromatic illustrations or large muted icons. Avoid cartoonish vectors.

---

## Section 12 — Motion

Motion enhances usability by providing context. It must never distract or slow down the user.

- **Durations**:
  - `150ms` (Fast): Hover states, active clicks, dropdowns.
  - `200ms` (Medium): Modals, drawers sliding in.
- **Easing**:
  - `ease-out`: Elements entering the screen (decelerating).
  - `ease-in`: Elements exiting the screen (accelerating).
- **Hover Animations**: Subtle Y-axis translation (`-2px`) on cards, background color shifts on buttons.
- **Loading**: Use shimmering skeletons instead of spinning loaders for content areas. Spinning loaders are acceptable for button states during form submission.

---

## Section 13 — Accessibility (a11y)

- **Contrast Ratios**: All text must meet WCAG 2.1 AA standards (minimum 4.5:1 for normal text, 3:1 for large text).
- **Keyboard Navigation**: The entire platform must be navigable via the `Tab` key.
- **Focus States**: Every interactive element must display a visible focus ring (`ring-2 ring-primary-500 ring-offset-2`) when focused via keyboard. Do NOT suppress outline on focus.
- **Screen Readers**: `aria-label` required for icon-only buttons. Use semantic HTML (`<nav>`, `<main>`, `<article>`, `<header>`).
- **Touch Targets**: Minimum `44x44px` for mobile interactive elements (buttons, links).
- **Reduced Motion**: Respect `prefers-reduced-motion: reduce` by disabling non-essential transitions.

---

## Section 14 — Responsive Design

Mobile-first approach.

- **Mobile (< 640px)**: 1 column. Bottom sticky navigation for primary actions (Cart, Search, Home). Modals become full-screen bottom sheets.
- **Tablet (640px - 1024px)**: 2-3 columns for products. Hamburger menu for navigation.
- **Desktop (1024px - 1280px)**: 4 columns for products. Visible mega-menus. Persistent sidebars.
- **Large Desktop (> 1280px)**: Container maxes out at `1280px` and centers on the screen to maintain reading widths and image aspect ratios.

---

## Section 15 — Navigation UX

- **Header Behavior**: Sticky on scroll up, hides on scroll down to maximize vertical screen real estate.
- **Search Behavior**: Centrally located in the header on desktop. Expands into a full-screen overlay on mobile. Instant autocomplete suggestions.
- **Mega Menu Strategy**: Used on desktop to expose all categories without requiring multiple clicks.
- **Breadcrumbs**: Essential for B2B. Present on all product and category pages to allow rapid upward navigation.
- **Quote Cart Access**: Always visible in the top right (desktop) or sticky bottom bar (mobile) with an indicator showing the current item count.

---

## Section 16 — Commerce UX (The Journey)

**Goal:** Zero-friction from discovery to quote request.

1. **Homepage**: Immediate access to Search and top Categories.
2. **Search**: Forgiving (typo-tolerant), prioritizing SKU and exact Name matches.
3. **Category**: High-density grid. Filters must not require a page reload.
4. **Product**: Clear hierarchy: Name > SKU > Price > Stock Status > Add to Quote.
5. **Quote Cart**: Persistent drawer or dedicated page. Allows bulk quantity updates easily.
6. **Customer Details**: One-step form. Auto-filled if the user is authenticated.
7. **WhatsApp Integration**: Deep-links seamlessly with a pre-formatted message and Quote ID.
8. **Sales/Invoice/Delivery**: Handled via the CMS/CRM dashboard by Devireen staff.

---

## Section 17 — Form UX

- **Inputs**: Clear label above the field. No placeholder-as-label patterns (bad for accessibility).
- **Validation**: Inline, real-time validation upon `onBlur` (when the user leaves the field).
- **Errors**: Input borders turn red (`Border Error`). Clear error message below the field accompanied by an icon.
- **Success**: Inline green checkmark for critical fields (e.g., KRA PIN verification).
- **Loading**: Disable the submit button and show a spinner inside the button. Do not freeze the whole screen unless necessary.
- **Dropdowns**: Use native `<select>` on mobile for better OS-level UX, custom Radix-style dropdowns on desktop.

---

## Section 18 — Feedback Patterns

- **Toast Notifications**: Used for passive success actions (e.g., "Added to Cart"). Disappear after 3-5 seconds. Must not block UI.
- **Alerts**: Used for page-level information (e.g., "Your account is pending verification").
- **Dialogs (Modals)**: Used for destructive actions (e.g., "Clear Cart") or complex sub-flows. Require explicit user dismissal.
- **Empty States**: "No quotes yet." Provide a clear Call to Action (e.g., "Browse Products").
- **Skeletons**: Used during SSR/Suspense data fetching to maintain page structure and reduce layout shift (CLS).

---

## Section 19 — Performance UX

- **Lazy Loading**: Images below the fold must use `loading="lazy"`.
- **Pagination vs Infinite Scroll**: Use Pagination for structured B2B catalogs (predictable, linkable). Use Infinite Scroll for search autocomplete dropdowns.
- **Optimistic Updates**: When adding an item to the quote cart, instantly update the UI count, then verify with the server in the background.
- **Perceived Performance**: Next.js Prefetching ensures navigating between categories feels instant.

---

## Section 20 — Future Expansion

The design language is strictly modular to accommodate Phase 2/3 Roadmap expansions:

- **Customer Accounts**: Standard form layouts and standard table structures will be reused for order history.
- **Inventory/Orders/Payments**: The Quote Cart is structurally identical to a standard Checkout Cart. Upgrading to online payments just adds a "Payment" step to the existing layout.
- **CMS / Multi-branch**: The `Surface` and `Sidebar` layout tokens established here will perfectly structure the admin dashboard.

---

## Final Review

**Strengths:** The design system heavily leverages standard, predictable B2B UX patterns. The strict adherence to `Inter`, a 12-column grid, and a slate/blue color palette ensures Devireen feels like a premium enterprise tool.
**Weaknesses/Inconsistencies:** Because we prioritize Search over Browsing, the mobile experience must heavily optimize the Search overlay. If the search is slow, the entire UX degrades.
**Improvements:** We must ensure the Search input is the most prominent element on mobile devices.
**Scalability:** By defining everything as tokens (Spacing, Colors, Radii) and componentizing them in Phase 5, Blackpool Industry can deploy entirely new e-commerce brands just by swapping the CSS variables defined in Section 3, without rewriting a single React component.
