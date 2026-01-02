'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  type?: 'words' | 'chars' | 'lines';
  stagger?: number;
  delay?: number;
  duration?: number;
  animateOnScroll?: boolean;
}

export function SplitText({
  text,
  className = '',
  as: Tag = 'p',
  type = 'words',
  stagger = 0.1,
  delay = 0,
  duration = 1.2,
  animateOnScroll = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.split-item');

    const animation = gsap.fromTo(
      elements,
      {
        y: type === 'words' ? 80 : 30,
        opacity: 0,
        rotationX: type === 'words' ? -10 : 0,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
        scrollTrigger: animateOnScroll
          ? {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
          : undefined,
      }
    );

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [text, stagger, delay, duration, type, animateOnScroll]);

  const splitContent = () => {
    if (type === 'words') {
      return text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span className="split-item inline-block will-change-transform">{word}</span>
        </span>
      ));
    } else if (type === 'chars') {
      return text.split('').map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className="split-item inline-block will-change-transform">
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ));
    }
    return text;
  };

  return (
    <Tag ref={containerRef as any} className={className} aria-label={text}>
      {splitContent()}
    </Tag>
  );
}

interface InteractiveSplitTextProps {
  text: string;
  className?: string;
  onHoverWord?: (word: string) => void;
  keywords?: string[];
}

export function InteractiveSplitText({
  text,
  className = '',
  onHoverWord,
  keywords = [],
}: InteractiveSplitTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll('.word');
      if (!words) return;

      gsap.fromTo(
        words,
        {
          y: 30,
          opacity: 0,
          filter: 'blur(8px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.008,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [text]);

  const handleMouseEnter = (index: number, word: string) => {
    if (onHoverWord) onHoverWord(word);

    const el = wordRefs.current[index];
    if (el) {
      gsap.to(el, {
        color: '#0073E6',
        scale: 1.1,
        textShadow: '0px 0px 10px rgba(0, 115, 230, 0.3)',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    if (onHoverWord) onHoverWord('');

    const el = wordRefs.current[index];
    if (el) {
      gsap.to(el, {
        color: 'inherit',
        scale: 1,
        textShadow: 'none',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <p ref={containerRef} className={`flex flex-wrap gap-x-[0.25em] ${className}`}>
      {text.split(' ').map((word, i) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
        const isInteractive = keywords.some((k) => word.includes(k) || k.includes(cleanWord));

        return (
          <span
            key={i}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            className={`word inline-block relative ${isInteractive ? 'cursor-pointer font-bold border-b-2 border-transparent' : ''
              }`}
            onMouseEnter={() => isInteractive && handleMouseEnter(i, cleanWord)}
            onMouseLeave={() => isInteractive && handleMouseLeave(i)}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}
