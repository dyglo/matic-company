'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { InteractiveSplitText } from './SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function AnimatedTextStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [activeKeyword, setActiveKeyword] = useState('');

  useEffect(() => {
    if (!imageContainerRef.current) return;

    gsap.to(imageContainerRef.current, {
      y: 15,
      rotation: 2,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, []);

  const getVisual = (keyword: string) => {
    switch (true) {
      case keyword.includes('2008') || keyword.includes('Uganda'):
        return 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=500';
      case keyword.includes('15') || keyword.includes('years'):
        return 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=500';
      case keyword.includes('accessible') || keyword.includes('education'):
        return 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=500';
      case keyword.includes('technology') || keyword.includes('innovation'):
        return 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=500';
      default:
        return null;
    }
  };

  const activeImage = getVisual(activeKeyword);

  return (
    <section
      ref={containerRef}
      className="perspective-1000 relative overflow-hidden bg-white px-6 py-24 text-black md:px-20 md:py-32"
    >
      <div
        ref={imageContainerRef}
        className={`pointer-events-none fixed left-1/2 top-1/2 z-0 h-[500px] w-[400px] -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out ${activeImage ? 'scale-100 opacity-30 blur-sm' : 'scale-75 opacity-0 blur-xl'
          }`}
      >
        {activeImage && (
          <Image
            src={activeImage}
            alt="Context"
            fill
            className="contrast-125 mix-blend-multiply grayscale drop-shadow-2xl object-contain"
          />
        )}
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 md:flex-row">
        <div className="flex-1">
          <div className="mb-6 overflow-hidden">
            <span className="animate-slide-up block text-sm font-bold uppercase tracking-[0.4em] text-blue-600">
              Our Story
            </span>
          </div>

          <h2 className="brand-font mb-6 text-4xl leading-tight md:text-5xl lg:text-6xl">
            <InteractiveSplitText
              text="EMPOWERING"
              className="mb-2 flex flex-wrap"
              onHoverWord={setActiveKeyword}
              keywords={['EMPOWERING']}
            />
            <InteractiveSplitText
              text="UGANDA"
              className="mb-2 flex flex-wrap"
              onHoverWord={setActiveKeyword}
              keywords={['UGANDA']}
            />
          </h2>

          <h3 className="brand-font bg-gradient-to-b from-black to-gray-500 bg-clip-text text-3xl leading-tight text-transparent md:text-4xl lg:text-5xl">
            <InteractiveSplitText
              text="THROUGH TECH"
              className="flex flex-wrap"
              onHoverWord={setActiveKeyword}
              keywords={['TECH']}
            />
          </h3>
        </div>

        <div className="flex-1 pt-10 md:pt-20">
          <InteractiveSplitText
            text="It began in 2008 with a simple vision in Uganda's capital. A commitment to bridge the digital divide. For over 15 years, we have been making quality technology accessible to students, businesses, and institutions across the nation."
            className="mb-8 text-lg font-light leading-relaxed md:text-xl"
            onHoverWord={setActiveKeyword}
            keywords={['2008', 'Uganda', '15 years', 'accessible', 'students', 'businesses']}
          />

          <div
            className="my-8 h-[1px] w-full origin-left scale-x-0 bg-black/10"
            ref={(el) => {
              if (el) {
                gsap.to(el, {
                  scaleX: 1,
                  duration: 1.5,
                  scrollTrigger: { trigger: el, start: 'top 90%' },
                });
              }
            }}
          />

          <InteractiveSplitText
            text="From our flagship Bbala Initiative supporting university students to enterprise solutions powering Uganda's businesses, every device we deploy represents an opportunity unlocked, a dream enabled, and a future brightened."
            className="text-base font-medium leading-relaxed text-gray-600 md:text-lg"
            onHoverWord={setActiveKeyword}
            keywords={['Bbala', 'university', 'students', 'enterprise', 'businesses', 'opportunity']}
          />

          <div className="group mt-12 inline-flex cursor-pointer items-center gap-4 transition-all hover:gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black transition-all duration-300 group-hover:scale-110 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">
              <span className="text-xl">→</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest transition-transform duration-300 group-hover:translate-x-2">
              Discover Our Impact
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-900/40">Scroll to Explore</span>
          <div className="h-12 w-[2px] overflow-hidden rounded-full bg-blue-900/10">
            <div className="h-full w-full origin-top animate-scroll-line bg-blue-600" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Moved down to avoid overlap */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-900/40">Scroll to Explore</span>
          <div className="h-8 w-[2px] overflow-hidden rounded-full bg-blue-900/10">
            <div className="h-full w-full origin-top animate-scroll-line bg-blue-600" />
          </div>
        </div>
      </div>

      <div className="parallax-layer brand-font pointer-events-none absolute -bottom-10 -right-10 select-none text-[12vw] font-black text-blue-900/[0.03] opacity-40 md:text-[10vw]">
        2008
      </div>
    </section>
  );
}
