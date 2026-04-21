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
      if (state.age === undefined) errors.age = 'Select your age range';
      if (state.isBarbadosCitizen === undefined) errors.isBarbadosCitizen = 'Select whether the subject is a Citizen of Barbados';
    } else if (journey === 'WORK_PERMIT') {
      if (state.subType === undefined) errors.subType = 'Select the type of work permit';
    } else if (journey === 'CITIZENSHIP') {
      if (state.subType === undefined) errors.subType = 'Select the basis of your citizenship claim';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }

    setFormErrors({});
    goToNext();
  };

  const renderPassportEligibility = () => (
    <>
      <div className={`p-4 ${formErrors.age ? 'border-l-4 border-[var(--bb-red)]' : ''}`}>
        <fieldset className="space-y-4">
          <legend className="text-xl font-bold mb-2">How old is the person the passport is for?</legend>
          {formErrors.age && <span className="text-[var(--bb-red)] font-bold block mb-2">{formErrors.age}</span>}
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer group p-3 border-2 border-transparent hover:border-[var(--bb-navy-mid)] transition-all">
              <input
                type="radio" name="age" className="w-8 h-8 cursor-pointer accent-[var(--bb-navy-mid)]"
                checked={state.subType === 'CHILD'}
                onChange={() => updateState({ subType: 'CHILD', age: 15 })}
              />
              <span className="text-lg">Under 16 years of age</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group p-3 border-2 border-transparent hover:border-[var(--bb-navy-mid)] transition-all">
              <input
                type="radio" name="age" className="w-8 h-8 cursor-pointer accent-[var(--bb-navy-mid)]"
                checked={state.subType === 'ADULT'}
                onChange={() => updateState({ subType: 'ADULT', age: 18 })}
              />
              <span className="text-lg">16 years of age or older</span>
            </label>
          </div>
        </fieldset>
      </div>

      <div className={`p-4 ${formErrors.isBarbadosCitizen ? 'border-l-4 border-[var(--bb-red)]' : ''}`}>
        <fieldset className="space-y-4">
          <legend className="text-xl font-bold mb-2">Is the applicant a Citizen of Barbados?</legend>
          {formErrors.isBarbadosCitizen && <span className="text-[var(--bb-red)] font-bold block mb-2">{formErrors.isBarbadosCitizen}</span>}
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer group p-3 border-2 border-transparent hover:border-[var(--bb-navy-mid)] transition-all">
              <input
                type="radio" name="isCitizen" className="w-8 h-8 cursor-pointer accent-[var(--bb-navy-mid)]"
                checked={state.isBarbadosCitizen === true}
                onChange={() => updateState({ isBarbadosCitizen: true })}
              />
              <span className="text-lg">Yes</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group p-3 border-2 border-transparent hover:border-[var(--bb-navy-mid)] transition-all">
              <input
                type="radio" name="isCitizen" className="w-8 h-8 cursor-pointer accent-[var(--bb-navy-mid)]"
                checked={state.isBarbadosCitizen === false}
                onChange={() => updateState({ isBarbadosCitizen: false })}
              />
              <span className="text-lg">No</span>
            </label>
          </div>
        </fieldset>
      </div>
    </>
  );

  const renderWorkPermitEligibility = () => (
    <div className={`p-4 ${formErrors.subType ? 'border-l-4 border-[var(--bb-red)]' : ''}`}>
      <fieldset className="space-y-4">
        <legend className="text-xl font-bold mb-2">Select the type of work permit you are applying for</legend>
        {formErrors.subType && <span className="text-[var(--bb-red)] font-bold block mb-2">{formErrors.subType}</span>}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer group p-3 border-2 border-transparent hover:border-[var(--bb-navy-mid)] transition-all">
            <input
              type="radio" name="subType" className="w-8 h-8 cursor-pointer accent-[var(--bb-navy-mid)]"
              checked={state.subType === 'C2'}
              onChange={() => updateState({ subType: 'C2' })}
            />
            <div>
              <span className="text-lg font-bold block">Long-term Work Permit (Form C2)</span>
              <span className="text-sm opacity-70 italic">For stays longer than 6 months</span>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group p-3 border-2 border-transparent hover:border-[var(--bb-navy-mid)] transition-all">
            <input
              type="radio" name="subType" className="w-8 h-8 cursor-pointer accent-[var(--bb-navy-mid)]"
              checked={state.subType === 'C3'}
              onChange={() => updateState({ subType: 'C3' })}
            />
            <div>
              <span className="text-lg font-bold block">Short-term Work Permit / Training (Form C3)</span>
              <span className="text-sm opacity-70 italic">For stays up to 6 months</span>
            </div>
          </label>
        </div>
      </fieldset>
    </div>
  );

  const renderCitizenshipEligibility = () => (
    <div className={`p-4 ${formErrors.subType ? 'border-l-4 border-[var(--bb-red)]' : ''}`}>
      <fieldset className="space-y-4">
        <legend className="text-xl font-bold mb-2">Select the basis of your citizenship claim</legend>
        {formErrors.subType && <span className="text-[var(--bb-red)] font-bold block mb-2">{formErrors.subType}</span>}
        <div className="flex flex-col gap-3">
          {[
            { id: 'DESCENT', label: 'By Descent', desc: 'If one or both of your parents are citizens of Barbados' },
            { id: 'MARRIAGE', label: 'By Marriage', desc: 'If you are married to a citizen of Barbados' },
            { id: 'REGISTRATION', label: 'By Registration', desc: 'Commonwealth citizens or other registration routes' }
          ].map(opt => (
            <label key={opt.id} className="flex items-center gap-3 cursor-pointer group p-3 border-2 border-transparent hover:border-[var(--bb-navy-mid)] transition-all">
              <input
                type="radio" name="subType" className="w-8 h-8 cursor-pointer accent-[var(--bb-navy-mid)]"
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

  const renderGenericEligibility = () => {
    if (journey === 'WORK_PERMIT') return renderWorkPermitEligibility();
    if (journey === 'CITIZENSHIP') return renderCitizenshipEligibility();

    return (
      <div className="p-4 bg-[var(--bb-gray)] border-l-4 border-[var(--bb-navy-mid)]">
        <p className="text-lg font-bold mb-2">Eligibility check for {journey}</p>
        <p>Please confirm you satisfy the initial requirements listed on the previous page.</p>
      </div>
    );
  };

  return (
    <div className="space-y-8" id="eligibility-block">
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

      <h1 className="text-3xl md:text-4xl font-bold mb-8 underline decoration-2 decoration-[var(--bb-navy-mid)] underline-offset-8">Eligibility</h1>
      <p className="text-xl mb-4 opacity-80">Answer these questions to see if you can use this service.</p>

      <form onSubmit={validateAndSubmit} className="space-y-12">
        {journey === 'PASSPORT' ? renderPassportEligibility() : renderGenericEligibility()}

        <button
          type="submit"
          className="bg-[var(--bb-navy-mid)] text-white px-8 py-3 rounded-sm font-bold text-xl hover:bg-[var(--bb-navy-dark)] active:translate-y-1 transition-all shadow-md focus:outline-none focus:ring-4 focus:ring-[var(--bb-focus)]"
          id="continue-button"
        >
          Continue
        </button>
      </form>
    </div>
  );
};
