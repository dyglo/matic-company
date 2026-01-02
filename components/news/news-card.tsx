'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { NewsPost } from '@/types';
import { cn } from '@/lib/utils';

interface NewsCardProps {
    post: NewsPost;
    variant?: 'default' | 'compact' | 'featured';
    className?: string;
}

export function NewsCard({ post, variant = 'default', className }: NewsCardProps) {
    const isFeatured = variant === 'featured';

    return (
        <Link
            href={`/news/${post.slug}`}
            className={cn(
                'group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
                isFeatured ? 'h-full' : '',
                className
            )}
        >
            {/* Image Container */}
            <div
                className={cn(
                    'relative overflow-hidden bg-gray-100',
                    isFeatured ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[16/9]'
                )}
            >
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute left-4 top-4 z-10">
                    <Badge className="bg-blue-600 text-white shadow-lg hover:bg-blue-700">
                        {post.category}
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </time>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span>{post.author}</span>
                </div>

                <h3
                    className={cn(
                        'brand-font mb-3 font-bold leading-tight text-slate-900 duration-300 group-hover:text-blue-600',
                        isFeatured ? 'text-3xl md:text-4xl' : 'text-xl'
                    )}
                >
                    {post.title}
                </h3>

                <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {post.excerpt}
                </p>

                <div className="mt-auto flex items-center gap-2 pt-4">
                    <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}
