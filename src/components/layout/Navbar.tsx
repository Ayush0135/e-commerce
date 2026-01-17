"use client";

import Link from "next/link";
import { ShoppingBag, Search, User, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
            {/* Top Bar - Minimal */}
            <div className="bg-black text-white text-[10px] uppercase tracking-widest text-center py-2">
                Free Shipping on all International Orders
            </div>

            <nav className="container h-20 flex items-center justify-between">

                {/* Mobile Menu */}
                <button
                    className="lg:hidden text-black"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Desktop Nav - Left */}
                <div className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-wide font-medium">
                    <Link href="/shop" className="hover:text-gray-500 transition-colors">Shop</Link>
                    <Link href="/collections" className="hover:text-gray-500 transition-colors">Collections</Link>
                    <Link href="/craftsmanship" className="hover:text-gray-500 transition-colors">Studio</Link>
                </div>

                {/* Logo - Center */}
                <Link href="/" className="transform hover:scale-105 transition-transform duration-300">
                    <h1 className="text-3xl font-serif text-black uppercase tracking-[0.2em] font-bold">
                        POSHAQ
                    </h1>
                </Link>

                {/* Icons - Right */}
                <div className="flex items-center gap-6 text-black">
                    <button className="hover:text-gray-500 transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <Link href="/account" className="hover:text-gray-500 transition-colors">
                        <User className="w-5 h-5" />
                    </Link>
                    <Link href="/cart" className="relative hover:text-gray-500 transition-colors">
                        <ShoppingBag className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                            0
                        </span>
                    </Link>
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 shadow-xl flex flex-col gap-4 z-50">
                    <Link href="/shop" className="block text-sm uppercase tracking-wide">Shop</Link>
                    <Link href="/collections" className="block text-sm uppercase tracking-wide">Collections</Link>
                    <Link href="/craftsmanship" className="block text-sm uppercase tracking-wide">Studio</Link>
                    <Link href="/about" className="block text-sm uppercase tracking-wide">About</Link>
                </div>
            )}
        </header>
    );
}
