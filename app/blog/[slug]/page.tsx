import type { Metadata } from 'next'
import {
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
  formatDate,
  BLOG_CATEGORIES,
} from '@/lib/blog'
import BlogPostClient from './BlogPostClient'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: `${post.title} | A Clean Look Chicago`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `https://acleanlook.com/blog/${post.slug}`,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-lg text-text-secondary">Post not found.</p>
      </div>
    )
  }

  const related = getRelatedPosts(params.slug, 3)
  const categoryLabel =
    BLOG_CATEGORIES.find((c) => c.value === post.category)?.label || post.category

  return (
    <BlogPostClient
      post={post}
      related={related}
      categoryLabel={categoryLabel}
    />
  )
}
