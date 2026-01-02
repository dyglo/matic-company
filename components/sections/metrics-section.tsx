'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { metrics } from '@/data/misc';
import { Monitor, Users, Building, MapPin, Award, Star } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, any> = {
  Monitor,
  Users,
  Building,
  MapPin,
  Award,
  Star,
};

function AnimatedCounter({ value, duration = 2 }: { value: string; duration?: number }) {
  const counterRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!counterRef.current) return;

    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    const suffix = value.replace(/[0-9,]/g, '');

    const counter = { value: 0 };

    const animation = gsap.to(counter, {
      value: numericValue,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: counterRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        const formatted = Math.floor(counter.value).toLocaleString();
        setDisplayValue(formatted + suffix);
      },
    });

    return () => {
      animation.kill();
    };
  }, [value, duration]);

  return (
    <div ref={counterRef} className="mb-2 text-6xl font-bold text-primary">
      {displayValue}
    </div>
  );
}

export function MetricsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.metric-item');

      gsap.fromTo(
        items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
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
        <div className="mb-16 text-center">
          <h2 className="brand-font mb-4 text-5xl font-bold uppercase tracking-tight text-blue-900 md:text-7xl">
            Our Impact
          </h2>
          <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[12.5vw] font-black uppercase tracking-tighter text-blue-900/[0.03] select-none">
            Our Impact
          </div>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Building trust through excellence and commitment to our customers
          </p>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, index) => {
            const Icon = iconMap[metric.icon];
            return (
              <div key={metric.id} className="metric-item group text-center">
                <div className="mb-6 inline-flex rounded-full bg-primary/10 p-5 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  <Icon className="h-10 w-10 text-primary transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <AnimatedCounter value={metric.value} duration={2 + index * 0.2} />
                <div className="mb-2 text-lg font-semibold">{metric.label}</div>
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
