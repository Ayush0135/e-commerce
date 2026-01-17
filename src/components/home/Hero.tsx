"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">

            {/* Professional Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/hero-saree.png"
                    alt="Heritage Luxury"
                    className="w-full h-full object-cover transition-transform duration-1000 scale-105"
                />
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center container px-4 text-white">
                <span className="block text-gray-200 text-sm md:text-base mb-4 tracking-[0.3em] uppercase fade-in font-medium">
                    Spring Summer '26
                </span>
                <h1 className="text-6xl md:text-8xl lg:text-9xl text-white font-serif mb-6 leading-none tracking-tight fade-in-up drop-shadow-lg">
                    POSHAQ
                </h1>
                <p className="text-gray-100 font-sans text-lg md:text-xl max-w-lg mx-auto mb-10 fade-in-up-delay drop-shadow-md">
                    Curated elegance for the modern connoisseur.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center fade-in-up-delay-2">
                    <Link href="/shop" className="btn-white">
                        View Collection
                    </Link>
                    <Link href="/about" className="btn-outline-white">
                        Our Legacy
                    </Link>
                </div>
            </div>

            <style jsx>{`
        .btn-white {
           background-color: white;
           color: black;
           padding: 1rem 2.5rem;
           text-transform: uppercase;
           letter-spacing: 0.1em;
           font-weight: 600;
           font-size: 0.8rem;
           transition: all 0.3s;
           display: inline-flex;
           align-items: center;
        }
        .btn-white:hover {
           background-color: #f5f5f5;
           transform: translateY(-2px);
        }

        .btn-outline-white {
           background-color: transparent;
           color: white;
           border: 1px solid white;
           padding: 1rem 2.5rem;
           text-transform: uppercase;
           letter-spacing: 0.1em;
           font-weight: 600;
           font-size: 0.8rem;
           transition: all 0.3s;
           display: inline-flex;
           align-items: center;
        }
        .btn-outline-white:hover {
           background-color: white;
           color: black;
        }

        /* Animations */
        .fade-in { animation: fadeIn 1s ease forwards; opacity: 0; }
        .fade-in-up { animation: fadeInUp 1s ease 0.3s forwards; opacity: 0; transform: translateY(20px); }
        .fade-in-up-delay { animation: fadeInUp 1s ease 0.6s forwards; opacity: 0; transform: translateY(20px); }
        .fade-in-up-delay-2 { animation: fadeInUp 1s ease 0.9s forwards; opacity: 0; transform: translateY(20px); }

        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
      `}</style>
        </section>
    );
}
