'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-slate-950 pt-20 pb-10 text-slate-300">
      {/* Decorative gradient background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute -right-1/4 -bottom-1/4 h-1/2 w-1/2 rounded-full bg-blue-800/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Main Grid */}
        <div className="grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="mb-8 flex items-center space-x-4 group">
              <div className="relative transition-transform duration-500 group-hover:rotate-[360deg]">
                <Image
                  src="/brand/matic-logo.webp"
                  alt="Maticent Industries Limited"
                  width={48}
                  height={48}
                  className="h-12 w-auto object-contain brightness-0 invert"
                />
              </div>
              <div>
                <div className="brand-font text-xl font-black leading-tight text-white tracking-tight">
                  MATICENT
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500">
                  The African Heritage
                </div>
              </div>
            </Link>

            <p className="mb-8 max-w-sm text-sm leading-relaxed text-slate-400">
              Uganda's leading provider of quality technology solutions for education, business, and enterprise. Committed to making technology accessible to all through innovation and excellence.
            </p>

            <div className="flex space-x-4">
              {[
                { icon: Facebook, label: 'Facebook', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: Instagram, label: 'Instagram', href: '#' }
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900/50 transition-all hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h3 className="brand-font mb-6 text-xs font-black uppercase tracking-[0.2em] text-white">Products</h3>
            <ul className="space-y-4 text-sm">
              {[
                { name: 'Laptops', href: '/products?category=laptops' },
                { name: 'Desktops', href: '/products?category=desktops' },
                { name: 'Monitors', href: '/products?category=monitors' },
                { name: 'Accessories', href: '/products?category=accessories' },
                { name: 'Printers', href: '/products?category=printers' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="flex items-center group text-slate-400 transition-colors hover:text-blue-400">
                    <span className="h-[1px] w-0 bg-blue-500 transition-all group-hover:w-3 group-hover:mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="brand-font mb-6 text-xs font-black uppercase tracking-[0.2em] text-white">Solutions</h3>
            <ul className="space-y-4 text-sm">
              {[
                { name: 'Overview', href: '/solutions' },
                { name: 'For Students', href: '/solutions#students' },
                { name: 'Institutions', href: '/solutions#institutions' },
                { name: 'Enterprise', href: '/solutions#enterprise' },
                { name: 'Bbala Initiative', href: '/solutions/bbala' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="flex items-center group text-slate-400 transition-colors hover:text-blue-400">
                    <span className="h-[1px] w-0 bg-blue-500 transition-all group-hover:w-3 group-hover:mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="brand-font mb-6 text-xs font-black uppercase tracking-[0.2em] text-white">Contact & Support</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group cursor-pointer">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/50 transition-colors group-hover:bg-blue-600/10 group-hover:border-blue-500/50">
                  <MapPin className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">Location</div>
                  <p className="text-sm text-slate-400 leading-relaxed">Plot 14, Kampala Road, Kampala, Uganda</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group cursor-pointer">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/50 transition-colors group-hover:bg-blue-600/10 group-hover:border-blue-500/50">
                  <Phone className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">Phone</div>
                  <p className="text-sm text-slate-400">+256 414 258 369</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group cursor-pointer">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/50 transition-colors group-hover:bg-blue-600/10 group-hover:border-blue-500/50">
                  <Mail className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">Email</div>
                  <p className="text-sm text-slate-400">info@maticent.co.ug</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                &copy; {currentYear} Maticent Industries Limited. Built for the African Heritage.
              </p>
            </div>

            <div className="flex items-center space-x-8 text-xs font-bold uppercase tracking-widest text-slate-500">
              <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="transition-colors hover:text-white">Terms of Service</Link>
              <Link href="/cookies" className="transition-colors hover:text-white">Cookies</Link>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-2 border-t border-slate-900/50 pt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 md:flex-row">
            <span className="flex items-center">
              <span className="mr-2 h-1 w-1 rounded-full bg-blue-500" />
              Office Hours:
            </span>
            <span className="ml-1 text-slate-500">Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 2:00 PM</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
