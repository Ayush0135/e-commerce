"use client";

import Link from "next/link";
import { ShoppingBag, User, Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Collection", href: "/products" },
    { name: "Our Story", href: "/about" },
    { name: "Track Order", href: "/tracking" },
  ];

  return (
    <nav className={`nav ${isScrolled ? "nav-scrolled" : ""}`}>
      <div className="container nav-container">
        {/* Left Links (Desktop) */}
        <div className="nav-group desktop-show">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="nav-item">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Center Logo */}
        <Link href="/" className="nav-logo">
          <span className="logo-text">VIRASAT</span>
          <span className="logo-tag">HERITAGE LUXURY</span>
        </Link>

        {/* Right Actions */}
        <div className="nav-group nav-actions">
          <button className="nav-icon"><Search size={20} strokeWidth={1.5} /></button>
          <Link href="/cart" className="nav-icon relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            <div className="cart-badge" />
          </Link>
          <div className="user-area">
            {isSignedIn ? <UserButton afterSignOutUrl="/" /> : (
              <Link href="/sign-in" className="nav-icon"><User size={20} strokeWidth={1.5} /></Link>
            )}
          </div>
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mobile-menu">
            <button className="close-btn" onClick={() => setMobileMenuOpen(false)}><X size={32} strokeWidth={1} /></button>
            <div className="m-links">
              {navLinks.map(link => (
                <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="m-link">
                  {link.name}
                </Link>
              ))}
              <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)} className="m-link">Account</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 100px;
          display: flex;
          align-items: center;
          z-index: 1000;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background: transparent;
        }
        
        .nav-scrolled {
          background: rgba(255, 255, 255, 0.98);
          height: 80px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 4px 30px rgba(0,0,0,0.03);
        }

        .nav-container {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-group {
          display: flex;
          align-items: center;
          gap: 3rem;
          flex: 1;
        }
        
        .desktop-show { justify-content: flex-start; }
        .nav-actions { justify-content: flex-end; }

        .nav-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          flex: 0 0 auto;
          margin: 0;
          transition: transform 0.3s;
        }
        .nav-logo:hover { transform: scale(1.02); }

        .logo-text {
          font-family: var(--font-royal);
          font-weight: 700;
          font-size: 2.2rem;
          color: var(--royal-burgundy);
          line-height: 0.9;
          letter-spacing: 0.1em;
        }

        .logo-tag {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          color: var(--royal-burgundy);
          font-weight: 600;
          text-transform: uppercase;
          margin-top: 4px;
        }
        
        .nav-item {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-main);
          text-decoration: none;
          position: relative;
          transition: color 0.3s;
        }
        .nav-item:hover { color: var(--royal-burgundy); }
        .nav-item:after {
          content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1px;
          background: var(--royal-burgundy); transition: width 0.3s;
        }
        .nav-item:hover:after { width: 100%; }

        .nav-icon {
          color: var(--text-main);
          background: none; border: none; cursor: pointer;
          transition: color 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .nav-icon:hover { color: var(--royal-burgundy); }

        .cart-badge {
          position: absolute; top: -2px; right: -2px;
          width: 6px; height: 6px;
          background: var(--royal-burgundy);
          border-radius: 50%;
        }

        .mobile-toggle { display: none; background: none; border: none; color: var(--text-main); }
        
        .mobile-menu { 
          position: fixed; inset: 0; background: var(--ivory); z-index: 2000; 
          display: flex; align-items: center; justify-content: center;
        }
        
        .close-btn { 
          position: absolute; top: 2rem; right: 2rem; background: none; border: none; color: var(--text-main); cursor: pointer;
        }
        
        .m-links { display: flex; flex-direction: column; gap: 3rem; text-align: center; }
        .m-link { 
          font-family: var(--font-royal); font-size: 2.5rem; color: var(--royal-burgundy); text-decoration: none; 
          font-weight: 500; transition: color 0.3s;
        }
        .m-link:hover { color: var(--royal-gold); }

        @media (max-width: 1024px) {
          .desktop-show { display: none; }
          .mobile-toggle { display: block; }
          .nav-logo { margin: 0; align-items: flex-start; }
          .nav-container { justify-content: space-between; }
          .nav-group { flex: 0 0 auto; gap: 1.5rem; }
          .logo-text { font-size: 1.8rem; }
        }
      `}</style>
    </nav>
  );
}
