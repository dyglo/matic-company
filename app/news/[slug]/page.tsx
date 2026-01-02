import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/ui/page-hero';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { newsPosts } from '@/data/news';
import { Calendar, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

export async function generateStaticParams() {
  return newsPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
  const post = newsPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = newsPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((tag) => post.tags.includes(tag))))
    .slice(0, 3);

  return (
    <div className="bg-stone-50">
      <PageHero
        title={post.title}
        imageSrc={post.image}
        variant="news"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'News', href: '/news' },
          { label: post.title, href: `/news/${post.slug}` },
        ]}
      />

      <article className="relative z-20 -mt-12 pb-20 md:-mt-16 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-2xl shadow-stone-200/50 ring-1 ring-stone-900/5 md:p-12">
            <div className="mb-6">
              <Link href="/news" className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-blue-600 transition-colors">
                <span aria-hidden="true" className="mr-1">&larr;</span> Back to News
              </Link>
            </div>
            <div className="mb-8 flex flex-wrap gap-2 justify-center">
              <Badge className="bg-blue-600 hover:bg-blue-700 text-sm font-medium py-1.5 px-4">{post.category}</Badge>
            </div>

            <div className="mb-10 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-stone-500 border-b border-stone-100 pb-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-600" />
                <span className="text-stone-700">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-stone-700">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            <div className="max-w-none text-stone-800">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 text-lg leading-loose text-stone-800 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-stone-100 pt-8">
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-stone-900">Share this article</h3>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="h-10 w-10 border-stone-200 hover:bg-blue-50 hover:text-blue-600 transition-colors" aria-label="Share on Facebook">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="h-10 w-10 border-stone-200 hover:bg-blue-50 hover:text-blue-600 transition-colors" aria-label="Share on Twitter">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="h-10 w-10 border-stone-200 hover:bg-blue-50 hover:text-blue-600 transition-colors" aria-label="Share on LinkedIn">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mx-auto mt-20 max-w-5xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-stone-900">Related Articles</h2>
                <Link href="/news" className="text-sm font-medium text-blue-600 hover:underline">View all news</Link>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="overflow-hidden border-0 bg-white shadow-lg shadow-stone-200/50 ring-1 ring-stone-900/5 transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="relative aspect-[16/9] bg-stone-100">
                      <Image src={relatedPost.image} alt={relatedPost.title} fill className="object-cover" />
                    </div>
                    <CardHeader className="p-5">
                      <Badge variant="secondary" className="mb-3 w-fit bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md px-2.5 py-0.5 text-xs font-semibold">{relatedPost.category}</Badge>
                      <CardTitle className="line-clamp-2 text-lg font-bold leading-tight text-stone-900 mb-2">{relatedPost.title}</CardTitle>
                      <CardDescription className="line-clamp-2 text-sm text-stone-600">{relatedPost.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                      <Button asChild variant="link" className="px-0 text-blue-600 font-semibold hover:text-blue-700 h-auto p-0">
                        <Link href={`/news/${relatedPost.slug}`}>Read Article <span aria-hidden="true" className="ml-1">&rarr;</span></Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
