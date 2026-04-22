/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const H4ReasonsBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const h4 = state.h4 || {};

  const handleUpdate = (field: string, value: any) => {
    updateState({ h4: { ...h4, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!h4.reasons?.trim()) errors.reasons = 'Explain why you need to transfer to a different institution';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }
    setFormErrors({});
    goToNext();
  };

  return (
    <div className="space-y-8">
      {Object.keys(formErrors).length > 0 && (
        <div className="border-[4px] border-[var(--color-red-00)] p-4 mb-8 bg-white" role="alert">
          <h2 className="text-[var(--color-red-00)] text-xl font-bold mb-2">There is a problem</h2>
          <ul className="text-[var(--color-red-00)] list-inside list-disc underline font-medium">
            {Object.entries(formErrors).map(([key, val]) => (
              <li key={key}><a href={`#${key}`}>{val}</a></li>
            ))}
          </ul>
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold">Reasons for transfer</h1>
      <p className="text-xl opacity-80">Explain why you are seeking to transfer to a different institution.</p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">
        <div className={`flex flex-col gap-2 ${formErrors.reasons ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="reasons">Reasons for your transfer request</label>
          <p className="text-[var(--color-mid-grey-00)]">
            Include any academic, personal, or financial reasons that make the transfer necessary. Provide as much detail as possible.
          </p>
          {formErrors.reasons && <span className="text-[var(--color-red-00)] font-bold">{formErrors.reasons}</span>}
          <textarea
            id="reasons"
            rows={8}
            value={h4.reasons || ''}
            onChange={e => handleUpdate('reasons', e.target.value)}
            className="border-2 border-[var(--color-black-00)] p-3 text-xl w-full focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
          />
        </div>

        <button type="submit" className="bg-[var(--color-teal-00)] text-white px-8 py-4 text-xl font-bold hover:bg-[var(--color-blue-00)] transition-colors">
          Continue
        </button>
      </form>
    </div>
  );
};
