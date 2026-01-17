"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const regions = [
    {
        id: "banaras",
        name: "Banaras",
        craft: "Handwoven Silk",
        description: "The spiritual capital of India, known for its finest gold and silver zari work on silk.",
        image: "/images/region-banaras.png"
    },
    {
        id: "jaipur",
        name: "Jaipur",
        craft: "Meenakari & Kundan",
        description: "The Pink City, a hub of royalty, famous for its intricate jewelry and block printing.",
        image: "/images/region-jaipur.png"
    },
    {
        id: "kanchipuram",
        name: "Kanchipuram",
        craft: "Temple Silks",
        description: "Known as the City of Thousand Temples, weaving divine heavy silk sarees with temple borders.",
        image: "/images/region-kanchipuram.png"
    },
    {
        id: "kashmir",
        name: "Kashmir",
        craft: "Pashmina & Embroidery",
        description: "Paradise on Earth, gifted with the finest wool and artisans who weave magic into Pashmina.",
        image: "/images/region-kashmir.png"
    },
    {
        id: "kutch",
        name: "Kutch",
        craft: "Roghan & Ajrakh",
        description: "The white desert land, home to vibrant Roghan art and geometric Ajrakh prints.",
        image: "/images/region-kutch.png"
    }
];

export default function RegionsPage() {
    return (
        <div className="bg-transparent pt-12 pb-24">
            <div className="container">

                {/* Header */}
                <div className="text-center mb-20">
                    <span className="text-accent text-xs uppercase tracking-[0.2em] block mb-4 font-bold">Provenance</span>
                    <h1 className="text-5xl md:text-6xl font-serif text-primary mb-6">Regions of India</h1>
                    <p className="max-w-2xl mx-auto text-gray-500 font-sans text-lg">
                        Discover the geography of our heritage. Every fabric, every motif has a home.
                    </p>
                </div>

                {/* Region List */}
                <div className="space-y-32">
                    {regions.map((region, index) => (
                        <div key={region.id} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

                            {/* Image */}
                            <div className="flex-1 w-full group relative overflow-hidden rounded-sm shadow-xl aspect-video">
                                <img
                                    src={region.image}
                                    alt={region.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 text-center md:text-left">
                                <span className="text-brand-gold font-sans font-bold text-sm uppercase tracking-widest mb-3 block">
                                    {region.craft}
                                </span>
                                <h2 className="text-4xl font-serif text-primary mb-6">{region.name}</h2>
                                <p className="text-accent text-lg mb-8 leading-relaxed max-w-md mx-auto md:mx-0">
                                    {region.description}
                                </p>
                                <Link
                                    href={`/shop?region=${region.name}`}
                                    className="inline-flex items-center text-sm font-medium uppercase tracking-widest border-b border-black pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors"
                                >
                                    Explore Collection <ArrowRight className="ml-3 w-4 h-4" />
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
