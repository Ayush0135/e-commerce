"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit2, Trash2, X, Upload, Loader2 } from "lucide-react";
import { getProducts, addProduct, supabase } from "@/lib/supabase";
import { Product } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newProduct, setNewProduct] = useState<Partial<Product>>({
        name: "",
        description: "",
        price: 0,
        category: "Saree",
        stock: 0,
        is_exclusive: false,
        images: []
    });

    const categories = ["Saree", "Suit", "Sleaper", "T-Shirts", "Jewelry"];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const productToSave = {
                name: newProduct.name!,
                description: newProduct.description!,
                price: Number(newProduct.price),
                category: newProduct.category!,
                stock: Number(newProduct.stock),
                is_exclusive: newProduct.is_exclusive!,
                images: newProduct.images?.length ? newProduct.images : ["https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&q=80&w=800"]
            };

            await addProduct(productToSave);
            await fetchProducts();
            setIsModalOpen(false);
            setNewProduct({ name: "", description: "", price: 0, category: "Saree", stock: 0, is_exclusive: false, images: [] });
        } catch (error) {
            alert("Failed to add product.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await supabase.from('products').delete().eq('id', id);
            setProducts(products.filter(p => p.id !== id));
        } catch (error) { console.error(error); }
    };

    return (
        <div className="admin-products">
            <header className="page-header">
                <div>
                    <h1 className="serif">Inventory</h1>
                    <p>Manage your heritage collection and stock levels.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="add-btn">
                    <Plus size={20} /> New Piece
                </button>
            </header>

            <div className="toolbar">
                <div className="search-wrapper">
                    <Search size={18} className="search-icon" />
                    <input type="text" placeholder="Search by name or category..." />
                </div>
                <button className="filter-btn"><Filter size={18} /> Filters</button>
            </div>

            {loading ? (
                <div className="loader">
                    <Loader2 className="animate-spin" size={40} />
                    <p>Retrieving Collection...</p>
                </div>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Piece</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <div className="product-cell">
                                            <img src={p.images[0]} alt="" />
                                            <div>
                                                <p className="name">{p.name}</p>
                                                {p.is_exclusive && <span className="exclusive-label">Exclusive</span>}
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className="cat-badge">{p.category}</span></td>
                                    <td className="bold">₹ {p.price.toLocaleString()}</td>
                                    <td>
                                        <span className={`stock-badge ${p.stock < 5 ? 'low' : ''}`}>
                                            {p.stock} units
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-btns">
                                            <button className="edit"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(p.id)} className="delete"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="modal-overlay">
                        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="modal">
                            <div className="modal-header">
                                <h2 className="serif">Add Legacy Piece</h2>
                                <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
                            </div>
                            <form onSubmit={handleAddProduct} className="modal-form">
                                <div className="form-group full">
                                    <label>Product Name</label>
                                    <input required value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="e.g. Royal Gold Saree" />
                                </div>
                                <div className="form-group full">
                                    <label>Description</label>
                                    <textarea required rows={3} value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="The story of this piece..." />
                                </div>
                                <div className="form-group">
                                    <label>Price (INR)</label>
                                    <input required type="number" value={newProduct.price || ''} onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })} />
                                </div>
                                <div className="form-group">
                                    <label>Stock</label>
                                    <input required type="number" value={newProduct.stock || ''} onChange={e => setNewProduct({ ...newProduct, stock: Number(e.target.value) })} />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <select value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}>
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="form-group flex-row">
                                    <input type="checkbox" id="excl" checked={newProduct.is_exclusive} onChange={e => setNewProduct({ ...newProduct, is_exclusive: e.target.checked })} />
                                    <label htmlFor="excl" className="no-margin">Exclusive Piece</label>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="cancel-btn">Cancel</button>
                                    <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
                                        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Publish Piece"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx>{`
        .admin-products { display: flex; flex-direction: column; gap: 2rem; }
        
        .page-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .page-header h1 { font-size: 2.5rem; color: var(--primary); }
        .page-header p { color: #6b7280; font-size: 0.95rem; }
        
        .add-btn { background: var(--primary); color: white; padding: 0.8rem 1.5rem; border-radius: 12px; border: none; font-weight: bold; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; transition: all 0.2s; }
        .add-btn:hover { background: var(--primary-light); transform: translateY(-2px); }

        .toolbar { display: flex; gap: 1rem; }
        .search-wrapper { flex: 1; position: relative; }
        .search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #9ca3af; }
        .search-wrapper input { width: 100%; padding: 0.8rem 1rem 0.8rem 3rem; background: white; border: 1px solid #e5e7eb; border-radius: 12px; font-size: 0.95rem; }
        
        .filter-btn { padding: 0.8rem 1.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 12px; display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: #6b7280; cursor: pointer; }

        .table-container { background: white; border-radius: 20px; border: 1px solid #f3f4f6; overflow: hidden; }
        table { width: 100%; border-collapse: collapse; text-align: left; }
        th { padding: 1.25rem 1.5rem; background: #fafafa; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; font-weight: 800; }
        td { padding: 1.25rem 1.5rem; border-top: 1px solid #f3f4f6; font-size: 0.95rem; }
        
        .product-cell { display: flex; align-items: center; gap: 1rem; }
        .product-cell img { width: 48px; height: 48px; border-radius: 8px; object-fit: cover; }
        .product-cell .name { font-weight: 700; color: #111827; }
        .exclusive-label { font-size: 9px; text-transform: uppercase; color: var(--primary); font-weight: bold; letter-spacing: 0.05em; }
        
        .cat-badge { padding: 4px 10px; background: #f3f4f6; border-radius: 6px; font-size: 12px; font-weight: 500; color: #4b5563; }
        .bold { font-weight: bold; color: var(--primary); }
        .stock-badge { display: inline-block; padding: 4px 10px; background: #ecfdf5; color: #10b981; border-radius: 6px; font-size: 12px; font-weight: bold; }
        .stock-badge.low { background: #fff7ed; color: #f97316; }
        
        .action-btns { display: flex; gap: 0.5rem; }
        .action-btns button { padding: 8px; border-radius: 8px; border: none; cursor: pointer; transition: all 0.2s; color: #9ca3af; background: #f9fafb; }
        .action-btns .edit:hover { color: #3b82f6; background: #eff6ff; }
        .action-btns .delete:hover { color: #ef4444; background: #fef2f2; }

        .loader { padding: 5rem; text-align: center; color: var(--primary); display: flex; flex-direction: column; align-items: center; gap: 1rem; }

        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 2rem; }
        .modal { background: white; width: 100%; max-width: 600px; border-radius: 32px; overflow: hidden; box-shadow: 0 50px 100px rgba(0,0,0,0.2); }
        .modal-header { padding: 2rem; border-bottom: 1px solid #f3f4f6; display: flex; justify-content: space-between; align-items: center; }
        .modal-header h2 { font-size: 1.75rem; color: var(--primary); }
        .modal-header button { background: none; border: none; color: #9ca3af; cursor: pointer; }
        
        .modal-form { padding: 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .form-group.full { grid-column: span 2; }
        .form-group label { display: block; font-size: 11px; text-transform: uppercase; font-weight: 800; color: #9ca3af; margin-bottom: 0.5rem; letter-spacing: 0.05em; }
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 0.8rem; background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 12px; font-size: 0.95rem; }
        .flex-row { display: flex; align-items: center; gap: 1rem; grid-column: span 2; }
        .flex-row input { width: 20px; height: 20px; }
        .no-margin { margin-bottom: 0 !important; }

        .modal-footer { grid-column: span 2; display: flex; gap: 1rem; margin-top: 1rem; }
        .cancel-btn { padding: 1rem 2rem; background: #f3f4f6; border: none; border-radius: 12px; font-weight: bold; color: #6b7280; cursor: pointer; }
      `}</style>
        </div>
    );
}
