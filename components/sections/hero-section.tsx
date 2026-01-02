'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-100">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/circuit-bg.mp4" type="video/mp4" />
        </video>
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl space-y-8 animate-fade-in flex flex-col items-center">
            {/* Logo */}
            <div className="mb-2">
              <Image
                src="/brand/matic-logo.webp"
                alt="Maticent Logo"
                width={100}
                height={100}
                className="h-20 w-auto drop-shadow-2xl brightness-0 invert"
              />
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="brand-font text-4xl leading-tight text-white md:text-6xl lg:text-7xl uppercase tracking-tight">
                Maticent Industries Limited
              </h1>
              <p className="text-sm font-medium uppercase tracking-[0.4em] text-white/80 md:text-base">
                The African Heritage
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center pt-8">
              <Button
                asChild
                size="lg"
                className="w-fit bg-blue-600 text-white hover:bg-blue-700 transition-all px-8 h-12 text-sm font-bold uppercase tracking-wider shadow-lg shadow-blue-500/20"
              >
                <Link href="/products">
                  <span>Explore Products</span>
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-fit border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-all px-8 h-12 text-sm font-bold uppercase tracking-wider"
              >
                <Link href="/contact">
                  <span>Learn More</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
