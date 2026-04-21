/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const PersonalDetailsBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const details = state.personalDetails || {};

  const handleUpdate = (field: string, value: any) => {
    updateState({
      personalDetails: { ...details, [field]: value }
    });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!details.firstName) errors.firstName = 'Enter given names';
    if (!details.lastName) errors.lastName = 'Enter family name';
    if (!details.dateOfBirth) errors.dateOfBirth = 'Enter date of birth';
    if (!details.sex) errors.sex = 'Select sex';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }

    setFormErrors({});
    goToNext();
  };

  return (
    <div className="space-y-8" id="personal-details-block">
      {Object.keys(formErrors).length > 0 && (
        <div className="border-[4px] border-[var(--bb-red)] p-4 mb-8 bg-white" role="alert" id="error-summary">
          <h2 className="text-[var(--bb-red)] text-xl font-bold mb-2">There is a problem</h2>
          <ul className="text-[var(--bb-red)] list-inside list-disc underline font-medium">
            {Object.entries(formErrors).map(([key, value]) => (
              <li key={key}><a href={`#${key}`}>{value}</a></li>
            ))}
          </ul>
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold mb-8">Personal details</h1>
      <p className="text-xl mb-4 opacity-80">Enter details exactly as they appear on official documents.</p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">
        <div className={`flex flex-col gap-2 ${formErrors.lastName ? 'border-l-4 border-[var(--bb-red)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="lastName">Family name (Surname)</label>
          <span className="text-[var(--bb-text-gray)]">In capital letters, e.g. BRATHWAITE</span>
          {formErrors.lastName && <span className="text-[var(--bb-red)] font-bold">{formErrors.lastName}</span>}
          <input
            id="lastName"
            className="border-2 border-black p-2 text-xl w-full uppercase focus:ring-4 focus:ring-[var(--bb-focus)] focus:outline-none"
            value={details.lastName || ''}
            onChange={(e) => handleUpdate('lastName', e.target.value)}
          />
        </div>

        <div className={`flex flex-col gap-2 ${formErrors.firstName ? 'border-l-4 border-[var(--bb-red)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="firstName">First and middle names</label>
          <span className="text-[var(--bb-text-gray)]">In capital letters, as they appear on the birth certificate</span>
          {formErrors.firstName && <span className="text-[var(--bb-red)] font-bold">{formErrors.firstName}</span>}
          <input
            id="firstName"
            className="border-2 border-black p-2 text-xl w-full uppercase focus:ring-4 focus:ring-[var(--bb-focus)] focus:outline-none"
            value={details.firstName || ''}
            onChange={(e) => handleUpdate('firstName', e.target.value)}
          />
        </div>

        <div className={`flex flex-col gap-2 ${formErrors.dateOfBirth ? 'border-l-4 border-[var(--bb-red)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="dob">Date of birth</label>
          <span className="text-[var(--bb-text-gray)]">For example, 31 3 1980</span>
          {formErrors.dateOfBirth && <span className="text-[var(--bb-red)] font-bold">{formErrors.dateOfBirth}</span>}
          <input
            id="dob"
            type="date"
            className="border-2 border-black p-2 text-xl max-w-[300px] focus:ring-4 focus:ring-[var(--bb-focus)] focus:outline-none"
            value={details.dateOfBirth || ''}
            onChange={(e) => handleUpdate('dateOfBirth', e.target.value)}
          />
        </div>

        <div className={`flex flex-col gap-2 ${formErrors.sex ? 'border-l-4 border-[var(--bb-red)] pl-4' : ''}`}>
          <fieldset className="space-y-4">
            <legend className="text-xl font-bold" id="sex">Sex</legend>
            {formErrors.sex && <span className="text-[var(--bb-red)] font-bold block">{formErrors.sex}</span>}
            <div className="flex gap-6">
              {['MALE', 'FEMALE'].map((s) => (
                <label key={s} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio" name="sex" className="w-6 h-6 cursor-pointer accent-[var(--bb-navy-mid)]"
                    checked={details.sex === s}
                    onChange={() => handleUpdate('sex', s)}
                  />
                  <span className="text-lg uppercase">{s.toLowerCase()}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <button
          type="submit"
          className="bg-[var(--bb-navy-mid)] text-white px-8 py-3 rounded-sm font-bold text-xl hover:bg-[var(--bb-navy-dark)] active:translate-y-1 transition-all shadow-md focus:ring-4 focus:ring-[var(--bb-focus)] focus:outline-none"
          id="continue-button"
        >
          Save and continue
        </button>
      </form>
    </div>
  );
};
