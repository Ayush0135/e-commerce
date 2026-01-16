export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    stock: number;
    is_exclusive: boolean;
    created_at?: string;
}

export interface Order {
    id: string;
    user_id: string;
    items: CartItem[];
    total_price: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    address: Address;
    tracking_number?: string;
    created_at: string;
}

export interface CartItem {
    product_id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Address {
    fullName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}
