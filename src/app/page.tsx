"use client";

import Hero from "@/components/home/Hero";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import RegionShowcase from "@/components/home/RegionShowcase";
import Craftsmanship from "@/components/home/Craftsmanship";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <FeaturedCollection />
      <RegionShowcase />
      <Craftsmanship />

      {/* Editorial/Testimonial Section */}
      <section className="py-24 bg-maroon text-ivory text-center">
        <div className="container px-4">
          <span className="text-gold font-accent text-2xl mb-6 block">The Royal Standard</span>
          <blockquote className="text-3xl md:text-5xl font-serif max-w-4xl mx-auto leading-tight mb-10">
            "Virasat isn't just a store; it's a curator of history. The quality of my Banarasi silk was exquisite—truly a garment fit for royalty."
          </blockquote>
          <cite className="font-sans text-sm tracking-widest uppercase not-italic text-gold">
            — Priya S., Loyal Patron
          </cite>
        </div>
        <style jsx>{`
            .bg-maroon { background-color: var(--color-maroon); }
            .text-ivory { color: var(--color-ivory); }
            .text-gold { color: var(--color-gold); }
            .font-accent { font-family: var(--font-accent); }
            .font-serif { font-family: var(--font-heading); }
            .font-sans { font-family: var(--font-body); }
        `}</style>
      </section>
    </div>
  );
}
