/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const EligibilityBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});
  const journey = state.journeyType;

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (journey === 'PASSPORT') {
      if (state.age === undefined)             errors.age            = 'Select the age range of the applicant';
      if (state.isBarbadosCitizen === undefined) errors.isBarbadosCitizen = 'Select whether the applicant is a citizen of Barbados';
    } else if (journey === 'WORK_PERMIT') {
      if (!state.subType) errors.subType = 'Select the type of work permit';
    } else if (journey === 'CITIZENSHIP') {
      if (!state.subType)               errors.subType    = 'Select the basis of your citizenship claim';
      if (state.isUnder18 === undefined) errors.isUnder18  = 'Select whether the applicant is under 18 years of age';
    } else if (journey === 'RESIDENCY') {
      if (!state.subType) errors.subType = 'Select the type of residency application';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }

    setFormErrors({});
    goToNext();
  };

  // ── Passport eligibility ───────────────────────────────────────
  const renderPassportEligibility = () => (
    <>
      <div className={`p-4 ${formErrors.age ? 'border-l-4 border-[var(--color-red-00)]' : ''}`}>
        <fieldset className="space-y-4">
          <legend className="text-xl font-bold mb-2">How old is the person the passport is for?</legend>
          {formErrors.age && <span className="text-[var(--color-red-00)] font-bold block mb-2">{formErrors.age}</span>}
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer p-3 border-2 border-transparent hover:border-[var(--color-teal-00)] transition-all">
              <input
                type="radio" name="age" className="w-8 h-8 cursor-pointer accent-[var(--color-teal-00)]"
                checked={state.age === 15}
                onChange={() => updateState({ age: 15, subType: 'CHILD' })}
              />
              <div>
                <span className="text-lg font-bold block">Under 16 years of age</span>
                <span className="text-sm opacity-70 italic">Child passport (Form B)</span>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 border-2 border-transparent hover:border-[var(--color-teal-00)] transition-all">
              <input
                type="radio" name="age" className="w-8 h-8 cursor-pointer accent-[var(--color-teal-00)]"
                checked={state.age === 17}
                onChange={() => updateState({ age: 17, subType: 'YOUNG_ADULT' })}
              />
              <div>
                <span className="text-lg font-bold block">16 or 17 years of age</span>
                <span className="text-sm opacity-70 italic">Adult passport with parental consent required (Form A)</span>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 border-2 border-transparent hover:border-[var(--color-teal-00)] transition-all">
              <input
                type="radio" name="age" className="w-8 h-8 cursor-pointer accent-[var(--color-teal-00)]"
                checked={state.age === 18}
                onChange={() => updateState({ age: 18, subType: 'ADULT' })}
              />
              <div>
                <span className="text-lg font-bold block">18 years of age or older</span>
                <span className="text-sm opacity-70 italic">Adult passport (Form A)</span>
              </div>
            </label>
          </div>
        </fieldset>
      </div>

      <div className={`p-4 ${formErrors.isBarbadosCitizen ? 'border-l-4 border-[var(--color-red-00)]' : ''}`}>
        <fieldset className="space-y-4">
          <legend className="text-xl font-bold mb-2">Is the applicant a citizen of Barbados?</legend>
          {formErrors.isBarbadosCitizen && (
            <span className="text-[var(--color-red-00)] font-bold block mb-2">{formErrors.isBarbadosCitizen}</span>
          )}
          <div className="flex flex-col gap-3">
            {[{ v: true, label: 'Yes' }, { v: false, label: 'No' }].map(opt => (
              <label key={String(opt.v)} className="flex items-center gap-3 cursor-pointer p-3 border-2 border-transparent hover:border-[var(--color-teal-00)] transition-all">
                <input
                  type="radio" name="isCitizen" className="w-8 h-8 cursor-pointer accent-[var(--color-teal-00)]"
                  checked={state.isBarbadosCitizen === opt.v}
                  onChange={() => updateState({ isBarbadosCitizen: opt.v })}
                />
                <span className="text-lg">{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Born abroad — sets routing flag */}
      <div className="p-4">
        <fieldset className="space-y-4">
          <legend className="text-xl font-bold mb-2">Was the applicant born outside of Barbados?</legend>
          <div className="flex flex-col gap-3">
            {[{ v: true, label: 'Yes' }, { v: false, label: 'No' }].map(opt => (
              <label key={String(opt.v)} className="flex items-center gap-3 cursor-pointer p-3 border-2 border-transparent hover:border-[var(--color-teal-00)] transition-all">
                <input
                  type="radio" name="bornAbroad" className="w-8 h-8 cursor-pointer accent-[var(--color-teal-00)]"
                  checked={state.bornAbroad === opt.v}
                  onChange={() => updateState({ bornAbroad: opt.v })}
                />
                <span className="text-lg">{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </>
  );

  // ── Work permit eligibility ────────────────────────────────────
  const renderWorkPermitEligibility = () => (
    <div className={`p-4 ${formErrors.subType ? 'border-l-4 border-[var(--color-red-00)]' : ''}`}>
      <fieldset className="space-y-4">
        <legend className="text-xl font-bold mb-2">Select the type of work permit you are applying for</legend>
        {formErrors.subType && <span className="text-[var(--color-red-00)] font-bold block mb-2">{formErrors.subType}</span>}
        <div className="flex flex-col gap-3">
          {[
            { id: 'C2', label: 'Long-term Work Permit (Form C2)', desc: 'For stays longer than 6 months' },
            { id: 'C3', label: 'Short-term Work Permit / Training (Form C3)', desc: 'For stays up to 6 months' },
          ].map(opt => (
            <label key={opt.id} className="flex items-center gap-3 cursor-pointer p-3 border-2 border-transparent hover:border-[var(--color-teal-00)] transition-all">
              <input
                type="radio" name="subType" className="w-8 h-8 cursor-pointer accent-[var(--color-teal-00)]"
                checked={state.subType === opt.id}
                onChange={() => updateState({ subType: opt.id })}
              />
              <div>
                <span className="text-lg font-bold block">{opt.label}</span>
                <span className="text-sm opacity-70 italic">{opt.desc}</span>
              </div>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );

  // ── Citizenship eligibility ────────────────────────────────────
  const renderCitizenshipEligibility = () => (
    <>
      <div className={`p-4 ${formErrors.subType ? 'border-l-4 border-[var(--color-red-00)]' : ''}`}>
        <fieldset className="space-y-4">
          <legend className="text-xl font-bold mb-2">Select the basis of your citizenship claim</legend>
          {formErrors.subType && <span className="text-[var(--color-red-00)] font-bold block mb-2">{formErrors.subType}</span>}
          <div className="flex flex-col gap-3">
            {[
              { id: 'DESCENT',      label: 'By Descent',      desc: 'One or both parents are citizens of Barbados — applies Form R1 (adult) or R2 (under 18)' },
              { id: 'MARRIAGE',     label: 'By Marriage',     desc: 'Married to a citizen of Barbados — Form R3' },
              { id: 'REGISTRATION', label: 'By Registration', desc: 'Commonwealth citizens or other routes — Form R4 (adult) or R4A (under 18)' },
            ].map(opt => (
              <label key={opt.id} className="flex items-center gap-3 cursor-pointer p-3 border-2 border-transparent hover:border-[var(--color-teal-00)] transition-all">
                <input
                  type="radio" name="subType" className="w-8 h-8 cursor-pointer accent-[var(--color-teal-00)]"
                  checked={state.subType === opt.id}
                  onChange={() => updateState({ subType: opt.id })}
                />
                <div>
                  <span className="text-lg font-bold block">{opt.label}</span>
                  <span className="text-sm opacity-70 italic">{opt.desc}</span>
                </div>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Age gate — only relevant for descent and registration */}
      {(state.subType === 'DESCENT' || state.subType === 'REGISTRATION') && (
        <div className={`p-4 ${formErrors.isUnder18 ? 'border-l-4 border-[var(--color-red-00)]' : ''}`}>
          <fieldset className="space-y-4">
            <legend className="text-xl font-bold mb-2">Is the applicant under 18 years of age?</legend>
            {formErrors.isUnder18 && <span className="text-[var(--color-red-00)] font-bold block mb-2">{formErrors.isUnder18}</span>}
            <div className="flex flex-col gap-3">
              {[{ v: true, label: 'Yes — under 18' }, { v: false, label: 'No — 18 or older' }].map(opt => (
                <label key={String(opt.v)} className="flex items-center gap-3 cursor-pointer p-3 border-2 border-transparent hover:border-[var(--color-teal-00)] transition-all">
                  <input
                    type="radio" name="isUnder18" className="w-8 h-8 cursor-pointer accent-[var(--color-teal-00)]"
                    checked={state.isUnder18 === opt.v}
                    onChange={() => updateState({ isUnder18: opt.v })}
                  />
                  <span className="text-lg">{opt.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      )}
    </>
  );

  // ── Residency eligibility ──────────────────────────────────────
  const renderResidencyEligibility = () => (
    <div className={`p-4 ${formErrors.subType ? 'border-l-4 border-[var(--color-red-00)]' : ''}`}>
      <fieldset className="space-y-4">
        <legend className="text-xl font-bold mb-2">Select the type of residency application</legend>
        {formErrors.subType && <span className="text-[var(--color-red-00)] font-bold block mb-2">{formErrors.subType}</span>}
        <div className="flex flex-col gap-3">
          {[
            { id: 'A',  label: 'Permanent Residency (Form A)',           desc: 'For individuals seeking to reside permanently in Barbados' },
            { id: 'A1', label: 'Returning National / Long Stay (Form A1)', desc: 'For Barbadian nationals returning to reside permanently' },
          ].map(opt => (
            <label key={opt.id} className="flex items-center gap-3 cursor-pointer p-3 border-2 border-transparent hover:border-[var(--color-teal-00)] transition-all">
              <input
                type="radio" name="subType" className="w-8 h-8 cursor-pointer accent-[var(--color-teal-00)]"
                checked={state.subType === opt.id}
                onChange={() => updateState({ subType: opt.id })}
              />
              <div>
                <span className="text-lg font-bold block">{opt.label}</span>
                <span className="text-sm opacity-70 italic">{opt.desc}</span>
              </div>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );

  const renderContent = () => {
    if (journey === 'PASSPORT')    return renderPassportEligibility();
    if (journey === 'WORK_PERMIT') return renderWorkPermitEligibility();
    if (journey === 'CITIZENSHIP') return renderCitizenshipEligibility();
    if (journey === 'RESIDENCY')   return renderResidencyEligibility();
    return (
      <div className="p-4 bg-[var(--color-white-00)] border-l-4 border-[var(--color-teal-00)]">
        <p className="text-lg font-bold mb-2">Eligibility check for {journey}</p>
        <p>Please confirm you satisfy the initial requirements listed on the previous page.</p>
      </div>
    );
  };

  return (
    <div className="space-y-8" id="eligibility-block">
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

      <h1 className="text-3xl md:text-4xl font-bold mb-8 underline decoration-2 decoration-[var(--color-teal-00)] underline-offset-8">
        Eligibility
      </h1>
      <p className="text-xl mb-4 opacity-80">Answer these questions to see if you can use this service.</p>

      <form onSubmit={validateAndSubmit} className="space-y-12">
        {renderContent()}
        <button
          type="submit"
          className="bg-[var(--color-teal-00)] text-white px-8 py-3 rounded-sm font-bold text-xl hover:bg-[var(--color-blue-00)] active:translate-y-1 transition-all shadow-md focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
          id="continue-button"
        >
          Continue
        </button>
      </form>
    </div>
  );
};
