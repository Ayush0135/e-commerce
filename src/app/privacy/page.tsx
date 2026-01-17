"use client";

export default function PrivacyPage() {
    return (
        <div className="bg-background min-h-screen pt-12 pb-24">
            <div className="container max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-serif text-primary mb-12 text-center">Privacy Policy</h1>

                <div className="prose prose-stone mx-auto font-sans text-gray-600">
                    <p className="mb-6 text-sm text-gray-500">Last updated: January 2026</p>

                    <p className="mb-6">
                        Poshaq ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or make a purchase.
                    </p>

                    <h3 className="text-2xl font-serif text-primary mt-8 mb-4">Information We Collect</h3>
                    <p className="mb-6">
                        We collect information you provide directly to us, such as when you create an account, place an order, subscribe to our newsletter, or contact customer support. This may include your name, email address, shipping address, payment information, and phone number.
                    </p>

                    <h3 className="text-2xl font-serif text-primary mt-8 mb-4">How We Use Your Information</h3>
                    <ul className="list-disc pl-5 mb-6 space-y-2">
                        <li>To process and fulfill your orders.</li>
                        <li>To communicate with you about your order status.</li>
                        <li>To send you marketing communications (if you have opted in).</li>
                        <li>To improve our website and customer service.</li>
                        <li>To prevent fraud and enhance security.</li>
                    </ul>

                    <h3 className="text-2xl font-serif text-primary mt-8 mb-4">Data Security</h3>
                    <p className="mb-6">
                        We implement improved security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
                    </p>

                    <h3 className="text-2xl font-serif text-primary mt-8 mb-4">Your Rights</h3>
                    <p className="mb-6">
                        You have the right to access, correct, or delete your personal information. You can manage your account details by logging in to your account. To request deletion of your data, please contact us.
                    </p>

                    <h3 className="text-2xl font-serif text-primary mt-8 mb-4">Contact Us</h3>
                    <p className="mb-6">
                        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@poshaq.com" className="text-black underline">privacy@poshaq.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
