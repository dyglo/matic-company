'use client';

import * as React from 'react';
import { PageHero } from '@/components/ui/page-hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { offices, faqs } from '@/data/misc';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, Globe, ArrowRight, Building2, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useLayoutEffect(() => {
    // Safety check for server-side rendering
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const sections = containerRef.current?.querySelectorAll('.reveal-section');
      if (sections && sections.length > 0) {
        sections.forEach((section: any, i) => {
          gsap.fromTo(section,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: i * 0.1, // Stagger effect
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Message sent successfully! We will be in touch shortly.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: '',
    });
    setIsSubmitting(false);
  };

  const primaryOffice = offices[0];
  const regionalOffices = offices.slice(1);

  return (
    <div ref={containerRef} className="bg-stone-50 min-h-screen">
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with our expert team to discuss your technology requirements."
        imageSrc="https://images.pexels.com/photos/886743/pexels-photo-886743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact', href: '/contact' },
        ]}
      />

      {/* Intro Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl text-center reveal-section">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            <span>We're Here to Help</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6 tracking-tight">
            Let's Start a Conversation
          </h2>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto">
            Whether you are an educational institution, a growing business, or a large enterprise,
            Maticent is ready to support your digital transformation. Reach out to us today.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12 md:py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">

            {/* Left Column: Contact Form */}
            <div className="lg:col-span-7 reveal-section">
              <Card className="border-none shadow-xl bg-white overflow-hidden">
                <CardHeader className="bg-primary/5 border-b border-primary/10 pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold flex items-center gap-3 text-stone-900">
                    <Send className="w-6 h-6 text-primary" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription className="text-base text-stone-600">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-stone-700">Full Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="bg-stone-50 border-stone-200 focus:bg-white transition-colors text-stone-900 placeholder:text-stone-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-stone-700">Email Address <span className="text-red-500">*</span></Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-stone-50 border-stone-200 focus:bg-white transition-colors text-stone-900 placeholder:text-stone-400"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-stone-700">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+256..."
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-stone-50 border-stone-200 focus:bg-white transition-colors text-stone-900 placeholder:text-stone-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="inquiryType" className="text-sm font-medium text-stone-700">Inquiry Type <span className="text-red-500">*</span></Label>
                        <Select
                          value={formData.inquiryType}
                          onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                          required
                        >
                          <SelectTrigger id="inquiryType" className="bg-stone-50 border-stone-200 focus:bg-white transition-colors text-stone-900">
                            <SelectValue placeholder="Select type" className="placeholder:text-stone-400" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quote">Request Quote</SelectItem>
                            <SelectItem value="sales">Sales Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                            <SelectItem value="bbala">Bbala Initiative</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium text-stone-700">Subject <span className="text-red-500">*</span></Label>
                      <Input
                        id="subject"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="bg-stone-50 border-stone-200 focus:bg-white transition-colors text-stone-900 placeholder:text-stone-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium text-stone-700">Message <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide details about your inquiry..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={6}
                        required
                        className="bg-stone-50 border-stone-200 focus:bg-white transition-colors resize-none text-stone-900 placeholder:text-stone-400"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full md:w-auto min-w-[200px]" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Contact Info */}
            <div className="lg:col-span-5 space-y-8 reveal-section">
              {/* Primary Office Card */}
              <Card className="bg-primary text-primary-foreground border-none shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black/10 rounded-full blur-2xl pointer-events-none" />

                <CardHeader>
                  <div className="flex items-center gap-2 mb-2 opacity-90">
                    <Building2 className="w-5 h-5" />
                    <span className="text-sm font-medium uppercase tracking-wider">Headquarters</span>
                  </div>
                  <CardTitle className="text-2xl text-white">{primaryOffice.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-1 opacity-80" />
                    <div>
                      <p className="font-medium">{primaryOffice.address}</p>
                      <p className="text-primary-foreground/80 text-sm">{primaryOffice.city}, {primaryOffice.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 flex-shrink-0 opacity-80" />
                    <a href={`tel:${primaryOffice.phone}`} className="hover:underline font-medium">
                      {primaryOffice.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 flex-shrink-0 opacity-80" />
                    <a href={`mailto:${primaryOffice.email}`} className="hover:underline font-medium break-all">
                      {primaryOffice.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 flex-shrink-0 mt-1 opacity-80" />
                    <p className="text-sm leading-relaxed opacity-90">{primaryOffice.hours}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Regional Offices Accordion */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-stone-900">
                  <Globe className="w-5 h-5 text-primary" />
                  Regional Offices
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {regionalOffices.map((office) => (
                    <AccordionItem key={office.id} value={office.id}>
                      <AccordionTrigger className="hover:no-underline hover:bg-stone-50 px-3 rounded-lg transition-colors text-stone-800">
                        <span className="font-medium text-left">{office.name}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-3 pb-3 pt-1">
                        <div className="space-y-3 text-sm text-stone-600 pt-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-3.5 h-3.5 mt-0.5" />
                            <span>{office.address}, {office.city}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5" />
                            <a href={`tel:${office.phone}`} className="hover:text-primary">{office.phone}</a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5" />
                            <a href={`mailto:${office.email}`} className="hover:text-primary">{office.email}</a>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Support Info */}
              <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Need Technical Help?</h4>
                    <p className="text-sm text-blue-800/80 mb-3">
                      Our support team is available during business hours to assist with any technical issues.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-blue-600 font-semibold">
                      Visit Support Center &rarr;
                    </Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="h-[400px] w-full bg-stone-200 relative reveal-section">
        <iframe
          src="https://maps.google.com/maps?q=Kampala+Road,+Kampala,+Uganda&t=&z=14&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0%) contrast(1.1) opacity(0.9)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Maticent Office Location"
          className="w-full h-full"
        />
        {/* Map Overlay Card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:top-8 md:left-8 bg-white p-4 rounded-lg shadow-xl max-w-xs hidden md:block">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Open Now</span>
          </div>
          <p className="text-sm font-semibold text-stone-900">Kampala Road, Plot 14</p>
          <p className="text-xs text-stone-500 mt-1">Visit us for a consultation.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl reveal-section">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-stone-900">Frequently Asked Questions</h2>
            <p className="text-stone-600">Common questions about contacting us and our services.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b-stone-100">
                <AccordionTrigger className="text-left font-medium text-lg py-4 hover:text-primary transition-colors text-stone-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-stone-600 leading-relaxed text-base pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
