'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const milestones = [
    { year: '2008', title: 'Company Founded', description: 'Maticent Industries established with a vision to make technology accessible across Uganda' },
    { year: '2012', title: 'First Service Center', description: 'Opened first regional service center outside Kampala, expanding support network' },
    { year: '2015', title: 'Enterprise Growth', description: 'Secured major contracts with government institutions and corporate clients' },
    { year: '2020', title: 'Bbala Initiative Launch', description: 'Launched student laptop program, supporting thousands of university students' },
    { year: '2022', title: '50,000 Devices', description: 'Deployed over 50,000 devices across Uganda, marking a major operational milestone' },
    { year: '2024', title: 'Continued Innovation', description: 'Expanding partnerships and introducing new sustainable technology solutions' },
];

export function AboutTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Line grow animation
            gsap.from('.timeline-line', {
                scaleY: 0,
                transformOrigin: 'top center',
                duration: 1.5,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                    end: 'bottom 80%',
                    scrub: 1,
                }
            });

            // Milestones appear
            const items = gsap.utils.toArray('.timeline-item');
            items.forEach((item: any, i) => {
                gsap.from(item, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                    },
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 bg-white relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">Milestones</h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-slate-900">Our History of Impact</h3>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="timeline-line absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />

                    <div className="space-y-12 md:space-y-24">
                        {milestones.map((milestone, index) => (
                            <div
                                key={milestone.year}
                                className={`timeline-item relative flex flex-col md:flex-row gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Content Side */}
                                <div className={`flex-1 ${index % 2 === 0 ? 'md:pl-16 md:text-left' : 'md:pr-16 md:text-right'} pl-20 pr-4 md:pl-0 md:pr-0 pt-2`}>
                                    <div className="text-5xl font-black text-blue-100 mb-2 leading-none">{milestone.year}</div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2">{milestone.title}</h4>
                                    <p className="text-slate-600">{milestone.description}</p>
                                </div>

                                {/* Dot */}
                                <div className="absolute left-[28px] md:left-1/2 top-[10px] md:top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-lg z-10" />

                                {/* Empty Side for Balancing */}
                                <div className="flex-1 hidden md:block" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
