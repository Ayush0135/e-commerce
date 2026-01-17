"use client";

import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="bg-transparent pt-12 pb-24">

            {/* Hero */}
            <section className="py-24 text-center container">
                <span className="text-accent text-xs uppercase tracking-[0.2em] block mb-4 font-bold">Our Philosophy</span>
                <h1 className="text-5xl md:text-7xl font-serif text-primary mb-8">
                    A Digital Palace for <br /> <span className="text-brand-gold italic font-accent">Timeless Heritage</span>
                </h1>
                <p className="max-w-3xl mx-auto text-xl md:text-2xl font-serif text-gray-600 leading-relaxed">
                    "Poshaq is not just a brand. It is a movement to reclaim the lost glory of Indian craftsmanship and present it to the world with the dignity it deserves."
                </p>
            </section>

            {/* The Story */}
            <section className="py-24 bg-white/50 backdrop-blur-sm relative overflow-hidden">
                <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative z-10">
                        <span className="text-brand-gold font-accent text-xl tracking-wide block mb-4">Our Genesis</span>
                        <h2 className="text-4xl font-serif text-primary mb-6">Born from the Loom</h2>
                        <div className="space-y-6 text-gray-600 font-sans leading-relaxed text-lg">
                            <p>
                                The journey began in the narrow lanes of Varanasi, watching a weaver weep as he sold a masterpiece for a fraction of its worth. The art was dying, not because it lacked beauty, but because it lacked a voice.
                            </p>
                            <p>
                                Poshaq was founded to be that voice. To bridge the gap between the rural master artisan and the global connoisseur of luxury. We don't just aggregate products; we archive culture.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden rounded-sm shadow-xl">
                            <img
                                src="/images/artisan-weaving.png"
                                alt="Master Weaver at Work"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-8 -left-8 w-64 h-64 border-2 border-brand-gold/20 -z-10 bg-transparent"></div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-primary text-secondary">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-brand-gold">Our Code of Honor</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

                        <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
                            <h3 className="text-2xl font-serif text-white mb-4">Authenticity First</h3>
                            <p className="font-sans text-gray-400">
                                Every product comes with a Silk Mark or Craft Mark certification. We trace every thread back to its origin.
                            </p>
                        </div>

                        <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
                            <h3 className="text-2xl font-serif text-white mb-4">Artisan Welfare</h3>
                            <p className="font-sans text-gray-400">
                                We return 20% of profits directly to the weaver communities for healthcare and education.
                            </p>
                        </div>

                        <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
                            <h3 className="text-2xl font-serif text-white mb-4">Slow Luxury</h3>
                            <p className="font-sans text-gray-400">
                                We reject fast fashion using synthetic mimics. Our pieces take time to make, and lifetimes to wear.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
