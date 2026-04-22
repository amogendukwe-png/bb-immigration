/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const RenunciationDetailsBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const renunciation = state.renunciation || {};

  const handleUpdate = (field: string, value: any) => {
    updateState({ renunciation: { ...renunciation, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!renunciation.otherCitizenshipCountry?.trim()) {
      errors.otherCitizenshipCountry = 'Enter the country of your other citizenship';
    }
    if (!renunciation.otherCitizenshipCertificate?.trim()) {
      errors.otherCitizenshipCertificate = 'Enter your citizenship certificate number or passport number';
    }
    if (!renunciation.otherCitizenshipDate) {
      errors.otherCitizenshipDate = 'Enter the date you acquired this citizenship';
    }

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

      <h1 className="text-3xl md:text-4xl font-bold">Other citizenship details</h1>
      <p className="text-xl opacity-80">
        To renounce your Barbadian citizenship, you must hold citizenship of another country. Tell us about your other citizenship.
      </p>

      <div className="bg-[var(--color-yellow-100)] border-l-4 border-[var(--color-black-00)] p-4">
        <p className="font-bold">Important</p>
        <p>Renunciation of citizenship is permanent and irreversible. You cannot re-apply for Barbadian citizenship on the same grounds once renunciation is complete.</p>
      </div>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        <div className={fieldClass('otherCitizenshipCountry')}>
          <label className="text-xl font-bold" htmlFor="otherCitizenshipCountry">Country of other citizenship</label>
          <p className="text-[var(--color-mid-grey-00)]">The country whose citizenship you currently hold or are in the process of acquiring.</p>
          {formErrors.otherCitizenshipCountry && <span className="text-[var(--color-red-00)] font-bold">{formErrors.otherCitizenshipCountry}</span>}
          <input
            id="otherCitizenshipCountry"
            type="text"
            value={renunciation.otherCitizenshipCountry || ''}
            onChange={e => handleUpdate('otherCitizenshipCountry', e.target.value)}
            className={`${inputClass} w-full`}
          />
        </div>

        <div className={fieldClass('otherCitizenshipCertificate')}>
          <label className="text-xl font-bold" htmlFor="otherCitizenshipCertificate">Citizenship certificate number or passport number</label>
          <p className="text-[var(--color-mid-grey-00)]">Provide the certificate or passport number that evidences your other citizenship.</p>
          {formErrors.otherCitizenshipCertificate && <span className="text-[var(--color-red-00)] font-bold">{formErrors.otherCitizenshipCertificate}</span>}
          <input
            id="otherCitizenshipCertificate"
            type="text"
            value={renunciation.otherCitizenshipCertificate || ''}
            onChange={e => handleUpdate('otherCitizenshipCertificate', e.target.value)}
            className={`${inputClass} w-72`}
          />
        </div>

        <div className={fieldClass('otherCitizenshipDate')}>
          <label className="text-xl font-bold" htmlFor="otherCitizenshipDate">Date citizenship was acquired</label>
          <p className="text-[var(--color-mid-grey-00)]">For example, 01 04 2020</p>
          {formErrors.otherCitizenshipDate && <span className="text-[var(--color-red-00)] font-bold">{formErrors.otherCitizenshipDate}</span>}
          <input
            id="otherCitizenshipDate"
            type="date"
            value={renunciation.otherCitizenshipDate || ''}
            onChange={e => handleUpdate('otherCitizenshipDate', e.target.value)}
            className={`${inputClass} w-56`}
          />
        </div>

        <button type="submit" className="bg-[var(--color-teal-00)] text-white px-8 py-4 text-xl font-bold hover:bg-[var(--color-blue-00)] transition-colors">
          Continue
        </button>
      </form>
    </div>
  );
};
