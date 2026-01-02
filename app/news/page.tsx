'use client';

import * as React from 'react';
import { PageHero } from '@/components/ui/page-hero';
import { NewsCard } from '@/components/news/news-card';
import { newsPosts } from '@/data/news';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, Mail } from 'lucide-react';

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  // Featured post is the most recent one (first in array)
  const featuredPost = newsPosts[0];
  const regularPosts = newsPosts.slice(1);

  const filteredPosts = regularPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Calculate trending tags from all posts
  const allTags = Array.from(new Set(newsPosts.flatMap((post) => post.tags)));
  const popularTags = allTags.slice(0, 8); // Just take first 8 for display

  return (
    <div className="bg-stone-50">
      <PageHero
        title="Newsroom"
        subtitle="Insights, updates, and stories from the forefront of African technology."
        imageSrc="https://images.pexels.com/photos/159652/table-laptop-notebook-mobile-phone-159652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        variant="news"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'News', href: '/news' },
        ]}
      />

      {/* Featured Story Section */}
      <section className="relative -mt-20 pb-16 z-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <NewsCard post={featuredPost} variant="featured" className="shadow-2xl border-0" />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

              {/* Left Column: News Grid */}
              <div className="lg:col-span-8">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="brand-font text-3xl font-bold text-slate-900">Latest Stories</h2>
                  <div className="relative w-full max-w-xs hidden md:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white"
                    />
                  </div>
                </div>

                {filteredPosts.length > 0 ? (
                  <div className="grid gap-8 md:grid-cols-2">
                    {filteredPosts.map((post) => (
                      <NewsCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center text-muted-foreground">
                    No articles found matching your search.
                  </div>
                )}
              </div>

              {/* Right Column: Sidebar */}
              <div className="space-y-8 lg:col-span-4">

                {/* Search (Mobile Only) */}
                <div className="block md:hidden">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white"
                    />
                  </div>
                </div>

                {/* Trending Topics */}
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                  <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <h3 className="brand-font text-lg font-bold">Trending Topics</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Newsletter Subscribe */}
                <div className="rounded-xl bg-blue-900 p-6 text-white shadow-lg">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-800">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="brand-font mb-2 text-xl font-bold">Stay Updated</h3>
                  <p className="mb-6 text-sm text-blue-100">
                    Get the latest news and technology insights delivered directly to your inbox.
                  </p>
                  <div className="space-y-3">
                    <Input
                      placeholder="Email address"
                      className="border-blue-700 bg-blue-800/50 text-white placeholder:text-blue-400 focus-visible:ring-blue-500"
                    />
                    <Button className="w-full bg-white text-blue-900 hover:bg-blue-50 font-bold">
                      Subscribe
                    </Button>
                  </div>
                </div>

                {/* Company Quick Links */}
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                  <h3 className="brand-font mb-4 text-lg font-bold border-b border-gray-100 pb-4">Press Resources</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li>
                      <a href="#" className="flex items-center justify-between hover:text-blue-600 transition-colors">
                        <span>Media Kit</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">PDF</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center justify-between hover:text-blue-600 transition-colors">
                        <span>Brand Guidelines</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">ZIP</span>
                      </a>
                    </li>
                    <li>
                      <a href="/contact" className="hover:text-blue-600 transition-colors">
                        Press Contact
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
