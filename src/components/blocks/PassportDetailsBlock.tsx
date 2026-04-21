/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const PassportDetailsBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const passport = state.passport || {};

  const handleUpdate = (field: string, value: any) => {
    updateState({
      passport: { ...passport, [field]: value }
    });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!passport.number) errors.number = 'Enter the passport number';
    if (!passport.expiryDate) errors.expiryDate = 'Enter the expiry date';
    if (!passport.countryOfIssue) errors.countryOfIssue = 'Enter the country of issue';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }

    setFormErrors({});
    goToNext();
  };

  return (
    <div className="space-y-8" id="passport-details-block">
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

      <h1 className="text-3xl md:text-4xl font-bold mb-8">Passport details</h1>
      <p className="text-xl mb-12 opacity-80">Enter the details from your current valid passport.</p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">
        <div className={`flex flex-col gap-2 ${formErrors.number ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="passportNumber">Passport number</label>
          {formErrors.number && <span className="text-[var(--color-red-00)] font-bold">{formErrors.number}</span>}
          <input
            id="passportNumber"
            className="border-2 border-black p-2 text-xl w-full max-w-[300px] uppercase focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
            value={passport.number || ''}
            onChange={(e) => handleUpdate('number', e.target.value)}
          />
        </div>

        <div className={`flex flex-col gap-2 ${formErrors.expiryDate ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="expiryDate">Expiration date of passport</label>
          <span className="text-[var(--color-mid-grey-00)]">For example, 27 6 2028</span>
          {formErrors.expiryDate && <span className="text-[var(--color-red-00)] font-bold">{formErrors.expiryDate}</span>}
          <input
            id="expiryDate"
            type="date"
            className="border-2 border-black p-2 text-xl max-w-[300px] focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
            value={passport.expiryDate || ''}
            onChange={(e) => handleUpdate('expiryDate', e.target.value)}
          />
        </div>

        <div className={`flex flex-col gap-2 ${formErrors.countryOfIssue ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="countryOfIssue">Country which issued passport</label>
          {formErrors.countryOfIssue && <span className="text-[var(--color-red-00)] font-bold">{formErrors.countryOfIssue}</span>}
          <input
            id="countryOfIssue"
            className="border-2 border-black p-2 text-xl w-full focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
            value={passport.countryOfIssue || ''}
            onChange={(e) => handleUpdate('countryOfIssue', e.target.value)}
            placeholder="e.g. Barbados"
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
