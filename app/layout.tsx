import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Maticent Industries Limited - The African Heritage',
  description: 'Uganda\'s leading provider of quality technology solutions for education, business, and enterprise. Committed to making technology accessible to all.',
  keywords: ['Maticent', 'Uganda', 'Technology', 'Laptops', 'Computers', 'Education', 'Enterprise', 'Bbala Initiative'],
  icons: {
    icon: '/brand/matic-logo.webp',
  },
  openGraph: {
    title: 'Maticent Industries Limited - The African Heritage',
    description: 'Uganda\'s leading provider of quality technology solutions for education, business, and enterprise.',
    images: [
      {
        url: '/brand/matic-logo.webp',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 overflow-x-hidden">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
