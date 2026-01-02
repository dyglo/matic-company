import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Heart, Laptop, ArrowRight } from 'lucide-react';

export function BbalaTeaser() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700 py-16 text-white md:py-24">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/80 to-yellow-800/70" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
            <Heart className="h-5 w-5" />
            <span className="font-semibold">Social Impact Initiative</span>
          </div>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">The Bbala Initiative</h2>

          <p className="mb-8 text-lg text-yellow-50 md:text-xl">
            Empowering Ugandan students with affordable, quality laptops and flexible payment plans.
            Making technology education accessible to everyone.
          </p>

          <div className="mb-8 grid gap-6 text-left sm:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <Laptop className="mb-3 h-8 w-8" />
              <h3 className="mb-2 font-semibold">Subsidized Pricing</h3>
              <p className="text-sm text-yellow-50">Up to 30% off retail prices for eligible students</p>
            </div>
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <GraduationCap className="mb-3 h-8 w-8" />
              <h3 className="mb-2 font-semibold">Flexible Payments</h3>
              <p className="text-sm text-yellow-50">Installment plans tailored to student budgets</p>
            </div>
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <Heart className="mb-3 h-8 w-8" />
              <h3 className="mb-2 font-semibold">Full Support</h3>
              <p className="text-sm text-yellow-50">Comprehensive warranty and technical assistance</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-yellow-900 hover:bg-yellow-50">
              <Link href="/solutions/bbala" className="gap-2">
                Learn About Bbala
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Link href="/solutions/bbala#apply">Apply Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
