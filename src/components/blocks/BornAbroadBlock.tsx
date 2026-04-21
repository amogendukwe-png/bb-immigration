/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const BornAbroadBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const details = state.bornAbroadDetails || {};

  const handleUpdate = (field: string, value: string) => {
    updateState({ bornAbroadDetails: { ...details, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!details.countryOfBirth) errors.countryOfBirth = 'Enter the country of birth';
    if (!details.dateOfArrival)  errors.dateOfArrival  = 'Enter the date of arrival in Barbados';
    if (!details.portOfEntry)    errors.portOfEntry    = 'Enter the port of entry';
    if (!details.howBecameCitizen) errors.howBecameCitizen = 'Explain how citizenship was obtained';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }

    setFormErrors({});
    goToNext();
  };

  return (
    <div className="space-y-8" id="born-abroad-block">
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

      <h1 className="text-3xl md:text-4xl font-bold mb-2">Born outside of Barbados</h1>
      <p className="text-xl opacity-80 mb-4">
        Because the applicant was born outside of Barbados, we need a few extra details.
      </p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        <div className={`flex flex-col gap-2 ${formErrors.countryOfBirth ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="countryOfBirth">Country of birth</label>
          {formErrors.countryOfBirth && <span className="text-[var(--color-red-00)] font-bold">{formErrors.countryOfBirth}</span>}
          <input
            id="countryOfBirth"
            className="border-2 border-black p-2 text-xl w-full focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
            value={details.countryOfBirth || ''}
            onChange={(e) => handleUpdate('countryOfBirth', e.target.value)}
          />
        </div>

        <div className={`flex flex-col gap-2 ${formErrors.dateOfArrival ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="dateOfArrival">Date of first arrival in Barbados</label>
          <span className="text-[var(--color-mid-grey-00)]">For example, 15 06 1995</span>
          {formErrors.dateOfArrival && <span className="text-[var(--color-red-00)] font-bold">{formErrors.dateOfArrival}</span>}
          <input
            id="dateOfArrival"
            type="date"
            className="border-2 border-black p-2 text-xl max-w-[300px] focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
            value={details.dateOfArrival || ''}
            onChange={(e) => handleUpdate('dateOfArrival', e.target.value)}
          />
        </div>

        <div className={`flex flex-col gap-2 ${formErrors.portOfEntry ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="portOfEntry">Port of entry</label>
          <span className="text-[var(--color-mid-grey-00)]">For example, Grantley Adams International Airport</span>
          {formErrors.portOfEntry && <span className="text-[var(--color-red-00)] font-bold">{formErrors.portOfEntry}</span>}
          <input
            id="portOfEntry"
            className="border-2 border-black p-2 text-xl w-full focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
            value={details.portOfEntry || ''}
            onChange={(e) => handleUpdate('portOfEntry', e.target.value)}
          />
        </div>

        <div className={`flex flex-col gap-2 ${formErrors.howBecameCitizen ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="howBecameCitizen">How did the applicant become a Barbadian citizen?</label>
          <span className="text-[var(--color-mid-grey-00)]">For example, by registration, by naturalisation, or by descent</span>
          {formErrors.howBecameCitizen && <span className="text-[var(--color-red-00)] font-bold">{formErrors.howBecameCitizen}</span>}
          <textarea
            id="howBecameCitizen"
            rows={3}
            className="border-2 border-black p-2 text-xl w-full focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none resize-y"
            value={details.howBecameCitizen || ''}
            onChange={(e) => handleUpdate('howBecameCitizen', e.target.value)}
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
