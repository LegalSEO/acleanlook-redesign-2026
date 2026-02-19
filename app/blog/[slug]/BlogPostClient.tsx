'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Phone,
  Clock,
  Tag,
  Calendar,
  User,
  Share2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS } from '@/lib/constants'
import { formatDate, type BlogPost } from '@/lib/blog'

// ─── Main Component ─────────────────────────────────────────

export default function BlogPostClient({
  post,
  related,
  categoryLabel,
}: {
  post: BlogPost
  related: BlogPost[]
  categoryLabel: string
}) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <>
      {/* ━━━ HERO ━━━ */}
      <section className="relative bg-gradient-to-br from-primary via-primary-600 to-primary-800 pt-32 pb-12 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="container-narrow relative z-10">
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 text-sm text-white/60 mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white/80 truncate max-w-[200px]">
              {post.title}
            </span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-medium text-white/80">
              <Tag className="h-3 w-3" />
              {categoryLabel}
            </span>
            <span className="flex items-center gap-1 text-xs text-white/60">
              <Clock className="h-3 w-3" />
              {post.readTime} min read
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="heading-1 text-white"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex items-center gap-4 mt-6 text-sm text-white/60"
          >
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              By {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.date)}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ━━━ CONTENT ━━━ */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="container-narrow">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Article */}
            <article className="flex-1 min-w-0">
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-heading prose-headings:text-primary prose-headings:font-bold
                  prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-text-secondary prose-p:leading-relaxed prose-p:text-[15px]
                  prose-a:text-cta prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-text-primary prose-strong:font-semibold
                  prose-ul:text-text-secondary prose-ul:text-[15px]
                  prose-ol:text-text-secondary prose-ol:text-[15px]
                  prose-li:leading-relaxed
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-text-secondary">
                    Tags:
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-gray-100 text-xs text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-text-secondary hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Share Article
                </button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-72 shrink-0">
              <div className="sticky top-32 space-y-6">
                {/* CTA Card */}
                <div className="rounded-2xl bg-primary p-6 text-white">
                  <h3 className="font-bold mb-2">
                    Need Help with Your Project?
                  </h3>
                  <p className="text-sm text-white/80 mb-4 leading-relaxed">
                    Get a free, no-obligation estimate from our 30+ year
                    Chicago painting team.
                  </p>
                  <Link
                    href="/free-estimate"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-cta text-white text-sm font-semibold hover:bg-cta/90 transition-colors"
                  >
                    Free Estimate
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-white/30 text-white text-sm font-medium mt-2 hover:bg-white/10 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {BUSINESS.phone}
                  </a>
                </div>

                {/* Free Guides */}
                <div className="rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-bold text-text-primary text-sm mb-3">
                    Free Guides
                  </h3>
                  <ul className="space-y-3">
                    {[
                      {
                        title: 'Exterior Painting Guide',
                        href: '/resources/chicago-homeowner-guide',
                      },
                      {
                        title: '2025 Color Trends',
                        href: '/resources/paint-color-guide',
                      },
                      {
                        title: 'Maintenance Checklist',
                        href: '/resources/home-maintenance-checklist',
                      },
                    ].map((guide) => (
                      <li key={guide.href}>
                        <Link
                          href={guide.href}
                          className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
                        >
                          <ArrowRight className="h-3 w-3 shrink-0" />
                          {guide.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools */}
                <div className="rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-bold text-text-primary text-sm mb-3">
                    Free Tools
                  </h3>
                  <ul className="space-y-3">
                    {[
                      {
                        title: 'Paint Estimate Calculator',
                        href: '/tools/paint-estimator',
                      },
                      {
                        title: 'Color Visualizer',
                        href: '/tools/color-visualizer',
                      },
                      {
                        title: 'Color Palette Generator',
                        href: '/tools/color-palette',
                      },
                    ].map((tool) => (
                      <li key={tool.href}>
                        <Link
                          href={tool.href}
                          className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
                        >
                          <ArrowRight className="h-3 w-3 shrink-0" />
                          {tool.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ━━━ RELATED POSTS ━━━ */}
      {related.length > 0 && (
        <section className="py-10 sm:py-14 bg-background-light">
          <div className="container-wide">
            <h2 className="heading-2 text-primary text-center mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group block rounded-2xl border border-gray-100 bg-white p-6 hover:shadow-medium hover:border-gray-200 transition-all"
                >
                  <span className="text-[10px] font-medium text-text-light uppercase tracking-wide">
                    {formatDate(r.date)}
                  </span>
                  <h3 className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors mt-1 leading-snug line-clamp-2">
                    {r.title}
                  </h3>
                  <p className="text-xs text-text-secondary mt-2 line-clamp-2 leading-relaxed">
                    {r.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ━━━ BACK TO BLOG ━━━ */}
      <div className="py-6 bg-white border-t border-gray-100">
        <div className="container-narrow flex justify-center">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Articles
          </Link>
        </div>
      </div>

      {/* ━━━ JSON-LD Article ━━━ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: {
              '@type': 'Person',
              name: post.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'A Clean Look',
              url: 'https://acleanlook.com',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://acleanlook.com/blog/${post.slug}`,
            },
          }),
        }}
      />
    </>
  )
}
