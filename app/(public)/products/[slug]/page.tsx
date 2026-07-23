import { fetchProductBySlug } from "@/actions/product.actions";
import { ProductImage } from "@/components/products/ProductImage";
import { Price } from "@/components/products/Price";
import { StockIndicator, StockStatus } from "@/components/products/StockIndicator";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowLeft, Truck, ShieldCheck, Clock, Package } from "lucide-react";
import { AddToQuoteButton } from "./AddToQuoteButton";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { data: product } = await fetchProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found" };
  
  return {
    title: product.name,
    description: product.description || `Buy ${product.name} at Devireen Enterprise.`,
  };
}

export default async function ProductDetailsPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { data: product } = await fetchProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }

  const allImages = product.product_images || [];
  const primaryImage = allImages.find((i: any) => i.is_primary)?.url || allImages[0]?.url || null;
  const hasMultipleImages = allImages.length > 1;

  // Build attributes from JSON if available
  const attributes = product.attributes && typeof product.attributes === "object"
    ? Object.entries(product.attributes as Record<string, string>)
    : [];

  return (
    <div suppressHydrationWarning={true} className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="bg-surface border-b border-border-subtle">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center text-sm text-text-muted" aria-label="Breadcrumb">
            <Link href="/products" className="hover:text-primary-600 transition-colors flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" /> Products
            </Link>
            {product.categories && (
              <>
                <ChevronRight className="h-3.5 w-3.5 mx-2 text-border-strong" />
                <Link href={`/products?category=${product.categories.slug}`} className="hover:text-primary-600 transition-colors">
                  {product.categories.name}
                </Link>
              </>
            )}
            <ChevronRight className="h-3.5 w-3.5 mx-2 text-border-strong" />
            <span className="text-text-main truncate max-w-[200px] sm:max-w-xs font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ─── Gallery ─── */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl border border-border-subtle bg-surface overflow-hidden group">
              <ProductImage src={primaryImage} alt={product.name} className="absolute inset-0 h-full w-full mix-blend-multiply p-8 img-zoom" />
            </div>

            {/* Thumbnail Strip */}
            {hasMultipleImages && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {allImages.map((img: any, i: number) => (
                  <div
                    key={img.id || i}
                    className={`relative shrink-0 h-20 w-20 rounded-lg border-2 overflow-hidden bg-surface cursor-pointer transition-all ${
                      img.url === primaryImage ? "border-primary-500 shadow-sm" : "border-border-subtle hover:border-border-strong"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={`${product.name} - Image ${i + 1}`}
                      fill
                      className="object-contain p-2 mix-blend-multiply"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ─── Product Info ─── */}
          <div className="flex flex-col">
            {/* Stock Status */}
            <div className="mb-3">
              <StockIndicator status={product.stock_status as StockStatus} />
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-text-main mb-3 leading-tight">{product.name}</h1>

            {/* SKU & Brand */}
            <div className="text-sm text-text-muted mb-6 flex items-center gap-4">
              <span>SKU: <span className="font-medium text-text-main">{product.sku}</span></span>
              {product.brands && <span>Brand: <span className="font-medium text-text-main">{product.brands.name}</span></span>}
            </div>

            {/* ─── Purchase Panel ─── */}
            <div className="bg-surface border border-border-subtle rounded-2xl p-6 mb-8 lg:sticky lg:top-24">
              <div className="mb-6">
                <Price amount={product.price} showVat={true} className="text-3xl" />
              </div>

              <AddToQuoteButton
                product={{
                  id: product.id,
                  name: product.name,
                  sku: product.sku,
                  price: product.price,
                  imageUrl: primaryImage,
                }}
                disabled={product.stock_status === 'OUT_OF_STOCK' || product.stock_status === 'DISCONTINUED'}
              />

              <p className="text-xs text-text-muted mt-4 text-center">
                Add this item to your quote cart to request bulk pricing and availability confirmation.
              </p>

              {/* Trust Indicators */}
              <div className="mt-6 pt-5 border-t border-border-subtle grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Truck className="h-4 w-4 text-primary-500 shrink-0" />
                  <span>Nationwide Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Clock className="h-4 w-4 text-primary-500 shrink-0" />
                  <span>24hr Quote Turnaround</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <ShieldCheck className="h-4 w-4 text-primary-500 shrink-0" />
                  <span>Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Package className="h-4 w-4 text-primary-500 shrink-0" />
                  <span>Bulk Discounts</span>
                </div>
              </div>
            </div>

            {/* ─── Description ─── */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-text-main mb-3">Product Description</h3>
              <div className="prose prose-sm text-text-body max-w-none">
                {product.description ? (
                  <p className="leading-relaxed">{product.description}</p>
                ) : (
                  <p className="text-text-muted italic">No description available.</p>
                )}
              </div>
            </div>

            {/* ─── Specifications ─── */}
            {attributes.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-text-main mb-3">Specifications</h3>
                <div className="border border-border-subtle rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody>
                      {attributes.map(([key, val], i) => (
                        <tr key={key} className={i % 2 === 0 ? "bg-background" : "bg-surface"}>
                          <td className="px-4 py-3 font-medium text-text-main capitalize w-1/3">{key.replace(/_/g, " ")}</td>
                          <td className="px-4 py-3 text-text-body">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ─── Delivery Info ─── */}
            <div className="bg-primary-50 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-text-main mb-3">Delivery Information</h3>
              <ul className="text-sm text-text-muted space-y-2">
                <li className="flex items-start gap-2">
                  <Truck className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                  <span>Delivery within Nairobi: 1-2 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <Truck className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                  <span>Delivery outside Nairobi: 3-5 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <Package className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                  <span>Bulk orders may have custom delivery timelines</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
