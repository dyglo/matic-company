import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Building2, Briefcase, ArrowRight } from 'lucide-react';

export function SolutionsOverview() {
  const audiences = [
    {
      title: 'Students & Education',
      description: 'Affordable computing solutions with flexible payment options through our Bbala Initiative',
      icon: GraduationCap,
      link: '/solutions#students',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
      title: 'Institutions',
      description: 'Complete technology infrastructure for schools, universities, and training centers',
      icon: Building2,
      link: '/solutions#institutions',
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
    },
    {
      title: 'Enterprise',
      description: 'Professional IT solutions and services for businesses and government organizations',
      icon: Briefcase,
      link: '/solutions#enterprise',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    },
  ];

  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Solutions for Every Need</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Tailored technology solutions for students, institutions, and enterprises
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return (
              <Card key={audience.title} className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className={`mb-4 inline-flex rounded-lg p-3 ${audience.bgColor}`}>
                    <Icon className={`h-8 w-8 ${audience.color}`} />
                  </div>
                  <CardTitle>{audience.title}</CardTitle>
                  <CardDescription>{audience.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="group gap-2 px-0">
                    <Link href={audience.link}>
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/solutions">View All Solutions</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
