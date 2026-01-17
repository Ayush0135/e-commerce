"use client";

import { useState, use } from "react";
import { Star, ShieldCheck, Truck, Clock, Heart, Minus, Plus, Share2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { products } from "@/lib/products";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    const product = products.find(p => p.id === id);

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center pt-24">Product Not Found</div>;
    }

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: "https://images.unsplash.com/photo-1610189022378-50e3e8f80459?q=80&w=400&auto=format&fit=crop",
            category: product.category,
            quantity: quantity
        });
        alert("Added to cart!");
    };

    return (
        <div className="bg-white pt-12 pb-24">
            <div className="container">

                {/* Breadcrumbs */}
                <div className="text-sm font-sans text-gray-500 mb-8 uppercase tracking-widest">
                    <Link href="/" className="hover:text-black">Home</Link> /
                    <Link href="/shop" className="hover:text-black"> Shop</Link> /
                    <span className="text-black font-bold ml-1">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    {/* Image Gallery */}
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden group shadow-md">
                            <img
                                src="https://images.unsplash.com/photo-1610189022378-50e3e8f80459?q=80&w=1200&auto=format&fit=crop"
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {[
                                "https://images.unsplash.com/photo-1610189022378-50e3e8f80459?q=80&w=400&auto=format&fit=crop",
                                "https://images.unsplash.com/photo-1596206416194-e0c1f4350993?q=80&w=400&auto=format&fit=crop",
                                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
                                "https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?q=80&w=400&auto=format&fit=crop"
                            ].map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`aspect-square bg-gray-100 cursor-pointer border transition-all ${activeImage === idx ? 'border-primary' : 'border-transparent'}`}
                                    onClick={() => setActiveImage(idx)}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="mb-2">
                            <span className="text-gray-500 text-sm uppercase tracking-widest">{product.details.craft}</span>
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-serif text-black mb-4">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl text-black font-serif">₹ {product.price.toLocaleString()}</span>
                            <div className="flex items-center gap-1 text-black text-sm">
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-gray-400 ml-1">(12 Reviews)</span>
                            </div>
                        </div>

                        <p className="text-gray-600 font-sans leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Authenticity Badge */}
                        <div className="flex items-start gap-3 bg-gray-50 p-4 border border-gray-100 mb-8">
                            <ShieldCheck className="w-6 h-6 text-black mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-serif text-black text-lg mb-1">Authenticity Guaranteed</h4>
                                <p className="text-sm text-gray-600 font-sans">
                                    Handcrafted by {product.details.artisan} in {product.details.region}.
                                </p>
                            </div>
                        </div>

                        {/* Selection & Actions */}
                        <div className="border-t border-b border-gray-100 py-8 mb-8">
                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Quantity */}
                                <div className="flex items-center border border-gray-300 w-fit">
                                    <button
                                        className="px-4 py-3 hover:bg-gray-100 transition-colors"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        <Minus className="w-4 h-4 text-black" />
                                    </button>
                                    <span className="w-12 text-center font-sans font-bold text-black">{quantity}</span>
                                    <button
                                        className="px-4 py-3 hover:bg-gray-100 transition-colors"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <Plus className="w-4 h-4 text-black" />
                                    </button>
                                </div>

                                {/* Add to Cart */}
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 btn-primary text-center justify-center"
                                >
                                    Add to Cart
                                </button>

                                {/* Wishlist */}
                                <button className="p-3 border border-gray-300 hover:border-black hover:text-black transition-colors text-gray-400">
                                    <Heart className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="mt-4 text-xs font-sans text-black font-bold flex items-center gap-2 uppercase tracking-wide">
                                <div className="w-2 h-2 rounded-full bg-black"></div>
                                Low Stock
                            </div>
                        </div>
                    </div>
                </div>

                {/* Narrative / Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-gray-100 pt-16">
                    <div className="lg:col-span-4">
                        <span className="text-gray-500 text-sm uppercase tracking-widest block mb-2">The Artisan's Touch</span>
                        <h3 className="text-3xl font-serif text-black mb-6">A Legacy Woven in Silk</h3>
                        <p className="font-sans text-gray-600 mb-6 leading-relaxed">
                            "Weaving this saree is like painting with thread. Every motif tells a story of our ancestors."
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .btn-primary {
                    background-color: black;
                    color: white;
                    padding: 1rem 2rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    border: 1px solid black;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    font-weight: 500;
                }
                .btn-primary:hover {
                    background-color: white;
                    color: black;
                }
            `}</style>
        </div>
    );
}
