/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const ExcludedClassesBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  
  const background = state.background || {};

  const handleToggle = (item: string) => {
    const current = background.excludedClasses || [];
    const updated = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item];
    updateState({ background: { ...background, excludedClasses: updated } });
  };

  const classes = [
    { id: 'PUBLIC_CHARGE', label: 'Persons who are a risk to public charge due to mental or physical conditions' },
    { id: 'COMMUNICABLE', label: 'Persons suffering from communicable diseases as defined in the Health Services Act' },
    { id: 'IMMORAL', label: 'Persons who are involved in prostitution or other immoral acts' },
    { id: 'DRUGS', label: 'Persons addicted to drugs or involved in drug trafficking' },
    { id: 'CRIMINAL', label: 'Persons with a criminal history of one year or more' }
  ];

  return (
    <div className="space-y-8" id="excluded-classes-block">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Excluded classes</h1>
      
      <div className="p-6 bg-[var(--bb-gray)] border-l-4 border-[var(--bb-navy-mid)] mb-12 max-w-3xl">
        <h2 className="text-xl font-bold mb-4">Notice to applicants</h2>
        <p className="text-lg leading-relaxed opacity-90">
          The following classes of persons are excluded from registration as permanent residents or skilled nationals under the Immigration Act. 
          Please read each category carefully.
        </p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); goToNext(); }} className="space-y-12">
        <fieldset className="space-y-4">
          <legend className="text-xl font-bold mb-6 max-w-2xl">Do any of the following categories apply to you?</legend>
          
          <div className="space-y-4 max-w-4xl">
            {classes.map((cls) => (
              <label key={cls.id} className="flex items-start gap-4 p-4 border-2 border-[var(--bb-border)] hover:border-[var(--bb-navy-mid)] cursor-pointer transition-all bg-white group">
                <input
                  type="checkbox"
                  className="w-8 h-8 mt-1 accent-[var(--bb-navy-mid)] cursor-pointer"
                  checked={background.excludedClasses?.includes(cls.id) || false}
                  onChange={() => handleToggle(cls.id)}
                />
                <span className="text-lg leading-tight group-hover:font-medium">{cls.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="pt-8 border-t border-[var(--bb-border)] flex items-center justify-between max-w-4xl">
          <p className="text-[var(--bb-text-gray)] max-w-md italic">
            If none apply, leave all boxes unchecked and continue.
          </p>
          <button
            type="submit"
            className="bg-[var(--bb-navy-mid)] text-white px-10 py-4 rounded-sm font-bold text-2xl hover:bg-[var(--bb-navy-dark)] transition-all shadow-md focus:ring-4 focus:ring-[var(--bb-focus)] focus:outline-none"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};
