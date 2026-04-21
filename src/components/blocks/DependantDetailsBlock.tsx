/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';
import { Plus, Trash2 } from 'lucide-react';

export const DependantDetailsBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  
  const dependants = state.dependants || [];

  const addDependant = () => {
    const newDep = {
      id: Math.random().toString(36).substr(2, 9),
      fullName: '',
      dateOfBirth: '',
      sex: 'MALE',
      relationship: '',
      nationality: ''
    };
    updateState({ dependants: [...dependants, newDep] });
  };

  const removeDependant = (id: string) => {
    updateState({ dependants: dependants.filter(d => d.id !== id) });
  };

  const updateDependant = (id: string, field: string, value: any) => {
    updateState({
      dependants: dependants.map(d => d.id === id ? { ...d, [field]: value } : d)
    });
  };

  return (
    <div className="space-y-8" id="dependant-details-block">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Dependant details</h1>
      <p className="text-xl mb-4 opacity-80">Tell us about any dependants included in this application.</p>

      <div className="space-y-12">
        {dependants.map((dep, index) => (
          <div key={dep.id} className="p-6 border-2 border-[var(--color-black-00)] bg-[#f8f8f7] relative">
            <button 
              onClick={() => removeDependant(dep.id)}
              className="absolute top-4 right-4 text-[var(--color-red-00)] hover:text-red-800 flex items-center gap-1 font-bold underline"
            >
              <Trash2 size={18} />
              Remove
            </button>
            
            <h2 className="text-2xl font-bold mb-6">Dependant {index + 1}</h2>
            
            <div className="space-y-6 max-w-xl">
              <div className="flex flex-col gap-2">
                <label className="font-bold">Full name</label>
                <input 
                  className="border-2 border-black p-2 uppercase"
                  value={dep.fullName}
                  onChange={(e) => updateDependant(dep.id, 'fullName', e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold">Date of birth</label>
                <input 
                  type="date"
                  className="border-2 border-black p-2 max-w-[200px]"
                  value={dep.dateOfBirth}
                  onChange={(e) => updateDependant(dep.id, 'dateOfBirth', e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold">Sex</label>
                <div className="flex gap-4">
                  {['MALE', 'FEMALE'].map(s => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name={`sex-${dep.id}`}
                        checked={dep.sex === s}
                        onChange={() => updateDependant(dep.id, 'sex', s)}
                        className="w-5 h-5 accent-[var(--color-teal-00)]"
                      />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold">Relationship to applicant</label>
                <input 
                  className="border-2 border-black p-2"
                  value={dep.relationship}
                  onChange={(e) => updateDependant(dep.id, 'relationship', e.target.value)}
                  placeholder="e.g. Son, Daughter"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={addDependant}
        className="flex items-center gap-2 text-[var(--color-teal-00)] hover:text-[#003078] font-bold text-xl underline decoration-2 underline-offset-4"
      >
        <Plus size={24} />
        Add a dependant
      </button>

      <div className="pt-12 border-t border-[var(--color-black-00)]">
        <button
          onClick={goToNext}
          className="bg-[var(--color-teal-00)] text-white px-10 py-4 rounded-sm font-bold text-2xl hover:bg-[var(--color-blue-00)] transition-all"
        >
          Save and continue
        </button>
      </div>
    </div>
  );
};
