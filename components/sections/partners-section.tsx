'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function PartnersSection() {
  const containerRef = useRef<HTMLElement>(null);
  const partners = [
    'Dell Technologies',
    'HP Inc.',
    'Lenovo',
    'Microsoft',
    'Intel',
    'Cisco',
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.partner-logo',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
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
          <h2 className="mb-4 text-3xl font-bold text-blue-950 md:text-4xl">Trusted Partners</h2>
          <p className="text-lg text-gray-600">
            Working with the world's leading technology brands
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div
              key={partner}
              className="partner-logo flex h-16 w-32 items-center justify-center rounded-lg border bg-white px-4 text-center text-sm font-semibold text-muted-foreground transition-shadow hover:shadow-md"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
