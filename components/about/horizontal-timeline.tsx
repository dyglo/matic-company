'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface HistoryEvent {
    year: string;
    title: string;
    description: string;
    image?: string;
    color: string;
}

const timelineData: HistoryEvent[] = [
    {
        year: "2008",
        title: "The Beginning",
        description: "Maticent Industries is founded with a vision to democratize technology access across Uganda.",
        image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        color: "#0f172a" // slate-900
    },
    {
        year: "2012",
        title: "Regional Expansion",
        description: "Opening of the first regional service center, bringing support closer to communities outside Kampala.",
        image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        color: "#1e293b" // slate-800
    },
    {
        year: "2015",
        title: "Enterprise Growth",
        description: "Securing major government contracts marks our entry into large-scale enterprise solutions.",
        image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        color: "#0f172a"
    },
    {
        year: "2020",
        title: "Bbala Initiative",
        description: "Launch of our flagship student program, empowering thousands with affordable technology.",
        image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        color: "#2563eb" // blue-600
    },
    {
        year: "2024",
        title: "Innovation Era",
        description: "Expanding into sustainable tech and AI-driven solutions for the future of Africa.",
        image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        color: "#0f172a"
    }
];

export function HorizontalTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray(".history-panel");

            // Main horizontal scroll timeline
            const mainTween = gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (sections.length - 1),
                    end: "+=3500",
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const newIndex = Math.round(progress * (sections.length - 1));
                        setActiveIndex(newIndex);
                    }
                }
            });

            scrollTriggerInstance.current = mainTween.scrollTrigger!;

            // Individual panel animations
            sections.forEach((section: any) => {
                const title = section.querySelector("h2");
                const desc = section.querySelector("p");

                gsap.from(title, {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        containerAnimation: mainTween,
                        start: "left center",
                        toggleActions: "play none none reverse"
                    }
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const goToPanel = (index: number) => {
        if (scrollTriggerInstance.current) {
            const st = scrollTriggerInstance.current;
            const totalScroll = st.end! - st.start!; // Force non-null as we know it's set
            const targetScroll = st.start! + (index / (timelineData.length - 1)) * totalScroll;

            gsap.to(window, {
                scrollTo: targetScroll,
                duration: 1.5,
                ease: "power3.inOut"
            });
        }
    };

    return (
        <section ref={containerRef} className="relative h-screen overflow-hidden bg-black text-white">

            {/* Progress Line across the bottom */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-900 z-50">
                <div className="h-full bg-blue-600 origin-left"
                    style={{ width: '100%', transform: 'scaleX(0)' }}
                    ref={(el) => {
                        if (el && containerRef.current) {
                            gsap.to(el, {
                                scaleX: 1,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: containerRef.current,
                                    start: "top top",
                                    end: "+=3500",
                                    scrub: true
                                }
                            })
                        }
                    }}
                ></div>

                {/* Interactive Markers */}
                <div className="absolute top-0 left-0 w-full h-full flex justify-between px-0 pointer-events-none">
                    {timelineData.map((item, i) => {
                        const isActive = activeIndex === i;
                        return (
                            <div
                                key={i}
                                className="relative flex flex-col items-center pointer-events-auto group cursor-pointer"
                                style={{ width: `${100 / (timelineData.length - 1)}%`, left: i === 0 ? '0' : 'auto' }}
                                onClick={() => goToPanel(i)}
                            >
                                {/* Marker Dot */}
                                <div
                                    className={`absolute -top-3 w-4 h-4 rounded-full border-2 transition-all duration-500 shadow-lg flex items-center justify-center
                    ${isActive ? 'bg-blue-600 border-white scale-125' : 'bg-white border-transparent scale-100 opacity-40 group-hover:opacity-100 group-hover:scale-110'}
                  `}
                                >
                                    {/* Subtle pulse for active */}
                                    {isActive && <div className="absolute inset-0 w-full h-full bg-blue-600 rounded-full animate-ping opacity-30"></div>}
                                </div>

                                {/* Marker Label */}
                                <div className={`absolute -top-12 transition-all duration-500 transform 
                  ${isActive ? 'opacity-100 -translate-y-2' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}
                `}>
                                    <span className="text-xs font-bold tracking-widest text-blue-600 bg-white px-3 py-1 rounded-sm shadow-md whitespace-nowrap">
                                        {item.year}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div ref={trackRef} className="flex h-full" style={{ width: `${timelineData.length * 100}%` }}>
                {timelineData.map((item, index) => (
                    <div
                        key={index}
                        className="history-panel w-screen h-screen flex-shrink-0 flex flex-col md:flex-row items-center justify-center relative p-8 md:p-24 overflow-hidden"
                        style={{ backgroundColor: item.color }}
                    >
                        {/* Background Text for texture */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black opacity-[0.03] pointer-events-none whitespace-nowrap text-white select-none z-0">
                            {item.year}
                        </div>

                        {/* Layout Variation: Even indices text left, Odd indices text right */}
                        {index % 2 === 0 ? (
                            <>
                                <div className="z-10 flex-1 flex flex-col justify-center space-y-6 pr-0 md:pr-12">
                                    <div className="overflow-hidden">
                                        <span className="block text-blue-500 font-bold text-2xl tracking-widest mb-2 border-b-2 border-white inline-block pb-1">
                                            {item.year}
                                        </span>
                                    </div>
                                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] text-white">
                                        {item.title}
                                    </h2>
                                    <p className="text-lg md:text-2xl font-light text-gray-300 max-w-lg">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="z-10 flex-1 w-full max-w-xl aspect-square relative shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500 rounded-2xl overflow-hidden">
                                    {item.image && (
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="z-10 flex-1 w-full max-w-xl aspect-square relative shadow-2xl -rotate-2 transition-transform hover:rotate-0 duration-500 order-2 md:order-1 rounded-2xl overflow-hidden">
                                    {item.image && (
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                                <div className="z-10 flex-1 flex flex-col justify-center items-end text-right space-y-6 pl-0 md:pl-12 order-1 md:order-2">
                                    <div className="overflow-hidden">
                                        <span className="block text-blue-500 font-bold text-2xl tracking-widest mb-2 border-b-2 border-white inline-block pb-1">
                                            {item.year}
                                        </span>
                                    </div>
                                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] text-white">
                                        {item.title}
                                    </h2>
                                    <p className="text-lg md:text-2xl font-light text-gray-300 max-w-lg">
                                        {item.description}
                                    </p>
                                </div>
                            </>
                        )}

                    </div>
                ))}
            </div>
        </section>
    );
};
