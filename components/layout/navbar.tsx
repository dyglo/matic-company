'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Products', href: '/products' },
  {
    label: 'Solutions',
    href: '/solutions',
    dropdown: [
      { label: 'Overview', href: '/solutions' },
      { label: 'Resources', href: '/solutions/resources' },
      { label: 'Bbala Initiative', href: '/solutions/bbala' },
    ],
  },
  { label: 'Education & Research', href: '/education' },
  { label: 'News', href: '/news' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [solutionsOpen, setSolutionsOpen] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(false);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const solutionsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    };

    if (solutionsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [solutionsOpen]);

  React.useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out",
      isHidden ? "-translate-y-full" : "translate-y-0",
      lastScrollY > 50
        ? "bg-black/90 border-b border-white/10 backdrop-blur-md"
        : "bg-transparent border-b border-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src="/brand/matic-logo.webp"
              alt="Maticent Industries Limited"
              width={32}
              height={32}
              className="h-8 w-auto transition-transform group-hover:scale-110"
            />
            <div className="hidden sm:block">
              <div className={cn(
                "text-sm font-semibold leading-tight transition-colors",
                lastScrollY > 50 ? "text-white" : "text-white"
              )}>Maticent</div>
            </div>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.label} className="relative" ref={solutionsRef}>
                  <button
                    onClick={() => setSolutionsOpen(!solutionsOpen)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSolutionsOpen(!solutionsOpen);
                      }
                    }}
                    className={cn(
                      'inline-flex items-center space-x-1 px-1 py-2 text-sm font-medium transition-colors hover:text-blue-400',
                      isActive(item.href) ? 'text-blue-400' : 'text-white'
                    )}
                    aria-expanded={solutionsOpen}
                    aria-haspopup="true"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={cn('h-4 w-4 transition-transform', solutionsOpen && 'rotate-180')} />
                  </button>
                  {solutionsOpen && (
                    <div className="absolute left-0 top-full mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg">
                      <div className="py-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className={cn(
                              'block px-4 py-2 text-sm transition-colors hover:bg-gray-100 hover:text-blue-600',
                              pathname === dropdownItem.href ? 'bg-gray-100 text-blue-600' : 'text-gray-700'
                            )}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'px-1 py-2 text-sm font-medium transition-colors hover:text-blue-400',
                    isActive(item.href) ? 'text-blue-400' : 'text-white'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Button asChild size="sm" className="hidden sm:inline-flex bg-black text-white hover:bg-gray-900">
              <Link href="/contact?request=quote">Request demo</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn("lg:hidden", lastScrollY > 50 ? "text-white" : "text-white")}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-gray-200 py-4 lg:hidden">
            <div className="space-y-1">
              {navItems.map((item) =>
                item.dropdown ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setSolutionsOpen(!solutionsOpen)}
                      className={cn(
                        'flex w-full items-center justify-between px-3 py-2 text-sm font-medium transition-colors',
                        isActive(item.href) ? 'text-blue-600' : 'text-gray-700'
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={cn('h-4 w-4 transition-transform', solutionsOpen && 'rotate-180')} />
                    </button>
                    {solutionsOpen && (
                      <div className="ml-4 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className={cn(
                              'block px-3 py-2 text-sm transition-colors hover:text-blue-600',
                              pathname === dropdownItem.href ? 'text-blue-600' : 'text-gray-700'
                            )}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'block px-3 py-2 text-sm font-medium transition-colors',
                      isActive(item.href) ? 'text-blue-600' : 'text-gray-700'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <Button asChild className="ml-3 mt-4 w-[calc(100%-1.5rem)] bg-black text-white hover:bg-gray-900">
                <Link href="/contact?request=quote">Request demo</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
