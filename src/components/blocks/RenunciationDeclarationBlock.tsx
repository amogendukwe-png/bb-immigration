/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const RenunciationDeclarationBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const renunciation = state.renunciation || {};
  const personal = state.personalDetails || {};
  const fullName = [personal.firstName, personal.middleNames, personal.lastName].filter(Boolean).join(' ');

  const handleUpdate = (field: string, value: any) => {
    updateState({ renunciation: { ...renunciation, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!renunciation.declarationConfirmed) {
      errors.declarationConfirmed = 'You must confirm the declaration to proceed';
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

      <h1 className="text-3xl md:text-4xl font-bold">Declaration of renunciation</h1>
      <p className="text-xl opacity-80">Read the following declaration carefully before confirming.</p>

      <div className="bg-white border-2 border-[var(--color-black-00)] p-8 space-y-6">
        <h2 className="text-2xl font-bold">Solemn declaration</h2>
        <div className="text-lg leading-relaxed space-y-4 border-l-4 border-[var(--color-teal-00)] pl-6">
          <p>
            I, <strong>{fullName || '[your full name]'}</strong>, a citizen of Barbados by virtue of the Barbados
            Independence Order 1966 and/or the Barbados Citizenship Act, Cap. 186, do hereby solemnly and sincerely
            declare that:
          </p>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              I am of full age and capacity and renounce my citizenship of Barbados with full understanding
              of the consequences of this act.
            </li>
            <li>
              I hold citizenship of <strong>{renunciation.otherCitizenshipCountry || '[other country]'}</strong> and
              I will not be rendered stateless by this renunciation.
            </li>
            <li>
              I understand that this renunciation is irrevocable and that upon registration, I will cease
              to be a citizen of Barbados.
            </li>
            <li>
              I understand that this declaration must be made before a Justice of the Peace, Notary
              Public, or other person authorised to take declarations.
            </li>
            <li>
              All information I have provided in this application is true and accurate to the best of my
              knowledge, and I understand that providing false information is a criminal offence.
            </li>
          </ol>
        </div>

        <div className="bg-[var(--color-yellow-100)] border border-[var(--color-black-00)] p-4 rounded-sm">
          <p className="font-bold">JP witnessing required</p>
          <p className="mt-1">
            This declaration must be witnessed and signed by a Justice of the Peace (JP) or other
            authorised officer before your application can be processed. You will be required to
            attend in person to complete this step.
          </p>
        </div>
      </div>

      <form onSubmit={validateAndSubmit} className="space-y-8">
        <div className={`flex gap-4 items-start p-4 ${formErrors.declarationConfirmed ? 'border-l-4 border-[var(--color-red-00)]' : ''}`}>
          <input
            id="declarationConfirmed"
            type="checkbox"
            checked={renunciation.declarationConfirmed || false}
            onChange={e => handleUpdate('declarationConfirmed', e.target.checked)}
            className="w-8 h-8 accent-[var(--color-teal-00)] mt-1 flex-shrink-0 cursor-pointer"
          />
          <label htmlFor="declarationConfirmed" className="text-xl cursor-pointer">
            I have read and understood the declaration above. I confirm that I am making this application freely
            and that I understand renunciation of Barbadian citizenship is permanent.
          </label>
        </div>
        {formErrors.declarationConfirmed && (
          <span className="text-[var(--color-red-00)] font-bold block">{formErrors.declarationConfirmed}</span>
        )}

        <button type="submit" className="bg-[var(--color-teal-00)] text-white px-8 py-4 text-xl font-bold hover:bg-[var(--color-blue-00)] transition-colors">
          Continue to check your answers
        </button>
      </form>
    </div>
  );
};
