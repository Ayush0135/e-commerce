"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collections = [
    {
        id: 1,
        title: "Silk & Sari",
        subtitle: "Handwoven Masterpieces",
        image: "/images/featured-saree.png",
        link: "/shop?category=Sarees"
    },
    {
        id: 2,
        title: "Fine Jewelry",
        subtitle: "The Royal Vault",
        image: "/images/featured-jewelry.png",
        link: "/shop?category=Jewelry"
    },
    {
        id: 3,
        title: "Atelier Men",
        subtitle: "Modern Sherwanis",
        image: "/images/featured-men.png",
        link: "/shop?category=Sherwanis"
    }
];

export default function FeaturedCollection() {
    return (
        <section className="py-24 bg-background">
            <div className="container">
                <div className="text-center mb-16">
                    <span className="text-accent text-xs uppercase tracking-[0.2em] block mb-4 font-bold">Curated With Care</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">The Collection</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {collections.map((item) => (
                        <Link href={item.link} key={item.id} className="group block relative overflow-hidden h-[600px] shadow-sm transform transition-transform hover:-translate-y-2 duration-500">
                            <div className="w-full h-full bg-gray-100 relative overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                            </div>

                            <div className="absolute bottom-10 left-10 text-white z-10">
                                <span className="block text-brand-gold text-xs uppercase tracking-widest mb-3 font-bold">
                                    {item.subtitle}
                                </span>
                                <h3 className="text-4xl font-serif mb-6 leading-none text-white">{item.title}</h3>
                                <span className="inline-flex items-center text-xs font-medium uppercase tracking-widest border-b border-brand-gold pb-1 text-white group-hover:text-brand-gold transition-colors">
                                    View Collection <ArrowRight className="ml-2 w-3 h-3" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
