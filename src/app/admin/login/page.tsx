"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "admin" && password === "admin") {
            // Set cookie for 1 day
            document.cookie = "admin_session=true; path=/; max-age=86400";
            router.push("/admin");
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center mb-8">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-black" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-black">Admin Access</h1>
                    <p className="text-gray-500 mt-2">Restricted area. Please sign in.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                            placeholder="Enter username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                            placeholder="Enter password"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
                    >
                        Enter Panel
                    </button>
                </form>
            </div>
        </div>
    );
}
