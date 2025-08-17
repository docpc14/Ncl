import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour TypeScript
export interface Service {
  id: string;
  name: string;
  description: string;
  price_from: number;
  icon: string;
  category: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  is_featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface OpeningHour {
  id: string;
  day_of_week: number;
  is_open: boolean;
  opening_time: string | null;
  closing_time: string | null;
  updated_at: string;
}

export interface SiteContent {
  id: string;
  section: string;
  key: string;
  value: string;
  type: string;
  updated_at: string;
}

export interface ContactInfo {
  id: string;
  phone: string;
  email: string;
  address: string;
  updated_at: string;
}