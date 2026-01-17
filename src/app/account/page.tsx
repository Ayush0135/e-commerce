"use client";

import { UserButton, useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Package, Heart, LogOut, Settings } from "lucide-react";

export default function AccountPage() {
    const { user } = useUser();

    if (!user) {
       
        return (
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        );
    }

    return (
        <SignedIn>
            <div className="bg-ivory min-h-screen pt-12 pb-24">
                <div className="container">

                    <div className="mb-12 flex items-end justify-between border-b border-gray-200 pb-8">
                        <div>
                            <h1 className="text-4xl font-serif text-maroon mb-2">My Account</h1>
                            <p className="text-gray-600 font-sans">Welcome back, {user.fullName}</p>
                        </div>
                        <div>
                            <UserButton appearance={{ elements: { avatarBox: "w-12 h-12" } }} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                        {/* Sidebar nav */}
                        <div className="bg-white p-6 border border-gray-100 shadow-sm h-fit">
                            <nav className="space-y-1">
                                <Link href="/account" className="flex items-center gap-3 px-4 py-3 bg-maroon text-white rounded-sm">
                                    <Package className="w-5 h-5" />
                                    <span className="font-sans text-sm tracking-wide font-medium">Orders</span>
                                </Link>
                                <Link href="/account/wishlist" className="flex items-center gap-3 px-4 py-3 text-charcoal hover:bg-gray-50 transition-colors">
                                    <Heart className="w-5 h-5" />
                                    <span className="font-sans text-sm tracking-wide font-medium">Wishlist</span>
                                </Link>
                                <Link href="/account/settings" className="flex items-center gap-3 px-4 py-3 text-charcoal hover:bg-gray-50 transition-colors">
                                    <Settings className="w-5 h-5" />
                                    <span className="font-sans text-sm tracking-wide font-medium">Settings</span>
                                </Link>
                            </nav>
                        </div>

                        {/* Main Content (Orders Default) */}
                        <div className="lg:col-span-3">
                            <div className="bg-white p-8 border border-gray-100 shadow-sm min-h-[400px]">
                                <h2 className="text-2xl font-serif text-charcoal mb-6">Order History</h2>

                                {/* Empty State */}
                                <div className="text-center py-16">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                        <Package className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-lg font-serif text-charcoal mb-2">No orders yet</h3>
                                    <p className="text-gray-500 font-sans text-sm mb-6">You haven't placed any orders yet. Discover our heritage collection.</p>
                                    <Link href="/shop" className="btn-primary inline-flex">
                                        Start Shopping
                                    </Link>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

                <style jsx>{`
          .bg-ivory { background-color: var(--color-ivory); }
          .bg-maroon { background-color: var(--color-maroon); }
          .text-maroon { color: var(--color-maroon); }
          .text-charcoal { color: var(--color-charcoal); }
          .font-serif { font-family: var(--font-heading); }
          .font-sans { font-family: var(--font-body); }
          
          .btn-primary {
            background-color: var(--color-maroon);
            color: white;
            padding: 0.75rem 2rem;
            font-family: var(--font-heading);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            border: 1px solid var(--color-maroon);
            text-decoration: none;
            font-size: 0.8rem;
            font-weight: 600;
          }
        `}</style>
            </div>
        </SignedIn>
    );
}
