/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';
import { Plus, Trash2, MapPin } from 'lucide-react';

export const ResidenceHistoryBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  
  const history = state.addresses?.history || [];

  const addAddress = () => {
    const newEntry = { address: '', from: '', to: '' };
    updateState({ 
      addresses: { ...state.addresses, history: [...history, newEntry] } 
    });
  };

  const removeAddress = (index: number) => {
    const updated = [...history];
    updated.splice(index, 1);
    updateState({ 
      addresses: { ...state.addresses, history: updated } 
    });
  };

  const updateAddress = (index: number, field: string, value: string) => {
    const updated = [...history];
    updated[index] = { ...updated[index], [field]: value };
    updateState({ 
      addresses: { ...state.addresses, history: updated } 
    });
  };

  return (
    <div className="space-y-8" id="residence-history-block">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 underline decoration-2 decoration-[var(--color-teal-00)] underline-offset-8">Residence history</h1>
      <p className="text-xl mb-12 opacity-80 max-w-2xl leading-relaxed">
        List all addresses where you have lived for 6 months or more since your 16th birthday.
      </p>

      <div className="space-y-10">
        {history.map((entry, index) => (
          <div key={index} className="p-8 border-2 border-[var(--color-black-00)] bg-white relative shadow-sm group hover:border-[var(--color-teal-00)] transition-all">
            <button 
              onClick={() => removeAddress(index)}
              className="absolute top-4 right-4 text-[var(--color-red-00)] hover:text-red-800 flex items-center gap-1 font-bold underline transition-colors"
            >
              <Trash2 size={18} />
              Remove
            </button>
            
            <div className="flex items-center gap-3 mb-8 text-[var(--color-teal-00)]">
              <MapPin size={24} />
              <h2 className="text-2xl font-bold tracking-tight uppercase">Previous address {index + 1}</h2>
            </div>
            
            <div className="space-y-8 max-w-2xl ml-2 border-l-2 border-[var(--color-white-00)] pl-6">
              <div className="flex flex-col gap-2">
                <label className="text-lg font-bold">Full postal address</label>
                <textarea 
                  rows={3}
                  className="border-2 border-black p-3 text-lg w-full uppercase focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
                  value={entry.address}
                  onChange={(e) => updateAddress(index, 'address', e.target.value)}
                  placeholder="Street, City, Parish/State, Country"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-lg font-bold italic">From date</label>
                  <input 
                    type="date"
                    className="border-2 border-black p-3 text-lg focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
                    value={entry.from}
                    onChange={(e) => updateAddress(index, 'from', e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-lg font-bold italic">To date</label>
                  <input 
                    type="date"
                    className="border-2 border-black p-3 text-lg focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
                    value={entry.to}
                    onChange={(e) => updateAddress(index, 'to', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6">
        <button 
          onClick={addAddress}
          className="flex items-center gap-3 text-[var(--color-teal-00)] hover:text-[#003078] font-bold text-2xl px-6 py-3 border-2 border-dashed border-[var(--color-teal-00)] hover:bg-[var(--color-white-00)] transition-all rounded-sm group focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
        >
          <Plus size={28} className="group-hover:rotate-90 transition-transform duration-300" />
          Add another address
        </button>
      </div>

      <div className="pt-16 border-t border-[var(--color-black-00)] mt-12 overflow-hidden">
        <div className="flex items-center justify-between">
            <p className="text-[var(--color-mid-grey-00)] max-w-sm italic leading-tight">
                Ensure you have accounted for at least 5 years of residence within the last 7 years.
            </p>
            <button
                onClick={goToNext}
                className="bg-[var(--color-teal-00)] text-white px-12 py-4 rounded-sm font-bold text-2xl hover:bg-[var(--color-blue-00)] transition-all shadow-lg active:translate-y-1 transform hover:scale-105"
            >
                Save and continue
            </button>
        </div>
      </div>
    </div>
  );
};
