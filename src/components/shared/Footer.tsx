"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, ShieldCheck } from "lucide-react";

export default function Footer() {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith("/admin");

    if (isAdminPage) return null;

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-grid">
                    {/* Brand Column */}
                    <div className="footer-col brand-col">
                        <Link href="/" className="footer-logo">
                            <span className="logo-main">VIRASAT</span>
                            <span className="logo-sub">Heritage Reimagined</span>
                        </Link>
                        <p className="brand-desc">
                            Preserving the dying arts of the Indian subcontinent through a curated digital archive of masterworks. Every acquisition supports a legacy.
                        </p>
                        <div className="social-links">
                            <a href="#"><Instagram size={18} strokeWidth={1.5} /></a>
                            <a href="#"><Facebook size={18} strokeWidth={1.5} /></a>
                            <a href="#"><Twitter size={18} strokeWidth={1.5} /></a>
                        </div>
                    </div>

                    {/* Links Column */}
                    <div className="footer-col">
                        <h4 className="footer-title">The Archive</h4>
                        <ul className="footer-links">
                            <li><Link href="/products">Entire Collection</Link></li>
                            <li><Link href="/products?cat=Saree">Exclusive Sarees</Link></li>
                            <li><Link href="/products?cat=Jewelry">Temple Jewelry</Link></li>
                            <li><Link href="/about">Artisan Stories</Link></li>
                        </ul>
                    </div>

                    {/* Service Column */}
                    <div className="footer-col">
                        <h4 className="footer-title">Concierge</h4>
                        <ul className="footer-links">
                            <li><Link href="/tracking">Track Artifact</Link></li>
                            <li><Link href="/care">Heritage Care</Link></li>
                            <li><Link href="/shipping">Royal Logistics</Link></li>
                            <li><Link href="/contact">Private Viewing</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="footer-col contact-col">
                        <h4 className="footer-title">Connect</h4>
                        <div className="contact-item">
                            <Phone size={16} className="contact-icon" />
                            <span>+91 1800-HE-RITAGE</span>
                        </div>
                        <div className="contact-item">
                            <Mail size={16} className="contact-icon" />
                            <span>curator@virasat.com</span>
                        </div>
                        <div className="contact-item">
                            <MapPin size={16} className="contact-icon" />
                            <span>The Heritage Hub, Varanasi, UP</span>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">© 2026 VIRASAT INTERNATIONAL. ALL RIGHTS RESERVED.</p>
                    <div className="legal-links">
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Curation</Link>
                        <Link href="/admin" className="admin-access">
                            <ShieldCheck size={14} /> Artifact Management
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .footer { 
            background: #12100E; /* Jet Black/Dark Brown mix */
            color: var(--ivory); 
            border-top: 1px solid rgba(255,255,255,0.05); /* Subtle separation */
            padding-top: 6rem;
        }
        
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 4rem; padding-bottom: 6rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
        
        .footer-logo { display: flex; flex-direction: column; text-decoration: none; margin-bottom: 2rem; }
        .logo-main { font-family: var(--font-royal); font-size: 2rem; font-weight: 700; letter-spacing: 0.15em; line-height: 1; color: var(--ivory); }
        .logo-sub { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.35em; margin-top: 0.5rem; color: rgba(255,255,255,0.5); font-weight: 500; font-family: var(--font-sans); }
        
        .brand-desc { font-size: 0.9rem; line-height: 1.8; color: #78716C; margin-bottom: 2rem; max-width: 320px; font-weight: 300; }
        
        .social-links { display: flex; gap: 1.5rem; }
        .social-links a { color: var(--ivory); opacity: 0.6; transition: var(--transition); }
        .social-links a:hover { color: white; opacity: 1; transform: translateY(-2px); }

        .footer-title { font-family: var(--font-royal); font-size: 0.85rem; color: white; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 2rem; opacity: 0.9; }
        
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .footer-links a { text-decoration: none; color: #78716C; font-size: 0.85rem; transition: var(--transition); letter-spacing: 0.05em; display: inline-block; }
        .footer-links a:hover { color: white; transform: translateX(5px); }

        .contact-col { display: flex; flex-direction: column; gap: 1.25rem; }
        .contact-item { display: flex; align-items: flex-start; gap: 1rem; color: #78716C; font-size: 0.85rem; }
        .contact-icon { color: white; opacity: 0.4; margin-top: 3px; }

        .footer-bottom { padding: 2rem 0; display: flex; justify-content: space-between; align-items: center; }
        
        .copyright { font-size: 0.7rem; letter-spacing: 0.1em; color: #44403C; text-transform: uppercase; font-weight: 600; }
        
        .legal-links { display: flex; gap: 2.5rem; align-items: center; }
        .legal-links a { text-decoration: none; color: #44403C; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; transition: var(--transition); }
        .legal-links a:hover { color: white; }
        
        .admin-access { display: flex; align-items: center; gap: 0.5rem; }

        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 3rem; }
          .footer-bottom { flex-direction: column; gap: 1.5rem; text-align: center; }
          .legal-links { flex-direction: column; gap: 1rem; }
        }
      `}</style>
        </footer>
    );
}
