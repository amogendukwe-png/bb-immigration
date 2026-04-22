/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const ReEntrySponsorBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const reEntry = state.reEntry || {};

  const handleUpdate = (field: string, value: any) => {
    updateState({ reEntry: { ...reEntry, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!reEntry.sponsorName?.trim()) errors.sponsorName = 'Enter the full name of your sponsor in Barbados';
    if (!reEntry.sponsorAddress?.trim()) errors.sponsorAddress = 'Enter the address of your sponsor';
    if (!reEntry.sponsorRelationship?.trim()) errors.sponsorRelationship = 'Enter your relationship to your sponsor';
    if (!reEntry.sponsorPhone?.trim()) errors.sponsorPhone = 'Enter a contact phone number for your sponsor';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }
    setFormErrors({});
    goToNext();
  };

  const inputClass = 'border-2 border-[var(--color-black-00)] p-3 text-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]';
  const fieldClass = (key: string) =>
    `flex flex-col gap-2 ${formErrors[key] ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`;

  return (
    <div className="space-y-8">
      {Object.keys(formErrors).length > 0 && (
        <div className="border-[4px] border-[var(--color-red-00)] p-4 mb-8 bg-white" role="alert">
          <h2 className="text-[var(--color-red-00)] text-xl font-bold mb-2">There is a problem</h2>
          <ul className="text-[var(--color-red-00)] list-inside list-disc underline font-medium">
            {Object.entries(formErrors).map(([key, val]) => (
              <li key={key}><a href={`#${key}`}>{val}</a></li>
            ))}
          </ul>
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold">Sponsor in Barbados</h1>
      <p className="text-xl opacity-80">
        Provide details of a person in Barbados who is willing to act as your sponsor and take responsibility for your stay.
      </p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        <div className={fieldClass('sponsorName')}>
          <label className="text-xl font-bold" htmlFor="sponsorName">Full name of sponsor</label>
          {formErrors.sponsorName && <span className="text-[var(--color-red-00)] font-bold">{formErrors.sponsorName}</span>}
          <input
            id="sponsorName"
            type="text"
            value={reEntry.sponsorName || ''}
            onChange={e => handleUpdate('sponsorName', e.target.value)}
            className={`${inputClass} w-full`}
          />
        </div>

        <div className={fieldClass('sponsorAddress')}>
          <label className="text-xl font-bold" htmlFor="sponsorAddress">Sponsor's address in Barbados</label>
          {formErrors.sponsorAddress && <span className="text-[var(--color-red-00)] font-bold">{formErrors.sponsorAddress}</span>}
          <textarea
            id="sponsorAddress"
            rows={3}
            value={reEntry.sponsorAddress || ''}
            onChange={e => handleUpdate('sponsorAddress', e.target.value)}
            className={`${inputClass} w-full`}
          />
        </div>

        <div className={fieldClass('sponsorRelationship')}>
          <label className="text-xl font-bold" htmlFor="sponsorRelationship">Your relationship to the sponsor</label>
          <p className="text-[var(--color-mid-grey-00)]">For example, parent, sibling, spouse, friend</p>
          {formErrors.sponsorRelationship && <span className="text-[var(--color-red-00)] font-bold">{formErrors.sponsorRelationship}</span>}
          <input
            id="sponsorRelationship"
            type="text"
            value={reEntry.sponsorRelationship || ''}
            onChange={e => handleUpdate('sponsorRelationship', e.target.value)}
            className={`${inputClass} w-64`}
          />
        </div>

        <div className={fieldClass('sponsorPhone')}>
          <label className="text-xl font-bold" htmlFor="sponsorPhone">Sponsor's telephone number</label>
          {formErrors.sponsorPhone && <span className="text-[var(--color-red-00)] font-bold">{formErrors.sponsorPhone}</span>}
          <input
            id="sponsorPhone"
            type="tel"
            value={reEntry.sponsorPhone || ''}
            onChange={e => handleUpdate('sponsorPhone', e.target.value)}
            className={`${inputClass} w-64`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl font-bold" htmlFor="sponsorEmail">
            Sponsor's email address <span className="font-normal text-[var(--color-mid-grey-00)]">(optional)</span>
          </label>
          <input
            id="sponsorEmail"
            type="email"
            value={reEntry.sponsorEmail || ''}
            onChange={e => handleUpdate('sponsorEmail', e.target.value)}
            className={`${inputClass} w-full`}
          />
        </div>

        <button type="submit" className="bg-[var(--color-teal-00)] text-white px-8 py-4 text-xl font-bold hover:bg-[var(--color-blue-00)] transition-colors">
          Continue
        </button>
      </form>
    </div>
  );
};
