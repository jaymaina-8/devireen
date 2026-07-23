"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Menu, X, PackageOpen, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useQuoteCart } from "@/lib/store/quote-cart";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products", hasMegaMenu: true },
  { href: "/products", label: "Categories", hasMegaMenu: true },
  { href: "/bulk-orders", label: "Bulk Orders" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/* ─── Mega Menu Category Data ─── */
const megaCategories = [
  {
    name: "Office Supplies",
    href: "/products?category=office-supplies",
    image: "/images/category_office_supplies.png",
  },
  {
    name: "Stationery",
    href: "/products?category=stationery",
    image: "/images/category_stationery.png",
  },
  {
    name: "School Supplies",
    href: "/products?category=school-accessories",
    image: "/images/category_school_supplies.png",
  },
  {
    name: "Office Equipment",
    href: "/products?category=office-equipment",
    image: "/images/category_office_equipment.png",
  },
  {
    name: "Technology",
    href: "/products?category=technology",
    image: "/images/category_technology.png",
  },
  {
    name: "Cleaning",
    href: "/products?category=cleaning",
    image: "/images/category_cleaning.png",
  },
];

export function Navbar({ settings }: { settings?: any }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = React.useState(false);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const megaMenuTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const { items } = useQuoteCart();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [pathname]);

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 200);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-surface/95 backdrop-blur-md border-b border-border-subtle">
      <div className="container mx-auto px-4">
        {/* Top Utility Bar */}
        <div className="hidden items-center justify-between border-b border-border-subtle py-1.5 text-xs text-text-muted sm:flex">
          <p className="font-medium">Kenya&apos;s Trusted B2B Office &amp; School Supplier</p>
          <div className="flex items-center space-x-4">
            <span>Call us: {settings?.phone_numbers?.[0] || "+254 708 037929"}</span>
            <Link
              href="/contact"
              className="hover:text-primary-600 transition-colors"
            >
              Support
            </Link>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg sm:text-xl text-primary-600 tracking-tight shrink-0"
            >
              {settings?.logo_url ? (
                <img
                  src={settings.logo_url}
                  alt={settings.company_name || siteConfig.name}
                  className="h-8 object-contain"
                />
              ) : (
                <PackageOpen className="h-6 w-6 shrink-0" />
              )}
              <span className="inline-block whitespace-nowrap">
                {settings?.company_name || siteConfig.name}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {links.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={link.hasMegaMenu ? handleMegaMenuEnter : undefined}
                  onMouseLeave={link.hasMegaMenu ? handleMegaMenuLeave : undefined}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "nav-link-underline inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:text-primary-600",
                      pathname === link.href
                        ? "text-primary-600"
                        : "text-text-muted"
                    )}
                    data-active={pathname === link.href}
                  >
                    {link.label}
                    {link.hasMegaMenu && (
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          isMegaMenuOpen && "rotate-180"
                        )}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className={cn(
                "hidden md:flex items-center border rounded-lg transition-all duration-200 bg-background",
                isSearchFocused
                  ? "border-primary-500 ring-2 ring-primary-100 w-72"
                  : "border-border-subtle w-56"
              )}
            >
              <Search className="h-4 w-4 text-text-muted ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Search 500+ products..."
                className="w-full bg-transparent px-2 py-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                aria-label="Search products"
              />
            </form>

            {/* Request Quote CTA — desktop only */}
            <Link href="/quote" className="hidden lg:block shrink-0">
              <Button variant="primary" size="sm" className="font-semibold">
                Request Quote
              </Button>
            </Link>

            {/* Quote Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-text-main"
              onClick={() => useQuoteCart.getState().toggleCart()}
              aria-label="Quote Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Quote Cart</span>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-text-main"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* ─── Mega Menu Dropdown ─── */}
      {isMegaMenuOpen && (
        <div
          className="hidden lg:block absolute left-0 right-0 bg-surface border-b border-border-subtle shadow-xl z-40"
          onMouseEnter={handleMegaMenuEnter}
          onMouseLeave={handleMegaMenuLeave}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
              {megaCategories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="group flex flex-col items-center text-center gap-3 p-3 rounded-xl hover:bg-background transition-colors cursor-pointer"
                >
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-background">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover img-zoom"
                      sizes="150px"
                    />
                  </div>
                  <span className="text-sm font-medium text-text-main group-hover:text-primary-600 transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border-subtle flex justify-between items-center">
              <p className="text-sm text-text-muted">
                Can&apos;t find what you need?
              </p>
              <Link href="/products">
                <Button variant="ghost" size="sm">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ─── Mobile Menu (Sidebar) ─── */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div 
            className="absolute top-0 left-0 w-screen h-[100dvh] bg-black/60 z-[90] lg:hidden animate-in fade-in duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Sidebar */}
          <div className="absolute top-0 left-0 w-[280px] sm:w-[320px] h-[100dvh] bg-surface z-[100] shadow-2xl flex flex-col lg:hidden animate-in slide-in-from-left duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border-subtle shrink-0">
              <span className="font-bold text-lg text-primary-600">Menu</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="h-8 w-8 text-text-muted hover:text-text-main"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
              {/* Mobile Search */}
              <form 
                onSubmit={(e) => { 
                  handleSearchSubmit(e); 
                  setIsMobileMenuOpen(false); 
                }} 
                className="flex items-center border border-border-subtle rounded-lg bg-background"
              >
                <Search className="h-4 w-4 text-text-muted ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-transparent px-2 py-3 text-sm text-text-main placeholder:text-text-muted focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                />
              </form>

              <nav className="flex flex-col space-y-1">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 text-sm font-medium rounded-md transition-colors",
                      pathname === link.href
                        ? "bg-primary-50 text-primary-600"
                        : "text-text-main hover:bg-background"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Footer CTA */}
            <div className="p-4 border-t border-border-subtle shrink-0">
              <Link href="/quote" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full py-6 text-base shadow-md">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
