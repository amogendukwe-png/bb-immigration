/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const StayExtensionDetailsBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const ext = state.stayExtension || {};

  const handleUpdate = (field: string, value: any) => {
    updateState({ stayExtension: { ...ext, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!ext.dateOfEntry) errors.dateOfEntry = 'Enter the date you entered Barbados under your current permit';
    if (!ext.currentPermitPeriod) errors.currentPermitPeriod = 'Enter your current permit period';
    if (!ext.extensionRequested) errors.extensionRequested = 'Enter the extension period you are requesting';
    if (!ext.reasons?.trim()) errors.reasons = 'Explain the reasons for your extension request';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }
    setFormErrors({});
    goToNext();
  };

  return (
    <div className="space-y-8" id="stay-extension-block">
      {Object.keys(formErrors).length > 0 && (
        <div className="border-[4px] border-[var(--color-red-00)] p-4 mb-8 bg-white" role="alert" id="error-summary">
          <h2 className="text-[var(--color-red-00)] text-xl font-bold mb-2">There is a problem</h2>
          <ul className="text-[var(--color-red-00)] list-inside list-disc underline font-medium">
            {Object.entries(formErrors).map(([key, val]) => (
              <li key={key}><a href={`#${key}`}>{val}</a></li>
            ))}
          </ul>
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold">Stay extension details</h1>
      <p className="text-xl opacity-80">Tell us about your current permit and how long you need to extend.</p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        {/* Date of entry */}
        <div className={`flex flex-col gap-2 ${formErrors.dateOfEntry ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="dateOfEntry">
            Date of entry into Barbados under current permit
          </label>
          <p className="text-[var(--color-mid-grey-00)]">For example, 15 03 2024</p>
          {formErrors.dateOfEntry && <span className="text-[var(--color-red-00)] font-bold">{formErrors.dateOfEntry}</span>}
          <input
            id="dateOfEntry"
            type="date"
            value={ext.dateOfEntry || ''}
            onChange={e => handleUpdate('dateOfEntry', e.target.value)}
            className="border-2 border-[var(--color-black-00)] p-3 text-xl w-56 focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
          />
        </div>

        {/* Current permit period */}
        <div className={`flex flex-col gap-2 ${formErrors.currentPermitPeriod ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="currentPermitPeriod">
            Period of your current permit
          </label>
          <p className="text-[var(--color-mid-grey-00)]">For example, 3 months, 6 months</p>
          {formErrors.currentPermitPeriod && <span className="text-[var(--color-red-00)] font-bold">{formErrors.currentPermitPeriod}</span>}
          <input
            id="currentPermitPeriod"
            type="text"
            value={ext.currentPermitPeriod || ''}
            onChange={e => handleUpdate('currentPermitPeriod', e.target.value)}
            className="border-2 border-[var(--color-black-00)] p-3 text-xl w-72 focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
          />
        </div>

        {/* Extension requested */}
        <div className={`flex flex-col gap-2 ${formErrors.extensionRequested ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="extensionRequested">
            Extension period requested
          </label>
          <p className="text-[var(--color-mid-grey-00)]">How much additional time are you requesting?</p>
          {formErrors.extensionRequested && <span className="text-[var(--color-red-00)] font-bold">{formErrors.extensionRequested}</span>}
          <input
            id="extensionRequested"
            type="text"
            value={ext.extensionRequested || ''}
            onChange={e => handleUpdate('extensionRequested', e.target.value)}
            className="border-2 border-[var(--color-black-00)] p-3 text-xl w-72 focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
          />
        </div>

        {/* Previous extensions */}
        <div className="flex flex-col gap-3">
          <p className="text-xl font-bold">Previous extension applications during this visit</p>
          <p className="text-[var(--color-mid-grey-00)]">Leave blank if this is your first extension request.</p>
          {(ext.previousExtensions || [{ date: '', lengthSought: '', granted: '' }]).map((row, i) => (
            <div key={i} className="grid grid-cols-3 gap-4 items-end">
              <div className="flex flex-col gap-1">
                {i === 0 && <label className="font-bold text-base">Date applied</label>}
                <input
                  type="date"
                  value={row.date}
                  onChange={e => {
                    const updated = [...(ext.previousExtensions || [{ date: '', lengthSought: '', granted: '' }])];
                    updated[i] = { ...updated[i], date: e.target.value };
                    handleUpdate('previousExtensions', updated);
                  }}
                  className="border-2 border-[var(--color-black-00)] p-2 text-base focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
                />
              </div>
              <div className="flex flex-col gap-1">
                {i === 0 && <label className="font-bold text-base">Length sought</label>}
                <input
                  type="text"
                  value={row.lengthSought}
                  onChange={e => {
                    const updated = [...(ext.previousExtensions || [{ date: '', lengthSought: '', granted: '' }])];
                    updated[i] = { ...updated[i], lengthSought: e.target.value };
                    handleUpdate('previousExtensions', updated);
                  }}
                  placeholder="e.g. 2 months"
                  className="border-2 border-[var(--color-black-00)] p-2 text-base focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
                />
              </div>
              <div className="flex flex-col gap-1">
                {i === 0 && <label className="font-bold text-base">Extension granted</label>}
                <input
                  type="text"
                  value={row.granted}
                  onChange={e => {
                    const updated = [...(ext.previousExtensions || [{ date: '', lengthSought: '', granted: '' }])];
                    updated[i] = { ...updated[i], granted: e.target.value };
                    handleUpdate('previousExtensions', updated);
                  }}
                  placeholder="e.g. 1 month"
                  className="border-2 border-[var(--color-black-00)] p-2 text-base focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleUpdate('previousExtensions', [...(ext.previousExtensions || []), { date: '', lengthSought: '', granted: '' }])}
            className="text-[var(--color-teal-00)] underline text-base w-fit"
          >
            + Add another previous application
          </button>
        </div>

        {/* Reasons */}
        <div className={`flex flex-col gap-2 ${formErrors.reasons ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="reasons">
            Reasons and grounds for this application
          </label>
          <p className="text-[var(--color-mid-grey-00)]">Provide full details of why you need to extend your stay.</p>
          {formErrors.reasons && <span className="text-[var(--color-red-00)] font-bold">{formErrors.reasons}</span>}
          <textarea
            id="reasons"
            rows={6}
            value={ext.reasons || ''}
            onChange={e => handleUpdate('reasons', e.target.value)}
            className="border-2 border-[var(--color-black-00)] p-3 text-xl w-full focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
          />
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
