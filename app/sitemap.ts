import { MetadataRoute } from 'next'
import { fetchProducts } from '@/actions/product.actions'
import { siteConfig } from '@/config/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url || 'https://devireen.co.ke'
  
  const routes = [
    '',
    '/products',
    '/about',
    '/contact',
    '/bulk-orders',
    '/quote'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  try {
    const { data: products } = await fetchProducts()
    
    if (products) {
      const productRoutes = products.map((product) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.6,
      }))
      return [...routes, ...productRoutes]
    }
  } catch (error) {
    console.error('Failed to generate dynamic sitemap', error)
  }

  return routes
}
