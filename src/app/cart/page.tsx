"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { mockProducts } from "@/lib/supabase";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const router = useRouter();
    const [items, setItems] = useState([
        { ...mockProducts[0], quantity: 1 },
        { ...mockProducts[1], quantity: 2 },
    ]);

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 10000 ? 0 : 500;
    const tax = subtotal * 0.12;
    const total = subtotal + shipping + tax;

    const updateQuantity = (id: string, delta: number) => {
        setItems(items.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
    };

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <main className="cart-page">
            <Navbar />

            <div className="container content-wrapper">
                <h1 className="page-title serif-text">My Collection</h1>

                {items.length > 0 ? (
                    <div className="cart-grid">
                        <div className="items-column">
                            <AnimatePresence>
                                {items.map((item) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        key={item.id}
                                        className="cart-item"
                                    >
                                        <div className="item-media">
                                            <img src={item.images[0]} alt={item.name} />
                                        </div>
                                        <div className="item-details">
                                            <div className="details-left">
                                                <div>
                                                    <span className="item-cat">{item.category}</span>
                                                    <h3 className="item-name">{item.name}</h3>
                                                </div>
                                                <div className="qty-control">
                                                    <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                                                </div>
                                            </div>
                                            <div className="details-right">
                                                <p className="item-total">₹ {(item.price * item.quantity).toLocaleString()}</p>
                                                <button onClick={() => removeItem(item.id)} className="remove-btn"><Trash2 size={18} /></button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <aside className="summary-column">
                            <div className="summary-card">
                                <h2 className="summary-title serif-text">Order Review</h2>
                                <div className="summary-rows">
                                    <div className="row"><span>Heritage Value</span><span>₹ {subtotal.toLocaleString()}</span></div>
                                    <div className="row"><span>Handling & Secure Ship</span><span>{shipping === 0 ? "Complimentary" : `₹ ${shipping}`}</span></div>
                                    <div className="row"><span>Tax (GST 12%)</span><span>₹ {tax.toLocaleString()}</span></div>
                                    <div className="total-row"><span>Final Value</span><span>₹ {total.toLocaleString()}</span></div>
                                </div>

                                <button onClick={() => router.push('/checkout')} className="btn-royal checkout-btn">
                                    Curate My Order <ArrowRight size={18} />
                                </button>

                                <div className="heritage-note">
                                    <p className="note-label">Legacy Guarantee</p>
                                    <p className="note-text">Each piece in your collection is hand-verified for authenticity before shipment.</p>
                                </div>
                            </div>
                        </aside>
                    </div>
                ) : (
                    <div className="empty-cart">
                        <ShoppingBag size={80} strokeWidth={1} style={{ opacity: 0.2, color: 'var(--royal-burgundy)' }} />
                        <h2 className="serif-text">Your collection is empty.</h2>
                        <p>Start your heritage journey today.</p>
                        <button onClick={() => router.push('/products')} className="btn-royal">Browse Collection</button>
                    </div>
                )}
            </div>

            <Footer />

            <style jsx>{`
        .cart-page { background: var(--ivory); min-height: 100vh; }
        .content-wrapper { padding-top: 10rem; padding-bottom: 5rem; }
        .page-title { font-size: 3rem; color: var(--royal-burgundy); margin-bottom: 3rem; border-bottom: 1px solid rgba(114, 24, 24, 0.1); padding-bottom: 2rem; }

        .cart-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 4rem; align-items: flex-start; }
        
        .items-column { display: flex; flex-direction: column; gap: 1.5rem; }
        .cart-item { background: white; padding: 1.5rem; border-radius: 4px; display: flex; gap: 2rem; border: 1px solid rgba(197, 160, 89, 0.2); box-shadow: 0 5px 15px rgba(0,0,0,0.02); }
        
        .item-media { width: 120px; aspect-ratio: 1; border-radius: 2px; overflow: hidden; background: var(--cream); }
        .item-media img { width: 100%; height: 100%; object-fit: cover; }
        
        .item-details { flex: 1; display: flex; justify-content: space-between; }
        .details-left { display: flex; flex-direction: column; justify-content: space-between; }
        .item-cat { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--royal-gold); font-weight: 800; font-family: var(--font-sans); }
        .item-name { font-family: var(--font-royal); font-size: 1.25rem; color: var(--text-main); margin-top: 0.25rem; }
        
        .qty-control { display: flex; align-items: center; gap: 1.5rem; background: var(--cream); padding: 0.5rem 1rem; border-radius: 4px; width: fit-content; margin-top: 1rem; border: 1px solid rgba(197, 160, 89, 0.2); }
        .qty-control button { background: none; border: none; cursor: pointer; color: var(--text-main); transition: color 0.2s; display: flex; align-items: center; }
        .qty-control button:hover { color: var(--royal-burgundy); }
        .qty-control span { font-weight: bold; width: 20px; text-align: center; font-size: 0.9rem; color: var(--text-main); }

        .details-right { display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end; }
        .item-total { font-size: 1.25rem; font-weight: 700; color: var(--royal-burgundy); font-family: var(--font-serif); }
        .remove-btn { background: none; border: none; cursor: pointer; color: #9ca3af; transition: color 0.2s; }
        .remove-btn:hover { color: #b91c1c; }

        .summary-column { position: sticky; top: 10rem; z-index: 10; }
        .summary-card { background: white; padding: 2.5rem; border-radius: 4px; box-shadow: var(--shadow-premium); border: 1px solid var(--royal-gold); }
        .summary-title { font-size: 1.75rem; color: var(--royal-burgundy); margin-bottom: 2rem; font-family: var(--font-royal); }
        
        .summary-rows { display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2.5rem; }
        .row { display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--text-main); opacity: 0.8; }
        .total-row { display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; color: var(--royal-burgundy); border-top: 1px solid var(--cream); padding-top: 1.5rem; margin-top: 0.5rem; font-family: var(--font-serif); }
        
        .checkout-btn { width: 100%; border-radius: 2px; display: flex; align-items: center; justify-content: center; gap: 1rem; text-decoration: none; padding: 1rem 2rem; border: none; font-size: 0.9rem; }
        
        .heritage-note { margin-top: 2rem; padding: 1.5rem; background: var(--cream); border: 1px solid rgba(197, 160, 89, 0.3); text-align: center; border-radius: 2px; }
        .note-label { font-size: 0.65rem; text-transform: uppercase; font-weight: 800; color: var(--royal-burgundy); letter-spacing: 0.1em; margin-bottom: 0.5rem; }
        .note-text { font-size: 0.75rem; color: var(--text-main); line-height: 1.5; opacity: 0.8; }

        .empty-cart { padding: 8rem 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; background: white; border-radius: 4px; border: 1px dashed var(--royal-gold); }
        .empty-cart h2 { color: var(--royal-burgundy); font-size: 2rem; }
        .empty-cart p { color: var(--text-main); margin-bottom: 1rem; }

        @media (max-width: 1024px) {
            .cart-grid { grid-template-columns: 1fr; }
            .summary-column { position: relative; top: 0; }
        }
      `}</style>
        </main>
    );
}
