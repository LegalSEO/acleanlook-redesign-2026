'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ChevronRight,
  ArrowRight,
  Phone,
  Clock,
  Tag,
  BookOpen,
  Search,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS } from '@/lib/constants'
import {
  getAllPosts,
  BLOG_CATEGORIES,
  formatDate,
  type BlogCategory,
  type BlogPost,
} from '@/lib/blog'

// ─── Blog Card ──────────────────────────────────────────────

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const categoryLabel =
    BLOG_CATEGORIES.find((c) => c.value === post.category)?.label || post.category

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-medium hover:border-gray-200 transition-all"
      >
        {/* Color bar based on category */}
        <div
          className={cn(
            'h-1.5',
            post.category === 'painting-tips' && 'bg-primary',
            post.category === 'color-guides' && 'bg-accent',
            post.category === 'home-maintenance' && 'bg-green-500',
            post.category === 'chicago-local' && 'bg-blue-500',
            post.category === 'cost-guides' && 'bg-cta'
          )}
        />

        <div className="p-6">
          {/* Meta */}
          <div className="flex items-center gap-3 text-[11px] text-text-light mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 font-medium text-text-secondary">
              <Tag className="h-3 w-3" />
              {categoryLabel}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime} min read
            </span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors leading-snug mb-2">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
            <span className="text-xs text-text-light">
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-cta group-hover:gap-2 transition-all">
              Read More
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

// ─── Main Page ──────────────────────────────────────────────

export default function BlogHubPage() {
  const allPosts = getAllPosts()
  const [category, setCategory] = useState<BlogCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = allPosts.filter((post) => {
    const matchesCategory =
      category === 'all' || post.category === category
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      )
    return matchesCategory && matchesSearch
  })

  return (
    <>
      {/* ━━━ HERO ━━━ */}
      <section className="relative bg-gradient-to-br from-primary via-primary-600 to-primary-800 pt-32 pb-16 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="container-wide relative z-10">
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
            <span className="text-white">Blog</span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white/80 mb-4"
              >
                <BookOpen className="h-4 w-4 text-accent" />
                Tips, Guides & Advice
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="heading-display text-white"
              >
                The A Clean Look Blog
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-lg text-white/80 mt-4 max-w-xl"
              >
                Expert painting tips, color guides, and home maintenance
                advice from 30+ years of experience in Chicago.
              </motion.p>
            </div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:w-80"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border-0 text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━ CONTENT ━━━ */}
      <section className="py-10 sm:py-14 bg-background-light">
        <div className="container-wide">
          {/* Category Filters */}
          <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setCategory('all')}
              className={cn(
                'shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors',
                category === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white text-text-secondary border border-gray-200 hover:bg-gray-50'
              )}
            >
              All Posts ({allPosts.length})
            </button>
            {BLOG_CATEGORIES.map((cat) => {
              const count = allPosts.filter(
                (p) => p.category === cat.value
              ).length
              return (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={cn(
                    'shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors',
                    category === cat.value
                      ? 'bg-primary text-white'
                      : 'bg-white text-text-secondary border border-gray-200 hover:bg-gray-50'
                  )}
                >
                  {cat.label} ({count})
                </button>
              )
            })}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary">
                No articles found. Try a different search or category.
              </p>
            </div>
          )}

          {/* Resources Banner */}
          <div className="mt-12 rounded-2xl bg-white border border-gray-100 p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-primary mb-2">
                Want More In-Depth Guides?
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Download our free ebooks — comprehensive guides to exterior
                painting, color selection, and home maintenance for Chicago
                homeowners.
              </p>
            </div>
            <Link
              href="/resources/chicago-homeowner-guide"
              className="btn-primary btn-md rounded-full shrink-0"
            >
              Browse Free Guides
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section className="section-padding bg-gradient-to-br from-cta via-cta-500 to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnptMzAgMzB2Nmg2di02aC02em0wLTMwdjZoLTZWNGg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container-narrow relative z-10 text-center">
          <h2 className="heading-1 text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Reading is great — but doing is better. Get a free, personalized
            estimate from our 30+ year team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-estimate"
              className="btn btn-lg rounded-full bg-white text-cta font-bold hover:bg-white/90 shadow-lg"
            >
              Get Free Estimate
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="btn btn-lg rounded-full border-2 border-white text-white hover:bg-white hover:text-cta"
            >
              <Phone className="mr-2 h-5 w-5" />
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
