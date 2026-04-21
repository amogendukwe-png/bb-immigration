/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from '../../context/FormContext';
import { ChevronLeft } from 'lucide-react';

export const GovBBLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, goToPrevious } = useForm();
  const showBack = state.currentStep !== 'START_PAGE' && state.currentStep !== 'GATEWAY';

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--bb-gray)', color: 'var(--bb-text-dark)' }}>

      {/* ── Government Header ───────────────────────────────── */}
      <header style={{ backgroundColor: 'var(--bb-navy-dark)', borderBottom: '6px solid var(--bb-navy-mid)' }}>
        <div className="max-w-[960px] mx-auto px-4 py-4 flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'var(--bb-white)' }}
            aria-hidden="true"
          >
            <span style={{ color: 'var(--bb-navy-dark)', fontWeight: 700, fontSize: '0.85rem' }}>BB</span>
          </div>
          <span style={{ color: 'var(--bb-white)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.02em' }}>
            Government of Barbados
          </span>
          <div style={{ width: 1, height: 24, backgroundColor: 'var(--bb-navy-mid)', margin: '0 8px' }} />
          <span style={{ color: 'var(--bb-banner-blue)', fontSize: '1rem' }}>Digital Services</span>
        </div>
      </header>

      {/* ── Alpha phase banner ──────────────────────────────── */}
      <div style={{ backgroundColor: 'var(--bb-navy-mid)', padding: '6px 0' }}>
        <div className="max-w-[960px] mx-auto px-4">
          <p style={{ color: 'var(--bb-white)', fontSize: '0.875rem', margin: 0 }}>
            <strong>ALPHA</strong>
            {' — This is a prototype. Your '}
            <a href="#" style={{ color: 'var(--bb-banner-blue)' }}>feedback</a>
            {' will help us improve it.'}
          </p>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────── */}
      <main className="max-w-[960px] mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {showBack && (
              <button
                onClick={goToPrevious}
                className="flex items-center gap-1 underline decoration-2 underline-offset-4 mb-6 transition-colors"
                style={{ color: 'var(--bb-text-dark)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--bb-navy-mid)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--bb-text-dark)')}
                id="back-link"
              >
                <ChevronLeft size={20} />
                Back
              </button>
            )}

            <div
              className="p-6 md:p-12 shadow-sm"
              style={{ backgroundColor: 'var(--bb-white)', borderBottom: '5px solid var(--bb-navy-mid)' }}
            >
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="mt-12 py-12" style={{ backgroundColor: 'var(--bb-banner-blue)', borderTop: '1px solid var(--bb-border)' }}>
        <div className="max-w-[960px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--bb-navy-dark)' }}>
              Government of Barbados
            </h2>
            <ul className="space-y-2 text-sm">
              {['Privacy Policy', 'Terms and conditions', 'Accessibility statement', 'Cookie policy'].map(link => (
                <li key={link}>
                  <a
                    href="#"
                    className="underline decoration-1"
                    style={{ color: 'var(--bb-navy-mid)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--bb-navy-dark)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--bb-navy-mid)')}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm flex items-end justify-end" style={{ color: 'var(--bb-text-gray)' }}>
            &copy; {new Date().getFullYear()} Government of Barbados
          </div>
        </div>
      </footer>
    </div>
  );
};
