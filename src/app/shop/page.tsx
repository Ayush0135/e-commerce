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


const products = [
    // SAREES
    { id: 1, name: "Banarasi Resham Saree", price: "₹25,000", width: "Sarees", image: "/images/banarasi-product.png" }, // Generated Red Flatlay
    { id: 11, name: "Kanjeevaram Gold Silk", price: "₹45,000", width: "Sarees", image: "/images/product-saree-kanjeevaram.png" }, // Generated Gold Folded
    { id: 12, name: "Royal Paithani Saree", price: "₹38,000", width: "Sarees", image: "/images/featured-saree.png" }, // Generated Model Shot
    { id: 13, name: "Chanderi Handloom Saree", price: "₹12,000", width: "Sarees", image: "https://images.unsplash.com/photo-1610189012906-88001712a8e8?q=80&w=800&auto=format&fit=crop" }, // Green/Gold
    { id: 14, name: "Midnight Blue Silk", price: "₹28,500", width: "Sarees", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop" }, // Blue

    // LEHENGAS
    { id: 5, name: "Scarlet Bridal Zardozi", price: "₹85,000", width: "Lehengas", image: "/images/product-lehenga-zardozi.png" }, // Generated Red
    { id: 21, name: "Ivory Chikankari Lehenga", price: "₹65,000", width: "Lehengas", image: "https://images.unsplash.com/photo-1594913785162-e6785e6e44b3?q=80&w=800&auto=format&fit=crop" }, // White/Gold
    { id: 22, name: "Navy Velvet Royal Set", price: "₹92,000", width: "Lehengas", image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=800&auto=format&fit=crop" }, // Blue
    { id: 23, name: "Blush Pink Organza", price: "₹45,000", width: "Lehengas", image: "https://images.unsplash.com/photo-1585250325453-61b69824c9c2?q=80&w=800&auto=format&fit=crop" }, // Pink
    { id: 24, name: "Gold Tissue Lehenga", price: "₹1,10,000", width: "Lehengas", image: "https://images.unsplash.com/photo-1512413914633-b5043f4041ea?q=80&w=800&auto=format&fit=crop" }, // Gold

    // SHERWANIS
    { id: 2, name: "Ivory Pearl Sherwani", price: "₹45,000", width: "Sherwanis", image: "/images/product-sherwani-ivory.png" }, // Generated Ivory
    { id: 31, name: "Royal Bandhgala Black", price: "₹35,000", width: "Sherwanis", image: "/images/featured-men.png" }, // Generated Model Shot
    { id: 32, name: "Embroidered Achkan", price: "₹55,000", width: "Sherwanis", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" }, // Cream/Gold
    { id: 33, name: "Brocade Gold Sherwani", price: "₹62,000", width: "Sherwanis", image: "https://images.unsplash.com/photo-1627341577742-b06f8c7b809f?q=80&w=800&auto=format&fit=crop" }, // Gold
    { id: 34, name: "Pastel Groom Set", price: "₹48,000", width: "Sherwanis", image: "https://images.unsplash.com/photo-1629851759687-769b7f57076e?q=80&w=800&auto=format&fit=crop" }, // Peach

    // JEWELRY
    { id: 3, name: "Kundan Choker Set", price: "₹1,20,000", width: "Jewelry", image: "/images/product-jewelry-kundan.png" }, // Generated Necklace
    { id: 9, name: "Temple Gold Necklace", price: "₹2,55,000", width: "Jewelry", image: "/images/featured-jewelry.png" }, // Generated Model/Set
    { id: 6, name: "Antique Silver Bangles", price: "₹12,000", width: "Jewelry", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop" }, // Silver
    { id: 41, name: "Polki Chandbalis", price: "₹45,000", width: "Jewelry", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop" }, // Earrings
    { id: 42, name: "Emerald Mathapatti", price: "₹35,000", width: "Jewelry", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop" }, // Headpiece

    // ACCESSORIES
    { id: 4, name: "Kashmiri Pashmina Shawl", price: "₹18,000", width: "Accessories", image: "/images/collection-kashmir.png" }, // Generated Shawl Model
    { id: 8, name: "Zardozi Potli Bag", price: "₹3,200", width: "Accessories", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop" }, // Bag
    { id: 51, name: "Royal Safa Turban", price: "₹4,500", width: "Accessories", image: "https://images.unsplash.com/photo-1629822606828-8d7696495d03?q=80&w=800&auto=format&fit=crop" }, // Turban
    { id: 52, name: "Velvet Mojaris", price: "₹3,800", width: "Accessories", image: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=800&auto=format&fit=crop" }, // Shoes
    { id: 53, name: "Silk Pocket Square", price: "₹1,200", width: "Accessories", image: "https://images.unsplash.com/photo-1596702636245-21d374465d6c?q=80&w=800&auto=format&fit=crop" }, // Fabric

    // DECOR
    { id: 7, name: "Vintage Brass Vase", price: "₹4,500", width: "Decor", image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=800&auto=format&fit=crop" },
    { id: 61, name: "Jaipur Blue Pottery", price: "₹2,800", width: "Decor", image: "https://images.unsplash.com/photo-1615529328331-f8e264562094?q=80&w=800&auto=format&fit=crop" },
    { id: 62, name: "Hand-Knotted Carpet", price: "₹45,000", width: "Decor", image: "https://images.unsplash.com/photo-1596230678886-2c262145b274?q=80&w=800&auto=format&fit=crop" },
    { id: 63, name: "Marble Inlay Platter", price: "₹8,500", width: "Decor", image: "https://images.unsplash.com/photo-1601666614486-13a85b9b6574?q=80&w=800&auto=format&fit=crop" },
    { id: 64, name: "Bronze Nataraja", price: "₹15,000", width: "Decor", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop" },
];

function ShopContent() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');

    const filteredProducts = categoryParam
        ? products.filter(p => p.width === categoryParam)
        : products;

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
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            <span className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 uppercase tracking-widest text-primary shadow-sm">
                                                New Arrival
                                            </span>
                                        </div>

                                        <div className="text-left px-1">
                                            <h3 className="text-lg font-serif text-primary mb-1 group-hover:text-brand-gold transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-accent text-sm font-medium">{product.price}</p>
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
