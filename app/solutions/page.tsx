import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/ui/page-hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { solutions } from '@/data/misc';
import { GraduationCap, Building2, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';

const iconMap = {
  students: GraduationCap,
  institutions: Building2,
  enterprise: Briefcase,
};

export default function SolutionsPage() {
  return (
    <div className="bg-stone-50">
      <PageHero
        title="Technology Solutions"
        subtitle="Whether you're a student, institution, or enterprise, we have tailored solutions to meet your unique technology requirements"
        imageSrc="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: '/solutions' },
        ]}
      />

      {solutions.map((solution, index) => {
        const Icon = iconMap[solution.audience];
        const isEven = index % 2 === 0;

        return (
          <section
            key={solution.id}
            id={solution.audience}
            className="bg-white py-16 md:py-24"
          >
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <div className="mb-8 text-center">
                  <div className="mb-4 inline-flex rounded-full bg-primary/10 p-4">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="mb-4 text-3xl font-bold md:text-4xl">{solution.title}</h2>
                  <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{solution.description}</p>
                </div>

                <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {solution.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg border bg-card p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {solution.caseStudy && (
                  <Card className="border-2">
                    <CardHeader>
                      <Badge className="mb-2 w-fit">Success Story</Badge>
                      <CardTitle>{solution.caseStudy.title}</CardTitle>
                      <CardDescription>{solution.caseStudy.company}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="mb-2 font-semibold">Challenge</h4>
                        <p className="text-sm text-muted-foreground">{solution.caseStudy.challenge}</p>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold">Solution</h4>
                        <p className="text-sm text-muted-foreground">{solution.caseStudy.solution}</p>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold">Results</h4>
                        <ul className="space-y-1">
                          {solution.caseStudy.results.map((result, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="mt-8 text-center">
                  <Button asChild size="lg">
                    <Link href="/contact" className="gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="border-t bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Explore More Solutions</h2>
            <p className="mb-8 text-lg text-yellow-50">
              Discover specialized programs and resources designed to support your technology journey
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-yellow-900 hover:bg-yellow-50">
                <Link href="/solutions/bbala">Bbala Initiative</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Link href="/solutions/resources">Resources & Downloads</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
