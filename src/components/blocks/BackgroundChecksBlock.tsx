/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const BackgroundChecksBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  
  const background = state.background || {};

  const handleUpdate = (updates: Partial<typeof background>) => {
    updateState({ background: { ...background, ...updates } });
  };

  const questions = [
    { id: 'healthIssue', label: 'Have you ever been treated for a mental disorder, drug dependency, or alcohol dependency?', detailsField: 'healthDetails' },
    { id: 'criminalRecord', label: 'Have you ever been arrested, convicted, or confined to a correctional facility?', detailsField: 'criminalDetails' },
    { id: 'deported', label: 'Have you ever been deported from any country?', detailsField: 'deportDetails' },
    { id: 'visaRefusal', label: 'Have you ever been refused a visa for Barbados or any other country?', detailsField: 'visaDetails' },
  ];

  return (
    <div className="space-y-8" id="background-checks-block">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Background check</h1>
      <p className="text-xl mb-4 opacity-80 leading-relaxed max-w-2xl text-[var(--bb-red)] font-bold italic">
        Important: You must answer these questions honestly. Providing false information is a criminal offence.
      </p>

      <form onSubmit={(e) => { e.preventDefault(); goToNext(); }} className="space-y-12 max-w-3xl">
        {questions.map((q) => (
          <div key={q.id} className="space-y-4">
            <fieldset className="space-y-4">
              <legend className="text-xl font-bold leading-tight">{q.label}</legend>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-3 cursor-pointer p-2 border-2 border-transparent hover:border-[var(--bb-navy-mid)]">
                  <input
                    type="radio" name={q.id} className="w-8 h-8 accent-[var(--bb-navy-mid)]"
                    checked={background[q.id as keyof typeof background] === true}
                    onChange={() => handleUpdate({ [q.id]: true })}
                  />
                  <span className="text-lg font-medium uppercase tracking-wide">Yes</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-2 border-2 border-transparent hover:border-[var(--bb-navy-mid)]">
                  <input
                    type="radio" name={q.id} className="w-8 h-8 accent-[var(--bb-navy-mid)]"
                    checked={background[q.id as keyof typeof background] === false}
                    onChange={() => handleUpdate({ [q.id]: false })}
                  />
                  <span className="text-lg font-medium uppercase tracking-wide">No</span>
                </label>
              </div>
            </fieldset>

            {background[q.id as keyof typeof background] === true && (
              <div className="p-4 border-l-4 border-[var(--bb-navy-mid)] bg-[var(--bb-gray)] animate-in fade-in slide-in-from-top-1 duration-300">
                <label className="font-bold flex items-center justify-between mb-2">
                  <span>Please provide details</span>
                  <span className="text-sm font-normal opacity-60">Required</span>
                </label>
                <textarea
                  className="w-full border-2 border-black p-4 text-lg focus:ring-4 focus:ring-[var(--bb-focus)] focus:outline-none"
                  rows={3}
                  value={(background[q.detailsField as keyof typeof background] as string) || ''}
                  onChange={(e) => handleUpdate({ [q.detailsField]: e.target.value })}
                  placeholder="Include dates, locations, and circumstances"
                />
              </div>
            )}
          </div>
        ))}

        <div className="pt-8 border-t border-[var(--bb-border)]">
          <button
            type="submit"
            className="bg-[var(--bb-navy-mid)] text-white px-10 py-4 rounded-sm font-bold text-2xl hover:bg-[var(--bb-navy-dark)] transition-all shadow-md focus:ring-4 focus:ring-[var(--bb-focus)] focus:outline-none"
          >
            Save and continue
          </button>
        </div>
      </form>
    </div>
  );
};
