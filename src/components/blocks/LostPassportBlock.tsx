/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const LostPassportBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const lp = state.lostPassport || {};

  const handleUpdate = (field: string, value: string | boolean) => {
    updateState({ lostPassport: { ...lp, [field]: value } });
  };

  // Also sync top-level hasLostPassport flag
  const handleIsLost = (value: boolean) => {
    updateState({ hasLostPassport: value, lostPassport: { ...lp, isLost: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (lp.isLost === undefined) errors.isLost = 'Select whether the previous passport has been lost, stolen, or damaged';

    if (lp.isLost) {
      if (!lp.previousPassportNumber) errors.previousPassportNumber = 'Enter the previous passport number';
      if (!lp.circumstances)          errors.circumstances          = 'Describe the circumstances';
      if (!lp.policeReportNumber)     errors.policeReportNumber     = 'Enter the police report number';
      if (!lp.policeStation)          errors.policeStation          = 'Enter the name of the police station';
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
    <div className="space-y-8" id="lost-passport-block">
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

      <h1 className="text-3xl md:text-4xl font-bold mb-2">Lost, stolen, or damaged passport</h1>
      <p className="text-xl opacity-80 mb-4">
        Tell us if you are applying to replace a passport that has been lost, stolen, or damaged.
      </p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        <div className={`${formErrors.isLost ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <fieldset className="space-y-4">
            <legend className="text-xl font-bold mb-2">
              Has the previous passport been lost, stolen, or damaged?
            </legend>
            {formErrors.isLost && (
              <span className="text-[var(--color-red-00)] font-bold block mb-2">{formErrors.isLost}</span>
            )}
            <div className="flex flex-col gap-3">
              {[
                { value: true,  label: 'Yes' },
                { value: false, label: 'No' },
              ].map((opt) => (
                <label
                  key={String(opt.value)}
                  className="flex items-center gap-3 cursor-pointer p-3 border-2 border-transparent hover:border-[var(--color-teal-00)] transition-all"
                >
                  <input
                    type="radio"
                    name="isLost"
                    className="w-8 h-8 cursor-pointer accent-[var(--color-teal-00)]"
                    checked={lp.isLost === opt.value}
                    onChange={() => handleIsLost(opt.value)}
                  />
                  <span className="text-lg">{opt.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {lp.isLost && (
          <>
            <div className={`flex flex-col gap-2 ${formErrors.previousPassportNumber ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
              <label className="text-xl font-bold" htmlFor="prevPassportNo">Previous passport number</label>
              {formErrors.previousPassportNumber && (
                <span className="text-[var(--color-red-00)] font-bold">{formErrors.previousPassportNumber}</span>
              )}
              <input
                id="prevPassportNo"
                className="border-2 border-black p-2 text-xl max-w-[280px] uppercase focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
                value={lp.previousPassportNumber || ''}
                onChange={(e) => handleUpdate('previousPassportNumber', e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xl font-bold" htmlFor="dateLastSeen">
                Date last seen <span className="font-normal text-[var(--color-mid-grey-00)]">(optional)</span>
              </label>
              <input
                id="dateLastSeen"
                type="date"
                className="border-2 border-black p-2 text-xl max-w-[300px] focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
                value={lp.dateLastSeen || ''}
                onChange={(e) => handleUpdate('dateLastSeen', e.target.value)}
              />
            </div>

            <div className={`flex flex-col gap-2 ${formErrors.circumstances ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
              <label className="text-xl font-bold" htmlFor="circumstances">Circumstances of loss, theft, or damage</label>
              <span className="text-[var(--color-mid-grey-00)]">Describe what happened and when</span>
              {formErrors.circumstances && (
                <span className="text-[var(--color-red-00)] font-bold">{formErrors.circumstances}</span>
              )}
              <textarea
                id="circumstances"
                rows={4}
                className="border-2 border-black p-2 text-xl w-full focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none resize-y"
                value={lp.circumstances || ''}
                onChange={(e) => handleUpdate('circumstances', e.target.value)}
              />
            </div>

            <div className={`flex flex-col gap-2 ${formErrors.policeReportNumber ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
              <label className="text-xl font-bold" htmlFor="policeReport">Police report number</label>
              {formErrors.policeReportNumber && (
                <span className="text-[var(--color-red-00)] font-bold">{formErrors.policeReportNumber}</span>
              )}
              <input
                id="policeReport"
                className="border-2 border-black p-2 text-xl max-w-[280px] uppercase focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
                value={lp.policeReportNumber || ''}
                onChange={(e) => handleUpdate('policeReportNumber', e.target.value)}
              />
            </div>

            <div className={`flex flex-col gap-2 ${formErrors.policeStation ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
              <label className="text-xl font-bold" htmlFor="policeStation">Police station</label>
              <span className="text-[var(--color-mid-grey-00)]">Name and parish of the police station where the report was made</span>
              {formErrors.policeStation && (
                <span className="text-[var(--color-red-00)] font-bold">{formErrors.policeStation}</span>
              )}
              <input
                id="policeStation"
                className="border-2 border-black p-2 text-xl w-full focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
                value={lp.policeStation || ''}
                onChange={(e) => handleUpdate('policeStation', e.target.value)}
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
