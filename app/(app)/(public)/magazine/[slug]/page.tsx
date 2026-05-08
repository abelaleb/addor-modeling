import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2 } from 'lucide-react'
import { serializeLexical } from '@/components/lexical/serialize-lexical'

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  status: string
  isFeatured?: boolean
  readTime?: number
  publishedDate?: string
  coverImage?: {
    url: string
    alt?: string
  }
  category?: {
    id: string
    name: string
  } | string
  authors?: Array<{
    author?: {
      id: string
      name: string
      role?: string
      avatar?: {
        url: string
      }
    }
    role?: string
  }>
  content?: any
  tags?: Array<{ tag: string }>
}

async function getPost(slug: string): Promise<Post | null> {
  const payload = await getPayload({ config })
  const posts = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: 'published' } },
      ],
    },
    depth: 2,
    limit: 1,
  })

  if (posts.docs.length === 0) {
    return null
  }

  return posts.docs[0] as Post
}

async function getRelatedPosts(categoryId: string, currentPostId: string): Promise<Post[]> {
  const payload = await getPayload({ config })
  const posts = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { category: { equals: categoryId } },
        { id: { not_equals: currentPostId } },
        { status: { equals: 'published' } },
      ],
    },
    depth: 2,
    limit: 3,
    sort: '-publishedDate',
  })
  return posts.docs as Post[]
}

export default async function MagazinePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(
    typeof post.category === 'object' && post.category ? post.category.id : String(post.category),
    post.id
  )

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen pt-20">
      <article className="container mx-auto max-w-4xl px-6 py-16">
        <Link href="/magazine">
          <Button
            variant="ghost"
            className="mb-8 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Magazine
          </Button>
        </Link>

        <header className="mb-12">
          <Badge
            variant="secondary"
            className="w-fit mb-6 bg-gold/20 text-gold-dark"
          >
            {post.category?.name || 'Uncategorized'}
          </Badge>

          <h1 className="heading-lg mb-6">{post.title}</h1>

          <p className="body-lg text-muted-foreground mb-8">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-8 border-b">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>
                {post.publishedDate
                  ? formatDate(post.publishedDate)
                  : 'No date'}
              </span>
            </div>
            {post.readTime && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto text-muted-foreground"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </header>

        {post.coverImage && (
          <div className="relative aspect-[21/9] mb-12 overflow-hidden rounded-lg">
            <Image
              src={post.coverImage.url || ''}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {post.authors && post.authors.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-12 pb-8 border-b">
            {post.authors.map((authorEntry: any, index: number) => {
              const author = authorEntry.author
              if (!author) return null
              return (
                <div key={index} className="flex items-center gap-3">
                  {author.avatar && (
                    <Image
                      src={author.avatar.url || ''}
                      alt={author.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium">{author.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {authorEntry.role || author.role}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="prose prose-lg max-w-none mb-16">
          {post.content && serializeLexical(post.content)}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-8 border-t">
            {post.tags.map((tagEntry: any, index: number) => (
              <Badge key={index} variant="outline">
                {tagEntry.tag}
              </Badge>
            ))}
          </div>
        )}
      </article>

      {relatedPosts.length > 0 && (
        <section className="bg-secondary/20 py-16">
          <div className="container mx-auto max-w-7xl px-6">
            <h2 className="heading-md mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="overflow-hidden elegant-border hover-lift group"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    {relatedPost.coverImage && (
                      <Image
                        src={relatedPost.coverImage.url || ''}
                        alt={relatedPost.coverImage.alt || relatedPost.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <CardContent className="p-6">
                    <Badge
                      variant="secondary"
                      className="w-fit mb-3 bg-gold/20 text-gold-dark text-xs"
                    >
                      {relatedPost.category?.name || 'Uncategorized'}
                    </Badge>
                    <h3 className="font-medium text-lg mb-3 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                    <Link href={`/magazine/${relatedPost.slug}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-auto font-medium text-gold hover:text-gold-dark group"
                      >
                        Read More
                        <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
