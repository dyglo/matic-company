'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/ui/page-hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Heart, CheckCircle2, Users, Laptop, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export default function BbalaPage() {
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    studentId: '',
    program: '',
    yearOfStudy: '',
    preferredProduct: '',
    additionalInfo: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Application submitted successfully! Our team will contact you within 2-3 business days.');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      university: '',
      studentId: '',
      program: '',
      yearOfStudy: '',
      preferredProduct: '',
      additionalInfo: '',
    });
  };

  return (
    <div className="bg-stone-50">
      <PageHero
        title="The Bbala Initiative"
        subtitle="Empowering Ugandan students with affordable, quality technology. Making education accessible through subsidized laptops and flexible payment plans."
        imageSrc="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: '/solutions' },
          { label: 'Bbala Initiative', href: '/solutions/bbala' },
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Why Bbala?</h2>
              <p className="text-lg text-muted-foreground">
                We believe every student deserves access to quality technology for their education
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <Laptop className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>Subsidized Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Receive up to 30% discount on quality laptops through university partnerships and bulk procurement
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <GraduationCap className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>Flexible Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Installment plans tailored to student budgets, with options for termly or monthly payments
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heart className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>Full Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive warranty coverage and priority technical support throughout your studies
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Eligibility Criteria</h2>

            <div className="space-y-4">
              {[
                'Currently enrolled in a Ugandan university or tertiary institution',
                'Valid student ID and enrollment verification letter',
                'Completed at least one semester/term of study',
                'Good academic standing (not on probation)',
                'Ugandan citizen or valid study permit holder',
              ].map((criterion, index) => (
                <div key={index} className="flex items-start gap-3 rounded-lg border bg-card p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{criterion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold">How It Works</h2>

            <div className="space-y-6">
              {[
                { step: 1, title: 'Apply Online', description: 'Fill out the application form below with your details and required documents' },
                { step: 2, title: 'Verification', description: 'We verify your enrollment status with your institution (1-2 business days)' },
                { step: 3, title: 'Approval & Selection', description: 'Choose your laptop and payment plan from our subsidized catalog' },
                { step: 4, title: 'Collection', description: 'Pick up your laptop from our service center or campus collection point' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16" id="apply">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold">Apply Now</h2>
              <p className="text-muted-foreground">
                Complete the form below to start your Bbala Initiative application
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="studentId">Student ID *</Label>
                      <Input
                        id="studentId"
                        value={formData.studentId}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="university">University/Institution *</Label>
                    <Input
                      id="university"
                      value={formData.university}
                      onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="program">Program of Study *</Label>
                      <Input
                        id="program"
                        value={formData.program}
                        onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="yearOfStudy">Year of Study *</Label>
                      <Select value={formData.yearOfStudy} onValueChange={(value) => setFormData({ ...formData, yearOfStudy: value })}>
                        <SelectTrigger id="yearOfStudy">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Year 1</SelectItem>
                          <SelectItem value="2">Year 2</SelectItem>
                          <SelectItem value="3">Year 3</SelectItem>
                          <SelectItem value="4">Year 4</SelectItem>
                          <SelectItem value="5+">Year 5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="preferredProduct">Preferred Laptop (Optional)</Label>
                    <Select value={formData.preferredProduct} onValueChange={(value) => setFormData({ ...formData, preferredProduct: value })}>
                      <SelectTrigger id="preferredProduct">
                        <SelectValue placeholder="Select a laptop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="latitude-3420">Latitude 3420 Business Laptop</SelectItem>
                        <SelectItem value="chromebook-3110">Chromebook 3110 Education</SelectItem>
                        <SelectItem value="inspiron">Inspiron Series</SelectItem>
                        <SelectItem value="undecided">Undecided</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      placeholder="Tell us about your technology needs and how this laptop will support your studies"
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Submit Application
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    By submitting this form, you agree to our terms and conditions. We will contact you within 2-3 business days.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Impact</h2>

            <div className="grid gap-8 sm:grid-cols-3">
              <div className="text-center">
                <Users className="mx-auto mb-4 h-10 w-10 text-primary" />
                <div className="mb-2 text-4xl font-bold text-primary">12,000+</div>
                <div className="font-semibold">Students Supported</div>
                <p className="text-sm text-muted-foreground">Since launch in 2020</p>
              </div>

              <div className="text-center">
                <GraduationCap className="mx-auto mb-4 h-10 w-10 text-primary" />
                <div className="mb-2 text-4xl font-bold text-primary">45+</div>
                <div className="font-semibold">Partner Universities</div>
                <p className="text-sm text-muted-foreground">Across Uganda</p>
              </div>

              <div className="text-center">
                <TrendingUp className="mx-auto mb-4 h-10 w-10 text-primary" />
                <div className="mb-2 text-4xl font-bold text-primary">95%</div>
                <div className="font-semibold">Satisfaction Rate</div>
                <p className="text-sm text-muted-foreground">Student feedback</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
