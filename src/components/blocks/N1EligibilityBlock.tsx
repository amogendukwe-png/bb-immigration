/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const N1EligibilityBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const n1 = state.n1 || {};

  const handleN1Update = (field: string, value: any) => {
    updateState({ n1: { ...n1, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!n1.applicantType) errors.applicantType = 'Select whether you are applying as an Alien or British Protected Person';
    if (!n1.yearsResident?.trim()) errors.yearsResident = 'Enter how long you have resided in Barbados';
    if (n1.intendedToRemain === undefined) errors.intendedToRemain = 'Confirm whether you intend to remain in Barbados';
    if (n1.goodCharacter === undefined) errors.goodCharacter = 'Confirm your good character declaration';
    if (n1.languageKnowledge === undefined) errors.languageKnowledge = 'Confirm your English language knowledge';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }

    // Basic eligibility gate — must intend to remain and be of good character
    if (n1.intendedToRemain === false || n1.goodCharacter === false) {
      setFormErrors({});
      updateState({ isBarbadosCitizen: true }); // signals ineligible in routing
      goToNext();
      return;
    }

    updateState({ isBarbadosCitizen: false }); // signals eligible
    setFormErrors({});
    goToNext();
  };

  const radioGroup = (
    fieldKey: string,
    label: string,
    hint: string | null,
    current: boolean | undefined,
    onChange: (val: boolean) => void
  ) => (
    <div className={`flex flex-col gap-2 ${formErrors[fieldKey] ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
      <p className="text-xl font-bold">{label}</p>
      {hint && <p className="text-[var(--color-mid-grey-00)]">{hint}</p>}
      {formErrors[fieldKey] && <span className="text-[var(--color-red-00)] font-bold">{formErrors[fieldKey]}</span>}
      <div className="flex flex-col gap-3 mt-1">
        {[{ label: 'Yes', val: true }, { label: 'No', val: false }].map(opt => (
          <label key={String(opt.val)} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name={fieldKey}
              checked={current === opt.val}
              onChange={() => onChange(opt.val)}
              className="w-6 h-6 accent-[var(--color-teal-00)]"
            />
            <span className="text-xl">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

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

      <h1 className="text-3xl md:text-4xl font-bold">Check you can apply</h1>
      <p className="text-xl opacity-80">
        Before you apply for naturalisation, confirm that you meet the eligibility requirements under the Barbados Citizenship Act.
      </p>

      <div className="bg-white border-l-4 border-[var(--color-teal-00)] p-6 space-y-3 max-w-2xl">
        <p className="font-bold text-lg">Who can apply?</p>
        <p>You may apply for naturalisation if you are an <strong>alien</strong> who has resided in Barbados for a continuous period of at least <strong>5 years</strong>, or if you are a <strong>British Protected Person</strong> who has resided in Barbados for at least <strong>1 year</strong>.</p>
        <p>You must also intend to remain in Barbados, be of good character, and have an adequate knowledge of the English language.</p>
      </div>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        {/* Applicant type */}
        <div className={`flex flex-col gap-2 ${formErrors.applicantType ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <p className="text-xl font-bold" id="applicantType">I am applying as</p>
          {formErrors.applicantType && <span className="text-[var(--color-red-00)] font-bold">{formErrors.applicantType}</span>}
          <div className="flex flex-col gap-3 mt-1">
            {[
              { label: 'An alien (non-Commonwealth citizen)', val: 'ALIEN' as const, hint: 'Requires 5 years continuous residence' },
              { label: 'A British Protected Person', val: 'BPP' as const, hint: 'Requires 1 year continuous residence' },
            ].map(opt => (
              <label key={opt.val} className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="applicantType"
                  checked={n1.applicantType === opt.val}
                  onChange={() => handleN1Update('applicantType', opt.val)}
                  className="w-6 h-6 accent-[var(--color-teal-00)] mt-1"
                />
                <span>
                  <span className="text-xl block">{opt.label}</span>
                  <span className="text-[var(--color-mid-grey-00)] text-base">{opt.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Years of residence */}
        <div className={`flex flex-col gap-2 ${formErrors.yearsResident ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="yearsResident">
            How long have you resided continuously in Barbados?
          </label>
          <p className="text-[var(--color-mid-grey-00)]">For example, 5 years 3 months</p>
          {formErrors.yearsResident && <span className="text-[var(--color-red-00)] font-bold">{formErrors.yearsResident}</span>}
          <input
            id="yearsResident"
            type="text"
            value={n1.yearsResident || ''}
            onChange={e => handleN1Update('yearsResident', e.target.value)}
            className="border-2 border-[var(--color-black-00)] p-3 text-xl w-64 focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
          />
        </div>

        {radioGroup(
          'intendedToRemain',
          'Do you intend to remain in Barbados if your application is approved?',
          null,
          n1.intendedToRemain,
          val => handleN1Update('intendedToRemain', val)
        )}

        {radioGroup(
          'goodCharacter',
          'Are you of good character?',
          'A declaration of good character means you have not been convicted of a serious criminal offence.',
          n1.goodCharacter,
          val => handleN1Update('goodCharacter', val)
        )}

        {radioGroup(
          'languageKnowledge',
          'Do you have an adequate knowledge of the English language?',
          null,
          n1.languageKnowledge,
          val => handleN1Update('languageKnowledge', val)
        )}

        <button type="submit" className="bg-[var(--color-teal-00)] text-white px-8 py-4 text-xl font-bold hover:bg-[var(--color-blue-00)] transition-colors">
          Continue
        </button>
      </form>
    </div>
  );
};
