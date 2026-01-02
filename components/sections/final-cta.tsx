'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Mail } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        titleRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
      );

      tl.fromTo(
        textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      tl.fromTo(
        buttonsRef.current?.children || [],
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.4)' },
        '-=0.3'
      );

      tl.fromTo(
        contactRef.current?.children || [],
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '-=0.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-white py-16 text-black md:py-24"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-40 -top-40 h-80 w-80 animate-pulse rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-blue-50 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            ref={titleRef}
            className="brand-font mb-6 text-5xl font-bold uppercase leading-tight tracking-tight text-blue-900 md:text-6xl lg:text-7xl"
          >
            Ready to Get Started?
          </h2>
          <p ref={textRef} className="mb-10 text-lg leading-relaxed text-gray-600 md:text-xl">
            Whether you're a student, institution, or enterprise, we have the perfect technology solution for you.
            Contact us today to discuss your needs.
          </p>

          <div
            ref={buttonsRef}
            className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-blue-600 px-8 text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50"
            >
              <Link href="/contact" className="gap-2">
                <span className="relative z-10">Get in Touch</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group border-2 border-blue-600 bg-transparent px-8 text-blue-600 transition-all hover:bg-blue-50"
            >
              <Link href="/products" className="gap-2">
                Browse Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div
            ref={contactRef}
            className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12"
          >
            <div className="flex items-center gap-2 transition-transform hover:scale-110">
              <Phone className="h-5 w-5 text-blue-600" />
              <a href="tel:+256414258369" className="text-sm font-medium hover:text-blue-700">
                +256 414 258 369
              </a>
            </div>
            <div className="flex items-center gap-2 transition-transform hover:scale-110">
              <Mail className="h-5 w-5 text-blue-600" />
              <a href="mailto:info@maticent.co.ug" className="text-sm font-medium hover:text-blue-700">
                info@maticent.co.ug
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified curve to separate from white footer */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block h-[60px] w-full"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.38,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.51,22.43-10.89,44-25.2,60.59-42.59V0Z" opacity=".5" className="fill-white"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
}
