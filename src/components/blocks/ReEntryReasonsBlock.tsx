/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const ReEntryReasonsBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const reEntry = state.reEntry || {};

  const handleUpdate = (field: string, value: any) => {
    updateState({ reEntry: { ...reEntry, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!reEntry.reasonsForReturn?.trim()) errors.reasonsForReturn = 'Explain your reasons for wanting to return to Barbados';
    if (!reEntry.intendedAddress?.trim()) errors.intendedAddress = 'Enter your intended address in Barbados';

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

      <h1 className="text-3xl md:text-4xl font-bold">Reasons for re-entry</h1>
      <p className="text-xl opacity-80">Explain why you wish to return to Barbados and provide your proposed entry details.</p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        <div className={fieldClass('reasonsForReturn')}>
          <label className="text-xl font-bold" htmlFor="reasonsForReturn">Reasons for wanting to return to Barbados</label>
          <p className="text-[var(--color-mid-grey-00)]">
            Explain your circumstances and why you believe re-entry should be permitted. Include any humanitarian, family, or economic reasons.
          </p>
          {formErrors.reasonsForReturn && <span className="text-[var(--color-red-00)] font-bold">{formErrors.reasonsForReturn}</span>}
          <textarea
            id="reasonsForReturn"
            rows={7}
            value={reEntry.reasonsForReturn || ''}
            onChange={e => handleUpdate('reasonsForReturn', e.target.value)}
            className={`${inputClass} w-full`}
          />
        </div>

        <div className={fieldClass('proposedEntryDate')}>
          <label className="text-xl font-bold" htmlFor="proposedEntryDate">
            Proposed entry date <span className="font-normal text-[var(--color-mid-grey-00)]">(optional)</span>
          </label>
          <p className="text-[var(--color-mid-grey-00)]">If known, when do you intend to enter Barbados?</p>
          {formErrors.proposedEntryDate && <span className="text-[var(--color-red-00)] font-bold">{formErrors.proposedEntryDate}</span>}
          <input
            id="proposedEntryDate"
            type="date"
            value={reEntry.proposedEntryDate || ''}
            onChange={e => handleUpdate('proposedEntryDate', e.target.value)}
            className={`${inputClass} w-56`}
          />
        </div>

        <div className={fieldClass('intendedAddress')}>
          <label className="text-xl font-bold" htmlFor="intendedAddress">Intended address in Barbados</label>
          <p className="text-[var(--color-mid-grey-00)]">Where do you intend to stay if re-entry is permitted?</p>
          {formErrors.intendedAddress && <span className="text-[var(--color-red-00)] font-bold">{formErrors.intendedAddress}</span>}
          <textarea
            id="intendedAddress"
            rows={3}
            value={reEntry.intendedAddress || ''}
            onChange={e => handleUpdate('intendedAddress', e.target.value)}
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
