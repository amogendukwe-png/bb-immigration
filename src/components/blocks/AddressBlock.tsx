/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const AddressBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const addresses = state.addresses || {};

  const handleUpdate = (field: string, value: any) => {
    updateState({
      addresses: { ...addresses, [field]: value }
    });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!addresses.current) errors.current = 'Enter your current permanent residential address';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }

    setFormErrors({});
    goToNext();
  };

  return (
    <div className="space-y-8" id="address-block">
      {Object.keys(formErrors).length > 0 && (
        <div className="border-[4px] border-[var(--color-red-00)] p-4 mb-8 bg-white" role="alert" id="error-summary">
          <h2 className="text-[var(--color-red-00)] text-xl font-bold mb-2">There is a problem</h2>
          <ul className="text-[var(--color-red-00)] list-inside list-disc underline font-medium">
            {Object.entries(formErrors).map(([key, value]) => (
              <li key={key}><a href={`#${key}`}>{value}</a></li>
            ))}
          </ul>
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold mb-8">Where do you live?</h1>
      <p className="text-xl mb-12 opacity-80">Provide your current and intended residential details.</p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">
        <div className={`p-4 ${formErrors.current ? 'border-l-4 border-[var(--color-red-00)]' : ''}`}>
          <label className="text-xl font-bold mb-2 block" htmlFor="currentAddress">Current permanent residential address</label>
          <span className="text-[var(--color-mid-grey-00)] block mb-4 italic">Include street, city/town, parish and country</span>
          {formErrors.current && <span className="text-[var(--color-red-00)] font-bold block mb-2">{formErrors.current}</span>}
          <textarea
            id="currentAddress"
            rows={4}
            className="border-2 border-black p-4 text-xl w-full focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none uppercase"
            value={addresses.current || ''}
            onChange={(e) => handleUpdate('current', e.target.value)}
          />
        </div>

        <div className="p-4 border-l-4 border-[var(--color-black-00)] bg-[var(--color-white-00)]">
          <label className="text-xl font-bold mb-2 block" htmlFor="intendedAddress">Where applicable, intended address in Barbados</label>
          <span className="text-[var(--color-mid-grey-00)] block mb-4">Leave blank if you already reside permanently in Barbados</span>
          <textarea
            id="intendedAddress"
            rows={4}
            className="border-2 border-[var(--color-black-00)] p-4 text-xl w-full focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none uppercase bg-white"
            value={addresses.intendedBarbados || ''}
            onChange={(e) => handleUpdate('intendedBarbados', e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-[var(--color-teal-00)] text-white px-8 py-3 rounded-sm font-bold text-xl hover:bg-[var(--color-blue-00)] active:translate-y-1 transition-all shadow-md focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
          id="continue-button"
        >
          Save and continue
        </button>
      </form>
    </div>
  );
};
