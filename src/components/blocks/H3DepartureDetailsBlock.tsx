/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const H3DepartureDetailsBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const report = state.h3Report || {};

  const handleUpdate = (field: string, value: string) => {
    updateState({ h3Report: { ...report, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!report.lastAddressInBarbados?.trim()) errors.lastAddressInBarbados = 'Enter the student\'s last known address in Barbados';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }
    setFormErrors({});
    goToNext();
  };

  return (
    <div className="space-y-8" id="h3-departure-details">
      <p className="border-l-4 border-[var(--color-blue-40)] pl-4 text-[var(--color-mid-grey-00)]">
        Form H-3 — Part III: Departure information
      </p>

      {Object.keys(formErrors).length > 0 && (
        <div className="border-[4px] border-[var(--color-red-00)] p-4 bg-white" role="alert">
          <h2 className="text-[var(--color-red-00)] text-xl font-bold mb-2">There is a problem</h2>
          <ul className="text-[var(--color-red-00)] list-inside list-disc underline font-medium">
            {Object.entries(formErrors).map(([key, val]) => (
              <li key={key}><a href={`#${key}`}>{val}</a></li>
            ))}
          </ul>
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold">Student departure details</h1>
      <p className="text-xl opacity-80">
        Provide the student's address and departure information from Barbados.
      </p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        {/* Last address in Barbados */}
        <div className={`flex flex-col gap-2 ${formErrors.lastAddressInBarbados ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="lastAddressInBarbados">
            Student's last reported address in Barbados
          </label>
          {formErrors.lastAddressInBarbados && (
            <span className="text-[var(--color-red-00)] font-bold">{formErrors.lastAddressInBarbados}</span>
          )}
          <textarea
            id="lastAddressInBarbados"
            rows={3}
            value={report.lastAddressInBarbados || ''}
            onChange={e => handleUpdate('lastAddressInBarbados', e.target.value)}
            className="border-2 border-[var(--color-black-00)] p-3 text-xl w-full focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
          />
        </div>

        {/* Departure details */}
        <div className="space-y-6">
          <p className="text-xl font-bold">Departure from Barbados</p>
          <p className="text-[var(--color-mid-grey-00)]">If known, provide the following departure information.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-bold" htmlFor="dateOfDeparture">Date of departure</label>
              <input
                id="dateOfDeparture"
                type="date"
                value={report.dateOfDeparture || ''}
                onChange={e => handleUpdate('dateOfDeparture', e.target.value)}
                className="border-2 border-[var(--color-black-00)] p-3 focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold" htmlFor="portOfDeparture">Port of departure</label>
              <input
                id="portOfDeparture"
                type="text"
                value={report.portOfDeparture || ''}
                onChange={e => handleUpdate('portOfDeparture', e.target.value)}
                className="border-2 border-[var(--color-black-00)] p-3 focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold" htmlFor="transportName">Name of ship or airline</label>
              <input
                id="transportName"
                type="text"
                value={report.transportName || ''}
                onChange={e => handleUpdate('transportName', e.target.value)}
                className="border-2 border-[var(--color-black-00)] p-3 focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold" htmlFor="addressAbroad">Address abroad</label>
            <textarea
              id="addressAbroad"
              rows={3}
              value={report.addressAbroad || ''}
              onChange={e => handleUpdate('addressAbroad', e.target.value)}
              className="border-2 border-[var(--color-black-00)] p-3 text-xl w-full focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
            />
          </div>
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
