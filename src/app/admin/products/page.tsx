"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit2, Trash2, X, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { getProducts, supabase } from "@/lib/supabase";
import { createProduct } from "./actions";
import { Product } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form States
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [newProduct, setNewProduct] = useState<Partial<Product>>({
        name: "",
        description: "",
        price: 0,
        category: "Saree",
        stock: 0,
        is_exclusive: false,
        images: [],
        details: {
            material: "",
            craft: "",
            region: "",
            artisan: "",
            care: ""
        }
    });

    const categories = ["Saree", "Suit", "Lehenga", "Sherwani", "Jewelry", "Accessories", "Decor"];

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

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };



    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);

            let imageBase64 = "";
            let imageName = "";

            if (imageFile) {
                // Convert file to base64
                const reader = new FileReader();
                imageBase64 = await new Promise((resolve) => {
                    reader.onload = (e) => resolve(e.target?.result as string);
                    reader.readAsDataURL(imageFile);
                });
                imageName = imageFile.name;
            }

            const productToSave = {
                name: newProduct.name!,
                description: newProduct.description!,
                price: Number(newProduct.price),
                category: newProduct.category!,
                stock: Number(newProduct.stock),
                is_exclusive: newProduct.is_exclusive!,
                images: [], // Handled by server
                details: newProduct.details
            };

            const result = await createProduct(productToSave, imageBase64, imageName);

            if (!result.success) {
                throw new Error(result.error);
            }

            await fetchProducts();
            closeModal();
        } catch (error: any) {
            alert(`Error: ${error.message || "Unknown error"}. Check console for details.`);
            console.error("Full Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewProduct({
            name: "", description: "", price: 0, category: "Saree", stock: 0, is_exclusive: false, images: [],
            details: { material: "", craft: "", region: "", artisan: "", care: "" }
        });
        setImageFile(null);
        setImagePreview(null);
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
                                <button onClick={closeModal} className="close-modal-btn"><X size={24} /></button>
                            </div>
                            <form onSubmit={handleAddProduct} className="modal-form">
                                {/* Image Upload Section */}
                                <div className="form-group full">
                                    <label>Product Image</label>
                                    <div className="image-upload-box">
                                        <input type="file" id="img-upload" accept="image/*" onChange={handleImageSelect} hidden />
                                        <label htmlFor="img-upload" className="upload-label">
                                            {imagePreview ? (
                                                <img src={imagePreview} className="preview-img" alt="Preview" />
                                            ) : (
                                                <div className="placeholder">
                                                    <Upload size={24} />
                                                    <span>Click to upload image</span>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>

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

                                {/* Detailed Fields */}
                                <div className="form-group">
                                    <label>Material</label>
                                    <input placeholder="e.g. Pure Silk" value={newProduct.details?.material} onChange={e => setNewProduct({ ...newProduct, details: { ...newProduct.details!, material: e.target.value } })} />
                                </div>
                                <div className="form-group">
                                    <label>Craft</label>
                                    <input placeholder="e.g. Banarasi Weave" value={newProduct.details?.craft} onChange={e => setNewProduct({ ...newProduct, details: { ...newProduct.details!, craft: e.target.value } })} />
                                </div>
                                <div className="form-group">
                                    <label>Region</label>
                                    <input placeholder="e.g. Varanasi" value={newProduct.details?.region} onChange={e => setNewProduct({ ...newProduct, details: { ...newProduct.details!, region: e.target.value } })} />
                                </div>
                                <div className="form-group">
                                    <label>Artisan</label>
                                    <input placeholder="e.g. Weaver Community" value={newProduct.details?.artisan} onChange={e => setNewProduct({ ...newProduct, details: { ...newProduct.details!, artisan: e.target.value } })} />
                                </div>

                                <div className="form-group flex-row full">
                                    <input type="checkbox" id="excl" checked={newProduct.is_exclusive} onChange={e => setNewProduct({ ...newProduct, is_exclusive: e.target.checked })} />
                                    <label htmlFor="excl" className="no-margin">Exclusive Piece</label>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" onClick={closeModal} className="cancel-btn">Cancel</button>
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

        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 1rem; }
        .modal { background: white; width: 100%; max-width: 600px; border-radius: 20px; overflow: hidden; box-shadow: 0 50px 100px rgba(0,0,0,0.2); max-height: 85vh; display: flex; flex-direction: column; }
        .modal-header { padding: 1.5rem; border-bottom: 1px solid #f3f4f6; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
        .modal-header h2 { font-size: 1.75rem; color: var(--primary); }
        .close-modal-btn { background: #f3f4f6; border: none; color: #6b7280; cursor: pointer; padding: 0.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s; z-index: 10; }
        .close-modal-btn:hover { background: #fee2e2; color: #ef4444; transform: rotate(90deg); }
        
        .modal-form { padding: 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; overflow-y: auto; }
        
        .form-group.full { grid-column: span 2; }
        .form-group label { display: block; font-size: 11px; text-transform: uppercase; font-weight: 800; color: #9ca3af; margin-bottom: 0.5rem; letter-spacing: 0.05em; }
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 0.8rem; background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 12px; font-size: 0.95rem; }
        .flex-row { display: flex; align-items: center; gap: 1rem; grid-column: span 2; }
        .flex-row input { width: 20px; height: 20px; }
        .no-margin { margin-bottom: 0 !important; }

        .image-upload-box { border: 2px dashed #e5e7eb; border-radius: 12px; height: 120px; display: flex; align-items: center; justify-content: center; background: #f9fafb; overflow: hidden; position: relative; }
        .upload-label { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .placeholder { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; color: #9ca3af; font-size: 0.8rem; font-weight: 600; }
        .preview-img { width: 100%; height: 100%; object-fit: cover; }

        .modal-footer { grid-column: span 2; display: flex; gap: 1rem; margin-top: 0.5rem; padding-top: 1rem; border-top: 1px solid #f3f4f6; position: sticky; bottom: 0; background: white; z-index: 10; }
        
        @media (max-width: 640px) {
            .modal-form { grid-template-columns: 1fr; }
            .form-group.full { grid-column: span 1; }
            .flex-row { grid-column: span 1; }
        }
      `}</style>
        </div>
    );
}
