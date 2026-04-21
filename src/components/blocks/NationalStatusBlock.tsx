/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

const HOW_ACQUIRED_OPTIONS = [
  { id: 'BIRTH',         label: 'By birth in Barbados' },
  { id: 'DESCENT',       label: 'By descent — parent is a Barbadian citizen' },
  { id: 'REGISTRATION',  label: 'By registration' },
  { id: 'MARRIAGE',      label: 'By marriage to a Barbadian citizen' },
  { id: 'NATURALISATION', label: 'By naturalisation' },
] as const;

export const NationalStatusBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const ns = state.nationalStatus || {};

  const handleUpdate = (field: string, value: string) => {
    updateState({ nationalStatus: { ...ns, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!ns.howAcquired) errors.howAcquired = 'Select how Barbadian citizenship was acquired';
    if (ns.howAcquired && ns.howAcquired !== 'BIRTH' && !ns.certificateNumber) {
      errors.certificateNumber = 'Enter your certificate or registration number';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }

    setFormErrors({});
    goToNext();
  };

  return (
    <div className="space-y-8" id="national-status-block">
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

      <h1 className="text-3xl md:text-4xl font-bold mb-2">National status</h1>
      <p className="text-xl opacity-80 mb-4">
        Tell us how the applicant acquired Barbadian citizenship.
      </p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        <div className={`${formErrors.howAcquired ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <fieldset className="space-y-4">
            <legend className="text-xl font-bold mb-2">How was Barbadian citizenship acquired?</legend>
            {formErrors.howAcquired && (
              <span className="text-[var(--color-red-00)] font-bold block mb-2">{formErrors.howAcquired}</span>
            )}
            <div className="flex flex-col gap-3">
              {HOW_ACQUIRED_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-center gap-3 cursor-pointer p-3 border-2 border-transparent hover:border-[var(--color-teal-00)] transition-all"
                >
                  <input
                    type="radio"
                    name="howAcquired"
                    className="w-8 h-8 cursor-pointer accent-[var(--color-teal-00)]"
                    checked={ns.howAcquired === opt.id}
                    onChange={() => handleUpdate('howAcquired', opt.id)}
                  />
                  <span className="text-lg">{opt.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {ns.howAcquired && ns.howAcquired !== 'BIRTH' && (
          <>
            <div className={`flex flex-col gap-2 ${formErrors.certificateNumber ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
              <label className="text-xl font-bold" htmlFor="certificateNumber">
                Certificate / registration number
              </label>
              <span className="text-[var(--color-mid-grey-00)]">
                Found on your naturalisation, registration, or citizenship certificate
              </span>
              {formErrors.certificateNumber && (
                <span className="text-[var(--color-red-00)] font-bold">{formErrors.certificateNumber}</span>
              )}
              <input
                id="certificateNumber"
                className="border-2 border-black p-2 text-xl w-full uppercase focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
                value={ns.certificateNumber || ''}
                onChange={(e) => handleUpdate('certificateNumber', e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xl font-bold" htmlFor="previousNationality">
                Previous nationality <span className="font-normal text-[var(--color-mid-grey-00)]">(optional)</span>
              </label>
              <span className="text-[var(--color-mid-grey-00)]">
                Your nationality before you became a Barbadian citizen
              </span>
              <input
                id="previousNationality"
                className="border-2 border-black p-2 text-xl w-full focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
                value={ns.previousNationality || ''}
                onChange={(e) => handleUpdate('previousNationality', e.target.value)}
              />
            </div>
          </>
        )}

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
