/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const N1EligibilityBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [error, setError] = React.useState('');

  const n1 = state.n1 || {};

  const handleSelect = (val: 'ALIEN' | 'BPP' | 'NEITHER') => {
    updateState({ n1: { ...n1, applicantType: val } });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!n1.applicantType) {
      setError('Select how you are applying');
      return;
    }
    setError('');
    goToNext();
  };

  const options: { val: 'ALIEN' | 'BPP' | 'NEITHER'; label: string; hint: string }[] = [
    {
      val: 'ALIEN',
      label: 'As an alien (non-Commonwealth citizen)',
      hint: 'You are a citizen of a country that is not a member of the Commonwealth of Nations.',
    },
    {
      val: 'BPP',
      label: 'As a British Protected Person',
      hint: 'You hold the status of a British Protected Person under UK law.',
    },
    {
      val: 'NEITHER',
      label: 'Neither of these',
      hint: 'You do not fall into either of the above categories.',
    },
  ];

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-3xl md:text-4xl font-bold">Check you can apply</h1>

      <div className="bg-white border-l-4 border-[var(--color-teal-00)] p-6 space-y-2">
        <p className="font-bold text-lg">Who can apply for naturalisation?</p>
        <p className="text-lg leading-relaxed">
          Naturalisation is available to <strong>aliens</strong> who have resided in Barbados
          continuously for at least <strong>5 years</strong>, and to{' '}
          <strong>British Protected Persons</strong> who have resided in Barbados for at least{' '}
          <strong>1 year</strong>.
        </p>
        <p className="text-lg leading-relaxed">
          In both cases, you must intend to remain in Barbados and be of good character.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className={`flex flex-col gap-3 ${error ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <p className="text-xl font-bold">I am applying as</p>
          {error && <span className="text-[var(--color-red-00)] font-bold">{error}</span>}

          {options.map(opt => (
            <label
              key={opt.val}
              className={`flex items-start gap-4 p-4 border-2 cursor-pointer transition-colors ${
                n1.applicantType === opt.val
                  ? 'border-[var(--color-teal-00)] bg-[var(--color-teal-100)]'
                  : 'border-[var(--color-black-00)] hover:border-[var(--color-teal-00)]'
              }`}
            >
              <input
                type="radio"
                name="applicantType"
                checked={n1.applicantType === opt.val}
                onChange={() => handleSelect(opt.val)}
                className="w-6 h-6 accent-[var(--color-teal-00)] mt-1 flex-shrink-0"
              />
              <span>
                <span className="text-xl font-bold block">{opt.label}</span>
                <span className="text-[var(--color-mid-grey-00)] text-base">{opt.hint}</span>
              </span>
            </label>
          ))}
        </div>

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
