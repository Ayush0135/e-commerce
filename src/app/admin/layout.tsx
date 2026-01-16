"use client";

import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users, ExternalLink, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin" },
        { name: "Products", icon: <Package size={20} />, href: "/admin/products" },
        { name: "Orders", icon: <ShoppingCart size={20} />, href: "/admin/orders" },
        { name: "Customers", icon: <Users size={20} />, href: "/admin/customers" },
    ];

    return (
        <div className="admin-wrapper">
            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
                <div className="sidebar-header">
                    <Link href="/admin" className={`brand ${!sidebarOpen && "hidden"}`}>
                        <span className="brand-name">VIRASAT</span>
                        <span className="brand-label">Admin Portal</span>
                    </Link>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="toggle-btn">
                        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-item ${pathname === item.href ? "active" : ""}`}
                        >
                            {item.icon}
                            <span className="item-label">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <Link href="/" className="storefront-link">
                        <ExternalLink size={20} />
                        <span className="item-label">Storefront</span>
                    </Link>
                    <div className="user-section">
                        <UserButton afterSignOutUrl="/" />
                        <div className="user-info">
                            <p className="user-name">Admin Account</p>
                            <p className="user-role">Manager</p>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="admin-content">
                <div className="content-inner">
                    {children}
                </div>
            </main>

            <style jsx>{`
        .admin-wrapper { display: flex; min-height: 100vh; background: #f9fafb; font-family: var(--font-sans); }
        
        .sidebar { 
          background: white; 
          border-right: 1px solid #e5e7eb; 
          transition: width 0.3s ease; 
          display: flex; 
          flex-direction: column; 
          position: sticky;
          top: 0;
          height: 100vh;
        }
        .sidebar.open { width: 280px; }
        .sidebar.closed { width: 80px; }
        
        .sidebar-header { height: 80px; display: flex; align-items: center; justify-content: space-between; padding: 0 1.5rem; border-bottom: 1px solid #f3f4f6; }
        .brand { display: flex; flex-direction: column; }
        .brand-name { font-family: var(--font-serif); font-weight: bold; color: var(--primary); letter-spacing: 0.1em; }
        .brand-label { font-size: 10px; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em; }
        
        .toggle-btn { background: #f3f4f6; border: none; padding: 0.5rem; border-radius: 8px; cursor: pointer; color: #6b7280; }
        
        .sidebar-nav { flex: 1; padding: 1.5rem 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .nav-item { display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; border-radius: 12px; color: #6b7280; transition: all 0.2s; }
        .nav-item.active { background: var(--primary); color: white; box-shadow: 0 4px 12px rgba(93, 14, 14, 0.2); }
        .nav-item:hover:not(.active) { background: #f3f4f6; color: var(--primary); }
        
        .sidebar-footer { padding: 1.5rem; border-top: 1px solid #f3f4f6; }
        .storefront-link { display: flex; align-items: center; gap: 1rem; color: #9ca3af; margin-bottom: 1.5rem; font-size: 0.9rem; }
        .storefront-link:hover { color: var(--primary); }
        
        .user-section { display: flex; align-items: center; gap: 1rem; }
        .user-info { overflow: hidden; }
        .user-name { font-size: 13px; font-weight: 600; color: #111827; }
        .user-role { font-size: 11px; color: #6b7280; }
        
        .admin-content { flex: 1; overflow-y: auto; padding: 2rem; }
        .content-inner { max-width: 1200px; margin: 0 auto; }
        
        .sidebar.closed .item-label, 
        .sidebar.closed .brand, 
        .sidebar.closed .user-info { display: none; }
        .sidebar.closed .nav-item, 
        .sidebar.closed .storefront-link { justify-content: center; padding: 0.75rem; }
        .sidebar.closed .user-section { justify-content: center; }

        .hidden { display: none; }
      `}</style>
        </div>
    );
}
