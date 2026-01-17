"use client";

export default function ReturnsPage() {
    return (
        <div className="bg-background min-h-screen pt-12 pb-24">
            <div className="container max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-serif text-primary mb-12 text-center">Returns & Exchanges</h1>

                <div className="prose prose-stone mx-auto font-sans text-gray-600">
                    <p className="mb-8 font-medium">
                        At Poshaq, we stand behind the quality of our craftsmanship. If you are not entirely satisfied with your purchase, we are here to help.
                    </p>

                    <h3 className="text-2xl font-serif text-primary mt-8 mb-4">Return Eligibility</h3>
                    <ul className="list-disc pl-5 mb-6 space-y-2">
                        <li>Items must be returned within 14 days of receipt.</li>
                        <li>Items must be unused, unwashed, and in their original packaging with all tags attached.</li>
                        <li>Custom-made or personalized items are not eligible for return.</li>
                    </ul>

                    <h3 className="text-2xl font-serif text-primary mt-8 mb-4">How to Initiate a Return</h3>
                    <p className="mb-6">
                        To initiate a return, please email our concierge team at <a href="mailto:care@poshaq.com" className="text-black underline">care@poshaq.com</a> with your order number and reason for return.
                        We will provide you with a return authorization and shipping instructions.
                    </p>

                    <h3 className="text-2xl font-serif text-primary mt-8 mb-4">Refunds</h3>
                    <p className="mb-6">
                        Once we receive your return, we will inspect the item and notify you of the status of your refund.
                        If approved, the refund will be processed to your original method of payment within 7-10 business days.
                    </p>

                    <h3 className="text-2xl font-serif text-primary mt-8 mb-4">Exchanges</h3>
                    <p className="mb-6">
                        If you wish to exchange an item for a different size or color, please follow the return process and place a new order for the desired item.
                    </p>
                </div>
            </div>
        </div>
    );
}
