"use client";

import { useState, useEffect } from "react";
import { CreditCard, ShieldCheck, MapPin, ChevronRight, CheckCircle2, ChevronLeft, Loader2, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Script from "next/script";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutPage() {
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');

    const nextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 3) setStep(step + 1);
    };

    const handlePayment = async () => {
        setIsProcessing(true);

        if (paymentMethod === 'card') {
            try {
                // 1. Create Order on Server
                const response = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: 45500 }) // Total Amount
                });

                const orderData = await response.json();

                if (!response.ok) throw new Error("Order creation failed");

                // 2. Initialize Razorpay
                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                    amount: orderData.amount,
                    currency: orderData.currency,
                    name: "VIRASAT HERITAGE",
                    description: "Acquisition of Royal Heritage",
                    order_id: orderData.id,
                    handler: function (response: any) {
                        // Payment Success
                        setIsProcessing(false);
                        setIsCompleted(true);
                    },
                    prefill: {
                        name: "Royal Patron",
                        email: "patron@virasat.com",
                        contact: "9999999999"
                    },
                    theme: {
                        color: "#721818"
                    }
                };

                const rzp1 = new window.Razorpay(options);
                rzp1.on('payment.failed', function (response: any) {
                    alert(`Payment Failed: ${response.error.description}`);
                    setIsProcessing(false);
                });

                rzp1.open();
            } catch (error) {
                console.error("Payment Error:", error);
                alert("Could not initiate payment. Please check your connection or try again.");
                setIsProcessing(false);
            }
        } else {
            // COD Logic
            setTimeout(() => {
                setIsProcessing(false);
                setIsCompleted(true);
            }, 2000);
        }
    };

    if (isCompleted) {
        return (
            <main className="min-h-screen bg-[#fafaf9] flex items-center justify-center">
                <div className="max-w-[500px] w-full text-center bg-white p-16 rounded shadow-lg border-t-4 border-[#C5A059]">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 rounded-full bg-[#fafaf9] text-[#721818] flex items-center justify-center mx-auto mb-8 border border-[#C5A059]">
                        <CheckCircle2 size={48} />
                    </motion.div>
                    <h1 className="text-4xl text-[#721818] mb-4 font-serif">Legacy Confirmed</h1>
                    <p className="text-gray-600 font-light leading-relaxed mb-8 opacity-80">Thank you for choosing Virasat. Your heritage piece is being carefully prepared by our artisans.</p>
                    <div className="bg-[#fafaf9] p-6 rounded text-left mb-10 border border-[#C5A059]/20">
                        <div className="flex justify-between text-sm mb-2"><span>Order ID</span><span className="font-bold text-[#721818] font-serif">#VR-82910</span></div>
                        <div className="flex justify-between text-sm mb-2"><span>Estimated Dispatch</span><span className="font-bold text-[#721818] font-serif">48 Hours</span></div>
                        <div className="flex justify-between text-sm mb-2"><span>Payment Status</span><span className="font-bold text-[#721818] font-serif">{paymentMethod === 'card' ? 'Verified' : 'Pending (COD)'}</span></div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Link href="/tracking" className="w-full py-3 bg-[#1a1a1a] text-white rounded font-semibold hover:bg-[#333] transition-colors text-center no-underline block">Track My Legacy</Link>
                        <Link href="/" className="text-xs uppercase font-extrabold text-gray-400 tracking-widest hover:text-[#721818] transition-colors">Return to Home</Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="checkout-page">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <div className="checkout-layout grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16 items-start pt-20 pb-20">
                {/* Main Content */}
                <div className="form-column">
                    <header className="checkout-header mb-12">
                        <h1 className="serif-text text-5xl text-[#721818] mb-8 font-serif">Acquisition</h1>
                        <div className="stepper flex items-center gap-4">
                            {[1, 2, 3].map(s => (
                                <div key={s} className={`step-item flex items-center gap-2 transition-opacity duration-300 ${step >= s ? 'opacity-100' : 'opacity-50'}`}>
                                    <div className={`step-circle w-8 h-8 rounded-full border border-[#721818] flex items-center justify-center font-bold ${step >= s ? 'bg-[#721818] text-white' : 'text-[#721818]'}`}>{s}</div>
                                    <span className="step-label text-xs uppercase tracking-widest font-bold text-[#721818]">{s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}</span>
                                    {s < 3 && <div className="step-line w-10 h-px bg-[#721818] ml-2" />}
                                </div>
                            ))}
                        </div>
                    </header>

                    <div className="card-container bg-white p-12 rounded border border-[#C5A059]/20 shadow-md">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.form key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={nextStep}>
                                    <div className="section-title flex items-center gap-4 text-[#C5A059] mb-10 border-b border-gray-100 pb-4">
                                        <MapPin size={20} />
                                        <h2 className="font-serif text-xl text-[#721818]">Shipping Destination</h2>
                                    </div>
                                    <div className="input-grid grid grid-cols-2 gap-6">
                                        <div className="col-span-2">
                                            <label className="block text-xs uppercase font-extrabold tracking-widest text-[#C5A059] mb-2">Full Name</label>
                                            <input required type="text" placeholder="Majestic Name" className="w-full p-4 border border-gray-200 bg-[#fdfdfd] text-gray-700 rounded-sm focus:outline-none focus:border-[#C5A059] focus:bg-white transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase font-extrabold tracking-widest text-[#C5A059] mb-2">Email Address</label>
                                            <input required type="email" placeholder="example@heritage.com" className="w-full p-4 border border-gray-200 bg-[#fdfdfd] text-gray-700 rounded-sm focus:outline-none focus:border-[#C5A059] focus:bg-white transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase font-extrabold tracking-widest text-[#C5A059] mb-2">Contact Number</label>
                                            <input required type="tel" placeholder="+91 XXXX XXXX" className="w-full p-4 border border-gray-200 bg-[#fdfdfd] text-gray-700 rounded-sm focus:outline-none focus:border-[#C5A059] focus:bg-white transition-colors" />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-xs uppercase font-extrabold tracking-widest text-[#C5A059] mb-2">Palatial Address / Street</label>
                                            <input required type="text" placeholder="Lane No. 12, Civil Town" className="w-full p-4 border border-gray-200 bg-[#fdfdfd] text-gray-700 rounded-sm focus:outline-none focus:border-[#C5A059] focus:bg-white transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase font-extrabold tracking-widest text-[#C5A059] mb-2">City</label>
                                            <input required type="text" placeholder="Varanasi" className="w-full p-4 border border-gray-200 bg-[#fdfdfd] text-gray-700 rounded-sm focus:outline-none focus:border-[#C5A059] focus:bg-white transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase font-extrabold tracking-widest text-[#C5A059] mb-2">Postal Code</label>
                                            <input required type="text" placeholder="221001" className="w-full p-4 border border-gray-200 bg-[#fdfdfd] text-gray-700 rounded-sm focus:outline-none focus:border-[#C5A059] focus:bg-white transition-colors" />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full flex items-center justify-center gap-4 mt-8 p-5 bg-[#1a1a1a] text-white rounded font-semibold hover:bg-[#333] transition-colors">Proceed to Payment <ChevronRight size={18} /></button>
                                </motion.form>
                            )}

                            {step === 2 && (
                                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <div className="section-title flex items-center gap-4 text-[#C5A059] mb-10 border-b border-gray-100 pb-4">
                                        <CreditCard size={20} />
                                        <h2 className="font-serif text-xl text-[#721818]">Select Payment Method</h2>
                                    </div>
                                    <div className="payment-options-col flex flex-col gap-4">
                                        <button
                                            className={`pay-opt flex justify-between items-center p-6 border rounded-sm transition-all ${paymentMethod === 'card' ? 'border-[#C5A059] bg-white shadow-md' : 'border-gray-200 bg-[#fafafa]'}`}
                                            onClick={() => setPaymentMethod('card')}
                                        >
                                            <div className="opt-left flex items-center gap-4">
                                                <div className={`radio-circle w-4 h-4 border border-[#C5A059] rounded-full relative ${paymentMethod === 'card' ? 'after:absolute after:inset-[3px] after:bg-[#721818] after:rounded-full' : ''}`} />
                                                <span className="opt-title font-bold text-gray-700">Secure Online Payment</span>
                                            </div>
                                            <div className="opt-icons flex items-center gap-2 text-[#721818]">
                                                <span className="text-xs text-gray-400">Razorpay Secured</span>
                                                <Lock size={14} />
                                            </div>
                                        </button>

                                        <button
                                            className={`pay-opt flex justify-between items-center p-6 border rounded-sm transition-all ${paymentMethod === 'cod' ? 'border-[#C5A059] bg-white shadow-md' : 'border-gray-200 bg-[#fafafa]'}`}
                                            onClick={() => setPaymentMethod('cod')}
                                        >
                                            <div className="opt-left flex items-center gap-4">
                                                <div className={`radio-circle w-4 h-4 border border-[#C5A059] rounded-full relative ${paymentMethod === 'cod' ? 'after:absolute after:inset-[3px] after:bg-[#721818] after:rounded-full' : ''}`} />
                                                <span className="opt-title font-bold text-gray-700">Cash on Delivery</span>
                                            </div>
                                            <span className="text-xs text-gray-400">Pay at doorstep</span>
                                        </button>
                                    </div>

                                    <div className="actions flex gap-4 mt-10">
                                        <button onClick={() => setStep(1)} className="flex items-center gap-2 bg-transparent border-none text-gray-500 cursor-pointer uppercase text-xs font-extrabold tracking-widest hover:text-[#721818]"><ChevronLeft size={18} /> Back</button>
                                        <button onClick={() => setStep(3)} className="flex-1 bg-[#1a1a1a] text-white p-5 rounded font-semibold hover:bg-[#333] transition-colors">Review Order</button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <div className="section-title flex items-center gap-4 text-[#C5A059] mb-10 border-b border-gray-100 pb-4">
                                        <ShieldCheck size={20} />
                                        <h2 className="font-serif text-xl text-[#721818]">Final Verification</h2>
                                    </div>
                                    <div className="verification-box bg-[#fafafa] p-6 border border-[#C5A059]/20 mb-8">
                                        <div className="v-row flex justify-between py-3 border-b border-dashed border-gray-200 text-sm text-gray-700"><span>Delivery to</span><span>Civil Lines, UP, India</span></div>
                                        <div className="v-row flex justify-between py-3 border-b border-dashed border-gray-200 text-sm text-gray-700"><span>Payment method</span><span>{paymentMethod === 'card' ? 'Secure Online Payment' : 'Cash on Delivery'}</span></div>
                                        <div className="v-row total flex justify-between py-3 text-lg font-bold text-[#721818] border-t border-gray-200 mt-2 pt-4"><span>Total Amount</span><span>₹ 45,500</span></div>
                                    </div>

                                    <div className="terms-text text-xs text-gray-400 text-center mb-4">
                                        By proceeding, you agree to our curation terms and artisan protection policy.
                                    </div>

                                    <button disabled={isProcessing} onClick={handlePayment} className="w-full flex items-center justify-center p-5 bg-[#1a1a1a] text-white rounded font-semibold hover:bg-[#333] transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                                        {isProcessing ? <Loader2 className="animate-spin" size={20} /> : "Finalize Acquisition"}
                                    </button>
                                    <button onClick={() => setStep(2)} className="block w-full text-center mt-4 text-xs text-gray-500 underline hover:text-gray-800">Edit Details</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="summary-column">
                    <div className="order-card bg-white p-8 rounded border border-gray-200 sticky top-40">
                        <h3 className="font-serif text-xl text-[#721818] mb-6">Bag Details</h3>
                        <div className="products-mini mb-6">
                            <div className="mini-item flex gap-4 mb-6">
                                <img src="https://images.unsplash.com/photo-1610030469915-9a08ec996a9a?auto=format&fit=crop&q=80&w=200" alt="" className="w-16 h-16 object-cover rounded-sm" />
                                <div className="mini-info">
                                    <p className="text-sm">Royal Banarasi Silk Saree</p>
                                    <p className="font-semibold text-gray-700">₹ 45,000</p>
                                </div>
                            </div>
                        </div>
                        <div className="total-lines border-t border-gray-200 pt-4">
                            <div className="flex justify-between text-sm mb-2 text-gray-500"><span>Subtotal</span><span>₹ 45,000</span></div>
                            <div className="flex justify-between text-sm mb-2 text-gray-500"><span>Shipping</span><span>₹ 500</span></div>
                            <div className="flex justify-between text-lg font-bold text-[#721818] mt-4 font-serif"><span>Total to Pay</span><span>₹ 45,500</span></div>
                        </div>
                        <div className="secure-badge mt-8 flex items-center justify-center gap-2 text-[0.65rem] text-[#C5A059] uppercase tracking-widest font-bold">
                            <Lock size={12} /> SSL Encrypted Checkout
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}
