import { createClient } from '@supabase/supabase-js';
import { Product } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Product Helpers
export const getProducts = async () => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Product[];
};

export const addProduct = async (product: Omit<Product, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select();

    if (error) throw error;
    return data[0] as Product;
};

// Mock data for initial development fallback
export const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Royal Banarasi Silk Saree',
        description: 'Handcrafted with pure gold zari and the finest silk from Varanasi. A masterpiece of traditional weaving.',
        price: 45000,
        category: 'Saree',
        images: ['https://images.unsplash.com/photo-1610030469915-9a08ec996a9a?auto=format&fit=crop&q=80&w=800'],
        stock: 5,
        is_exclusive: true
    },
    {
        id: '2',
        name: 'Kashmiri Hand-Embroidered Suit',
        description: 'Exquisite Aari work by master craftsmen from the valley. Soft woolen fabric that speaks elegance.',
        price: 12500,
        category: 'Suit',
        images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800'],
        stock: 12,
        is_exclusive: false
    }
];
