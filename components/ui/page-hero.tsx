'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface PageHeroProps {
    title: string;
    subtitle?: string;
    imageSrc?: string;
    videoSrc?: string;
    breadcrumbs?: any[]; // Keep prop definition to avoid breaking existing calls, but make it optional/any
    variant?: 'default' | 'large' | 'news';
    className?: string;
}

export function PageHero({
    title,
    subtitle,
    imageSrc,
    videoSrc,
    breadcrumbs,
    variant = 'default',
    className,
}: PageHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            const imageEl = imageRef.current;
            if (imageEl) {
                // Parallax effect for background
                gsap.to(imageEl, {
                    yPercent: 30,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                    },
                });
            }

            // Text entry animation
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            const textElements = containerRef.current?.querySelectorAll('.hero-text-reveal');
            if (textElements && textElements.length > 0) {
                tl.fromTo(
                    textElements,
                    { y: 50, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
                    { y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.2, stagger: 0.1 }
                );
            }

            const breadcrumbElements = containerRef.current?.querySelectorAll('.hero-breadcrumbs');
            if (breadcrumbs && breadcrumbElements && breadcrumbElements.length > 0) {
                tl.fromTo(
                    breadcrumbElements,
                    { opacity: 0, x: -20 },
                    { opacity: 1, x: 0, duration: 0.8 },
                    '-=0.8'
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, [breadcrumbs]);

    const heightClass = {
        default: 'min-h-[40vh] md:min-h-[50vh]',
        large: 'min-h-[60vh] md:min-h-[70vh]',
        news: 'min-h-[40vh] md:min-h-[50vh]',
    }[variant];

    const titleSizeClass = variant === 'news'
        ? 'text-3xl md:text-5xl lg:text-5xl' // Capped at 5xl for news
        : 'text-4xl md:text-6xl lg:text-7xl';

    return (
        <div
            ref={containerRef}
            className={cn(
                'relative flex w-full items-center justify-center overflow-hidden bg-black',
                heightClass,
                className
            )}
        >
            {/* Background Media */}
            <div ref={imageRef} className="absolute inset-0 h-[120%] w-full">
                {videoSrc ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover opacity-60"
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                ) : (
                    imageSrc && (
                        <Image
                            src={imageSrc}
                            alt={title}
                            fill
                            className="object-cover opacity-60"
                            priority
                        />
                    )
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
            </div>

            {/* Content */}
            <div ref={contentRef} className="container relative z-10 mx-auto px-4">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className={cn(
                        "hero-text-reveal brand-font mb-6 font-bold uppercase tracking-tight text-white",
                        titleSizeClass
                    )}>
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="hero-text-reveal mx-auto max-w-2xl text-lg font-medium leading-relaxed text-white/80 md:text-xl">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
