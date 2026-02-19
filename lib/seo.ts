import { BUSINESS, SERVICES, SERVICE_AREAS } from '@/lib/constants'

// ─── Types ──────────────────────────────────────────────────

const SITE_URL = 'https://acleanlook.com'

interface BreadcrumbItem {
  name: string
  href: string
}

// ─── LocalBusiness Schema ───────────────────────────────────

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: SITE_URL,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    foundingDate: '1994',
    founder: {
      '@type': 'Person',
      name: BUSINESS.owner,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.9792,
      longitude: -87.7621,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '16:00',
      },
    ],
    priceRange: '$$',
    paymentAccepted: 'Cash, Credit Card, Check',
    areaServed: SERVICE_AREAS.map((area) => ({
      '@type': 'City',
      name: area,
      containedInPlace: {
        '@type': 'State',
        name: 'Illinois',
      },
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Painting & Home Services',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.shortDescription,
          url: `${SITE_URL}/services/${s.slug}`,
        },
      })),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.yelp.com/biz/a-clean-look-chicago',
      'https://www.facebook.com/acleanlookpainting',
      'https://g.page/acleanlook',
    ],
  }
}

// ─── WebSite Schema ─────────────────────────────────────────

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: BUSINESS.name,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#business` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ─── Service Schema ─────────────────────────────────────────

export function serviceSchema(service: {
  name: string
  description: string
  slug: string
  priceRange?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: {
      '@type': 'City',
      name: 'Chicago',
      containedInPlace: { '@type': 'State', name: 'Illinois' },
    },
    ...(service.priceRange && { priceRange: service.priceRange }),
  }
}

// ─── AggregateRating Schema ─────────────────────────────────

export function aggregateRatingSchema(
  ratingValue: number,
  reviewCount: number,
  reviews?: { author: string; rating: number; text: string; date: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue.toFixed(1),
      reviewCount: reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    ...(reviews && {
      review: reviews.map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.author },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.rating.toString(),
          bestRating: '5',
        },
        reviewBody: r.text,
        datePublished: r.date,
      })),
    }),
  }
}

// ─── FAQPage Schema ─────────────────────────────────────────

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// ─── Article Schema ─────────────────────────────────────────

export function articleSchema(article: {
  title: string
  description: string
  slug: string
  date: string
  author: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { '@type': 'Person', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS.name,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${article.slug}`,
    },
    ...(article.image && { image: article.image }),
  }
}

// ─── BreadcrumbList Schema ──────────────────────────────────

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.href.startsWith('http')
        ? item.href
        : `${SITE_URL}${item.href}`,
    })),
  }
}

// ─── Combine Multiple Schemas ───────────────────────────────

export function combineSchemas(
  ...schemas: Record<string, unknown>[]
): string {
  if (schemas.length === 1) return JSON.stringify(schemas[0])
  return JSON.stringify(schemas)
}

// ─── Canonical URL Helper ───────────────────────────────────

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path}`
}
