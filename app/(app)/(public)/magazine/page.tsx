import { getPayload } from 'payload'
import config from '@payload-config'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Post, Category, Media } from '@/payload-types'

type PopulatedPost = Post & {
  coverImage: Media
  category: Category
}

function getCategoryName(category: Post['category']): string {
  return typeof category === 'object' && category ? category.name : 'Uncategorized'
}

async function getPosts() {
  const payload = await getPayload({ config })
  const posts = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedDate',
    depth: 2,
    limit: 100,
  })
  return posts.docs as PopulatedPost[]
}

async function getCategories() {
  const payload = await getPayload({ config })
  const categories = await payload.find({
    collection: 'categories',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'name',
    limit: 100,
  })
  return categories.docs as Category[]
}

export default async function Magazine() {
  const posts = await getPosts()
  const categories = await getCategories()

  const featuredPost = posts.find((p) => p.isFeatured) || posts[0]
  const regularPosts = posts.filter((p) => p.id !== featuredPost?.id)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 px-6 bg-secondary/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="heading-lg mb-6">ADDORS Magazine</h1>
          <p className="body-lg text-muted-foreground">
            Stay updated with the latest trends, insights, and stories from the
            world of fashion and modeling.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-6 py-16">
        {featuredPost && (
          <section className="mb-16">
            <h2 className="heading-md mb-8">Featured Story</h2>
            <Card className="overflow-hidden elegant-border hover-lift group">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                  {featuredPost.coverImage && (
                    <Image
                      src={featuredPost.coverImage.url || ''}
                      alt={featuredPost.coverImage.alt || featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      width={1000}
                      height={1000}
                    />
                  )}
                </div>
                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge
                    variant="secondary"
                    className="w-fit mb-4 bg-gold/20 text-gold-dark"
                  >
                    {getCategoryName(featuredPost.category)}
                  </Badge>
                  <h3 className="heading-md mb-4">{featuredPost.title}</h3>
                  <p className="body-lg text-muted-foreground mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {featuredPost.publishedDate
                          ? formatDate(featuredPost.publishedDate)
                          : 'No date'}
                      </span>
                    </div>
                    {featuredPost.readTime && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime} min read</span>
                      </div>
                    )}
                  </div>
                  <Link href={`/magazine/${featuredPost.slug}`}>
                    <Button className="w-fit bg-gold hover:bg-gold-dark text-black font-medium group">
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          </section>
        )}

        {categories.length > 0 && (
          <section className="mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                className="elegant-border hover:bg-gold hover:text-black hover:border-gold"
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  size="sm"
                  className="elegant-border hover:bg-gold hover:text-black hover:border-gold"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="heading-md mb-8">Latest Articles</h2>
          {regularPosts.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">No articles published yet.</p>
              <p className="text-sm mt-2">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden elegant-border hover-lift group"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    {article.coverImage && (
                      <Image
                        src={article.coverImage.url || ''}
                        alt={article.coverImage.alt || article.title}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <CardContent className="p-6">
                    <Badge
                      variant="secondary"
                      className="w-fit mb-3 bg-gold/20 text-gold-dark text-xs"
                    >
                      {getCategoryName(article.category)}
                    </Badge>
                    <h3 className="font-medium text-lg mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {article.publishedDate
                            ? formatDate(article.publishedDate)
                            : 'No date'}
                        </span>
                      </div>
                      {article.readTime && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime} min read</span>
                        </div>
                      )}
                    </div>
                    <Link href={`/magazine/${article.slug}`}>
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
          )}
        </section>

        <section className="mt-20 bg-secondary/20 rounded-lg p-8 md:p-12 text-center">
          <h2 className="heading-md mb-4">Stay in the Loop</h2>
          <p className="body-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to read our latest
            articles, industry insights, and exclusive behind-the-scenes
            content.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/20"
            />
            <Button className="bg-yellow-300 hover:bg-yellow-700 text-black font-medium">
              Subscribe
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
