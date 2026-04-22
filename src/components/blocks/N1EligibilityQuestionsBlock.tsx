/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const N1EligibilityQuestionsBlock: React.FC = () => {
  const { state, updateState, goToNext, setStep } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const n1 = state.n1 || {};
  const isBPP = n1.applicantType === 'BPP';
  const minYears = isBPP ? '1 year' : '5 years';
  const applicantLabel = isBPP ? 'British Protected Person' : 'alien';

  const handleUpdate = (field: string, value: any) => {
    updateState({ n1: { ...n1, [field]: value } });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!n1.yearsResident?.trim()) errors.yearsResident = 'Enter how long you have resided in Barbados';
    if (n1.intendedToRemain === undefined) errors.intendedToRemain = 'Select whether you intend to remain in Barbados';
    if (n1.goodCharacter === undefined) errors.goodCharacter = 'Confirm whether you are of good character';
    if (n1.languageKnowledge === undefined) errors.languageKnowledge = 'Confirm whether you have adequate knowledge of the English language';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }

    // Eligibility gates — navigate directly to avoid stale-closure race condition
    if (n1.intendedToRemain === false) {
      updateState({ n1: { ...n1, eligible: false, ineligibilityReason: 'intent' } });
      setStep('N1_EXIT_INELIGIBLE');
      window.scrollTo(0, 0);
      return;
    }
    if (n1.goodCharacter === false) {
      updateState({ n1: { ...n1, eligible: false, ineligibilityReason: 'character' } });
      setStep('N1_EXIT_INELIGIBLE');
      window.scrollTo(0, 0);
      return;
    }
    if (n1.languageKnowledge === false) {
      updateState({ n1: { ...n1, eligible: false, ineligibilityReason: 'language' } });
      setStep('N1_EXIT_INELIGIBLE');
      window.scrollTo(0, 0);
      return;
    }

    // All passed — safe to use goToNext since routing doesn't depend on the update
    updateState({ n1: { ...n1, eligible: true, ineligibilityReason: undefined } });
    setFormErrors({});
    goToNext();
  };

  const YesNo = ({
    fieldKey,
    label,
    hint,
    current,
    onChange,
  }: {
    fieldKey: string;
    label: string;
    hint?: string;
    current: boolean | undefined;
    onChange: (val: boolean) => void;
  }) => (
    <div className={`flex flex-col gap-2 ${formErrors[fieldKey] ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
      <p className="text-xl font-bold">{label}</p>
      {hint && <p className="text-[var(--color-mid-grey-00)]">{hint}</p>}
      {formErrors[fieldKey] && (
        <span className="text-[var(--color-red-00)] font-bold">{formErrors[fieldKey]}</span>
      )}
      <div className="flex flex-col gap-3 mt-1">
        {[
          { label: 'Yes', val: true },
          { label: 'No', val: false },
        ].map(opt => (
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
    <div className="space-y-8 max-w-2xl">
      {Object.keys(formErrors).length > 0 && (
        <div className="border-[4px] border-[var(--color-red-00)] p-4 bg-white" role="alert">
          <h2 className="text-[var(--color-red-00)] text-xl font-bold mb-2">There is a problem</h2>
          <ul className="text-[var(--color-red-00)] list-inside list-disc underline font-medium">
            {Object.entries(formErrors).map(([key, val]) => (
              <li key={key}>
                <a href={`#${key}`}>{val}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold">Eligibility questions</h1>
      <p className="text-xl opacity-80">
        Answer the following questions to confirm you are eligible to apply for naturalisation as an{' '}
        <strong>{applicantLabel}</strong>.
      </p>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* Residence duration */}
        <div
          className={`flex flex-col gap-2 ${
            formErrors.yearsResident ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''
          }`}
        >
          <label className="text-xl font-bold" htmlFor="yearsResident">
            How long have you resided continuously in Barbados?
          </label>
          <p className="text-[var(--color-mid-grey-00)]">
            As an {applicantLabel}, you must have resided in Barbados for a continuous period of at
            least <strong>{minYears}</strong>. Enter the length of your continuous residence.
          </p>
          <p className="text-[var(--color-mid-grey-00)] text-base">
            For example, 5 years 3 months
          </p>
          {formErrors.yearsResident && (
            <span className="text-[var(--color-red-00)] font-bold">{formErrors.yearsResident}</span>
          )}
          <input
            id="yearsResident"
            type="text"
            value={n1.yearsResident || ''}
            onChange={e => handleUpdate('yearsResident', e.target.value)}
            className="border-2 border-[var(--color-black-00)] p-3 text-xl w-64 focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
          />
        </div>

        <YesNo
          fieldKey="intendedToRemain"
          label="Do you intend to remain in Barbados if your application is approved?"
          hint="You must intend to continue residing in Barbados. If you answer No, you will not be eligible."
          current={n1.intendedToRemain}
          onChange={val => handleUpdate('intendedToRemain', val)}
        />

        <YesNo
          fieldKey="goodCharacter"
          label="Are you of good character?"
          hint="This means you have not been convicted of a serious criminal offence in Barbados or abroad. Providing a false answer is a criminal offence."
          current={n1.goodCharacter}
          onChange={val => handleUpdate('goodCharacter', val)}
        />

        <YesNo
          fieldKey="languageKnowledge"
          label="Do you have an adequate knowledge of the English language?"
          hint="You must be able to understand and communicate in English sufficiently to participate in Barbadian civic life."
          current={n1.languageKnowledge}
          onChange={val => handleUpdate('languageKnowledge', val)}
        />

        <button
          type="submit"
          className="bg-[var(--color-teal-00)] text-white px-8 py-4 text-xl font-bold hover:bg-[var(--color-blue-00)] transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  );
};
