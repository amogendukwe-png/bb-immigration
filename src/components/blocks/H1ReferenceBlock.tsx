/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';
import { Info, HelpCircle } from 'lucide-react';

export const H1ReferenceBlock: React.FC = () => {
  const { updateState, goToNext } = useForm();
  const [refValue, setRefValue] = React.useState('');
  const [error, setError] = React.useState('');

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refValue || refValue.length < 5) {
      setError('Enter a valid Form H-1 reference number');
      return;
    }
    // In a real app we would validate the reference against the database
    goToNext();
  };

  return (
    <div className="space-y-8" id="h1-reference-block">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">Form H-1: Certificate of Eligibility</h1>
      
      <div className="bg-[#1d70b8] bg-opacity-10 p-6 border-l-4 border-[#1d70b8] mb-12 max-w-3xl">
        <div className="flex gap-4">
          <Info className="text-[#1d70b8] shrink-0" size={28} />
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#1d70b8]">What is Form H-1?</h2>
            <p className="text-lg leading-relaxed">
              Form H-1 is a <strong>Certificate of Eligibility</strong> that must be completed by an authorised official at your school in Barbados.
            </p>
            <p className="text-lg leading-relaxed">
              You cannot apply for student status yourself until your school has issued this certificate digitally or provided you with the reference number.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-xl">
        <div className={`flex flex-col gap-2 ${error ? 'border-l-4 border-[#d4351c] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="h1-ref">Enter your Form H-1 reference number</label>
          <span className="text-[#505a5f]">You can find this on the top right of your H-1 certificate, e.g. H1-2026-AB123</span>
          {error && <span className="text-[#d4351c] font-bold block mt-2">{error}</span>}
          <input
            id="h1-ref"
            className="border-2 border-black p-3 text-2xl font-mono uppercase focus:ring-4 focus:ring-[#ffdd00] focus:outline-none"
            value={refValue}
            onChange={(e) => setRefValue(e.target.value)}
            placeholder="H1-XXXX-XXXX"
          />
        </div>

        <div className="pt-4 flex flex-col gap-6">
          <button
            type="submit"
            className="bg-[#00703c] text-white px-10 py-4 rounded-sm font-bold text-2xl hover:bg-[#005a30] transition-all shadow-md focus:outline-none focus:ring-4 focus:ring-[#ffdd00]"
          >
            Check reference and continue
          </button>

          <a href="#" className="flex items-center gap-2 text-[#005ea5] hover:text-[#003078] font-bold text-lg underline underline-offset-4">
            <HelpCircle size={20} />
            I don't have a Form H-1 reference number
          </a>
        </div>
      </form>

      <section className="pt-12 border-t border-[#b1b4b6] mt-12 opacity-80">
        <h2 className="text-xl font-bold mb-4">Note for school officials</h2>
        <p className="text-lg max-w-2xl">
          If you are a school official looking to issue a Certificate of Eligibility, please sign in to the 
          <a href="#" className="text-[#005ea5] underline ml-1">Barbados School Portal</a>.
        </p>
      </section>
    </div>
  );
};
