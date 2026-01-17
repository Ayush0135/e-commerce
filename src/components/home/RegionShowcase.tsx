"use client";

import Link from "next/link";

const regions = [
    { name: "Banaras", craft: "Handwoven Silk", image: "/images/region-banaras.png" },
    { name: "Jaipur", craft: "Meenakari & Kundan", image: "/images/region-jaipur.png" },
    { name: "Kutch", craft: "Roghan Art", image: "/images/region-kutch.png" },
    { name: "Kashmir", craft: "Pashmina", image: "/images/region-kashmir.png" },
];

export default function RegionShowcase() {
    return (
        <section className="py-24 bg-background">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-xl">
                        <span className="text-accent text-xs uppercase tracking-[0.2em] mb-2 block font-bold">Provenance</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Journey Across India</h2>
                        <p className="text-gray-500 font-sans text-lg">
                            Each region tells a story. Explore the geographic origins of our finest crafts, from the ghats of Banaras to the valleys of Kashmir.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {regions.map((region, index) => (
                        <Link
                            href={`/shop?region=${region.name.toLowerCase()}`}
                            key={index}
                            className="group relative h-96 overflow-hidden border border-gray-100 shadow-sm"
                        >
                            <img
                                src={region.image}
                                alt={region.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>

                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                                <div className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center mb-4 text-white group-hover:bg-white/10 transition-colors">
                                    <span className="font-serif text-lg">{index + 1}</span>
                                </div>
                                <h3 className="text-2xl font-serif text-white mb-2 tracking-wide">{region.name}</h3>
                                <p className="text-sm font-accent text-gray-200 italic">{region.craft}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <Link
                    href="/regions"
                    className="group relative block w-full h-48 overflow-hidden rounded-sm shadow-md mt-6"
                >
                    <img
                        src="/images/regions-banner.png"
                        alt="View All Regions"
                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                        <span className="border border-white/50 px-8 py-3 text-white uppercase tracking-[0.2em] font-bold text-sm bg-black/20 backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-all">
                            View All Regions
                        </span>
                    </div>
                </Link>
            </div>
        </section>
    );
}
