'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { resources } from '@/data/misc';
import { Download, FileText, BookOpen, File, Search } from 'lucide-react';
import { toast } from 'sonner';

const typeIcons: Record<string, any> = {
  catalog: BookOpen,
  brochure: FileText,
  manual: File,
  guide: FileText,
};

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedResource, setSelectedResource] = React.useState<any>(null);

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(resources.map((r) => r.category)));

  const handleRequestAccess = (e: React.FormEvent, resource: any) => {
    e.preventDefault();
    toast.success(`Access request submitted for "${resource.title}". Check your email for the download link.`);
    setSelectedResource(null);
  };

  return (
    <div className="pt-16">
      <section className="border-b bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Resources & Downloads</h1>
            <p className="text-lg text-blue-100">
              Access product catalogs, technical documentation, guides, and more
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 rounded-lg border bg-yellow-50 p-4 dark:bg-yellow-950/30">
            <p className="text-center text-sm">
              <strong>Note:</strong> Resources are available to registered customers and partners. Request access to receive download links via email.
            </p>
          </div>

          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => {
              const Icon = typeIcons[resource.type];
              return (
                <Card key={resource.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                  {resource.thumbnail && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                      <Image
                        src={resource.thumbnail}
                        alt={resource.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="secondary" className="capitalize">
                        {resource.type}
                      </Badge>
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                      {resource.pages && <span>{resource.pages} pages</span>}
                      {resource.fileSize && <span>{resource.fileSize}</span>}
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full gap-2" onClick={() => setSelectedResource(resource)}>
                          <Download className="h-4 w-4" />
                          Request Access
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Request Resource Access</DialogTitle>
                          <DialogDescription>
                            Fill out the form below to receive "{resource.title}" via email
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={(e) => handleRequestAccess(e, resource)} className="space-y-4">
                          <div>
                            <Label htmlFor="name">Full Name *</Label>
                            <Input id="name" required />
                          </div>
                          <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input id="email" type="email" required />
                          </div>
                          <div>
                            <Label htmlFor="company">Company/Organization</Label>
                            <Input id="company" />
                          </div>
                          <div>
                            <Label htmlFor="purpose">Purpose *</Label>
                            <Select required>
                              <SelectTrigger id="purpose">
                                <SelectValue placeholder="Select purpose" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="personal">Personal Use</SelectItem>
                                <SelectItem value="business">Business Evaluation</SelectItem>
                                <SelectItem value="education">Educational Institution</SelectItem>
                                <SelectItem value="research">Research</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button type="submit" className="w-full">
                            Submit Request
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">No resources found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
