import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { testimonials } from '@/data/misc';
import { Quote, Star } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-950 md:text-4xl">What Our Customers Say</h2>
          <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[8vw] font-black uppercase tracking-tighter text-blue-900/[0.03] select-none">
            Testimonials
          </div>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Trusted by thousands of individuals, businesses, and institutions across Uganda
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="group relative flex flex-col justify-between border-2 border-gray-100 bg-white transition-all hover:border-blue-200 hover:shadow-xl"
            >
              <CardHeader className="relative p-8">
                <Quote className="absolute right-8 top-8 h-10 w-10 text-blue-600/10 transition-colors group-hover:text-blue-600/20" />
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
                <p className="relative z-10 text-lg leading-relaxed text-blue-950">
                  "{testimonial.content}"
                </p>
              </CardHeader>
              <CardFooter className="flex flex-col items-start bg-gray-50/50 p-8">
                <div className="font-bold text-blue-950">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
