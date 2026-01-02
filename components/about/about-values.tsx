'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Award, Users, TrendingUp, ShieldCheck, Globe } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const values = [
    {
        icon: Heart,
        title: 'Customer Centricity',
        description: 'Our customers are at the heart of every decision. We measure our success by their satisfaction and growth.',
        colSpan: 'md:col-span-2',
        bg: 'bg-blue-600',
        text: 'text-white'
    },
    {
        icon: Award,
        title: 'Quality First',
        description: 'Uncompromising standards in every product and service we deliver.',
        colSpan: 'md:col-span-1',
        bg: 'bg-white',
        text: 'text-slate-900'
    },
    {
        icon: ShieldCheck,
        title: 'Integrity',
        description: 'We conduct business with transparency, honesty, and ethical leadership.',
        colSpan: 'md:col-span-1',
        bg: 'bg-slate-900',
        text: 'text-white'
    },
    {
        icon: Users,
        title: 'Community',
        description: 'Investing in the people and communities that support us.',
        colSpan: 'md:col-span-2',
        bg: 'bg-slate-50',
        text: 'text-slate-900'
    },
    {
        icon: TrendingUp,
        title: 'Innovation',
        description: 'Constantly pushing boundaries.',
        colSpan: 'md:col-span-1',
        bg: 'bg-blue-50',
        text: 'text-blue-900'
    },
    {
        icon: Globe,
        title: 'Sustainability',
        description: 'Building a greener future through responsible e-waste management.',
        colSpan: 'md:col-span-2',
        bg: 'bg-emerald-600',
        text: 'text-white'
    }
];

export function AboutValues() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.value-item', {
                y: 30, // Reduced distance
                opacity: 0,
                duration: 0.6, // Faster duration
                stagger: 0.05, // Faster stagger
                ease: 'power2.out', // Snappier ease
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 90%', // Starts much earlier
                    toggleActions: 'play none none none'
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">Core Values</h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-slate-900">The DNA of Maticent</h3>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        More than just words, these principles drive our daily actions and long-term strategy.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {values.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={idx}
                                className={`value-item relative rounded-3xl p-8 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${item.colSpan} ${item.bg} ${item.text} shadow-lg group`}
                            >
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div className="mb-6">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${item.text === 'text-white' ? 'bg-white/20' : 'bg-slate-200'} backdrop-blur-sm`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-2xl font-bold mb-2">{item.title}</h4>
                                    </div>
                                    <p className={`text-lg leading-relaxed ${item.text === 'text-white' ? 'text-white/80' : 'text-slate-600'}`}>
                                        {item.description}
                                    </p>
                                </div>

                                {/* Decorative Background Icon */}
                                <Icon className={`absolute -bottom-8 -right-8 w-48 h-48 opacity-[0.05] rotate-12 transition-transform duration-500 group-hover:rotate-0 ${item.text === 'text-white' ? 'text-white' : 'text-slate-900'}`} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
