/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const N1DeclarationBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const n1 = state.n1 || {};
  const personal = state.personalDetails || {};
  const fullName = [personal.firstName, personal.middleNames, personal.lastName].filter(Boolean).join(' ');

  const handleN1Update = (field: string, value: any) => {
    updateState({ n1: { ...n1, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!n1.advertisementAcknowledged) errors.advertisementAcknowledged = 'Confirm that you understand the newspaper advertisement requirement';
    if (!n1.jpWitnessAcknowledged) errors.jpWitnessAcknowledged = 'Confirm that you understand the JP witnessing requirement';
    if (!n1.declarationConfirmed) errors.declarationConfirmed = 'You must confirm the declaration to proceed';

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

      <h1 className="text-3xl md:text-4xl font-bold">Declaration and acknowledgements</h1>
      <p className="text-xl opacity-80">Before submitting your application, you must confirm the following.</p>

      {/* Newspaper Advertisement */}
      <div className="bg-[var(--color-yellow-100)] border-l-4 border-[var(--color-black-00)] p-6 space-y-2 max-w-2xl">
        <p className="font-bold text-lg">Newspaper advertisement required</p>
        <p>
          You are required to publish a notice of your intention to apply for naturalisation in a
          newspaper circulated in Barbados. The notice must be published before your application is
          submitted. The Chief Immigration Officer may require evidence of publication.
        </p>
      </div>

      {/* JP Witnessing */}
      <div className="bg-[var(--color-yellow-100)] border-l-4 border-[var(--color-black-00)] p-6 space-y-2 max-w-2xl">
        <p className="font-bold text-lg">JP witnessing required</p>
        <p>
          Your completed application and declaration must be signed in the presence of a Justice of the
          Peace (JP). You will be required to attend in person once your online submission has been
          reviewed.
        </p>
      </div>

      {/* Declaration text */}
      <div className="bg-white border-2 border-[var(--color-black-00)] p-8 space-y-4 max-w-2xl">
        <h2 className="text-2xl font-bold">Solemn declaration</h2>
        <div className="border-l-4 border-[var(--color-teal-00)] pl-6 space-y-3 text-lg leading-relaxed">
          <p>
            I, <strong>{fullName || '[your full name]'}</strong>, solemnly and sincerely declare that:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>All information provided in this application is true and complete to the best of my knowledge.</li>
            <li>I am of good character and have not been convicted of any serious criminal offence.</li>
            <li>I have resided continuously in Barbados for the period stated in this application.</li>
            <li>I intend to remain in Barbados if my application for naturalisation is granted.</li>
            <li>I understand that providing false information is a criminal offence and may result in my application being refused or any certificate of naturalisation being revoked.</li>
          </ol>
        </div>
      </div>

      <form onSubmit={validateAndSubmit} className="space-y-8 max-w-2xl">

        <div className={`flex gap-4 items-start p-4 ${formErrors.advertisementAcknowledged ? 'border-l-4 border-[var(--color-red-00)]' : ''}`}>
          <input
            id="advertisementAcknowledged"
            type="checkbox"
            checked={n1.advertisementAcknowledged || false}
            onChange={e => handleN1Update('advertisementAcknowledged', e.target.checked)}
            className="w-8 h-8 accent-[var(--color-teal-00)] mt-1 flex-shrink-0 cursor-pointer"
          />
          <label htmlFor="advertisementAcknowledged" className="text-xl cursor-pointer">
            I understand that I must publish a newspaper notice of my intention to apply for naturalisation before my application can be processed.
          </label>
        </div>
        {formErrors.advertisementAcknowledged && (
          <span className="text-[var(--color-red-00)] font-bold block -mt-4">{formErrors.advertisementAcknowledged}</span>
        )}

        <div className={`flex gap-4 items-start p-4 ${formErrors.jpWitnessAcknowledged ? 'border-l-4 border-[var(--color-red-00)]' : ''}`}>
          <input
            id="jpWitnessAcknowledged"
            type="checkbox"
            checked={n1.jpWitnessAcknowledged || false}
            onChange={e => handleN1Update('jpWitnessAcknowledged', e.target.checked)}
            className="w-8 h-8 accent-[var(--color-teal-00)] mt-1 flex-shrink-0 cursor-pointer"
          />
          <label htmlFor="jpWitnessAcknowledged" className="text-xl cursor-pointer">
            I understand that my application must be signed before a Justice of the Peace and that I will be required to attend in person.
          </label>
        </div>
        {formErrors.jpWitnessAcknowledged && (
          <span className="text-[var(--color-red-00)] font-bold block -mt-4">{formErrors.jpWitnessAcknowledged}</span>
        )}

        <div className={`flex gap-4 items-start p-4 ${formErrors.declarationConfirmed ? 'border-l-4 border-[var(--color-red-00)]' : ''}`}>
          <input
            id="declarationConfirmed"
            type="checkbox"
            checked={n1.declarationConfirmed || false}
            onChange={e => handleN1Update('declarationConfirmed', e.target.checked)}
            className="w-8 h-8 accent-[var(--color-teal-00)] mt-1 flex-shrink-0 cursor-pointer"
          />
          <label htmlFor="declarationConfirmed" className="text-xl cursor-pointer">
            I confirm that the declaration above is true and that I am making this application freely and in good faith.
          </label>
        </div>
        {formErrors.declarationConfirmed && (
          <span className="text-[var(--color-red-00)] font-bold block -mt-4">{formErrors.declarationConfirmed}</span>
        )}

        <button type="submit" className="bg-[var(--color-teal-00)] text-white px-8 py-4 text-xl font-bold hover:bg-[var(--color-blue-00)] transition-colors">
          Continue to upload documents
        </button>
      </form>
    </div>
  );
};
