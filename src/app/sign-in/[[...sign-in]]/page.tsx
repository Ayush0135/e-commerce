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
                            card: { boxShadow: '0 20px 50px rgba(0,0,0,0.05)', borderRadius: '4px', border: '1px solid rgba(197, 160, 89, 0.2)' },
                            formButtonPrimary: { backgroundColor: '#721818', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800' },
                            headerTitle: { fontFamily: "'Cinzel', serif", color: '#721818' },
                            headerSubtitle: { color: '#C5A059' }
                        }
                    }}
                />
            </div>

            <style jsx>{`
                .auth-page { min-height: 100vh; background: var(--ivory); display: flex; align-items: center; justify-content: center; }
                .auth-container { display: flex; flex-direction: column; align-items: center; gap: 3rem; padding: 2rem; }
                
                .brand-header { display: flex; flex-direction: column; align-items: center; }
                .brand-name { font-family: var(--font-royal); font-size: 3rem; font-weight: 700; color: var(--royal-burgundy); letter-spacing: 0.2em; line-height: 1; }
                .brand-tag { font-family: var(--font-sans); font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.4em; color: var(--royal-gold); margin-top: 0.5rem; font-weight: 600; }
            `}</style>
        </div>
    );
}
