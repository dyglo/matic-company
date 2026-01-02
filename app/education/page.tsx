import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/ui/page-hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { GraduationCap, BookOpen, Users, Laptop, CheckCircle2, ArrowRight } from 'lucide-react';

export default function EducationPage() {
  return (
    <div className="bg-stone-50">
      <PageHero
        title="Education & Research"
        subtitle="Empowering learners and educators with technology solutions that enable excellence in education and research"
        imageSrc="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Education', href: '/education' },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Technology for Education</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                From individual students to entire institutions, we provide comprehensive technology solutions that support learning, teaching, and research.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <Laptop className="mb-2 h-10 w-10 text-primary" />
                  <CardTitle>For Students</CardTitle>
                  <CardDescription>Individual learning solutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      'Affordable laptops via Bbala Initiative',
                      'Flexible payment plans',
                      'Student-focused specifications',
                      'Extended warranty and support',
                      'Educational software bundles',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-6 w-full">
                    <Link href="/solutions/bbala">Learn About Bbala</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <BookOpen className="mb-2 h-10 w-10 text-primary" />
                  <CardTitle>For Educators</CardTitle>
                  <CardDescription>Teaching and administration tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      'Professional laptops and tablets',
                      'Classroom management tools',
                      'Digital content creation devices',
                      'Presentation equipment',
                      'Priority technical support',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-6 w-full" variant="outline">
                    <Link href="/products">Browse Products</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="mb-2 h-10 w-10 text-primary" />
                  <CardTitle>For Institutions</CardTitle>
                  <CardDescription>Complete infrastructure solutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      'Computer lab deployment',
                      'Network infrastructure',
                      'Bulk procurement pricing',
                      'Professional installation',
                      'Ongoing maintenance contracts',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-6 w-full" variant="outline">
                    <Link href="/solutions#institutions">View Solutions</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Partner Institutions</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              We proudly serve over 45 universities, colleges, and schools across Uganda
            </p>
            <div className="mb-8 flex flex-wrap justify-center gap-4">
              {[
                'Makerere University',
                'Uganda Christian University',
                'Kyambogo University',
                'Mbarara University of Science & Technology',
                'Busitema University',
                'Gulu University',
              ].map((institution) => (
                <div
                  key={institution}
                  className="rounded-lg border bg-card px-6 py-3 text-sm font-medium"
                >
                  {institution}
                </div>
              ))}
            </div>
            <Button asChild size="lg">
              <Link href="/contact" className="gap-2">
                Become a Partner
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Research & Innovation Support</CardTitle>
                <CardDescription>High-performance computing for academic research</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We provide specialized workstations and computing resources for research labs, data analysis, simulations, and academic projects. Our solutions support cutting-edge research across various disciplines.
                </p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {[
                    'High-performance workstations',
                    'Data analysis equipment',
                    'Specialized software licensing',
                    'Research-grade peripherals',
                    'Technical consultation',
                    'Grant proposal support',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="w-full">
                  <Link href="/contact?request=quote">Discuss Your Research Needs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
