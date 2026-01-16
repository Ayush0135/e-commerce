"use client";

import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Search, Package, Truck, CheckCircle2, MapPin, Clock, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TrackingPage() {
    const [trackingId, setTrackingId] = useState("");
    const [orderData, setOrderData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setOrderData({
                id: "VR-82910",
                status: "shipped",
                eta: "Oct 24, 2025",
                steps: [
                    { status: "Legacy Acquired", date: "Oct 18, 2025", completed: true, icon: <Package size={20} /> },
                    { status: "Artisan Verification", date: "Oct 19, 2025", completed: true, icon: <Clock size={20} /> },
                    { status: "In Transit", date: "Oct 20, 2025", completed: true, icon: <Truck size={20} /> },
                    { status: "Legacy Delivered", date: "Pending", completed: false, icon: <CheckCircle2 size={20} /> },
                ]
            });
            setIsLoading(false);
        }, 1500);
    };

    return (
        <main className="tracking-page">
            <Navbar />

            <div className="container content-wrapper">
                <header className="tracking-header">
                    <h1 className="serif">Track My Heritage</h1>
                    <p>Follow your piece from the artisan's hands to your doorstep.</p>
                </header>

                <section className="search-section">
                    <form onSubmit={handleTrack} className="track-form">
                        <div className="input-wrapper">
                            <Search size={24} className="icon" />
                            <input required type="text" placeholder="Legacy ID (e.g. VR-82910)" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} />
                        </div>
                        <button type="submit" disabled={isLoading} className="btn-royal">
                            {isLoading ? <Loader2 className="animate-spin" size={24} /> : "Track My Legacy"}
                        </button>
                    </form>
                </section>

                <AnimatePresence>
                    {orderData ? (
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="result-container">
                            <div className="status-hero">
                                <div className="status-left">
                                    <span className="label">Current Status</span>
                                    <h3 className="serif">In Pursuit of Excellence</h3>
                                </div>
                                <div className="status-right">
                                    <span className="label">Estimated Presentation</span>
                                    <h3 className="serif">{orderData.eta}</h3>
                                </div>
                            </div>

                            <div className="timeline">
                                <div className="timeline-line" />
                                {orderData.steps.map((step: any, i: number) => (
                                    <div key={i} className={`timeline-node ${step.completed ? 'completed' : ''}`}>
                                        <div className="node-icon">{step.icon}</div>
                                        <div className="node-info">
                                            <h4 className="node-title">{step.status}</h4>
                                            <p className="node-date">{step.date}</p>
                                        </div>
                                        {step.completed && <CheckCircle2 size={18} className="check-mark" />}
                                    </div>
                                ))}
                            </div>

                            <div className="location-box">
                                <MapPin className="pin" size={32} />
                                <div className="loc-text">
                                    <h4>Current Hub: Varanasi Heritage Center</h4>
                                    <p>Your package has passed through our final authenticity check and is now en route to your state's sorting hub.</p>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        !isLoading && (
                            <div className="placeholder">
                                <Package size={80} strokeWidth={1} style={{ color: 'var(--royal-burgundy)', opacity: 0.3 }} />
                                <p>Enter your Legacy ID above to begin the pursuit.</p>
                            </div>
                        )
                    )}
                </AnimatePresence>
            </div>

            <Footer />

            <style jsx>{`
        .tracking-page { background: var(--ivory); min-height: 100vh; }
        .content-wrapper { padding-top: 10rem; padding-bottom: 8rem; max-width: 800px; }
        
        .tracking-header { text-align: center; margin-bottom: 4rem; }
        .tracking-header h1 { font-size: 4rem; color: var(--royal-burgundy); margin-bottom: 1rem; }
        .tracking-header p { color: var(--text-main); font-size: 1.1rem; font-weight: 300; opacity: 0.8; }

        .search-section { margin-bottom: 5rem; }
        .track-form { display: flex; gap: 1rem; background: white; padding: 1.25rem; border-radius: 4px; box-shadow: var(--shadow-premium); border: 1px solid rgba(197, 160, 89, 0.2); }
        .input-wrapper { flex: 1; position: relative; display: flex; align-items: center; }
        .input-wrapper .icon { position: absolute; left: 1.25rem; color: var(--text-muted); }
        input { width: 100%; border: none; background: var(--cream); padding: 1.25rem 1.25rem 1.25rem 4rem; border-radius: 2px; font-size: 1.1rem; transition: all 0.3s; color: var(--text-main); }
        input:focus { outline: none; background: white; box-shadow: 0 0 0 1px var(--royal-gold); }
        .track-form .btn-royal { border-radius: 2px; padding: 1.25rem 2.5rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 800; display: flex; align-items: center; justify-content: center; }

        .result-container { padding: 4rem; background: white; border-radius: 4px; border: 1px solid var(--royal-gold); box-shadow: var(--shadow-premium); }
        
        .status-hero { display: flex; justify-content: space-between; border-bottom: 1px solid var(--cream); padding-bottom: 3rem; margin-bottom: 3rem; }
        .label { font-size: 10px; text-transform: uppercase; font-weight: 800; color: var(--royal-gold); letter-spacing: 0.1em; margin-bottom: 0.5rem; display: block; }
        .status-hero h3 { font-size: 1.75rem; color: var(--royal-burgundy); font-family: var(--font-royal); }

        .timeline { display: flex; flex-direction: column; gap: 3rem; position: relative; }
        .timeline-line { position: absolute; left: 24px; top: 10px; bottom: 10px; width: 2px; background: var(--cream); z-index: 1; }
        
        .timeline-node { display: flex; align-items: center; gap: 2rem; position: relative; z-index: 2; }
        .node-icon { width: 50px; height: 50px; border-radius: 50%; background: white; color: var(--text-muted); display: flex; align-items: center; justify-content: center; border: 4px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .node-info { flex: 1; }
        .node-title { font-size: 1.1rem; color: var(--text-muted); font-weight: 600; margin-bottom: 0.25rem; font-family: var(--font-royal); }
        .node-date { font-size: 0.85rem; color: var(--text-muted); opacity: 0.7; }
        
        .timeline-node.completed .node-icon { background: var(--royal-burgundy); color: white; box-shadow: 0 8px 16px rgba(114, 24, 24, 0.2); }
        .timeline-node.completed .node-title { color: var(--royal-burgundy); }
        .check-mark { color: var(--royal-gold); }

        .location-box { margin-top: 5rem; background: var(--cream); padding: 2.5rem; border-radius: 4px; display: flex; gap: 2rem; border: 1px solid rgba(197, 160, 89, 0.2); }
        .pin { color: var(--royal-burgundy); }
        .loc-text h4 { font-size: 1.15rem; color: var(--royal-burgundy); margin-bottom: 0.5rem; font-weight: 700; font-family: var(--font-royal); }
        .loc-text p { font-size: 0.95rem; color: var(--text-main); line-height: 1.6; font-weight: 300; opacity: 0.8; }

        .placeholder { text-align: center; padding: 10rem 0; opacity: 0.6; display: flex; flex-direction: column; align-items: center; gap: 2rem; }
        .placeholder p { font-size: 1.1rem; font-weight: 300; color: var(--text-main); }

        @media (max-width: 768px) {
          .tracking-header h1 { font-size: 2.5rem; }
          .track-form { flex-direction: column; }
          .status-hero { flex-direction: column; gap: 2rem; }
          .result-container { padding: 2rem; }
        }
      `}</style>
        </main>
    );
}
