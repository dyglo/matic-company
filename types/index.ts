export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  price: number;
  currency: string;
  images: string[];
  specs: Record<string, string>;
  features: string[];
  warranty: string;
  support: string;
  useCases: string[];
  relatedProducts: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface UseCase {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface NewsPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  image: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
  rating: number;
}

export interface Metric {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: string;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'catalog' | 'brochure' | 'manual' | 'guide';
  description: string;
  category: string;
  fileSize?: string;
  pages?: number;
  thumbnail?: string;
}

export interface Office {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  hours: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Solution {
  id: string;
  slug: string;
  title: string;
  description: string;
  audience: 'students' | 'institutions' | 'enterprise';
  benefits: string[];
  caseStudy?: {
    title: string;
    company: string;
    challenge: string;
    solution: string;
    results: string[];
  };
}
