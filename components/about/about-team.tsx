'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import { leadership } from '@/data/misc';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function AboutTeam() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.from('.team-header', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                }
            });

            // List Items Animation
            gsap.from('.team-row', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.team-list',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="team-header mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">Leadership</h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">The Minds Behind<br />The Mission</h3>
                    </div>
                    <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
                        A collective of industry veterans and innovators working together to shape the future of technology in Africa.
                    </p>
                </div>

                <div className="team-list">
                    {leadership && leadership.length > 0 ? (
                        <div className="flex flex-col">
                            {leadership.map((leader, index) => (
                                <div
                                    key={leader.id}
                                    className="team-row group relative py-8 border-b border-slate-100 transition-colors duration-300 hover:bg-slate-50"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12 pl-4">
                                        <div className="md:w-1/4">
                                            <h4 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{leader.name}</h4>
                                            <span className="text-sm font-medium text-slate-400 mt-1 block">{leader.role}</span>
                                        </div>

                                        <div className="md:w-1/2">
                                            <p className="text-slate-600 text-base leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                                                {leader.bio}
                                            </p>
                                        </div>

                                        <div className="md:w-auto flex items-center justify-end">
                                            {leader.linkedin && (
                                                <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                                    <Linkedin className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-slate-400 italic">
                            Loading leadership profiles...
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
