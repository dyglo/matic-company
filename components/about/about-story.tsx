'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function AboutStory() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Image fade-in
            gsap.from('.story-image', {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                },
            });

            // Text stagger
            gsap.from('.story-text', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-20 md:py-32 overflow-hidden bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 story-image relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Team collaboration at Maticent"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <h2 className="story-text text-sm font-bold uppercase tracking-widest text-blue-600">
                            Our Journey
                        </h2>
                        <h3 className="story-text text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                            From Humble Beginnings to Industry Leaders
                        </h3>
                        <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                            <p className="story-text">
                                Founded in 2008, Maticent Industries Limited emerged from a simple yet powerful vision: to make quality technology accessible to every Ugandan, regardless of their background or location.
                            </p>
                            <p className="story-text">
                                What started as a small technology distribution company has grown into one of Uganda's most trusted technology solution providers. Today, we serve thousands of customers across Uganda—from individual students to major enterprises and government institutions.
                            </p>
                            <p className="story-text">
                                Through initiatives like Bbala, we're not just selling products; we're investing in Uganda's future by empowering the next generation with the tools they need to succeed in an increasingly digital world.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
