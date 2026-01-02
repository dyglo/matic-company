'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, X } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GridItem {
  id: number;
  title: string;
  desc: string;
  details: string;
  color: string;
  span: string;
  link: string;
  benefits: string[];
}

const gridItems: GridItem[] = [
  {
    id: 1,
    title: 'Laptops',
    desc: 'Business, education, and professional computing',
    details:
      'From powerful business laptops to rugged education Chromebooks, we offer devices that meet every need. Our range includes the latest processors, long battery life, and comprehensive warranties.',
    color: 'bg-black text-white',
    span: 'col-span-1 md:col-span-1 row-span-1',
    link: '/products?category=laptops',
    benefits: ['Enterprise-grade security', 'All-day battery life', '3-year warranty'],
  },
  {
    id: 2,
    title: 'Enterprise Solutions',
    desc: 'Complete IT infrastructure for businesses',
    details:
      'Tailored technology solutions for organizations of all sizes. From single deployments to campus-wide installations, we provide end-to-end service including setup, training, and ongoing support.',
    color: 'bg-gradient-to-br from-blue-600 to-blue-800 text-white',
    span: 'col-span-1 md:col-span-2 row-span-1',
    link: '/solutions#enterprise',
    benefits: ['Dedicated account management', '24/7 priority support', 'Custom configurations'],
  },
  {
    id: 3,
    title: 'Bbala Initiative',
    desc: 'Affordable laptops for students',
    details:
      'Our flagship social impact program provides subsidized laptops to university students with flexible payment plans. Over 12,000 students have benefited, gaining access to the tools they need to succeed.',
    color: 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-blue-900',
    span: 'col-span-1 md:col-span-1 row-span-2',
    link: '/solutions/bbala',
    benefits: ['Up to 30% off retail', 'Flexible payment plans', 'Full warranty coverage'],
  },
  {
    id: 4,
    title: 'Monitors & Displays',
    desc: 'Professional displays for productivity',
    details:
      'From ergonomic 24" monitors to premium 4K displays, our range ensures you have the perfect screen for your work. Features include color accuracy, adjustable stands, and USB-C connectivity.',
    color: 'bg-white text-black border-2 border-black',
    span: 'col-span-1 md:col-span-1 row-span-1',
    link: '/products?category=monitors',
    benefits: ['Color-calibrated', 'Ergonomic design', 'USB-C docking'],
  },
  {
    id: 5,
    title: 'Education Programs',
    desc: 'Technology for schools and universities',
    details:
      'Complete solutions for educational institutions including computer labs, administrative systems, and faculty equipment. We partner with over 45 universities and schools across Uganda.',
    color: 'bg-[#1A1A1A] text-white',
    span: 'col-span-1 md:col-span-2 row-span-1',
    link: '/solutions#institutions',
    benefits: ['Bulk pricing', 'Professional deployment', 'Training included'],
  },
  {
    id: 6,
    title: 'Support Services',
    desc: 'Nationwide technical support',
    details:
      'With 8 service centers across Uganda, we provide prompt, professional support when you need it. Our certified technicians are trained to handle all issues quickly and efficiently.',
    color: 'bg-blue-600 text-white',
    span: 'col-span-1 md:col-span-1 row-span-1',
    link: '/contact',
    benefits: ['8 locations nationwide', 'Same-day service', 'Genuine parts only'],
  },
  {
    id: 7,
    title: 'Sustainability',
    desc: 'E-waste recycling program',
    details:
      'Our recycling initiative ensures old electronics are disposed of responsibly. Trade in your old equipment for credit towards new purchases while protecting the environment.',
    color: 'bg-gradient-to-br from-green-600 to-green-800 text-white',
    span: 'col-span-1 md:col-span-2 row-span-1',
    link: '/about#sustainability',
    benefits: ['Responsible recycling', 'Trade-in credit', 'Environmental impact'],
  },
  {
    id: 8,
    title: 'Desktops',
    desc: 'Powerful workstations and PCs',
    details:
      'From compact office desktops to high-performance workstations, we have systems for every use case. Reliable, upgradeable, and built to last.',
    color: 'bg-gradient-to-br from-cyan-600 to-cyan-800 text-white',
    span: 'col-span-1 md:col-span-1 row-span-1',
    link: '/products?category=desktops',
    benefits: ['Easy upgrades', 'ENERGY STAR certified', 'Multiple display support'],
  },
];

function GridModal({ item, onClose }: { item: GridItem; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(overlayRef.current, { opacity: 1, duration: 0.3 });

      tl.fromTo(
        modalRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)' },
        '-=0.1'
      );

      tl.fromTo(
        '.modal-stagger',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: 'power2.out' },
        '-=0.3'
      );
    });
    return () => ctx.revert();
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, {
      y: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
    });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.3 }, '-=0.2');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="absolute inset-0 cursor-pointer bg-black/80 opacity-0 backdrop-blur-md"
      />

      <div
        ref={modalRef}
        className={`relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden overflow-y-auto rounded-[2.5rem] shadow-2xl ${item.color}`}
      >
        <button
          onClick={handleClose}
          className="group absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm transition-colors hover:bg-black/40"
        >
          <X className="h-5 w-5 transition-transform group-hover:rotate-90" />
        </button>

        <div className="flex h-full flex-col p-8 md:p-16">
          <div className="modal-stagger mb-2">
            <Badge variant="outline" className="border-current">
              Explore
            </Badge>
          </div>

          <h2 className="modal-stagger brand-font mb-8 text-5xl uppercase leading-[0.9] md:text-7xl">
            {item.title}
          </h2>

          <div className="modal-stagger mb-8 h-2 w-20 bg-current opacity-20" />

          <h3 className="modal-stagger mb-6 text-xl font-bold opacity-90 md:text-2xl">{item.desc}</h3>

          <div className="modal-stagger mb-8 space-y-4 text-base font-light leading-relaxed opacity-80 md:text-xl">
            <p>{item.details}</p>
          </div>

          <div className="modal-stagger mb-8">
            <h4 className="mb-4 font-semibold">Key Benefits:</h4>
            <ul className="space-y-2">
              {item.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-stagger flex justify-start">
            <Button asChild size="lg" variant={item.color.includes('white') ? 'default' : 'secondary'}>
              <Link href={item.link}>Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InteractiveMosaicGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<GridItem | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.grid-item');

      gsap.fromTo(
        items,
        {
          y: 100,
          opacity: 0,
          scale: 0.5,
          rotation: 5,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.75)',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
          stagger: {
            grid: 'auto',
            from: 'center',
            amount: 1.5,
            ease: 'power3.out',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-20 min-h-screen overflow-hidden bg-white py-32 px-4 text-black">
      {selectedItem && <GridModal item={selectedItem} onClose={() => setSelectedItem(null)} />}

      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="brand-font mb-4 text-6xl uppercase tracking-tighter md:text-9xl">
            Explore Our <span className="text-blue-600">Solutions</span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl font-medium text-gray-500">
            Click a card to discover how we can help you
          </p>
        </div>

        <div ref={gridRef} className="grid auto-rows-[250px] grid-cols-1 gap-6 p-4 md:grid-cols-4">
          {gridItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`grid-item group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${item.span} ${item.color}`}
            >
              <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

              <div>
                <h3 className="brand-font mb-4 text-2xl uppercase leading-none md:text-4xl">
                  {item.title}
                </h3>
              </div>

              <div className="relative z-10">
                <p className="text-sm font-medium leading-relaxed opacity-90 md:text-base">{item.desc}</p>
              </div>

              <div className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <span className="text-xs">↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
