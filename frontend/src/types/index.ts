export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  shortDescription: string;
  quantities: string[];
  applications: string[];
  specifications: Record<string, string>;
  packagingDesc: string;
  visualType: 'distilled' | 'deionized' | 'demineralized' | 'coolant';
}

export interface ProcessStage {
  id: string;
  step: string;
  title: string;
  description: string;
}

export interface B2BInquiry {
  name: string;
  company: string;
  phone: string;
  email: string;
  product: string;
  quantity: string;
  application: string;
  message: string;
}

export interface ServiceLocation {
  name: string;
  details: string;
  coordinates: { x: number; y: number }; // Percentage coordinate on custom map visual
}
