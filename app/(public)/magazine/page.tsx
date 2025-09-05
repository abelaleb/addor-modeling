import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const Magazine = () => {
  const featuredArticle = {
    title: "The Future of Sustainable Fashion",
    excerpt: "Exploring how the modeling industry is embracing eco-consciousness and ethical practices for a better tomorrow.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Sustainability"
  };

  const articles = [
    {
      id: 1,
      title: "Behind the Lens: Fashion Photography Trends",
      excerpt: "Discover the latest techniques and creative approaches shaping modern fashion photography.",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "March 12, 2024",
      readTime: "5 min read",
      category: "Photography"
    },
    {
      id: 2,
      title: "Rising Stars: New Faces to Watch",
      excerpt: "Meet the emerging models who are redefining beauty standards and making their mark on the industry.",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "Talent"
    },
    {
      id: 3,
      title: "Runway Evolution: Milan Fashion Week Highlights",
      excerpt: "A comprehensive look at the standout shows and trends from this season's Milan Fashion Week.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "March 8, 2024",
      readTime: "7 min read",
      category: "Fashion Week"
    },
    {
      id: 4,
      title: "Digital Transformation in Modeling",
      excerpt: "How technology is revolutionizing casting, virtual fittings, and the modeling experience.",
      image: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "March 5, 2024",
      readTime: "4 min read",
      category: "Technology"
    },
    {
      id: 5,
      title: "Wellness in the Modeling World",
      excerpt: "Promoting mental health and well-being practices for models in a demanding industry.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "March 3, 2024",
      readTime: "6 min read",
      category: "Wellness"
    },
    {
      id: 6,
      title: "Global Fashion: Cultural Influences",
      excerpt: "Exploring how diverse cultural backgrounds are enriching the global fashion landscape.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "March 1, 2024",
      readTime: "8 min read",
      category: "Culture"
    }
  ];

  const categories = ["All", "Fashion Week", "Photography", "Talent", "Sustainability", "Technology", "Wellness", "Culture"];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 px-6 bg-secondary/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="heading-lg mb-6">ADDORS Magazine</h1>
          <p className="body-lg text-muted-foreground">
            Stay updated with the latest trends, insights, and stories from the world of fashion and modeling.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-6 py-16">
        {/* Featured Article */}
        <section className="mb-16">
          <h2 className="heading-md mb-8">Featured Story</h2>
          <Card className="overflow-hidden elegant-border hover-lift group">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-4 bg-gold/20 text-gold-dark">
                  {featuredArticle.category}
                </Badge>
                <h3 className="heading-md mb-4">{featuredArticle.title}</h3>
                <p className="body-lg text-muted-foreground mb-6">{featuredArticle.excerpt}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredArticle.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                </div>
                <Button className="w-fit bg-gold hover:bg-gold-dark text-black font-medium group">
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="elegant-border hover:bg-gold hover:text-black hover:border-gold"
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Articles Grid */}
        <section>
          <h2 className="heading-md mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden elegant-border hover-lift group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="w-fit mb-3 bg-gold/20 text-gold-dark text-xs">
                    {article.category}
                  </Badge>
                  <h3 className="font-medium text-lg mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-gold hover:text-gold-dark group">
                    Read More
                    <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-20 bg-secondary/20 rounded-lg p-8 md:p-12 text-center">
          <h2 className="heading-md mb-4">Stay in the Loop</h2>
          <p className="body-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to read our latest articles, 
            industry insights, and exclusive behind-the-scenes content.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/20"
            />
            <Button className="bg-gold hover:bg-gold-dark text-black font-medium">
              Subscribe
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Magazine;