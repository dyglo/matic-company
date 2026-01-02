'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const panels = [
  {
    title: 'Innovation Since 2008',
    subtitle: "Building Uganda's Digital Future",
    description:
      'From a single office in Kampala to serving thousands across Uganda, our journey has been driven by one mission: making quality technology accessible to everyone.',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
    bgColor: 'bg-white',
    textColor: 'text-black',
  },
  {
    title: '15 Years of Trust',
    subtitle: 'Empowering Communities',
    description:
      "Over 50,000 devices deployed. 12,000+ students supported. 300+ enterprise clients. These numbers represent real people whose lives we've touched through technology.",
    image: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=800',
    bgColor: 'bg-gradient-to-br from-blue-600 to-blue-800',
    textColor: 'text-white',
  },
  {
    title: 'The Bbala Initiative',
    subtitle: 'Education Changes Everything',
    description:
      "Our flagship program provides subsidized laptops to university students, breaking down barriers and creating opportunities for the next generation of Uganda's leaders.",
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
    bgColor: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    textColor: 'text-blue-900',
  },
];

export function PinnedPanelsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const panelElements = panelsRef.current.filter(Boolean);

      // Delay pin activation until section is scrolled into view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: 'top top',
          end: '+=2500',
          scrub: 1,
          anticipatePin: 0,
          pinSpacing: true,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.2, max: 0.4 },
            delay: 0.1,
            ease: 'power1.inOut',
          },
        },
      });

      panelElements.forEach((panel, i) => {
        if (i === 0) return;

        tl.fromTo(
          panel,
          { yPercent: 100 },
          { yPercent: 0, ease: 'none', duration: 1 }
        );
      });

      // Subtle parallax only on scroll
      panelElements.forEach((panel) => {
        if (!panel) return;
        const textContent = panel.querySelector('.parallax-content');

        gsap.to(textContent, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-white">
      {panels.map((panel, index) => (
        <div
          key={index}
          ref={(el) => {
            panelsRef.current[index] = el;
          }}
          className={`absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-10 p-8 md:flex-row md:p-20 ${panel.bgColor} ${panel.textColor}`}
          style={{ zIndex: index + 1 }}
        >
          <div className="parallax-content z-10 max-w-2xl flex-1 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] opacity-70 md:text-base">
              {panel.subtitle}
            </h3>
            <h2 className="brand-font text-4xl uppercase leading-tight tracking-tight md:text-6xl lg:text-7xl">
              {panel.title}
            </h2>
            <p className="max-w-lg text-base font-medium leading-relaxed opacity-90 md:text-lg">
              {panel.description}
            </p>
          </div>

          <div className="relative aspect-square w-full max-w-xl flex-1 overflow-hidden rounded-sm border-4 border-current shadow-2xl">
            <Image
              src={panel.image}
              alt={panel.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="brand-font pointer-events-none absolute bottom-4 right-8 select-none text-[8rem] font-black leading-none opacity-10 md:text-[12rem]">
            0{index + 1}
          </div>
        </div>
      ))}
    </section>
  );
}
