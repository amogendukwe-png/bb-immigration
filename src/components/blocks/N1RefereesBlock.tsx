/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

const EMPTY_REFEREE = { name: '', address: '', occupation: '', nationality: '', yearsKnown: '' };

export const N1RefereesBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const n1 = state.n1 || {};
  const referees = n1.referees && n1.referees.length > 0
    ? n1.referees
    : [{ ...EMPTY_REFEREE }, { ...EMPTY_REFEREE }, { ...EMPTY_REFEREE }, { ...EMPTY_REFEREE }];

  const handleRefereeUpdate = (index: number, field: string, value: string) => {
    const updated = referees.map((r, i) => i === index ? { ...r, [field]: value } : r);
    updateState({ n1: { ...n1, referees: updated } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    referees.forEach((r, i) => {
      if (!r.name.trim()) errors[`name_${i}`] = `Enter the name of referee ${i + 1}`;
      if (!r.address.trim()) errors[`address_${i}`] = `Enter the address of referee ${i + 1}`;
      if (!r.occupation.trim()) errors[`occupation_${i}`] = `Enter the occupation of referee ${i + 1}`;
      if (!r.nationality.trim()) errors[`nationality_${i}`] = `Enter the nationality of referee ${i + 1}`;
      if (!r.yearsKnown.trim()) errors[`yearsKnown_${i}`] = `Enter how long referee ${i + 1} has known you`;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }
    setFormErrors({});
    goToNext();
  };

  const inputClass = 'border-2 border-[var(--color-black-00)] p-3 text-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]';

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

      <h1 className="text-3xl md:text-4xl font-bold">Referees</h1>
      <p className="text-xl opacity-80">
        You must provide details of <strong>four referees</strong> who can vouch for your character and residence in Barbados. Referees must be Barbadian nationals and must not be related to you.
      </p>

      <form onSubmit={validateAndSubmit} className="space-y-12 max-w-2xl">
        {referees.map((referee, i) => (
          <fieldset key={i} className="space-y-6 border-0 p-0">
            <legend className="text-2xl font-bold border-b-2 border-[var(--color-black-00)] pb-2 w-full">
              Referee {i + 1}
            </legend>

            <div className={`flex flex-col gap-2 ${formErrors[`name_${i}`] ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
              <label className="text-xl font-bold" htmlFor={`name_${i}`}>Full name</label>
              {formErrors[`name_${i}`] && <span className="text-[var(--color-red-00)] font-bold">{formErrors[`name_${i}`]}</span>}
              <input
                id={`name_${i}`}
                type="text"
                value={referee.name}
                onChange={e => handleRefereeUpdate(i, 'name', e.target.value)}
                className={`${inputClass} w-full`}
              />
            </div>

            <div className={`flex flex-col gap-2 ${formErrors[`address_${i}`] ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
              <label className="text-xl font-bold" htmlFor={`address_${i}`}>Address in Barbados</label>
              {formErrors[`address_${i}`] && <span className="text-[var(--color-red-00)] font-bold">{formErrors[`address_${i}`]}</span>}
              <textarea
                id={`address_${i}`}
                rows={3}
                value={referee.address}
                onChange={e => handleRefereeUpdate(i, 'address', e.target.value)}
                className={`${inputClass} w-full`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className={`flex flex-col gap-2 ${formErrors[`occupation_${i}`] ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
                <label className="text-xl font-bold" htmlFor={`occupation_${i}`}>Occupation</label>
                {formErrors[`occupation_${i}`] && <span className="text-[var(--color-red-00)] font-bold">{formErrors[`occupation_${i}`]}</span>}
                <input
                  id={`occupation_${i}`}
                  type="text"
                  value={referee.occupation}
                  onChange={e => handleRefereeUpdate(i, 'occupation', e.target.value)}
                  className={`${inputClass} w-full`}
                />
              </div>

              <div className={`flex flex-col gap-2 ${formErrors[`nationality_${i}`] ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
                <label className="text-xl font-bold" htmlFor={`nationality_${i}`}>Nationality</label>
                {formErrors[`nationality_${i}`] && <span className="text-[var(--color-red-00)] font-bold">{formErrors[`nationality_${i}`]}</span>}
                <input
                  id={`nationality_${i}`}
                  type="text"
                  value={referee.nationality}
                  onChange={e => handleRefereeUpdate(i, 'nationality', e.target.value)}
                  className={`${inputClass} w-full`}
                />
              </div>
            </div>

            <div className={`flex flex-col gap-2 ${formErrors[`yearsKnown_${i}`] ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
              <label className="text-xl font-bold" htmlFor={`yearsKnown_${i}`}>How long have they known you?</label>
              <p className="text-[var(--color-mid-grey-00)]">For example, 3 years, 8 months</p>
              {formErrors[`yearsKnown_${i}`] && <span className="text-[var(--color-red-00)] font-bold">{formErrors[`yearsKnown_${i}`]}</span>}
              <input
                id={`yearsKnown_${i}`}
                type="text"
                value={referee.yearsKnown}
                onChange={e => handleRefereeUpdate(i, 'yearsKnown', e.target.value)}
                className={`${inputClass} w-48`}
              />
            </div>
          </fieldset>
        ))}

        <button type="submit" className="bg-[var(--color-teal-00)] text-white px-8 py-4 text-xl font-bold hover:bg-[var(--color-blue-00)] transition-colors">
          Continue
        </button>
      </form>
    </div>
  );
};
