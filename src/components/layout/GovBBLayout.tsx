/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from '../../context/FormContext';

const TridentIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Centre prong */}
    <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    {/* Left prong */}
    <line x1="6"  y1="3" x2="6"  y2="11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    {/* Right prong */}
    <line x1="18" y1="3" x2="18" y2="11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    {/* Left tip */}
    <polyline points="4.5,3 6,1 7.5,3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Centre tip */}
    <polyline points="10.5,3 12,1 13.5,3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Right tip */}
    <polyline points="16.5,3 18,1 19.5,3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Cross bar connecting all three prongs */}
    <line x1="6" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const GovBBLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, goToPrevious } = useForm();
  const isGateway = state.currentStep === 'GATEWAY';
  const showBack = !isGateway && state.currentStep !== 'START_PAGE';

  return (
    <div style={{ fontFamily: 'Figtree, -apple-system, system-ui, sans-serif', color: 'var(--color-black-00)', background: 'var(--color-white-00)', minHeight: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div style={{ backgroundColor: 'var(--color-blue-00)', color: 'var(--color-white-00)', padding: '0.4rem 0', fontSize: '0.875rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Simplified trident badge */}
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="10" cy="10" r="9" fill="#ffc726"/>
            <rect x="9.25" y="5" width="1.5" height="11" fill="#00164a"/>
            <rect x="6.25" y="5" width="1.5" height="5"  fill="#00164a"/>
            <rect x="12.25" y="5" width="1.5" height="5" fill="#00164a"/>
            <polygon points="6.25,5 5.5,3.5 7,3.5 7.75,5" fill="#00164a"/>
            <polygon points="9.25,5 8.5,3.5 10,3.5 10.75,5" fill="#00164a"/>
            <polygon points="12.25,5 11.5,3.5 13,3.5 13.75,5" fill="#00164a"/>
          </svg>
          <span>Official government website of Barbados</span>
        </div>
      </div>

      {/* ── Header / Hero ────────────────────────────────────────── */}
      {isGateway ? (
        /* Gateway page: full yellow hero matching alpha.gov.bb */
        <header style={{ backgroundColor: 'var(--color-yellow-100)', padding: '2.5rem 0 3.5rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
            {/* Logo */}
            <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '2.5rem', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TridentIcon size={28} />
              Government of Barbados
            </div>
            {/* Hero */}
            <h1 style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.1rem)', fontWeight: 800, lineHeight: 1.1, maxWidth: '680px', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              How you find and use government services is changing
            </h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '520px', marginBottom: '2rem', lineHeight: 1.5 }}>
              It will be clearer, simpler and faster for citizens to get things done.
            </p>
            <a
              href="#services"
              style={{ display: 'inline-block', backgroundColor: 'var(--color-teal-00)', color: 'var(--color-white-00)', padding: '0.8rem 1.6rem', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none', borderRadius: '2px' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-blue-00)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--color-teal-00)')}
            >
              Tell us what's important
            </a>
          </div>
        </header>
      ) : (
        /* Inner pages: slim yellow logo bar */
        <header style={{ backgroundColor: 'var(--color-yellow-100)', padding: '0.85rem 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TridentIcon size={24} />
            Government of Barbados
          </div>
        </header>
      )}

      {/* ── Main content ────────────────────────────────────────── */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem', width: '100%' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {showBack && (
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); goToPrevious(); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-teal-00)', textDecoration: 'underline', marginBottom: '1.5rem', fontSize: '1.1rem' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-black-00)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-teal-00)'; }}
                id="back-link"
              >
                ← Back
              </a>
            )}
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: 'var(--color-blue-00)', color: 'var(--color-white-00)', padding: '3rem 0', marginTop: '4rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <p style={{ fontWeight: 700, marginBottom: '1rem' }}>Government of Barbados</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
              {['Privacy policy', 'Terms and conditions', 'Accessibility statement', 'Cookie policy'].map(link => (
                <li key={link}>
                  <a href="#" style={{ color: 'var(--color-white-00)', textDecoration: 'underline' }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = 'none')}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = 'underline')}
                  >{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', fontSize: '0.875rem', opacity: 0.7 }}>
            &copy; {new Date().getFullYear()} Government of Barbados
          </div>
        </div>
      </footer>
    </div>
  );
};
