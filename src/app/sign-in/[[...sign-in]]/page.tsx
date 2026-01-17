"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="brand-header">
                    <span className="brand-name">VIRASAT</span>
                    <span className="brand-tag">Heritage Reimagined</span>
                </div>
                <SignIn
                    appearance={{
                        elements: {
                            card: { boxShadow: '0 20px 50px rgba(0,0,0,0.05)', borderRadius: '2px', border: '1px solid rgba(197, 160, 89, 0.2)' },
                            formButtonPrimary: { backgroundColor: '#4A0404', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' },
                            headerTitle: { fontFamily: "var(--font-heading)", color: '#4A0404' },
                            headerSubtitle: { color: '#C5A059' }
                        }
                    }}
                />
            </div>

            <style jsx>{`
                .auth-page { min-height: 100vh; background: var(--color-ivory); display: flex; align-items: center; justify-content: center; }
                .auth-container { display: flex; flex-direction: column; align-items: center; gap: 3rem; padding: 2rem; }
                
                .brand-header { display: flex; flex-direction: column; align-items: center; }
                .brand-name { font-family: var(--font-heading); font-size: 3rem; font-weight: 700; color: var(--color-maroon); letter-spacing: 0.1em; line-height: 1; }
                .brand-tag { font-family: var(--font-body); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.3em; color: var(--color-gold); margin-top: 0.5rem; font-weight: 500; }
            `}</style>
        </div>
    );
}
