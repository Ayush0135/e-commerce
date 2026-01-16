"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
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
            <main className="success-page">
                <div className="container success-container">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="success-icon">
                        <CheckCircle2 size={48} />
                    </motion.div>
                    <h1 className="serif-text">Legacy Confirmed</h1>
                    <p>Thank you for choosing Virasat. Your heritage piece is being carefully prepared by our artisans.</p>
                    <div className="order-summary-box">
                        <div className="box-row"><span>Order ID</span><span className="bold">#VR-82910</span></div>
                        <div className="box-row"><span>Estimated Dispatch</span><span className="bold">48 Hours</span></div>
                        <div className="box-row"><span>Payment Status</span><span className="bold">{paymentMethod === 'card' ? 'Verified' : 'Pending (COD)'}</span></div>
                    </div>
                    <div className="success-actions">
                        <Link href="/tracking" className="btn-royal text-center no-underline block py-3">Track My Legacy</Link>
                        <Link href="/" className="back-link">Return to Home</Link>
                    </div>
                </div>
                <style jsx>{`
          .success-page { min-height: 100vh; background: var(--ivory); display: flex; align-items: center; justify-content: center; }
          .success-container { max-width: 500px; text-align: center; background: white; padding: 4rem; border-radius: 4px; box-shadow: var(--shadow-premium); border-top: 4px solid var(--royal-gold); }
          .success-icon { width: 96px; height: 96px; border-radius: 50%; background: var(--cream); color: var(--royal-burgundy); display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; border: 1px solid var(--royal-gold); }
          .success-container h1 { font-size: 2.5rem; color: var(--royal-burgundy); margin-bottom: 1rem; font-family: var(--font-royal); }
          .success-container p { color: var(--text-main); font-weight: 300; line-height: 1.6; margin-bottom: 2rem; opacity: 0.8; }
          .order-summary-box { background: var(--cream); padding: 1.5rem; border-radius: 4px; text-align: left; margin-bottom: 2.5rem; border: 1px solid rgba(197, 160, 89, 0.2); }
          .box-row { display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.5rem; }
          .bold { font-weight: 700; color: var(--royal-burgundy); font-family: var(--font-royal); }
          .success-actions { display: flex; flex-direction: column; gap: 1rem; }
          .back-link { font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: var(--text-muted); letter-spacing: 0.1em; transition: color 0.2s; text-decoration: none; }
          .back-link:hover { color: var(--royal-burgundy); }
        `}</style>
            </main>
        );
    }

    return (
        <main className="checkout-page">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <Navbar />

            <div className="container content-wrapper">
                <div className="checkout-layout">
                    {/* Main Content */}
                    <div className="form-column">
                        <header className="checkout-header">
                            <h1 className="serif-text">Acquisition</h1>
                            <div className="stepper">
                                {[1, 2, 3].map(s => (
                                    <div key={s} className={`step-item ${step >= s ? 'active' : ''}`}>
                                        <div className="step-circle">{s}</div>
                                        <span className="step-label">{s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}</span>
                                        {s < 3 && <div className="step-line" />}
                                    </div>
                                ))}
                            </div>
                        </header>

                        <div className="card-container">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.form key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={nextStep}>
                                        <div className="section-title"><MapPin size={20} /> <h2>Shipping Destination</h2></div>
                                        <div className="input-grid">
                                            <div className="full"><label>Full Name</label><input required type="text" placeholder="Majestic Name" /></div>
                                            <div><label>Email Address</label><input required type="email" placeholder="example@heritage.com" /></div>
                                            <div><label>Contact Number</label><input required type="tel" placeholder="+91 XXXX XXXX" /></div>
                                            <div className="full"><label>Palatial Address / Street</label><input required type="text" placeholder="Lane No. 12, Civil Town" /></div>
                                            <div><label>City</label><input required type="text" placeholder="Varanasi" /></div>
                                            <div><label>Postal Code</label><input required type="text" placeholder="221001" /></div>
                                        </div>
                                        <button type="submit" className="btn-royal next-btn">Proceed to Payment <ChevronRight size={18} /></button>
                                    </motion.form>
                                )}

                                {step === 2 && (
                                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <div className="section-title"><CreditCard size={20} /> <h2>Select Payment Method</h2></div>
                                        <div className="payment-options-col">
                                            <button
                                                className={`pay-opt ${paymentMethod === 'card' ? 'active' : ''}`}
                                                onClick={() => setPaymentMethod('card')}
                                            >
                                                <div className="opt-left">
                                                    <div className="radio-circle" />
                                                    <span className="opt-title">Secure Online Payment</span>
                                                </div>
                                                <div className="opt-icons">
                                                    <span className="text-xs text-muted">Razorpay Secured</span>
                                                    <Lock size={14} />
                                                </div>
                                            </button>

                                            <button
                                                className={`pay-opt ${paymentMethod === 'cod' ? 'active' : ''}`}
                                                onClick={() => setPaymentMethod('cod')}
                                            >
                                                <div className="opt-left">
                                                    <div className="radio-circle" />
                                                    <span className="opt-title">Cash on Delivery</span>
                                                </div>
                                                <span className="text-xs text-muted">Pay at doorstep</span>
                                            </button>
                                        </div>

                                        <div className="actions flex gap-4 mt-10">
                                            <button onClick={() => setStep(1)} className="back-btn-ui"><ChevronLeft size={18} /> Back</button>
                                            <button onClick={() => setStep(3)} className="btn-royal flex-1">Review Order</button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                        <div className="section-title"><ShieldCheck size={20} /> <h2>Final Verification</h2></div>
                                        <div className="verification-box">
                                            <div className="v-row"><span>Delivery to</span><span>Civil Lines, UP, India</span></div>
                                            <div className="v-row"><span>Payment method</span><span>{paymentMethod === 'card' ? 'Secure Online Payment' : 'Cash on Delivery'}</span></div>
                                            <div className="v-row total"><span>Total Amount</span><span>₹ 45,500</span></div>
                                        </div>

                                        <div className="terms-text">
                                            By proceeding, you agree to our curation terms and artisan protection policy.
                                        </div>

                                        <button disabled={isProcessing} onClick={handlePayment} className="btn-royal next-btn">
                                            {isProcessing ? <Loader2 className="animate-spin" size={20} /> : "Finalize Acquisition"}
                                        </button>
                                        <button onClick={() => setStep(2)} className="text-link mt-4 text-center block w-full">Edit Details</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="summary-column">
                        <div className="order-card">
                            <h3 className="serif-text">Bag Details</h3>
                            <div className="products-mini">
                                <div className="mini-item">
                                    <img src="https://images.unsplash.com/photo-1610030469915-9a08ec996a9a?auto=format&fit=crop&q=80&w=200" alt="" />
                                    <div className="mini-info">
                                        <p className="mini-name">Royal Banarasi Silk Saree</p>
                                        <p className="mini-price">₹ 45,000</p>
                                    </div>
                                </div>
                            </div>
                            <div className="total-lines">
                                <div className="line"><span>Subtotal</span><span>₹ 45,000</span></div>
                                <div className="line"><span>Shipping</span><span>₹ 500</span></div>
                                <div className="line total"><span>Total to Pay</span><span>₹ 45,500</span></div>
                            </div>
                            <div className="secure-badge">
                                <Lock size={12} /> SSL Encrypted Checkout
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <Footer />

            <style jsx>{`
        .checkout-page { background: var(--ivory); min-height: 100vh; }
        .content-wrapper { padding-top: 10rem; padding-bottom: 5rem; }

        .checkout-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 4rem; align-items: start; }
        
        .checkout-header { margin-bottom: 3rem; }
        .checkout-header h1 { font-size: 3rem; color: var(--royal-burgundy); margin-bottom: 2rem; }

        .stepper { display: flex; align-items: center; gap: 1rem; }
        .step-item { display: flex; align-items: center; gap: 0.5rem; opacity: 0.5; transition: 0.3s; }
        .step-item.active { opacity: 1; }
        .step-circle { width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--royal-burgundy); display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--royal-burgundy); }
        .step-item.active .step-circle { background: var(--royal-burgundy); color: white; }
        .step-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; color: var(--royal-burgundy); }
        .step-line { width: 40px; height: 1px; background: var(--royal-burgundy); margin-left: 0.5rem; }

        .card-container { background: white; padding: 3rem; border-radius: 4px; border: 1px solid rgba(197, 160, 89, 0.2); box-shadow: var(--shadow-premium); }
        .section-title { display: flex; align-items: center; gap: 1rem; color: var(--royal-gold); margin-bottom: 2.5rem; border-bottom: 1px solid var(--cream); padding-bottom: 1rem; }
        .section-title h2 { font-family: var(--font-royal); font-size: 1.25rem; color: var(--royal-burgundy); }

        .input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .full { grid-column: span 2; }
        label { display: block; font-size: 0.65rem; text-transform: uppercase; font-weight: 800; letter-spacing: 0.1em; color: var(--royal-gold); margin-bottom: 0.5rem; }
        input { width: 100%; padding: 1rem; border: 1px solid var(--cream); background: #fdfdfd; font-family: var(--font-sans); color: var(--text-main); transition: 0.3s; border-radius: 2px; }
        input:focus { outline: none; border-color: var(--royal-gold); background: white; }

        .next-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 1rem; margin-top: 2rem; padding: 1.25rem; border: none; font-size: 0.9rem; }
        .back-btn-ui { display: flex; align-items: center; gap: 0.5rem; background: none; border: none; color: var(--text-muted); cursor: pointer; text-transform: uppercase; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.1em; }
        .back-btn-ui:hover { color: var(--royal-burgundy); }

        .payment-options-col { display: flex; flex-direction: column; gap: 1rem; }
        .pay-opt { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border: 1px solid var(--cream); background: var(--ivory); cursor: pointer; border-radius: 2px; transition: all 0.2s; }
        .pay-opt.active { border-color: var(--royal-gold); background: white; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
        .opt-left { display: flex; align-items: center; gap: 1rem; }
        .radio-circle { width: 16px; height: 16px; border: 1px solid var(--royal-gold); border-radius: 50%; position: relative; }
        .pay-opt.active .radio-circle::after { content: ''; position: absolute; inset: 3px; background: var(--royal-burgundy); border-radius: 50%; }
        .opt-title { font-family: var(--font-royal); font-weight: 700; color: var(--text-main); }
        .opt-icons { display: flex; align-items: center; gap: 0.5rem; color: var(--royal-burgundy); }

        .verification-box { background: var(--cream); padding: 1.5rem; border: 1px solid rgba(197, 160, 89, 0.2); margin-bottom: 2rem; }
        .v-row { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px dashed rgba(0,0,0,0.05); font-size: 0.9rem; color: var(--text-main); }
        .v-row.total { font-weight: 700; color: var(--royal-burgundy); border-bottom: none; font-size: 1.1rem; border-top: 1px solid rgba(0,0,0,0.05); margin-top: 0.5rem; padding-top: 1rem; }
        .text-link { background: none; border: none; text-decoration: underline; color: var(--text-muted); cursor: pointer; font-size: 0.75rem; }
        .terms-text { font-size: 0.7rem; color: var(--text-muted); text-align: center; margin-bottom: 1rem; }

        .order-card { background: white; padding: 2rem; border-radius: 4px; border: 1px solid var(--cream); position: sticky; top: 10rem; }
        .order-card h3 { font-size: 1.25rem; color: var(--royal-burgundy); margin-bottom: 1.5rem; }
        .mini-item { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
        .mini-item img { width: 60px; height: 60px; object-fit: cover; border-radius: 2px; }
        .mini-info p { font-size: 0.85rem; }
        .mini-price { font-weight: 600; color: var(--text-main); }

        .total-lines { border-top: 1px solid var(--cream); padding-top: 1rem; }
        .line { display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--text-muted); }
        .line.total { font-size: 1.1rem; font-weight: 700; color: var(--royal-burgundy); margin-top: 1rem; font-family: var(--font-serif); }
        
        .secure-badge { margin-top: 2rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.65rem; color: var(--royal-gold); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; }

        .mt-6 { margin-top: 1.5rem; }
        .mt-10 { margin-top: 2.5rem; }
        .gap-4 { gap: 1rem; }
        .flex { display: flex; }
        .flex-1 { flex: 1; }

        @media (max-width: 1024px) {
          .checkout-layout { grid-template-columns: 1fr; }
          .order-card { position: relative; top: 0; }
        }
      `}</style>
        </main>
    );
}
