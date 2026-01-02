'use client';

import * as React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/data/products';
import { faqs } from '@/data/misc';
import { ArrowRight, CheckCircle2, Shield, Headphones, ArrowLeft } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  const [selectedImage, setSelectedImage] = React.useState(0);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter((p) => product.relatedProducts.includes(p.id));

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Dark Header for Navbar Visibility */}
      <div className="bg-stone-900 pt-28 pb-10">
        <div className="container mx-auto px-4">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm font-medium text-stone-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Gallery Section */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${selectedImage === index
                      ? 'border-primary ring-2 ring-primary/20 ring-offset-2'
                      : 'border-transparent hover:border-stone-200'
                      }`}
                  >
                    <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col">
            <div className="mb-6">
              <Badge className="mb-4 px-3 py-1 text-sm font-normal text-stone-600 border-stone-200" variant="outline">{product.category}</Badge>
              <h1 className="mb-3 text-4xl font-bold tracking-tight text-stone-900 lg:text-5xl">{product.name}</h1>
              <p className="text-lg leading-relaxed text-stone-600">{product.description}</p>
            </div>

            <div className="mb-8 flex items-end gap-4 border-b border-stone-200 pb-8">
              <div className="text-5xl font-bold text-primary">
                {new Intl.NumberFormat('en-UG', {
                  style: 'currency',
                  currency: product.currency,
                  maximumFractionDigits: 0,
                }).format(product.price)}
              </div>
            </div>

            <div className="mb-8 grid gap-4">
              <div className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-2">Key Highlights</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-lg bg-white p-3 border border-stone-200 shadow-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm font-medium text-stone-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Button asChild size="lg" className="flex-1 text-lg h-14 shadow-lg shadow-primary/20 hover:shadow-xl transition-all">
                <Link href="/contact?request=quote">Request Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="flex-1 text-lg h-14 border-2 border-stone-200 text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors">
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-stone-100/50 border border-stone-100">
                <div className="p-2 bg-white rounded-full shadow-sm text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-stone-900">Warranty</div>
                  <div className="text-xs text-stone-500">{product.warranty}</div>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-stone-100/50 border border-stone-100">
                <div className="p-2 bg-white rounded-full shadow-sm text-primary">
                  <Headphones className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-stone-900">Support</div>
                  <div className="text-xs text-stone-500">{product.support}</div>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-stone-100/50 border border-stone-100">
                <div className="p-2 bg-white rounded-full shadow-sm text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-stone-900">Availability</div>
                  <div className="text-xs text-stone-500">Ready to ship</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <Tabs defaultValue="specifications" className="w-full">
            <div className="border-b border-stone-200">
              <TabsList className="w-full justify-start gap-8 bg-transparent p-0 h-auto rounded-none">
                <TabsTrigger
                  value="specifications"
                  className="rounded-none border-b-2 border-transparent px-4 pb-4 pt-2 text-lg text-stone-500 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="features"
                  className="rounded-none border-b-2 border-transparent px-4 pb-4 pt-2 text-lg text-stone-500 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
                >Features</TabsTrigger>
                <TabsTrigger
                  value="faq"
                  className="rounded-none border-b-2 border-transparent px-4 pb-4 pt-2 text-lg text-stone-500 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
                >FAQ</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="specifications" className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0">
                  <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-stone-100">
                        {Object.entries(product.specs).map(([key, value], index) => (
                          <tr key={key} className={`group hover:bg-stone-50/80 transition-colors ${index % 2 === 0 ? 'bg-stone-50/30' : 'bg-white'}`}>
                            <th className="w-1/3 p-4 text-left font-medium text-stone-500 whitespace-nowrap">{key}</th>
                            <td className="p-4 font-semibold text-stone-900">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <span className="text-base font-medium leading-relaxed text-stone-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq" className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.slice(0, 4).map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id} className="rounded-xl border border-stone-200 bg-white px-6 shadow-sm">
                        <AccordionTrigger className="text-lg hover:no-underline hover:text-primary py-6 text-stone-900">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-stone-600 pb-6">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-stone-200 pt-16">
            <h2 className="mb-10 text-3xl font-bold tracking-tight text-stone-900">Related Products</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <Image
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2">
                      <Badge variant="secondary" className="bg-stone-100 hover:bg-stone-200 text-stone-700">{relatedProduct.category}</Badge>
                    </div>
                    <h3 className="mb-2 text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors text-stone-900">
                      <Link href={`/products/${relatedProduct.slug}`} className="before:absolute before:inset-0">
                        {relatedProduct.name}
                      </Link>
                    </h3>
                    <p className="mb-4 text-sm text-stone-500 line-clamp-2">
                      {relatedProduct.shortDescription}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {new Intl.NumberFormat('en-UG', {
                          style: 'currency',
                          currency: relatedProduct.currency,
                          maximumFractionDigits: 0,
                        }).format(relatedProduct.price)}
                      </span>
                      <span className="text-sm font-medium text-stone-500 group-hover:text-primary transition-colors flex items-center gap-1">
                        View Details <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200 bg-white/80 p-4 backdrop-blur-md lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="text-lg font-bold text-primary">
              {new Intl.NumberFormat('en-UG', {
                style: 'currency',
                currency: product.currency,
                maximumFractionDigits: 0,
              }).format(product.price)}
            </div>
            <div className="text-xs text-stone-500">{product.name}</div>
          </div>
          <Button asChild className="gap-2 shadow-md">
            <Link href="/contact?request=quote">
              Request Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
