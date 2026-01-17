"use client";

import Link from "next/link";

export default function Craftsmanship() {
    return (
        <section className="py-24 bg-white">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Image Side */}
                    <div className="relative">
                        <div className="aspect-[4/5] bg-gray-200 relative z-10 overflow-hidden shadow-2xl">
                            <img
                                src="/images/artisan-weaving.png"
                                alt="Artisan at work"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative Offset Border */}
                        <div className="absolute top-8 left-8 w-full h-full border border-gray-200 -z-0 hidden lg:block"></div>
                    </div>

                    {/* Text Side */}
                    <div className="lg:pl-10">
                        <span className="text-accent font-sans text-xs tracking-[0.2em] font-bold uppercase block mb-4">Behind the Masterpiece</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-primary mb-8 leading-tight">
                            The Art of <br /><i className="text-brand-gold">Patience</i>
                        </h2>

                        <div className="space-y-6 text-gray-500 font-sans text-lg leading-relaxed mb-10">
                            <p>
                                True luxury cannot be rushed. In the winding lanes of Varanasi and the sun-drenched workshops of Jaipur, our master artisans dedicate weeks, sometimes months, to a single creation.
                            </p>
                            <p>
                                From the painstaking extraction of lotus silk to the precise setting of uncut Polki diamonds, every Poshaq piece is a testament to generations of preserved skill.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-10 border-t border-b border-gray-100 py-8">
                            <div>
                                <span className="block text-3xl font-serif text-primary mb-1">50+</span>
                                <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Master Artisans</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-serif text-primary mb-1">800yr</span>
                                <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Legacy Arts</span>
                            </div>
                        </div>

                        <Link href="/craftsmanship" className="btn-outline">
                            Meet Our Artisans
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
