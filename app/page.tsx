import { HeroSection } from '@/components/sections/hero-section';
import { PinnedPanelsShowcase } from '@/components/animations/PinnedPanelsShowcase';
import { AnimatedTextStory } from '@/components/animations/AnimatedTextStory';
import { InteractiveMosaicGrid } from '@/components/animations/InteractiveMosaicGrid';
import { ProductHighlights } from '@/components/sections/product-highlights';
import { MetricsSection } from '@/components/sections/metrics-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { PartnersSection } from '@/components/sections/partners-section';
import { LatestNews } from '@/components/sections/latest-news';
import { FinalCTA } from '@/components/sections/final-cta';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PinnedPanelsShowcase />
      <AnimatedTextStory />
      <InteractiveMosaicGrid />
      <ProductHighlights />
      <MetricsSection />
      <TestimonialsSection />
      <PartnersSection />
      <LatestNews />
      <FinalCTA />
    </>
  );
}
