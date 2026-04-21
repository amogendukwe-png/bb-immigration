/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const H3SchoolDetailsBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const school = state.h3School || {};

  const handleUpdate = (field: string, value: string) => {
    updateState({ h3School: { ...school, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!school.schoolName?.trim()) errors.schoolName = 'Enter the name of the school';
    if (!school.schoolOfficial?.trim()) errors.schoolOfficial = 'Enter the name of the school official';
    if (!school.schoolAddress?.trim()) errors.schoolAddress = 'Enter the address of the school';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }
    setFormErrors({});
    goToNext();
  };

  return (
    <div className="space-y-8" id="h3-school-details">
      <p className="border-l-4 border-[var(--color-blue-40)] pl-4 text-[var(--color-mid-grey-00)]">
        Form H-3 — Notice and Report Concerning Non-Immigrant Students
      </p>

      {Object.keys(formErrors).length > 0 && (
        <div className="border-[4px] border-[var(--color-red-00)] p-4 bg-white" role="alert">
          <h2 className="text-[var(--color-red-00)] text-xl font-bold mb-2">There is a problem</h2>
          <ul className="text-[var(--color-red-00)] list-inside list-disc underline font-medium">
            {Object.entries(formErrors).map(([key, val]) => (
              <li key={key}><a href={`#${key}`}>{val}</a></li>
            ))}
          </ul>
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold">School details</h1>
      <p className="text-xl opacity-80">Part I — Enter the details of the school submitting this report.</p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        <div className={`flex flex-col gap-2 ${formErrors.schoolName ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="schoolName">Name of school</label>
          {formErrors.schoolName && <span className="text-[var(--color-red-00)] font-bold">{formErrors.schoolName}</span>}
          <input
            id="schoolName"
            type="text"
            value={school.schoolName || ''}
            onChange={e => handleUpdate('schoolName', e.target.value)}
            className="border-2 border-[var(--color-black-00)] p-3 text-xl w-full focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
          />
        </div>

        <div className={`flex flex-col gap-2 ${formErrors.schoolOfficial ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="schoolOfficial">
            School official to be notified of student's arrival in Barbados
          </label>
          {formErrors.schoolOfficial && <span className="text-[var(--color-red-00)] font-bold">{formErrors.schoolOfficial}</span>}
          <input
            id="schoolOfficial"
            type="text"
            value={school.schoolOfficial || ''}
            onChange={e => handleUpdate('schoolOfficial', e.target.value)}
            className="border-2 border-[var(--color-black-00)] p-3 text-xl w-full focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
          />
        </div>

        <div className={`flex flex-col gap-2 ${formErrors.schoolAddress ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="schoolAddress">Address of school</label>
          {formErrors.schoolAddress && <span className="text-[var(--color-red-00)] font-bold">{formErrors.schoolAddress}</span>}
          <textarea
            id="schoolAddress"
            rows={3}
            value={school.schoolAddress || ''}
            onChange={e => handleUpdate('schoolAddress', e.target.value)}
            className="border-2 border-[var(--color-black-00)] p-3 text-xl w-full focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
          />
        </div>

        <button
          type="submit"
          className="bg-[var(--color-teal-00)] text-white px-8 py-4 text-xl font-bold hover:bg-[var(--color-blue-00)] transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  );
};
