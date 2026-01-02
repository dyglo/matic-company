import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { newsPosts } from '@/data/news';
import { ArrowRight, Calendar } from 'lucide-react';

export function LatestNews() {
  const latestPosts = newsPosts.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-950 md:text-4xl">Latest News</h2>
          <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[10vw] font-black uppercase tracking-tighter text-blue-900/[0.03] select-none">
            Latest News
          </div>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Stay updated with our latest announcements and initiatives
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <Card key={post.id} className="group h-full overflow-hidden border-2 border-gray-100 bg-white transition-all hover:border-blue-200 hover:shadow-xl">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardHeader className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <Badge className="bg-yellow-500 font-bold uppercase tracking-wider text-blue-950">
                    {post.category}
                  </Badge>
                </div>
                <CardTitle className="brand-font line-clamp-2 text-xl text-blue-950">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm text-gray-600">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between border-t border-gray-50 p-6">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
                <Link
                  href={`/news/${post.slug}`}
                  className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-blue-600 transition-colors hover:text-blue-700"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/news" className="gap-2">
              View All News
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
