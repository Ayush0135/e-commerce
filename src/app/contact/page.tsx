"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="bg-ivory pt-12 pb-24">
            <div className="container">

                <div className="text-center mb-16">
                    <span className="text-gold font-accent text-lg block mb-2">At Your Service</span>
                    <h1 className="text-4xl md:text-5xl font-serif text-maroon mb-6">Royal Concierge</h1>
                    <p className="max-w-2xl mx-auto text-gray-600 font-sans">
                        Our dedicated team is available to assist you with order inquiries, styling advice, or custom commissions.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Contact Info */}
                    <div className="space-y-12 bg-white p-10 border border-gray-100 shadow-sm">

                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 bg-maroon text-white flex items-center justify-center rounded-sm flex-shrink-0">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif text-charcoal mb-2">Speak to Us</h3>
                                <p className="font-sans text-gray-600 mb-1">+91 98765 43210</p>
                                <p className="font-sans text-gray-500 text-sm">Mon - Sat, 10:00 AM - 7:00 PM IST</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 bg-maroon text-white flex items-center justify-center rounded-sm flex-shrink-0">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif text-charcoal mb-2">Email Concierge</h3>
                                <p className="font-sans text-gray-600 mb-1">concierge@virasat.com</p>
                                <p className="font-sans text-gray-500 text-sm">We typically respond within 24 hours.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 bg-maroon text-white flex items-center justify-center rounded-sm flex-shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif text-charcoal mb-2">Visit Our Flagship</h3>
                                <p className="font-sans text-gray-600 mb-1">
                                    The Heritage Wing, 45 Hauz Khas Village,<br /> New Delhi, India 110016
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Form */}
                    <div className="bg-white p-10 border border-gray-100 shadow-sm">
                        <h3 className="text-2xl font-serif text-maroon mb-6">Send a Message</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-gray-500 font-sans font-bold">First Name</label>
                                    <input type="text" className="w-full border-b border-gray-300 py-2 focus:border-maroon focus:outline-none font-serif text-charcoal" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-gray-500 font-sans font-bold">Last Name</label>
                                    <input type="text" className="w-full border-b border-gray-300 py-2 focus:border-maroon focus:outline-none font-serif text-charcoal" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-500 font-sans font-bold">Email Address</label>
                                <input type="email" className="w-full border-b border-gray-300 py-2 focus:border-maroon focus:outline-none font-serif text-charcoal" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-500 font-sans font-bold">Subject</label>
                                <select className="w-full border-b border-gray-300 py-2 focus:border-maroon focus:outline-none font-serif text-charcoal bg-transparent">
                                    <option>General Inquiry</option>
                                    <option>Custom Commission</option>
                                    <option>Order Status</option>
                                    <option>Press & Media</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-500 font-sans font-bold">Message</label>
                                <textarea rows={4} className="w-full border-b border-gray-300 py-2 focus:border-maroon focus:outline-none font-serif text-charcoal resize-none"></textarea>
                            </div>

                            <button type="button" className="btn-primary w-full mt-4">
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>

            <style jsx>{`
        .bg-ivory { background-color: var(--color-ivory); }
        .text-maroon { color: var(--color-maroon); }
        .bg-maroon { background-color: var(--color-maroon); }
        .text-gold { color: var(--color-gold); }
        .text-charcoal { color: var(--color-charcoal); }
        .font-serif { font-family: var(--font-heading); }
        .font-sans { font-family: var(--font-body); }
        .font-accent { font-family: var(--font-accent); }
        
        .btn-primary {
          background-color: var(--color-maroon);
          color: white;
          padding: 1rem 2rem;
          font-family: var(--font-heading);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border: 1px solid var(--color-maroon);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .btn-primary:hover {
          background-color: #2D0202;
        }
      `}</style>
        </div>
    );
}
