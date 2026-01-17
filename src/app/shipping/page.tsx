"use client";

export default function ShippingPage() {
    return (
        <div className="bg-background min-h-screen pt-12 pb-24">
            <div className="container max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-serif text-primary mb-12 text-center">Shipping Policy</h1>

                <div className="prose prose-stone mx-auto font-sans text-gray-600">
                    <h3 className="text-2xl font-serif text-primary mt-8 mb-4">Domestic Shipping (India)</h3>
                    <p className="mb-6">
                        We offer complimentary shipping on all orders within India. Orders are typically processed within 2-3 business days.
                        For made-to-order items, please verify the production timeline mentioned on the product page.
                        Once shipped, standard delivery takes 3-7 business days depending on the destination.
                    </p>

                    <h3 className="text-2xl font-serif text-primary mt-8 mb-4">International Shipping</h3>
                    <p className="mb-6">
                        We ship globally to over 100 countries. International shipping rates are calculated at checkout based on the weight and destination of the package.
                        Duties and taxes are not included in the shipping price and may be collected by the carrier upon delivery.
                    </p>

                    <h3 className="text-2xl font-serif text-primary mt-8 mb-4">Order Tracking</h3>
                    <p className="mb-6">
                        Once your order is dispatched, you will receive an email with the tracking details.
                        You can also track your order status from your account dashboard.
                    </p>

                    <h3 className="text-2xl font-serif text-primary mt-8 mb-4">Insurance</h3>
                    <p className="mb-6">
                        All our shipments are fully insured against loss or damage during transit.
                        If you receive a damaged package, please notify us within 24 hours of delivery.
                    </p>
                </div>
            </div>
        </div>
    );
}
