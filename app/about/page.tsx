import { PageHero } from '@/components/ui/page-hero';
import { AboutStory } from '@/components/about/about-story';
import { AboutValues } from '@/components/about/about-values';
import { HorizontalTimeline } from '@/components/about/horizontal-timeline';
import { AboutTeam } from '@/components/about/about-team';

export default function AboutPage() {
  return (
    <div className="bg-white">
      <PageHero
        title="About Maticent"
        subtitle="Uganda's trusted technology partner for over 15 years, empowering education, business, and innovation"
        imageSrc="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
        ]}
      />

      <AboutStory />
      <HorizontalTimeline />
      <AboutValues />
      <AboutTeam />
    </div>
  );
}
