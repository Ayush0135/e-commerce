"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collections = [
    {
        id: "royal-trousseau",
        title: "The Royal Trousseau",
        subtitle: "Bridal Masterpieces",
        description: "A curated ensemble of heavy Banarasi brocades, intricate zardozi lehengas, and Polki jewelry sets fit for a palace wedding.",
        image: "/images/collection-wedding.png",
        theme: "text-primary"
    },
    {
        id: "temple-tales",
        title: "Temple Tales",
        subtitle: "Southern Heritage",
        description: "Pure Kanjeevaram silks inspired by the temple architecture of Tamil Nadu, featuring motifs of peacocks, rudraksha, and temple borders.",
        image: "/images/collection-temple.png",
        theme: "text-black"
    },
    {
        id: "cashmere-dreams",
        title: "Winter in Kashmir",
        subtitle: "Pashmina & Wool",
        description: "Hand-spun Pashmina shawls and Kani jamawars that take months to weave, bringing the warmth of the Himalayas to your wardrobe.",
        image: "/images/collection-kashmir.png",
        theme: "text-primary"
    }
];

export default function CollectionsPage() {
    return (
        <div className="bg-transparent pt-12 pb-24">
            <div className="container">

                <div className="text-center mb-20">
                    <span className="text-accent text-xs uppercase tracking-[0.2em] block mb-4 font-bold">Curated Anthologies</span>
                    <h1 className="text-5xl md:text-6xl font-serif text-primary mb-6">Heritage Collections</h1>
                    <p className="max-w-2xl mx-auto text-gray-500 font-sans text-lg">
                        Our collections are not just products; they are chapters of history, curated by theme, craft, and emotion.
                    </p>
                </div>

                <div className="space-y-32">
                    {collections.map((collection, index) => (
                        <div key={collection.id} className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>

                            {/* Image Side */}
                            <div className="flex-1 w-full relative group">
                                <div className="aspect-[3/4] md:aspect-[16/9] lg:aspect-[4/5] bg-gray-100 relative overflow-hidden shadow-2xl rounded-sm">
                                    <img
                                        src={collection.image}
                                        alt={collection.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                </div>
                            </div>

                            {/* Text Side */}
                            <div className="flex-1">
                                <span className="block text-xs font-sans font-bold uppercase tracking-widest mb-4 text-brand-gold">
                                    {collection.subtitle}
                                </span>
                                <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6 leading-none">
                                    {collection.title}
                                </h2>
                                <p className="text-accent font-sans text-lg leading-relaxed mb-8">
                                    {collection.description}
                                </p>
                                <Link
                                    href={`/shop?collection=${collection.id}`}
                                    className="inline-flex items-center text-sm font-medium uppercase tracking-widest border-b border-black pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors"
                                >
                                    Explore <ArrowRight className="ml-3 w-4 h-4" />
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Process CTA */}
                <div key="process-cta" className="mt-32 relative w-full h-[60vh] flex items-center justify-center text-center overflow-hidden rounded-sm">
                    <div className="absolute inset-0">
                        <img
                            src="/images/process-banner-new.jpg"
                            alt="The Loom Process"
                            className="w-full h-full object-cover grayscale opacity-80"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                    <div className="relative z-10 max-w-3xl px-6">
                        <span className="text-white/80 font-sans text-xs tracking-[0.3em] block mb-4 uppercase">The Process</span>
                        <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Preserving The <br /> <span className="italic text-brand-gold">Intangible</span></h2>
                        <p className="text-white/90 text-lg md:text-xl font-sans mb-10 leading-relaxed">
                            We don't just sell, we curate. Witness the journey of your heirloom.
                        </p>
                        <Link href="/craftsmanship" className="inline-flex items-center px-8 py-4 bg-white text-primary uppercase tracking-widest text-sm font-bold hover:bg-brand-gold hover:text-white transition-all">
                            View Craftsmanship <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
