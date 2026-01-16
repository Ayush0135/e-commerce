"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { getProducts, mockProducts } from "@/lib/supabase";
import { Search, Loader2, Filter, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/types";

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const categories = ["All", "Saree", "Suit", "Sleaper", "T-Shirts"];

    useEffect(() => {
        const fetchRealProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts();
                setProducts(data.length > 0 ? data : mockProducts);
            } catch (error) { setProducts(mockProducts); } finally { setLoading(false); }
        };
        fetchRealProducts();
    }, []);

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <main className="listing-page">
            <Navbar />

            <header className="listing-header">
                <div className="header-overlay" />
                <div className="container header-content">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="pre-heading">Masterpieces of Handloom</span>
                        <h1 className="header-title">Heritage <br /><span className="italic gold-text">Collection</span></h1>
                    </motion.div>
                </div>
            </header>

            <div className="container main-content">
                {/* Advanced Toolbar */}
                <div className="collection-toolbar">
                    <div className="cat-filter">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="search-group">
                        <Search size={18} className="search-icon" />
                        <input type="text" placeholder="Search the archives..." className="search-input" />
                        <button className="adv-filter"><Filter size={18} /> Filters</button>
                    </div>
                </div>

                {loading ? (
                    <div className="discovery-loader">
                        <Loader2 className="animate-spin" size={60} strokeWidth={1} />
                        <h2 className="serif-text mt-8 text-2xl">Unveiling our treasures...</h2>
                    </div>
                ) : (
                    <div className="product-display-grid">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product, i) => (
                                <motion.div
                                    layout
                                    key={product.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="p-card"
                                >
                                    <Link href={`/products/${product.id}`} className="p-link">
                                        <div className="p-media">
                                            <img src={product.images[0]} alt={product.name} />
                                            <div className="p-overlay">
                                                <span className="p-action">View Artifact</span>
                                            </div>
                                            {product.is_exclusive && <div className="p-excl">Exclusive</div>}
                                        </div>
                                        <div className="p-details">
                                            <span className="p-label">{product.category}</span>
                                            <h3 className="p-title">{product.name}</h3>
                                            <div className="p-meta">
                                                <span className="p-price">₹ {product.price.toLocaleString('en-IN')}</span>
                                                <ChevronRight className="p-arrow" size={16} />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            <Footer />

            <style jsx>{`
        .listing-page { background: var(--ivory); min-height: 100vh; }
        
        /* Header */
        .listing-header { position: relative; height: 60vh; background-image: url('https://images.unsplash.com/photo-1610030469915-9a08ec996a9a?auto=format&fit=crop&q=80&w=2000'); background-size: cover; background-position: center; display: flex; align-items: center; text-align: center; }
        .header-overlay { position: absolute; inset: 0; background: linear-gradient(rgba(114, 24, 24, 0.9), rgba(114, 24, 24, 0.4)); }
        .header-content { position: relative; z-index: 10; width: 100%; color: white; display: flex; flex-direction: column; align-items: center; }
        .pre-heading { font-weight: 800; text-transform: uppercase; letter-spacing: 0.4em; font-size: 0.7rem; color: var(--royal-gold); margin-bottom: 2rem; display: block; }
        .header-title { font-size: 5rem; line-height: 1.1; font-family: var(--font-royal); }
        .italic { font-family: var(--font-serif); font-style: italic; text-transform: none; letter-spacing: 0; }

        /* Toolbar */
        .main-content { padding-bottom: 10rem; }
        .collection-toolbar { 
          background: white; 
          margin-top: -3.5rem; 
          position: relative; 
          z-index: 20; 
          padding: 2.5rem; 
          border-radius: 4px; 
          box-shadow: var(--shadow-premium); 
          display: flex; 
          justify-content: space-between; 
          align-items: center;
          border-top: 4px solid var(--royal-gold);
        }

        .cat-filter { display: flex; gap: 1rem; }
        .cat-btn { padding: 0.75rem 2rem; background: transparent; border: 1px solid rgba(197, 160, 89, 0.2); font-family: var(--font-royal); font-size: 0.7rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: var(--transition); color: var(--text-main); opacity: 0.7; }
        .cat-btn.active { background: var(--royal-burgundy); color: white; border-color: var(--royal-burgundy); opacity: 1; }
        .cat-btn:hover:not(.active) { border-color: var(--royal-gold); color: var(--royal-gold); opacity: 1; }

        .search-group { display: flex; align-items: center; gap: 1rem; }
        .search-input { width: 300px; padding: 0.75rem 1rem 0.75rem 3rem; background: var(--cream); border: 1px solid transparent; font-size: 0.85rem; color: var(--text-main); }
        .search-input:focus { border-color: var(--royal-gold); outline: none; }
        .search-icon { position: absolute; left: 1.25rem; color: var(--text-main); opacity: 0.5; }
        .adv-filter { display: flex; align-items: center; gap: 0.5rem; background: transparent; border: 1px solid var(--royal-gold); color: var(--royal-gold); padding: 0.75rem 1.5rem; font-family: var(--font-royal); font-size: 0.7rem; font-weight: 800; cursor: pointer; transition: 0.3s; }
        .adv-filter:hover { background: var(--royal-gold); color: white; }

        /* Grid */
        .discovery-loader { padding: 15rem 0; text-align: center; color: var(--royal-burgundy); display: flex; flex-direction: column; align-items: center; }
        .product-display-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3rem; margin-top: 6rem; }

        .p-card { background: white; transition: var(--transition); border-bottom: 2px solid transparent; }
        .p-card:hover { transform: translateY(-10px); border-color: var(--royal-gold); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        
        .p-media { position: relative; aspect-ratio: 3/4; overflow: hidden; background: var(--cream); }
        .p-media img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1); }
        .p-card:hover .p-media img { transform: scale(1.1); }
        
        .p-overlay { position: absolute; inset: 0; background: rgba(114, 24, 24, 0.2); opacity: 0; transition: var(--transition); display: flex; align-items: center; justify-content: center; }
        .p-card:hover .p-overlay { opacity: 1; }
        .p-action { background: white; color: var(--royal-burgundy); padding: 1rem 2rem; font-family: var(--font-royal); font-size: 0.7rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; transform: translateY(20px); transition: var(--transition); }
        .p-card:hover .p-action { transform: translateY(0); }
        .p-action:hover { background: var(--royal-burgundy); color: white; border: 1px solid var(--royal-gold); }

        .p-excl { position: absolute; top: 1.5rem; left: 1.5rem; background: var(--royal-burgundy); color: white; padding: 0.5rem 1rem; font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; }

        .p-details { padding: 2.5rem 1.5rem; text-align: center; }
        .p-label { font-size: 10px; text-transform: uppercase; color: var(--royal-gold); font-weight: 800; letter-spacing: 0.3em; display: block; margin-bottom: 0.5rem; }
        .p-title { font-family: var(--font-royal); font-size: 1.15rem; color: var(--royal-burgundy); margin-bottom: 1.5rem; min-height: 2.5rem; display: flex; align-items: center; justify-content: center; }
        .p-meta { display: flex; justify-content: center; align-items: center; gap: 1rem; }
        .p-price { font-family: var(--font-serif); font-size: 1.25rem; font-weight: 600; color: var(--text-main); }
        .p-arrow { color: var(--royal-gold); transform: translateX(-5px); opacity: 0; transition: var(--transition); }
        .p-card:hover .p-arrow { transform: translateX(0); opacity: 1; }
        .p-link { text-decoration: none; color: inherit; }

        @media (max-width: 1200px) { .product-display-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .collection-toolbar { flex-direction: column; gap: 2rem; } .header-title { font-size: 3rem; } .product-display-grid { grid-template-columns: 1fr; } }
      `}</style>
        </main>
    );
}
