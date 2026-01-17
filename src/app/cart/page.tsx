"use client";


import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const router = useRouter();
    const { items, updateQuantity, removeItem, total } = useCart();

    const subtotal = total;
    const shipping = subtotal > 10000 ? 0 : 500;
    const tax = subtotal * 0.12;
    const finalTotal = subtotal + shipping + tax;

    return (
        <main className="cart-page">
            <div className="container content-wrapper">
                <h1 className="page-title serif-text">Shopping Bag</h1>

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
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                        <div className="item-details">
                                            <div className="details-left">
                                                <div>
                                                    <span className="item-cat">{item.category}</span>
                                                    <h3 className="item-name">{item.name}</h3>
                                                </div>
                                                <div className="qty-control">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                                                </div>
                                            </div>
                                            <div className="details-right">
                                                <p className="item-total">₹ {(item.price * item.quantity).toLocaleString()}</p>
                                                <button onClick={() => removeItem(item.id)} className="remove-btn"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <aside className="summary-column">
                            <div className="summary-card">
                                <h2 className="summary-title serif-text">Summary</h2>
                                <div className="summary-rows">
                                    <div className="row"><span>Subtotal</span><span>₹ {subtotal.toLocaleString()}</span></div>
                                    <div className="row"><span>Shipping</span><span>{shipping === 0 ? "Free" : `₹ ${shipping}`}</span></div>
                                    <div className="row"><span>Tax</span><span>₹ {tax.toLocaleString()}</span></div>
                                    <div className="total-row"><span>Total</span><span>₹ {finalTotal.toLocaleString()}</span></div>
                                </div>

                                <button onClick={() => router.push('/checkout')} className="btn-black checkout-btn">
                                    Proceed to Checkout <ArrowRight size={16} />
                                </button>
                            </div>
                        </aside>
                    </div>
                ) : (
                    <div className="empty-cart">
                        <ShoppingBag size={60} strokeWidth={1} style={{ opacity: 0.2, color: 'black' }} />
                        <h2 className="serif-text">Your bag is empty.</h2>
                        <button onClick={() => router.push('/shop')} className="btn-black mt-6">Continue Shopping</button>
                    </div>
                )}
            </div>



            <style jsx>{`
        .cart-page { background: white; min-height: 100vh; }
        .content-wrapper { padding-top: 8rem; padding-bottom: 5rem; }
        .page-title { font-size: 3rem; color: black; margin-bottom: 3rem; font-family: var(--font-heading); }

        .cart-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 4rem; align-items: flex-start; }
        
        .items-column { display: flex; flex-direction: column; }
        .cart-item { background: white; padding: 2rem 0; border-bottom: 1px solid #f3f4f6; display: flex; gap: 2rem; }
        
        .item-media { width: 100px; aspect-ratio: 0.8; background: #f9fafb; }
        
        .item-details { flex: 1; display: flex; justify-content: space-between; }
        .details-left { display: flex; flex-direction: column; justify-content: space-between; }
        .item-cat { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 0.5rem; display: block; }
        .item-name { font-family: var(--font-heading); font-size: 1.1rem; color: black; font-weight: 500; }
        
        .qty-control { display: flex; align-items: center; gap: 1.5rem; border: 1px solid #e5e7eb; padding: 0.25rem 0.75rem; width: fit-content; margin-top: 1rem; }
        .qty-control button { background: none; border: none; cursor: pointer; color: black; display: flex; align-items: center; }
        .qty-control span { font-size: 0.9rem; color: black; }

        .details-right { display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end; }
        .item-total { font-size: 1rem; color: black; font-family: var(--font-heading); }
        .remove-btn { background: none; border: none; cursor: pointer; color: #9ca3af; transition: color 0.2s; }
        .remove-btn:hover { color: black; }

        .summary-column { position: sticky; top: 8rem; }
        .summary-card { background: #f9fafb; padding: 2rem; }
        .summary-title { font-size: 1.25rem; color: black; margin-bottom: 1.5rem; font-family: var(--font-heading); text-transform: uppercase; letter-spacing: 0.05em; }
        
        .summary-rows { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
        .row { display: flex; justify-content: space-between; font-size: 0.9rem; color: #4b5563; }
        .total-row { display: flex; justify-content: space-between; font-size: 1.1rem; color: black; border-top: 1px solid #e5e7eb; padding-top: 1rem; margin-top: 0.5rem; font-family: var(--font-heading); }
        
        .checkout-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 1rem; text-decoration: none; padding: 1rem; border: none; font-size: 0.9rem; cursor: pointer; }
        .btn-black { background: black; color: white; text-transform: uppercase; letter-spacing: 0.1em; transition: opacity 0.2s; }
        .btn-black:hover { opacity: 0.8; }

        .empty-cart { padding: 6rem 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
        .empty-cart h2 { color: black; font-size: 2rem; font-family: var(--font-heading); }

        @media (max-width: 1024px) {
            .cart-grid { grid-template-columns: 1fr; }
            .summary-column { position: relative; top: 0; }
        }
      `}</style>
        </main>
    );
}
