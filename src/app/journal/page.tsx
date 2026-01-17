"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const articles = [
    {
        id: 1,
        title: "The Dying Art of Zardozi",
        excerpt: "Exploring the intricate world of gold thread work and the artisans fighting to keep it alive in the narrow lanes of old Delhi.",
        date: "October 12, 2025",
        image: "https://images.unsplash.com/photo-1596206416194-e0c1f4350993?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Kanjeevaram: Silk of the Gods",
        excerpt: "Why the Kanjeevaram saree remains the quintessential bridal garment for South Indian weddings, and the mythology behind its motifs.",
        date: "September 28, 2025",
        image: "https://images.unsplash.com/photo-1610189022378-50e3e8f80459?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Winter Care for Pashmina",
        excerpt: "A comprehensive guide to maintaining the softness and longevity of your authentic Kashmiri Pashmina shawls.",
        date: "September 15, 2025",
        image: "https://images.unsplash.com/photo-1628135804797-0402e6467383?q=80&w=800&auto=format&fit=crop"
    }
];

export default function JournalPage() {
    return (
        <div className="bg-transparent min-h-screen pt-12 pb-24">
            <div className="container">
                <div className="text-center mb-16">
                    <span className="text-accent text-xs uppercase tracking-[0.2em] block mb-4 font-bold">The Chronicles</span>
                    <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">Journal</h1>
                    <p className="max-w-2xl mx-auto text-gray-500 font-sans text-lg">
                        Stories of craft, culture, and the hands that weave them.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {articles.map((article) => (
                        <article key={article.id} className="group">
                            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden mb-6 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="flex items-center gap-4 mb-4 text-xs font-bold text-accent uppercase tracking-widest">
                                <span>{article.date}</span>
                                <span className="w-8 h-[1px] bg-accent"></span>
                                <span>Culture</span>
                            </div>
                            <h2 className="text-2xl font-serif text-primary mb-3 leading-tight group-hover:text-brand-gold transition-colors">
                                <Link href={`/journal/${article.id}`}>
                                    {article.title}
                                </Link>
                            </h2>
                            <p className="text-gray-500 font-sans leading-relaxed mb-6">
                                {article.excerpt}
                            </p>
                            <Link href={`/journal/${article.id}`} className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-primary hover:text-brand-gold transition-colors">
                                Read Story <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
