/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const H4TransferInstitutionBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const h4 = state.h4 || {};

  const handleUpdate = (field: string, value: any) => {
    updateState({ h4: { ...h4, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!h4.transferInstitutionName?.trim()) errors.transferInstitutionName = 'Enter the name of the transfer institution';
    if (!h4.transferInstitutionAddress?.trim()) errors.transferInstitutionAddress = 'Enter the address of the transfer institution';
    if (!h4.courseName?.trim()) errors.courseName = 'Enter the name of the course';
    if (!h4.courseStartDate) errors.courseStartDate = 'Enter the course start date';

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

      <h1 className="text-3xl md:text-4xl font-bold">Transfer institution and course details</h1>
      <p className="text-xl opacity-80">Tell us about the institution you are transferring to and the course you will study.</p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        <div className={fieldClass('transferInstitutionName')}>
          <label className="text-xl font-bold" htmlFor="transferInstitutionName">Name of transfer institution</label>
          {formErrors.transferInstitutionName && <span className="text-[var(--color-red-00)] font-bold">{formErrors.transferInstitutionName}</span>}
          <input
            id="transferInstitutionName"
            type="text"
            value={h4.transferInstitutionName || ''}
            onChange={e => handleUpdate('transferInstitutionName', e.target.value)}
            className={`${inputClass} w-full`}
          />
        </div>

        <div className={fieldClass('transferInstitutionAddress')}>
          <label className="text-xl font-bold" htmlFor="transferInstitutionAddress">Address of transfer institution</label>
          {formErrors.transferInstitutionAddress && <span className="text-[var(--color-red-00)] font-bold">{formErrors.transferInstitutionAddress}</span>}
          <textarea
            id="transferInstitutionAddress"
            rows={3}
            value={h4.transferInstitutionAddress || ''}
            onChange={e => handleUpdate('transferInstitutionAddress', e.target.value)}
            className={`${inputClass} w-full`}
          />
        </div>

        <div className={fieldClass('courseName')}>
          <label className="text-xl font-bold" htmlFor="courseName">Course name</label>
          {formErrors.courseName && <span className="text-[var(--color-red-00)] font-bold">{formErrors.courseName}</span>}
          <input
            id="courseName"
            type="text"
            value={h4.courseName || ''}
            onChange={e => handleUpdate('courseName', e.target.value)}
            className={`${inputClass} w-full`}
          />
        </div>

        <div className={fieldClass('courseDuration')}>
          <label className="text-xl font-bold" htmlFor="courseDuration">Course duration</label>
          <p className="text-[var(--color-mid-grey-00)]">For example, 2 years, 18 months</p>
          {formErrors.courseDuration && <span className="text-[var(--color-red-00)] font-bold">{formErrors.courseDuration}</span>}
          <input
            id="courseDuration"
            type="text"
            value={h4.courseDuration || ''}
            onChange={e => handleUpdate('courseDuration', e.target.value)}
            className={`${inputClass} w-64`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className={fieldClass('courseStartDate')}>
            <label className="text-xl font-bold" htmlFor="courseStartDate">Course start date</label>
            <p className="text-[var(--color-mid-grey-00)]">For example, 01 09 2025</p>
            {formErrors.courseStartDate && <span className="text-[var(--color-red-00)] font-bold">{formErrors.courseStartDate}</span>}
            <input
              id="courseStartDate"
              type="date"
              value={h4.courseStartDate || ''}
              onChange={e => handleUpdate('courseStartDate', e.target.value)}
              className={`${inputClass} w-full`}
            />
          </div>
          <div className={fieldClass('courseEndDate')}>
            <label className="text-xl font-bold" htmlFor="courseEndDate">Course end date</label>
            <p className="text-[var(--color-mid-grey-00)]">For example, 30 06 2027</p>
            {formErrors.courseEndDate && <span className="text-[var(--color-red-00)] font-bold">{formErrors.courseEndDate}</span>}
            <input
              id="courseEndDate"
              type="date"
              value={h4.courseEndDate || ''}
              onChange={e => handleUpdate('courseEndDate', e.target.value)}
              className={`${inputClass} w-full`}
            />
          </div>
        </div>

        <button type="submit" className="bg-[var(--color-teal-00)] text-white px-8 py-4 text-xl font-bold hover:bg-[var(--color-blue-00)] transition-colors">
          Continue
        </button>
      </form>
    </div>
  );
};
