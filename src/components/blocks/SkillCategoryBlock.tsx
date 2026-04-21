/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const SkillCategoryBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const categories = [
    { id: 'MEDIA_PERSON', label: 'Media Person' },
    { id: 'ARTISTE', label: 'Artiste' },
    { id: 'MUSICIAN', label: 'Musician' },
    { id: 'ARTISAN', label: 'Artisans' },
    { id: 'SPORTS_PERSON', label: 'Sports Person' },
    { id: 'NURSE', label: 'Nurse' },
    { id: 'TEACHER', label: 'Teacher' },
    { id: 'GRADUATE', label: 'Graduate' },
    { id: 'ASSOCIATE_DEGREE', label: 'Holder of an Associate Degree' }
  ];

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.work?.skillCategory) {
      setFormErrors({ skill: 'Select a skill category' });
      window.scrollTo(0, 0);
      return;
    }
    setFormErrors({});
    goToNext();
  };

  return (
    <div className="space-y-8" id="skill-category-block">
      {formErrors.skill && (
        <div className="border-[4px] border-[var(--color-red-00)] p-4 mb-8 bg-white" role="alert" id="error-summary">
          <h2 className="text-[var(--color-red-00)] text-xl font-bold mb-2">There is a problem</h2>
          <p className="text-[var(--color-red-00)] font-medium underline">{formErrors.skill}</p>
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold mb-8 underline decoration-2 decoration-[var(--color-teal-00)] underline-offset-8 transition-all hover:decoration-opacity-50 tracking-tight">
        Category of skill
      </h1>
      <p className="text-xl mb-12 opacity-80 leading-relaxed max-w-2xl">
        Select the category that best describes your professional qualification or skill under the CARICOM Movement of Skilled Nationals Act.
      </p>

      <form onSubmit={validateAndSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className={`flex items-center gap-3 p-5 border-2 cursor-pointer transition-all ${
                state.work?.skillCategory === cat.id 
                  ? 'border-[var(--color-teal-00)] bg-[var(--color-white-00)]' 
                  : 'border-[var(--color-black-00)] hover:border-black'
              }`}
            >
              <input
                type="radio"
                name="skill"
                className="w-6 h-6 accent-[var(--color-teal-00)] transition-transform active:scale-95"
                checked={state.work?.skillCategory === cat.id}
                onChange={() => updateState({ work: { ...state.work, skillCategory: cat.id } })}
              />
              <span className="text-lg font-medium">{cat.label}</span>
            </label>
          ))}
        </div>

        <div className="pt-10 border-t border-[var(--color-black-00)] mt-10">
          <button
            type="submit"
            className="bg-[var(--color-teal-00)] text-white px-10 py-4 rounded-sm font-bold text-2xl hover:bg-[var(--color-blue-00)] active:translate-y-1 transition-all shadow-lg focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
          >
            Save and continue
          </button>
        </div>
      </form>
    </div>
  );
};
