'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, SlidersHorizontal, X, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { products } from '@/data/products';
import { categories } from '@/data/categories';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [compareList, setCompareList] = React.useState<string[]>([]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleCompare = (productId: string) => {
    if (compareList.includes(productId)) {
      setCompareList(compareList.filter((id) => id !== productId));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, productId]);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <PageHero
        title="Our Products"
        subtitle="Browse our complete range of quality technology solutions"
        imageSrc="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
        ]}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Toolbar */}
        <div className="mb-10 flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-muted bg-stone-50/50 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-sm font-medium text-muted-foreground md:block">
              Filter by:
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px] border-muted">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Compare Bar */}
        {compareList.length > 0 && (
          <div className="sticky top-4 z-50 mb-8 w-full animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="rounded-xl border bg-white p-4 shadow-lg ring-1 ring-black/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-foreground">Compare ({compareList.length}/3):</span>
                  <div className="flex gap-2">
                    {compareList.map((id) => {
                      const product = products.find((p) => p.id === id);
                      return (
                        <Badge key={id} variant="secondary" className="gap-2 pl-2 pr-1 py-1">
                          {product?.name.substring(0, 20)}...
                          <button
                            onClick={() => toggleCompare(id)}
                            className="ml-1 rounded-full p-0.5 hover:bg-black/10 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                {compareList.length >= 2 && (
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button size="sm" className="shadow-sm">View Comparison</Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
                      <SheetHeader className="mb-6 border-b pb-4">
                        <SheetTitle>Product Comparison</SheetTitle>
                      </SheetHeader>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-muted/50">
                              <th className="border p-4 text-left font-semibold text-muted-foreground w-1/4">Feature</th>
                              {compareList.map((id) => {
                                const product = products.find((p) => p.id === id);
                                return (
                                  <th key={id} className="border p-4 text-left font-bold text-foreground min-w-[200px]">
                                    {product?.name}
                                  </th>
                                );
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border p-4 font-semibold text-foreground">Price</td>
                              {compareList.map((id) => {
                                const product = products.find((p) => p.id === id);
                                return (
                                  <td key={id} className="border p-4 font-medium text-primary text-lg">
                                    {new Intl.NumberFormat('en-UG', {
                                      style: 'currency',
                                      currency: product?.currency || 'UGX',
                                      maximumFractionDigits: 0,
                                    }).format(product?.price || 0)}
                                  </td>
                                );
                              })}
                            </tr>
                            {Object.keys(products.find((p) => p.id === compareList[0])?.specs || {}).map((specKey) => (
                              <tr key={specKey} className="hover:bg-muted/30">
                                <td className="border p-4 font-medium text-muted-foreground">{specKey}</td>
                                {compareList.map((id) => {
                                  const product = products.find((p) => p.id === id);
                                  return (
                                    <td key={id} className="border p-4">
                                      {product?.specs[specKey] || 'N/A'}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </SheetContent>
                  </Sheet>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-stone-900">
            {selectedCategory === 'all' ? 'All Products' : selectedCategory}
          </h2>
          <div className="text-sm text-stone-500">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group relative flex flex-col overflow-hidden border-stone-200 bg-white transition-all duration-300 hover:shadow-xl hover:border-primary/20">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute left-4 top-4 z-10">
                  <Badge variant="secondary" className="bg-white/90 text-stone-900 shadow-sm backdrop-blur-sm hover:bg-white">{product.category}</Badge>
                </div>

                <div className="absolute right-4 top-4 z-10 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className={`h-8 w-8 rounded-full shadow-sm backdrop-blur-md transition-colors ${compareList.includes(product.id) ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-white/90 text-stone-700 hover:bg-white hover:text-primary'}`}
                      onClick={() => toggleCompare(product.id)}
                      disabled={!compareList.includes(product.id) && compareList.length >= 3}
                      title="Compare"
                    >
                      {compareList.includes(product.id) ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <CardHeader className="flex-none pb-2">
                <CardTitle className="line-clamp-1 text-lg font-bold text-stone-900 group-hover:text-primary transition-colors">
                  <Link href={`/products/${product.slug}`} className="before:absolute before:inset-0">
                    {product.name}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm leading-relaxed text-stone-600">
                  {product.shortDescription}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 pt-2">
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.features.slice(0, 2).map((feature, i) => (
                    <span key={i} className="inline-flex items-center text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-md border border-stone-100">
                      {feature}
                    </span>
                  ))}
                  {product.features.length > 2 && (
                    <span className="inline-flex items-center text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-md border border-stone-100">
                      +{product.features.length - 2} more
                    </span>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between border-t border-stone-100 bg-stone-50/50 p-4">
                <div className="text-xl font-bold text-stone-900">
                  {new Intl.NumberFormat('en-UG', {
                    style: 'currency',
                    currency: product.currency,
                    maximumFractionDigits: 0,
                  }).format(product.price)}
                </div>
                <Button variant="ghost" size="sm" className="gap-2 text-stone-600 group-hover:text-primary relative z-10 transition-colors">
                  View Details <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed bg-stone-50/50 p-8 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted shadow-inner">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-6 text-xl font-semibold">No products found</h3>
            <p className="mt-2 max-w-sm text-muted-foreground">
              We couldn't find any products matching "{searchQuery}". Try adjusting your search or filters.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
