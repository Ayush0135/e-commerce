"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { supabase, mockProducts } from "@/lib/supabase";
import { ShoppingBag, ChevronRight, Star, ShieldCheck, Truck, RotateCcw, Loader2, Heart, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/types";
import Link from "next/link";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImg, setActiveImg] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
                if (error || !data) {
                    const found = mockProducts.find(p => p.id === id);
                    setProduct(found || mockProducts[0]);
                } else {
                    setProduct(data as Product);
                }
            } catch (error) { setProduct(mockProducts[0]); } finally { setLoading(false); }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="royal-loader-page"><Loader2 className="animate-spin" size={60} strokeWidth={1} /><h2 className="serif-text mt-8">Unveiling the Masterpiece</h2><style jsx>{`.royal-loader-page { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--ivory); color: var(--royal-burgundy); }`}</style></div>;
    if (!product) return null;

    return (
        <main className="detail-wrapper">
            <Navbar />

            <div className="container main-detail-container">
                {/* Navigation / Breadcrumb */}
                <nav className="royal-breadcrumb">
                    <Link href="/">Home</Link> <ChevronRight size={12} strokeWidth={3} />
                    <Link href="/products">Archives</Link> <ChevronRight size={12} strokeWidth={3} />
                    <span className="current">{product.name}</span>
                </nav>

                <div className="detail-layout">
                    {/* Left: Media Showcase */}
                    <section className="media-showcase">
                        <div className="main-stage">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImg}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.8 }}
                                    src={product.images[activeImg]}
                                    alt={product.name}
                                    className="stage-img"
                                />
                            </AnimatePresence>
                            <div className="stage-actions">
                                <button className="action-circle"><Heart size={20} /></button>
                                <button className="action-circle"><Share2 size={20} /></button>
                            </div>
                            {product.is_exclusive && <div className="exclusive-ribbon">Masterpiece Exclusive</div>}
                        </div>

                        <div className="thumb-gallery">
                            {product.images.map((img, i) => (
                                <button key={i} onClick={() => setActiveImg(i)} className={`thumb-node ${activeImg === i ? "active" : ""}`}>
                                    <img src={img} alt="" />
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Right: Info Cluster */}
                    <section className="info-cluster">
                        <header className="info-header">
                            <div className="info-pre">
                                <span className="cat-pill">{product.category}</span>
                                <div className="rating-pill">
                                    <Star size={12} fill="var(--royal-gold)" color="var(--royal-gold)" />
                                    <span>4.9 / 5.0 (28 Artifacts Sold)</span>
                                </div>
                            </div>
                            <h1 className="artifact-title serif-text">{product.name}</h1>
                            <div className="artifact-valuation">
                                <p className="price">₹ {product.price.toLocaleString()}</p>
                                <span className="tax-label">inclusive of all royal taxes</span>
                            </div>
                        </header>

                        <div className="artifact-narrative">
                            <h4 className="royal-text text-sm mb-4">The Narrative</h4>
                            <p className="narrative-text">{product.description}</p>
                        </div>

                        <div className="acquisition-area">
                            <button className="btn-royal acquisition-btn">
                                <ShoppingBag size={20} /> Collect Artifact
                            </button>

                            <div className="assurance-grid">
                                <div className="assure-item">
                                    <ShieldCheck className="assure-icon" />
                                    <div>
                                        <h5>Artisan Verified</h5>
                                        <p>Certified by weavers' guild</p>
                                    </div>
                                </div>
                                <div className="assure-item">
                                    <Truck className="assure-icon" />
                                    <div>
                                        <h5>Secure Transit</h5>
                                        <p>Signature delivery-only</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="curation-details">
                            <div className="detail-card">
                                <h4 className="royal-text text-xs mb-2">Heritage Specs</h4>
                                <ul className="spec-list">
                                    <li><span>Origin</span> <span>Varanasi, India</span></li>
                                    <li><span>Technique</span> <span>Double Border Jamdani</span></li>
                                    <li><span>Material</span> <span>Pure Mulberry Silk & 24K Gold Zari</span></li>
                                </ul>
                            </div>
                            <div className="detail-card">
                                <h4 className="royal-text text-xs mb-2">Artisan Guarantee</h4>
                                <p className="text-xs color-text-main leading-relaxed" style={{ opacity: 0.7 }}>This artifact is a single-production piece. Replicas are not permitted under the Virasat Artisan Protection Charter.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />

            <style jsx>{`
        .detail-wrapper { background: var(--ivory); min-height: 100vh; }
        .main-detail-container { padding-top: 12rem; padding-bottom: 10rem; }
        
        .royal-breadcrumb { display: flex; align-items: center; gap: 1rem; font-family: var(--font-royal); font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 4rem; color: var(--text-main); opacity: 0.6; }
        .royal-breadcrumb a { text-decoration: none; color: inherit; transition: var(--transition); }
        .royal-breadcrumb a:hover { color: var(--royal-gold); opacity: 1; }
        .royal-breadcrumb .current { color: var(--royal-burgundy); font-weight: 800; opacity: 1; }

        .detail-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 8rem; align-items: start; }

        /* Media */
        .main-stage { position: relative; aspect-ratio: 4/5; background: white; border-radius: 4px; overflow: hidden; box-shadow: var(--shadow-premium); border: 1px solid var(--cream); }
        .stage-img { width: 100%; height: 100%; object-fit: cover; }
        .stage-actions { position: absolute; bottom: 2rem; right: 2rem; display: flex; gap: 1rem; z-index: 10; }
        .action-circle { width: 50px; height: 50px; background: white; border: none; border-radius: 50%; color: var(--royal-burgundy); display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(0,0,0,0.1); cursor: pointer; transition: var(--transition); }
        .action-circle:hover { background: var(--royal-burgundy); color: white; transform: scale(1.1); }
        .exclusive-ribbon { position: absolute; top: 0; left: 0; background: var(--royal-gold); color: white; padding: 0.75rem 2rem; font-family: var(--font-royal); font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em; }

        .thumb-gallery { display: flex; gap: 1.5rem; margin-top: 2rem; }
        .thumb-node { width: 100px; aspect-ratio: 1; border: 1.5px solid transparent; background: white; cursor: pointer; transition: var(--transition); overflow: hidden; }
        .thumb-node.active { border-color: var(--royal-gold); box-shadow: 0 0 0 2px rgba(197, 160, 89, 0.2); }
        .thumb-node img { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; transition: var(--transition); }
        .thumb-node.active img { opacity: 1; }

        /* Info */
        .info-header { border-bottom: 1px solid rgba(114, 24, 24, 0.1); padding-bottom: 3rem; margin-bottom: 3.5rem; }
        .info-pre { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .cat-pill { padding: 0.5rem 1.5rem; background: var(--royal-burgundy); color: white; font-family: var(--font-royal); font-size: 0.6rem; font-weight: 800; letter-spacing: 0.3em; }
        .rating-pill { display: flex; align-items: center; gap: 0.5rem; font-size: 0.7rem; color: var(--text-main); opacity: 0.6; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; }
        
        .artifact-title { font-size: 4rem; color: var(--royal-burgundy); line-height: 1.1; margin-bottom: 2rem; }
        .artifact-valuation { display: flex; align-items: baseline; gap: 1.5rem; }
        .price { font-family: var(--font-serif); font-size: 2.5rem; color: var(--text-main); font-weight: 700; }
        .tax-label { font-size: 0.7rem; text-transform: uppercase; color: var(--text-main); opacity: 0.5; letter-spacing: 0.1em; font-weight: 600; }

        .artifact-narrative { margin-bottom: 4rem; }
        .royal-text { color: var(--royal-burgundy); font-family: var(--font-royal); letter-spacing: 0.1em; font-weight: 700; text-transform: uppercase; }
        .narrative-text { font-size: 1.15rem; line-height: 2; color: var(--text-main); opacity: 0.8; font-family: var(--font-serif); font-weight: 300; }

        .acquisition-area { background: var(--cream); padding: 4rem; margin-bottom: 4rem; border-radius: 4px; border: 1px solid rgba(197, 160, 89, 0.4); }
        .acquisition-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 1.5rem; }
        
        .assurance-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 3rem; }
        .assure-item { display: flex; gap: 1.5rem; }
        .assure-icon { color: var(--royal-gold); }
        .assure-item h5 { font-family: var(--font-royal); font-size: 0.75rem; color: var(--royal-burgundy); margin-bottom: 0.25rem; }
        .assure-item p { font-size: 0.7rem; color: var(--text-main); opacity: 0.6; text-transform: uppercase; letter-spacing: 0.05em; }

        .curation-details { display: grid; gap: 2rem; }
        .detail-card { background: white; padding: 2.5rem; border: 1px solid rgba(114, 24, 24, 0.05); }
        .spec-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem; }
        .spec-list li { display: flex; justify-content: space-between; font-size: 0.8rem; border-bottom: 1px solid var(--cream); padding-bottom: 0.75rem; }
        .spec-list li span:first-child { color: var(--text-main); opacity: 0.6; text-transform: uppercase; font-size: 0.65rem; font-weight: 800; letter-spacing: 0.1em; }
        .spec-list li span:last-child { color: var(--royal-burgundy); font-weight: 600; }

        @media (max-width: 1200px) {
          .detail-layout { grid-template-columns: 1fr; gap: 6rem; }
          .artifact-title { font-size: 3rem; }
        }
      `}</style>
        </main>
    );
}
