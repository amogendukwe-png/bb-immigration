/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const NextOfKinBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const kin = state.nextOfKin || {};

  const handleUpdate = (field: string, value: string) => {
    updateState({ nextOfKin: { ...kin, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!kin.fullName)     errors.fullName     = 'Enter the full name of your next of kin';
    if (!kin.relationship) errors.relationship = 'Enter the relationship to the applicant';
    if (!kin.address)      errors.address      = 'Enter the address of your next of kin';
    if (!kin.telephone)    errors.telephone    = 'Enter a telephone number for your next of kin';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }

    setFormErrors({});
    goToNext();
  };

  return (
    <div className="space-y-8" id="next-of-kin-block">
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

      <h1 className="text-3xl md:text-4xl font-bold mb-2">Next of kin</h1>
      <p className="text-xl opacity-80 mb-4">
        Provide details of someone we can contact in an emergency.
      </p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        <div className={`flex flex-col gap-2 ${formErrors.fullName ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="nokFullName">Full name</label>
          {formErrors.fullName && <span className="text-[var(--color-red-00)] font-bold">{formErrors.fullName}</span>}
          <input
            id="nokFullName"
            className="border-2 border-black p-2 text-xl w-full focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
            value={kin.fullName || ''}
            onChange={(e) => handleUpdate('fullName', e.target.value)}
          />
        </div>

        <div className={`flex flex-col gap-2 ${formErrors.relationship ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="nokRelationship">Relationship to applicant</label>
          <span className="text-[var(--color-mid-grey-00)]">For example, mother, father, spouse, sibling</span>
          {formErrors.relationship && <span className="text-[var(--color-red-00)] font-bold">{formErrors.relationship}</span>}
          <input
            id="nokRelationship"
            className="border-2 border-black p-2 text-xl w-full focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
            value={kin.relationship || ''}
            onChange={(e) => handleUpdate('relationship', e.target.value)}
          />
        </div>

        <div className={`flex flex-col gap-2 ${formErrors.address ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="nokAddress">Address</label>
          {formErrors.address && <span className="text-[var(--color-red-00)] font-bold">{formErrors.address}</span>}
          <textarea
            id="nokAddress"
            rows={3}
            className="border-2 border-black p-2 text-xl w-full focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none resize-y"
            value={kin.address || ''}
            onChange={(e) => handleUpdate('address', e.target.value)}
          />
        </div>

        <div className={`flex flex-col gap-2 ${formErrors.telephone ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="nokTelephone">Telephone number</label>
          {formErrors.telephone && <span className="text-[var(--color-red-00)] font-bold">{formErrors.telephone}</span>}
          <input
            id="nokTelephone"
            type="tel"
            className="border-2 border-black p-2 text-xl max-w-[320px] focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
            value={kin.telephone || ''}
            onChange={(e) => handleUpdate('telephone', e.target.value)}
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
