'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProductHighlights() {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuredProducts = products.slice(0, 6);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.product-card');

      gsap.fromTo(
        cards,
        {
          y: 50,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="brand-font mb-4 text-5xl font-bold uppercase tracking-tight text-blue-900 md:text-7xl">
            Featured Products
          </h2>
          <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[10vw] font-black uppercase tracking-tighter text-blue-900/[0.03] select-none">
            Featured Products
          </div>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Discover our range of quality technology solutions designed for your needs
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="product-card group h-full overflow-hidden border-2 border-gray-100 bg-white transition-all hover:border-blue-200 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <Badge className="absolute left-4 top-4 bg-yellow-500 font-bold uppercase tracking-wider text-blue-950">
                  {product.category}
                </Badge>
              </div>
              <CardHeader className="p-6">
                <CardTitle className="brand-font line-clamp-1 text-xl text-blue-950">
                  {product.name}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm text-gray-600">
                  {product.shortDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-2">
                <div className="text-2xl font-bold text-blue-600">
                  {new Intl.NumberFormat('en-UG', {
                    style: 'currency',
                    currency: product.currency,
                    maximumFractionDigits: 0,
                  }).format(product.price)}
                </div>
              </CardContent>
              <CardFooter className="p-6">
                <Button
                  asChild
                  className="w-full bg-blue-600 font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-700"
                >
                  <Link href={`/products/${product.slug}`} className="flex items-center justify-center gap-2">
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button asChild size="lg" className="bg-blue-950 text-white hover:bg-black">
            <Link href="/products" className="flex items-center gap-2">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
