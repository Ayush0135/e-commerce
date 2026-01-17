"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-20 pb-10 text-black">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 pb-16">

                {/* Brand Column */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-serif tracking-widest font-bold">POSHAQ</h2>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-sans">
                        Curated Indian craftsmanship for the modern world. Where tradition meets contemporary elegance.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-gray-500 transition-colors"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-gray-500 transition-colors"><Facebook className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-gray-500 transition-colors"><Twitter className="w-5 h-5" /></a>
                    </div>
                </div>

                {/* Shop Column */}
                <div>
                    <h4 className="uppercase text-xs font-bold tracking-widest mb-6 text-gray-400">Shop</h4>
                    <ul className="space-y-4 text-sm font-medium">
                        <li><Link href="/shop?category=Sarees" className="hover:text-gray-500 transition-colors">Sarees</Link></li>
                        <li><Link href="/shop?category=Jewelry" className="hover:text-gray-500 transition-colors">Jewelry</Link></li>
                        <li><Link href="/shop?category=Sherwanis" className="hover:text-gray-500 transition-colors">Men</Link></li>
                        <li><Link href="/shop?category=Decor" className="hover:text-gray-500 transition-colors">Home</Link></li>
                    </ul>
                </div>

                {/* About Column */}
                <div>
                    <h4 className="uppercase text-xs font-bold tracking-widest mb-6 text-gray-400">About</h4>
                    <ul className="space-y-4 text-sm font-medium">
                        <li><Link href="/about" className="hover:text-gray-500 transition-colors">Our Story</Link></li>
                        <li><Link href="/craftsmanship" className="hover:text-gray-500 transition-colors">Artisans</Link></li>
                        <li><Link href="/journal" className="hover:text-gray-500 transition-colors">Journal</Link></li>
                        <li><Link href="/contact" className="hover:text-gray-500 transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Legal Column */}
                <div>
                    <h4 className="uppercase text-xs font-bold tracking-widest mb-6 text-gray-400">Legal</h4>
                    <ul className="space-y-4 text-sm font-medium">
                        <li><Link href="/shipping" className="hover:text-gray-500 transition-colors">Shipping</Link></li>
                        <li><Link href="/returns" className="hover:text-gray-500 transition-colors">Returns</Link></li>
                        <li><Link href="/privacy" className="hover:text-gray-500 transition-colors">Privacy</Link></li>
                        <li><Link href="/terms" className="hover:text-gray-500 transition-colors">Terms</Link></li>
                    </ul>
                </div>

            </div>

            <div className="container border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                <p>&copy; {new Date().getFullYear()} Poshaq Retail Pvt Ltd.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <span>Made in India</span>
                </div>
            </div>
        </footer>
    );
}
