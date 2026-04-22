/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const ReEntryEnforcementBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const reEntry = state.reEntry || {};

  const handleUpdate = (field: string, value: any) => {
    updateState({ reEntry: { ...reEntry, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!reEntry.dateOfRemoval) errors.dateOfRemoval = 'Enter the date you were removed or deported';
    if (!reEntry.portOfDeparture?.trim()) errors.portOfDeparture = 'Enter the port from which you departed';
    if (!reEntry.reasonForRemoval?.trim()) errors.reasonForRemoval = 'Enter the reason given for your removal or deportation';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }
    setFormErrors({});
    goToNext();
  };

  const inputClass = 'border-2 border-[var(--color-black-00)] p-3 text-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]';
  const fieldClass = (key: string) =>
    `flex flex-col gap-2 ${formErrors[key] ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`;

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

      <h1 className="text-3xl md:text-4xl font-bold">Previous removal or deportation</h1>
      <p className="text-xl opacity-80">
        Tell us about the circumstances of your removal or deportation from Barbados. This information is required to process your re-entry application.
      </p>

      <div className="bg-[var(--color-yellow-100)] border-l-4 border-[var(--color-black-00)] p-4">
        <p className="font-bold">Important</p>
        <p>You must provide accurate and complete information. Providing false information may result in your application being refused and further action being taken.</p>
      </div>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        <div className={fieldClass('dateOfRemoval')}>
          <label className="text-xl font-bold" htmlFor="dateOfRemoval">Date of removal or deportation</label>
          <p className="text-[var(--color-mid-grey-00)]">For example, 15 06 2022</p>
          {formErrors.dateOfRemoval && <span className="text-[var(--color-red-00)] font-bold">{formErrors.dateOfRemoval}</span>}
          <input
            id="dateOfRemoval"
            type="date"
            value={reEntry.dateOfRemoval || ''}
            onChange={e => handleUpdate('dateOfRemoval', e.target.value)}
            className={`${inputClass} w-56`}
          />
        </div>

        <div className={fieldClass('portOfDeparture')}>
          <label className="text-xl font-bold" htmlFor="portOfDeparture">Port of departure</label>
          <p className="text-[var(--color-mid-grey-00)]">The port, airport or border crossing from which you departed Barbados.</p>
          {formErrors.portOfDeparture && <span className="text-[var(--color-red-00)] font-bold">{formErrors.portOfDeparture}</span>}
          <input
            id="portOfDeparture"
            type="text"
            value={reEntry.portOfDeparture || ''}
            onChange={e => handleUpdate('portOfDeparture', e.target.value)}
            className={`${inputClass} w-full`}
          />
        </div>

        <div className={fieldClass('reasonForRemoval')}>
          <label className="text-xl font-bold" htmlFor="reasonForRemoval">Reason given for removal or deportation</label>
          <p className="text-[var(--color-mid-grey-00)]">State the reason as it was officially communicated to you.</p>
          {formErrors.reasonForRemoval && <span className="text-[var(--color-red-00)] font-bold">{formErrors.reasonForRemoval}</span>}
          <textarea
            id="reasonForRemoval"
            rows={4}
            value={reEntry.reasonForRemoval || ''}
            onChange={e => handleUpdate('reasonForRemoval', e.target.value)}
            className={`${inputClass} w-full`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl font-bold" htmlFor="additionalCircumstances">
            Additional circumstances <span className="font-normal text-[var(--color-mid-grey-00)]">(optional)</span>
          </label>
          <p className="text-[var(--color-mid-grey-00)]">Any other relevant context about the circumstances of your removal.</p>
          <textarea
            id="additionalCircumstances"
            rows={4}
            value={reEntry.additionalCircumstances || ''}
            onChange={e => handleUpdate('additionalCircumstances', e.target.value)}
            className={`${inputClass} w-full`}
          />
        </div>

        <button type="submit" className="bg-[var(--color-teal-00)] text-white px-8 py-4 text-xl font-bold hover:bg-[var(--color-blue-00)] transition-colors">
          Continue
        </button>
      </form>
    </div>
  );
};
