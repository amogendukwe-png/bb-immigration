/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const ContactBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const details = state.personalDetails || {};

  const handleUpdate = (field: string, value: any) => {
    updateState({
      personalDetails: { ...details, [field]: value }
    });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    // Paper form says "at least one of Local/Overseas" but digital should prefer email/mobile
    if (!details.email) errors.email = 'Enter an email address';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }

    setFormErrors({});
    goToNext();
  };

  return (
    <div className="space-y-8" id="contact-block">
      {Object.keys(formErrors).length > 0 && (
        <div className="border-[4px] border-[var(--color-red-00)] p-4 mb-8 bg-white" role="alert" id="error-summary">
          <h2 className="text-[var(--color-red-00)] text-xl font-bold mb-2">There is a problem</h2>
          <ul className="text-[var(--color-red-00)] list-inside list-disc underline font-medium">
            {Object.entries(formErrors).map(([key, value]) => (
              <li key={key}><a href={`#${key}`}>{value}</a></li>
            ))}
          </ul>
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold mb-8 underline decoration-2 decoration-[var(--color-teal-00)] underline-offset-8 tracking-tight">Contact details</h1>
      <p className="text-xl mb-12 opacity-80 max-w-2xl leading-relaxed">
        We will use these details to contact you about your application. 
        Please ensure they are correct.
      </p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">
        <div className={`flex flex-col gap-2 ${formErrors.telLocal ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="telLocal">Telephone number (local)</label>
          <span className="text-[var(--color-mid-grey-00)]">For example, 246 123 4567</span>
          <input
            id="telLocal"
            type="tel"
            className="border-2 border-black p-3 text-xl w-full max-w-[400px] focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
            placeholder="Local Barbados number"
          />
        </div>

        <div className={`flex flex-col gap-2 ${formErrors.email ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="email">Email address</label>
          <span className="text-[var(--color-mid-grey-00)]">We will send your confirmation and case status to this address</span>
          {formErrors.email && <span className="text-[var(--color-red-00)] font-bold">{formErrors.email}</span>}
          <input
            id="email"
            type="email"
            className="border-2 border-black p-3 text-xl w-full focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
            value={details.email || ''}
            onChange={(e) => handleUpdate('email', e.target.value)}
            placeholder="e.g. name@example.com"
          />
        </div>

        <button
          type="submit"
          className="bg-[var(--color-teal-00)] text-white px-8 py-3 rounded-sm font-bold text-xl hover:bg-[var(--color-blue-00)] active:translate-y-1 transition-all shadow-md focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
          id="continue-button"
        >
          Save and continue
        </button>
      </form>
    </div>
  );
};
