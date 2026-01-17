"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
    {
        step: "01",
        title: "Sourcing Material",
        description: "Our journey begins in the remote regions, sourcing only the finest raw fibers—pure Mulberry silk from Karnataka, raw cotton from Andhra, and ethical wool from the Himalayas.",
        image: "/images/craft-process-sourcing.jpg"
    },
    {
        step: "02",
        title: "The Design Blueprint",
        description: "Before a single thread is woven, our master designers sketch intricate motifs inspired by Mughal architecture and nature, adhering to traditional geometries.",
        image: "/images/craft-process-design.jpg"
    },
    {
        step: "03",
        title: "The Rhythm of the Loom",
        description: "For weeks, sometimes months, the artisan breathes life into the fabric. The rhythmic clatter of the handloom is where patience transforms thread into legacy.",
        image: "/images/artisan-weaving.png"
    },
    {
        step: "04",
        title: "Finishing Touches",
        description: "Every piece undergoes a rigorous quality check. Zari threads are polished, loose ends are knotted by hand, and the fabric is washed to ensure an eternal sheen.",
        image: "/images/craft-process-finishing.jpg"
    }
];

export default function CraftsmanshipPage() {
    return (
        <div className="bg-transparent text-foreground">

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center bg-black text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1596206416194-e0c1f4350993?q=80&w=2000&auto=format&fit=crop"
                        alt="The Loom"
                        className="w-full h-full object-cover opacity-50"
                    />
                </div>
                <div className="relative z-10 container px-4">
                    <span className="text-gray-200 font-sans text-xs tracking-[0.3em] block mb-4 uppercase">The Process</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Preserving The <br /> <span className="italic text-gray-300">Intangible</span></h1>
                    <p className="text-gray-200 max-w-2xl mx-auto font-sans text-lg">
                        We don't just sell, we curate. Witness the journey of your heirloom.
                    </p>
                </div>
            </section>

            {/* Philosophy */}
            <section className="py-24 bg-white/50 backdrop-blur-sm">
                <div className="container text-center max-w-4xl">
                    <div className="w-16 h-1 bg-black mx-auto mb-8"></div>
                    <p className="text-2xl md:text-3xl font-serif text-primary leading-relaxed">
                        "In an era of fast fashion, we choose <span className="italic">slowness</span>. We choose the imperfect human touch over the perfect machine finish."
                    </p>
                </div>
            </section>

            {/* The Process Steps */}
            <section className="py-24">
                <div className="container">
                    {steps.map((item, index) => (
                        <div key={index} className={`flex flex-col md:flex-row gap-12 items-center mb-32 last:mb-0 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

                            <div className="flex-1 w-full">
                                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden group shadow-lg rounded-sm">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <span className="text-8xl font-serif text-gray-100 block -mb-10 relative z-0">{item.step}</span>
                                <div className="relative z-10">
                                    <h3 className="text-3xl md:text-4xl font-serif text-primary mb-4">{item.title}</h3>
                                    <p className="font-sans text-gray-600 text-lg leading-relaxed">{item.description}</p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </section>

            {/* Artisans Grid (Quick View) */}
            <section className="py-24 bg-primary text-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <span className="text-gray-400 font-sans text-xs tracking-widest block mb-4 uppercase">The Hands Behind the Art</span>
                        <h2 className="text-4xl font-serif text-white">Meet Our Masters</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {[
                            {
                                name: "Unni Krishnan",
                                role: "Kanjeevaram Weaver",
                                img: "/images/artisan-weaving.png",
                                quote: "The best things in life are those that are made by hand, with patience and love."
                            },
                            {
                                name: "Ramesh Kumar",
                                role: "Zardozi Artist",
                                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
                                quote: "To create something that outlives you is the greatest privilege of an artist."
                            },
                            {
                                name: "Sita Devi",
                                role: "Embroidery Master",
                                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
                                quote: "Every stitch is a prayer. When I work, I feel connected to something greater than myself."
                            }
                        ].map((artisan, i) => (
                            <div key={i} className="bg-white/5 p-8 border border-white/10 text-center group hover:bg-white/10 transition-colors">
                                <div className="w-24 h-24 bg-gray-600 rounded-full mx-auto mb-6 overflow-hidden">
                                    <img src={artisan.img} alt={artisan.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                </div>
                                <h4 className="text-xl font-serif text-white mb-1">{artisan.name}</h4>
                                <span className="block text-xs uppercase tracking-widest text-brand-gold mb-6">{artisan.role}</span>
                                <p className="text-gray-300 font-sans text-sm italic leading-relaxed">
                                    "{artisan.quote}"
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="text-center border-t border-white/10 pt-16">
                        <h3 className="text-2xl font-serif text-white mb-2 tracking-wide">POSHAQ</h3>
                        <p className="text-gray-400 font-sans mb-8">Curated Indian craftsmanship for the modern world. Where tradition meets contemporary elegance.</p>
                        <Link href="/shop" className="inline-flex items-center bg-white text-primary px-8 py-3 uppercase tracking-widest text-sm font-bold hover:bg-brand-gold hover:text-white transition-all">
                            Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
