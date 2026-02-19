import type { MetadataRoute } from 'next'
import { AREAS } from '@/data/areas'
import { getAllSlugs } from '@/lib/blog'

const BASE_URL = 'https://acleanlook.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/free-estimate`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/areas`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Service pages
  const servicePages: MetadataRoute.Sitemap = [
    'interior-painting',
    'exterior-painting',
    'commercial-painting',
    'power-washing',
    'gutter-cleaning',
    'handyman',
  ].map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Area pages
  const areaPages: MetadataRoute.Sitemap = AREAS.map((area) => ({
    url: `${BASE_URL}/areas/${area.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = [
    { slug: 'paint-estimator', priority: 0.9 },
    { slug: 'color-visualizer', priority: 0.8 },
    { slug: 'seasonal-planner', priority: 0.8 },
    { slug: 'color-palette', priority: 0.8 },
  ].map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: tool.priority,
  }))

  // Tools hub
  const toolsHub: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Resource pages
  const resourcePages: MetadataRoute.Sitemap = [
    'chicago-homeowner-guide',
    'paint-color-guide',
    'home-maintenance-checklist',
  ].map((slug) => ({
    url: `${BASE_URL}/resources/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...servicePages,
    ...areaPages,
    ...toolsHub,
    ...toolPages,
    ...blogPages,
    ...resourcePages,
  ]
}
