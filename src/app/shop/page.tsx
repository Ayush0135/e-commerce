"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Filter, ChevronDown } from "lucide-react";


const filters = {
    category: ["Sarees", "Lehengas", "Sherwanis", "Jewelry", "Accessories", "Decor"],
    region: ["Banaras", "Jaipur", "Kanchipuram", "Kashmir", "Kutch"],
    craft: ["Handloom", "Zardozi", "Meenakari", "Block Print", "Pashmina"],
    price: ["Under ₹5,000", "₹5,000 - ₹10,000", "₹10,000 - ₹25,000", "₹25,000 - ₹50,000", "Above ₹50,000"],
    occasion: ["Wedding", "Festive", "Casual", "Royal Wear"]
};


import { getProducts } from "@/lib/supabase";
import { Product } from "@/lib/types";
import { useEffect } from "react";

function ShopContent() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error loading shop products:", error);
            } finally {
                setLoading(false);
            }
        }
        loadProducts();
    }, []);

    const filteredProducts = categoryParam
        ? products.filter(p => p.category === categoryParam) // Note: Changed 'width' to 'category' to match Type
        : products;

    if (loading) {
        return <div className="min-h-screen pt-24 text-center">Loading Collection...</div>;
    }

    return (
        <div className="bg-transparent min-h-screen pt-12 pb-24">
            <div className="container">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <span className="text-gray-400 text-xs uppercase tracking-[0.2em] mb-2 block">The Collection</span>
                        <h1 className="text-4xl md:text-5xl font-serif text-black">{categoryParam || 'All Products'}</h1>
                    </div>

                    <button
                        className="md:hidden flex items-center gap-2 text-black font-bold uppercase tracking-widest text-sm mt-6 border border-black px-4 py-2"
                        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                    >
                        <Filter className="w-4 h-4" /> Filters
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Sidebar Filters */}
                    <aside className={`w-full lg:w-64 flex-shrink-0 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
                        <div className="space-y-8">

                            {Object.entries(filters).map(([key, options]) => (
                                <div key={key} className="border-b border-gray-100 pb-6 last:border-0">
                                    <h3 className="font-serif text-lg text-black capitalize mb-4 flex items-center justify-between cursor-pointer">
                                        {key} <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </h3>
                                    <div className="space-y-2">
                                        {options.map((option, idx) => (
                                            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 border-gray-300 rounded text-black focus:ring-black accent-black"
                                                    defaultChecked={key === 'category' && option === categoryParam}
                                                />
                                                <span className="text-gray-500 font-sans text-sm group-hover:text-black transition-colors">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                                {filteredProducts.map((product) => (
                                    <Link href={`/shop/${product.id}`} key={product.id} className="group block">
                                        <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden mb-4 rounded-sm shadow-sm hover:shadow-md transition-all">
                                            <img
                                                src={product.images?.[0] || "https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&q=80&w=800"}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            {product.is_exclusive && (
                                                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 uppercase tracking-widest text-primary shadow-sm">
                                                    New Arrival
                                                </span>
                                            )}
                                        </div>

                                        <div className="text-left px-1">
                                            <h3 className="text-lg font-serif text-primary mb-1 group-hover:text-brand-gold transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-accent text-sm font-medium">₹ {product.price.toLocaleString()}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <h3 className="text-xl font-serif text-gray-400">No products found in this category.</h3>
                            </div>
                        )}

                        {/* Pagination / Load More */}
                        {filteredProducts.length > 0 && (
                            <div className="mt-16 text-center">
                                <button className="btn-outline">
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <style jsx>{`
        .btn-outline {
            background-color: transparent;
            color: black;
            padding: 1rem 3rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            border: 1px solid black;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
        }
        .btn-outline:hover {
            background-color: black;
            color: white;
        }
      `}</style>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white"></div>}>
            <ShopContent />
        </Suspense>
    );
}
