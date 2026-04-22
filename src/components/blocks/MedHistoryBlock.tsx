/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const MedHistoryBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const medical = state.medical || {};

  const handleUpdate = (field: string, value: any) => {
    updateState({ medical: { ...medical, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // All fields are optional — applicant may have nothing to declare
    setFormErrors({});
    goToNext();
  };

  const textareaClass = 'border-2 border-[var(--color-black-00)] p-3 text-xl w-full focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]';

  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold">Medical history</h1>
      <p className="text-xl opacity-80">
        Complete this section honestly. Leave any field blank if it does not apply to you. This information is confidential and will only be used for immigration assessment purposes.
      </p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        <div className="flex flex-col gap-2">
          <label className="text-xl font-bold" htmlFor="pastIllnesses">
            Previous illnesses, diseases or conditions
          </label>
          <p className="text-[var(--color-mid-grey-00)]">
            Include any serious or chronic conditions such as tuberculosis, HIV, diabetes, cancer, heart disease, epilepsy, etc. Write "none" if you have no history.
          </p>
          <textarea
            id="pastIllnesses"
            rows={4}
            value={medical.pastIllnesses || ''}
            onChange={e => handleUpdate('pastIllnesses', e.target.value)}
            className={textareaClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl font-bold" htmlFor="surgeries">
            Previous surgeries or hospitalisations
          </label>
          <p className="text-[var(--color-mid-grey-00)]">Include dates and reasons if known. Write "none" if not applicable.</p>
          <textarea
            id="surgeries"
            rows={3}
            value={medical.surgeries || ''}
            onChange={e => handleUpdate('surgeries', e.target.value)}
            className={textareaClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl font-bold" htmlFor="currentMedications">
            Current medications
          </label>
          <p className="text-[var(--color-mid-grey-00)]">List any prescription or regular over-the-counter medications you take. Write "none" if not applicable.</p>
          <textarea
            id="currentMedications"
            rows={3}
            value={medical.currentMedications || ''}
            onChange={e => handleUpdate('currentMedications', e.target.value)}
            className={textareaClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl font-bold" htmlFor="allergies">
            Known allergies
          </label>
          <p className="text-[var(--color-mid-grey-00)]">Include drug, food, or environmental allergies. Write "none" if not applicable.</p>
          <textarea
            id="allergies"
            rows={2}
            value={medical.allergies || ''}
            onChange={e => handleUpdate('allergies', e.target.value)}
            className={textareaClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl font-bold" htmlFor="mentalHealthHistory">
            Mental health history
          </label>
          <p className="text-[var(--color-mid-grey-00)]">
            Include any diagnosed mental health conditions, previous psychiatric treatment, or hospitalisations. Write "none" if not applicable.
          </p>
          <textarea
            id="mentalHealthHistory"
            rows={3}
            value={medical.mentalHealthHistory || ''}
            onChange={e => handleUpdate('mentalHealthHistory', e.target.value)}
            className={textareaClass}
          />
        </div>

        <button type="submit" className="bg-[var(--color-teal-00)] text-white px-8 py-4 text-xl font-bold hover:bg-[var(--color-blue-00)] transition-colors">
          Continue — Physician section
        </button>
      </form>
    </div>
  );
};
