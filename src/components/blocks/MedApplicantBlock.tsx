/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

const purposes = [
  'Passport application',
  'Work permit application',
  'Residency application',
  'Citizenship application',
  'Naturalisation application',
  'Visa application',
  'Other',
];

export const MedApplicantBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const medical = state.medical || {};
  const personal = state.personalDetails || {};

  const handleUpdate = (field: string, value: any) => {
    updateState({ medical: { ...medical, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!medical.purposeOfExam?.trim()) errors.purposeOfExam = 'Select the purpose of this medical examination';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }
    setFormErrors({});
    goToNext();
  };

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

      <h1 className="text-3xl md:text-4xl font-bold">Medical examination — applicant section</h1>
      <p className="text-xl opacity-80">
        This section is completed by the applicant. The physician's clinical examination is completed separately on the next screen.
      </p>

      <div className="bg-white border-l-4 border-[var(--color-teal-00)] p-6 max-w-2xl">
        <p className="font-bold">About this form</p>
        <p className="mt-1">
          The medical examination report is required as part of certain immigration applications. Both
          the applicant and an approved examining physician must complete their respective sections.
          The physician must be registered in Barbados.
        </p>
      </div>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        {/* Applicant details — pre-populated from personal details if available */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Applicant information</h2>
          {personal.firstName ? (
            <div className="bg-[var(--color-white-00)] border border-[var(--color-grey-00)] p-4 text-lg">
              <p><strong>Name:</strong> {[personal.firstName, personal.middleNames, personal.lastName].filter(Boolean).join(' ')}</p>
              {personal.dateOfBirth && <p><strong>Date of birth:</strong> {personal.dateOfBirth}</p>}
              {personal.nationality && <p><strong>Nationality:</strong> {personal.nationality}</p>}
            </div>
          ) : (
            <p className="text-[var(--color-mid-grey-00)]">Your personal details will be taken from the information you provided earlier in this application.</p>
          )}
        </div>

        {/* Purpose of examination */}
        <div className={`flex flex-col gap-2 ${formErrors.purposeOfExam ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="purposeOfExam">
            What is this medical examination for?
          </label>
          <p className="text-[var(--color-mid-grey-00)]">Select the immigration application this examination relates to.</p>
          {formErrors.purposeOfExam && <span className="text-[var(--color-red-00)] font-bold">{formErrors.purposeOfExam}</span>}
          <div className="flex flex-col gap-3 mt-1">
            {purposes.map(p => (
              <label key={p} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="purposeOfExam"
                  value={p}
                  checked={medical.purposeOfExam === p}
                  onChange={() => handleUpdate('purposeOfExam', p)}
                  className="w-6 h-6 accent-[var(--color-teal-00)]"
                />
                <span className="text-xl">{p}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-[var(--color-teal-00)] text-white px-8 py-4 text-xl font-bold hover:bg-[var(--color-blue-00)] transition-colors">
          Continue
        </button>
      </form>
    </div>
  );
};
