"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { mockProducts } from "@/lib/supabase";
import { ArrowRight, Star, Quote, Award, ShieldCheck, Heart, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="home-wrapper">
      <Navbar />

      {/* Cinematic Hero */}
      <section className="hero-section">
        <div className="hero-visual">
          <div className="overlay" />
          <div className="hero-image" />
        </div>

        <div className="container hero-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="hero-content"
          >
            <span className="hero-pretitle">The Pinnacle of Craft</span>
            <h1 className="hero-title">
              Timeless <br />
              <span className="italic-accent">Elegance</span>
            </h1>
            {/* Divider removed for cleaner look */}
            <p className="hero-description">
              Curated heritage pieces that bridge the gap between ancient Indian artistry and modern luxury living. Every thread, a legacy.
            </p>
            <div className="hero-actions">
              <Link href="/products" className="btn-royal">Explore Collection</Link>
              <Link href="/about" className="btn-outline-white">Our Heritage</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="highlight-section section-padding">
        <div className="container">
          <div className="grid-3 gap-16">
            <div className="highlight-item">
              <Award className="highlight-icon" size={32} strokeWidth={1} />
              <h3 className="highlight-title">Artisan Direct</h3>
              <p>Sourced directly from the looms of master weavers across the subcontinent.</p>
            </div>
            <div className="highlight-item">
              <ShieldCheck className="highlight-icon" size={32} strokeWidth={1} />
              <h3 className="highlight-title">Legacy Verified</h3>
              <p>Each piece is inspected for weave density, zari purity, and historical accuracy.</p>
            </div>
            <div className="highlight-item">
              <Star className="highlight-icon" size={32} strokeWidth={1} />
              <h3 className="highlight-title">Exclusive Works</h3>
              <p>Limited edition creations that will never be replicated. True collectors' items.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Grid */}
      <section className="exclusive-section section-padding bg-alt">
        <div className="container">
          <header className="section-header">
            <div className="header-left">
              <span className="section-tag">The Gold Standard</span>
              <h2 className="section-title">The Exclusive <br /> Collection</h2>
            </div>
            <Link href="/products" className="view-link">
              Browse All <ArrowRight size={18} />
            </Link>
          </header>

          <div className="exclusive-grid">
            {mockProducts.slice(0, 3).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="exclusive-card"
              >
                <Link href={`/products/${product.id}`} className="card-link">
                  <div className="media-wrapper">
                    <img src={product.images[0]} alt={product.name} className="product-img" />
                    <div className="card-overlay" />
                    {product.is_exclusive && <span className="exclusive-label">Exclusive</span>}
                  </div>
                  <div className="info-wrapper">
                    <span className="p-cat">{product.category}</span>
                    <h3 className="p-name">{product.name}</h3>
                    <div className="p-bottom">
                      <p className="p-price">₹ {product.price.toLocaleString('en-IN')}</p>
                      <span className="p-view">Discover <ChevronRight size={14} /></span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section">
        <div className="container">
          <div className="quote-box">
            <Quote className="quote-icon" size={48} />
            <h2 className="quote-text">"Indian heritage is not just in museums; it is in the thread of every saree and the shine of every artifact."</h2>
            {/* Divider removed */}
            <span className="quote-author">The Virasat Philosophy</span>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .home-wrapper { background: var(--ivory); }
        
        /* Hero Styling */
        .hero-section { height: 100vh; min-height: 700px; position: relative; display: flex; align-items: center; overflow: hidden; }
        .hero-visual { position: absolute; inset: 0; z-index: 1; }
        .hero-image { width: 100%; height: 100%; background-image: url('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=2000'); background-size: cover; background-position: center; filter: brightness(0.85); transition: transform 20s ease-out; }
        .hero-section:hover .hero-image { transform: scale(1.05); }
        
        .overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(28, 25, 23, 0.85) 0%, rgba(28, 25, 23, 0.5) 50%, rgba(0,0,0,0) 100%); z-index: 2; }
        
        .hero-container { position: relative; z-index: 10; margin-top: 5rem; }
        .hero-content { max-width: 650px; color: white; }
        
        .hero-pretitle { color: var(--royal-gold); text-transform: uppercase; letter-spacing: 0.3em; font-size: 0.75rem; font-weight: 700; display: block; margin-bottom: 1.5rem; font-family: var(--font-sans); }
        .hero-title { font-size: 5rem; line-height: 1; margin-bottom: 2rem; color: white; text-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .italic-accent { font-family: var(--font-serif); font-style: italic; color: var(--royal-gold-light); display: block; margin-top: 0.2rem; }
        
        .hero-divider { width: 60px; height: 2px; background: var(--royal-gold); margin-bottom: 2rem; }
        .hero-description { font-size: 1.15rem; line-height: 1.8; color: rgba(255,255,255,0.9); margin-bottom: 3.5rem; font-weight: 300; max-width: 500px; }
        
        .hero-actions { display: flex; gap: 1.5rem; }
        .btn-outline-white { 
          padding: 1rem 2.8rem; border: 1px solid rgba(255,255,255,0.3); color: white; 
          font-family: var(--font-royal); font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; 
          transition: var(--transition); text-decoration: none; display: inline-flex; align-items: center; justify-content: center; 
          border-radius: var(--radius-sm); font-weight: 700;
        }
        .btn-outline-white:hover { background: white; color: var(--text-main); border-color: white; }

        /* Highlights */
        .highlight-item { text-align: center; padding: 3rem 2rem; transition: var(--transition); border-radius: var(--radius-md); background: transparent; border: 1px solid transparent; }
        .highlight-item:hover { background: white; box-shadow: var(--shadow-card); border-color: rgba(0,0,0,0.03); transform: translateY(-5px); }
        
        .highlight-icon { color: var(--royal-gold); margin-bottom: 1.5rem; }
        .highlight-title { font-size: 1.25rem; margin-bottom: 1rem; color: var(--royal-burgundy); }
        .highlight-item p { font-size: 0.95rem; color: var(--text-muted); font-weight: 300; line-height: 1.6; }

        /* Exclusive Section */
        .bg-alt { background: var(--cream); }
        .section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 5rem; }
        
        .section-tag { font-family: var(--font-sans); font-weight: 700; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--royal-gold); margin-bottom: 1rem; display: block; }
        .section-title { font-size: 3.5rem; color: var(--royal-burgundy); line-height: 1.1; }
        
        .view-link { display: flex; align-items: center; gap: 0.75rem; text-decoration: none; color: var(--text-main); font-family: var(--font-royal); font-weight: 700; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; transition: color 0.3s; border-bottom: 1px solid transparent; padding-bottom: 4px; }
        .view-link:hover { color: var(--royal-burgundy); border-color: var(--royal-burgundy); }
        
        .exclusive-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
        .exclusive-card { background: white; transition: var(--transition); overflow: hidden; box-shadow: var(--shadow-subtle); border-radius: var(--radius-sm); }
        .exclusive-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-card); }
        .card-link { text-decoration: none; color: inherit; display: block; }
        
        .media-wrapper { position: relative; aspect-ratio: 4/5; overflow: hidden; }
        .product-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s ease; }
        .exclusive-card:hover .product-img { transform: scale(1.05); }
        .card-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.02); transition: 0.3s; }
        
        .exclusive-label { position: absolute; top: 1rem; left: 1rem; background: white; color: var(--royal-burgundy); padding: 0.4rem 0.8rem; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        
        .info-wrapper { padding: 2rem; border-top: 1px solid rgba(0,0,0,0.03); }
        .p-cat { font-family: var(--font-sans); font-size: 0.65rem; text-transform: uppercase; color: var(--royal-gold); font-weight: 700; letter-spacing: 0.2em; margin-bottom: 0.5rem; display: block; }
        .p-name { font-family: var(--font-royal); color: var(--text-main); font-size: 1.15rem; margin-bottom: 1.5rem; line-height: 1.3; transition: color 0.3s; }
        .exclusive-card:hover .p-name { color: var(--royal-burgundy); }
        
        .p-bottom { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 1rem; }
        .p-price { font-size: 1.1rem; font-weight: 600; color: var(--text-main); font-family: var(--font-serif); }
        .p-view { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: var(--royal-burgundy); display: flex; align-items: center; gap: 0.25rem; letter-spacing: 0.1em; opacity: 0; transform: translateX(-10px); transition: all 0.3s; }
        .exclusive-card:hover .p-view { opacity: 1; transform: translateX(0); }

        /* Quote Section */
        .quote-section { padding: 10rem 0; background: var(--royal-burgundy); color: white; text-align: center; position: relative; overflow: hidden; }
        .quote-box { max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 2.5rem; position: relative; z-index: 10; }
        .quote-icon { color: var(--royal-gold); opacity: 0.8; margin-bottom: 1rem; }
        .quote-text { font-size: 2.5rem; font-weight: 400; line-height: 1.5; font-family: var(--font-serif); font-style: italic; color: var(--ivory); }
        .quote-divider { width: 40px; height: 1px; background: var(--royal-gold); opacity: 0.5; }
        .quote-author { color: var(--royal-gold); text-transform: uppercase; letter-spacing: 0.3em; font-size: 0.75rem; font-weight: 700; }

        @media (max-width: 1024px) {
          .hero-title { font-size: 3.5rem; }
          .exclusive-grid { grid-template-columns: 1fr; }
          .grid-3 { grid-template-columns: 1fr; gap: 3rem; }
          .section-header { flex-direction: column; align-items: flex-start; gap: 2rem; }
          .hero-container { margin-top: 0; }
        }
      `}</style>
    </main>
  );
}
