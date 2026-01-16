"use client";

import { TrendingUp, Package, Users, DollarSign, Plus } from "lucide-react";
import Link from "next/link";
import { mockProducts } from "@/lib/supabase";

export default function AdminDashboard() {
    const stats = [
        { label: "Total Revenue", value: "₹4,25,000", icon: <DollarSign />, trend: "+12.5%", color: "#10b981" },
        { label: "Total Orders", value: "128", icon: <TrendingUp />, trend: "+24%", color: "#3b82f6" },
        { label: "Active Products", value: mockProducts.length.toString(), icon: <Package />, trend: "0%", color: "#8b5cf6" },
        { label: "Total Customers", value: "842", icon: <Users />, trend: "+8%", color: "#f59e0b" },
    ];

    return (
        <div className="dashboard">
            <header className="dash-header">
                <div className="header-left">
                    <h1 className="dash-title">Dashboard Overview</h1>
                    <p className="dash-subtitle">Welcome back, manager. Here's your store's performance.</p>
                </div>
                <Link href="/admin/products" className="add-btn">
                    <Plus size={18} /> Add Product
                </Link>
            </header>

            <section className="stats-grid">
                {stats.map((stat, i) => (
                    <div key={i} className="stat-card">
                        <div className="stat-header">
                            <div className="stat-icon" style={{ color: stat.color, background: `${stat.color}15` }}>
                                {stat.icon}
                            </div>
                            <span className="trend-badge">{stat.trend}</span>
                        </div>
                        <p className="stat-label">{stat.label}</p>
                        <h3 className="stat-value">{stat.value}</h3>
                    </div>
                ))}
            </section>

            <div className="dash-grid">
                <div className="dash-card">
                    <div className="card-header">
                        <h3 className="card-title">Recent Products</h3>
                        <Link href="/admin/products" className="card-link">View All</Link>
                    </div>
                    <div className="product-list">
                        {mockProducts.slice(0, 4).map((product) => (
                            <div key={product.id} className="list-item">
                                <img src={product.images[0]} className="item-img" alt="" />
                                <div className="item-details">
                                    <p className="item-name">{product.name}</p>
                                    <p className="item-cat">{product.category}</p>
                                </div>
                                <p className="item-price">₹{product.price.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dash-card empty-state">
                    <div className="empty-content">
                        <div className="empty-icon"><TrendingUp size={32} /></div>
                        <h4 className="empty-title">Analytics Coming Soon</h4>
                        <p className="empty-desc">We're gathering more data to show you deeper insights.</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .dashboard { display: flex; flex-direction: column; gap: 2.5rem; }
        
        .dash-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .dash-title { font-family: var(--font-serif); font-size: 2rem; color: #111827; }
        .dash-subtitle { color: #6b7280; font-size: 0.95rem; margin-top: 0.25rem; }
        
        .add-btn { 
          background: var(--primary); 
          color: white; 
          padding: 0.75rem 1.5rem; 
          border-radius: 10px; 
          display: flex; 
          align-items: center; 
          gap: 0.5rem; 
          font-weight: 600; 
          font-size: 0.9rem;
          transition: var(--transition);
        }
        .add-btn:hover { background: var(--primary-light); transform: translateY(-2px); }

        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .stat-card { background: white; padding: 1.5rem; border-radius: 20px; border: 1px solid #f3f4f6; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
        .stat-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; }
        .stat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .trend-badge { font-size: 11px; font-weight: 700; color: #10b981; background: #ecfdf5; padding: 2px 8px; border-radius: 99px; }
        .stat-label { color: #6b7280; font-size: 0.85rem; font-weight: 500; }
        .stat-value { font-size: 1.75rem; font-weight: 700; margin-top: 0.25rem; color: #111827; }

        .dash-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 2rem; }
        .dash-card { background: white; border-radius: 24px; border: 1px solid #f3f4f6; padding: 2rem; }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .card-title { font-size: 1.15rem; font-weight: 700; color: #111827; }
        .card-link { font-size: 0.8rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.05em; }
        
        .product-list { display: flex; flex-direction: column; gap: 1.25rem; }
        .list-item { display: flex; align-items: center; gap: 1rem; }
        .item-img { width: 48px; height: 48px; border-radius: 10px; object-fit: cover; }
        .item-details { flex: 1; }
        .item-name { font-size: 0.9rem; font-weight: 600; color: #111827; }
        .item-cat { font-size: 0.75rem; color: #9ca3af; text-transform: capitalize; }
        .item-price { font-size: 0.9rem; font-weight: 700; color: var(--primary); }

        .empty-state { display: flex; align-items: center; justify-content: center; text-align: center; background: #fafafa; border-style: dashed; border-width: 2px; }
        .empty-icon { width: 64px; height: 64px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: var(--primary); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .empty-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; }
        .empty-desc { font-size: 0.85rem; color: #9ca3af; max-width: 220px; margin: 0 auto; line-height: 1.5; }

        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .dash-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
}
