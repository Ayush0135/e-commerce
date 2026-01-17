"use client";

export default function TermsPage() {
    return (
        <div className="bg-background min-h-screen pt-12 pb-24">
            <div className="container max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-serif text-primary mb-12 text-center">Terms of Service</h1>

                <div className="prose prose-stone mx-auto font-sans text-gray-600">
                    <p className="mb-6 text-sm text-gray-500">Last updated: January 2026</p>

                    <h3 className="text-2xl font-serif text-primary mt-8 mb-4">1. Acceptance of Terms</h3>
                    <p className="mb-6">
                        By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                    </p>

                    <h3 className="text-2xl font-serif text-primary mt-8 mb-4">2. Product Descriptions</h3>
                    <p className="mb-6">
                        We attempt to be as accurate as possible. However, Poshaq does not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free. Handcrafted items may have slight variations which are inherent to the process and not defects.
                    </p>

                    <h3 className="text-2xl font-serif text-primary mt-8 mb-4">3. Pricing</h3>
                    <p className="mb-6">
                        All prices are listed in Indian Rupees (INR) and are inclusive of taxes unless stated otherwise. We reserve the right to change prices at any time without prior notice.
                    </p>

                    <h3 className="text-2xl font-serif text-primary mt-8 mb-4">4. Intellectual Property</h3>
                    <p className="mb-6">
                        The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights and trademarks. The copying, redistribution, use or publication by you of any such matters or any part of the Site is strictly prohibited.
                    </p>

                    <h3 className="text-2xl font-serif text-primary mt-8 mb-4">5. Governing Law</h3>
                    <p className="mb-6">
                        These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                    </p>
                </div>
            </div>
        </div>
    );
}
