/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const ParentsConsentBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const pc = state.parentsConsent || {};

  const handleUpdate = (field: string, value: string | boolean) => {
    updateState({ parentsConsent: { ...pc, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!pc.parent1Name)         errors.parent1Name         = 'Enter the name of parent or guardian 1';
    if (!pc.parent1Nationality)  errors.parent1Nationality  = 'Enter the nationality of parent or guardian 1';
    if (!pc.parent1Relationship) errors.parent1Relationship = 'Enter the relationship to the applicant';
    if (pc.consentGiven !== true) errors.consentGiven       = 'You must confirm that consent has been given';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }

    setFormErrors({});
    goToNext();
  };

  return (
    <div className="space-y-8" id="parents-consent-block">
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

      <h1 className="text-3xl md:text-4xl font-bold mb-2">Parental or guardian consent</h1>
      <p className="text-xl opacity-80 mb-4">
        Because this applicant is aged 16 or 17, consent from a parent or guardian is required.
        Both parents must consent where possible.
      </p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        {/* Parent / Guardian 1 */}
        <fieldset className="space-y-6 p-4 border-2 border-[var(--color-grey-00)]">
          <legend className="text-xl font-bold px-2">Parent or guardian 1</legend>

          <div className={`flex flex-col gap-2 ${formErrors.parent1Name ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
            <label className="text-xl font-bold" htmlFor="p1Name">Full name</label>
            {formErrors.parent1Name && <span className="text-[var(--color-red-00)] font-bold">{formErrors.parent1Name}</span>}
            <input
              id="p1Name"
              className="border-2 border-black p-2 text-xl w-full focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
              value={pc.parent1Name || ''}
              onChange={(e) => handleUpdate('parent1Name', e.target.value)}
            />
          </div>

          <div className={`flex flex-col gap-2 ${formErrors.parent1Nationality ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
            <label className="text-xl font-bold" htmlFor="p1Nationality">Nationality</label>
            {formErrors.parent1Nationality && <span className="text-[var(--color-red-00)] font-bold">{formErrors.parent1Nationality}</span>}
            <input
              id="p1Nationality"
              className="border-2 border-black p-2 text-xl w-full focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
              value={pc.parent1Nationality || ''}
              onChange={(e) => handleUpdate('parent1Nationality', e.target.value)}
            />
          </div>

          <div className={`flex flex-col gap-2 ${formErrors.parent1Relationship ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
            <label className="text-xl font-bold" htmlFor="p1Relationship">Relationship to applicant</label>
            <span className="text-[var(--color-mid-grey-00)]">For example, mother, father, legal guardian</span>
            {formErrors.parent1Relationship && <span className="text-[var(--color-red-00)] font-bold">{formErrors.parent1Relationship}</span>}
            <input
              id="p1Relationship"
              className="border-2 border-black p-2 text-xl w-full focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
              value={pc.parent1Relationship || ''}
              onChange={(e) => handleUpdate('parent1Relationship', e.target.value)}
            />
          </div>
        </fieldset>

        {/* Parent / Guardian 2 (optional) */}
        <fieldset className="space-y-6 p-4 border-2 border-[var(--color-grey-00)]">
          <legend className="text-xl font-bold px-2">
            Parent or guardian 2 <span className="font-normal text-[var(--color-mid-grey-00)]">(if applicable)</span>
          </legend>

          <div className="flex flex-col gap-2">
            <label className="text-xl font-bold" htmlFor="p2Name">Full name</label>
            <input
              id="p2Name"
              className="border-2 border-black p-2 text-xl w-full focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
              value={pc.parent2Name || ''}
              onChange={(e) => handleUpdate('parent2Name', e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xl font-bold" htmlFor="p2Nationality">Nationality</label>
            <input
              id="p2Nationality"
              className="border-2 border-black p-2 text-xl w-full focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
              value={pc.parent2Nationality || ''}
              onChange={(e) => handleUpdate('parent2Nationality', e.target.value)}
            />
          </div>
        </fieldset>

        {/* Consent declaration */}
        <div className={`${formErrors.consentGiven ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          {formErrors.consentGiven && (
            <span className="text-[var(--color-red-00)] font-bold block mb-2">{formErrors.consentGiven}</span>
          )}
          <label className="flex items-start gap-3 cursor-pointer p-4 border-2 border-[var(--color-grey-00)] hover:border-[var(--color-teal-00)] transition-all">
            <input
              type="checkbox"
              className="w-8 h-8 mt-1 cursor-pointer accent-[var(--color-teal-00)] flex-shrink-0"
              checked={pc.consentGiven === true}
              onChange={(e) => handleUpdate('consentGiven', e.target.checked)}
            />
            <span className="text-lg leading-snug">
              I confirm that all named parents or guardians above have given their consent for this passport application,
              and that the information provided is correct to the best of my knowledge.
            </span>
          </label>
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
