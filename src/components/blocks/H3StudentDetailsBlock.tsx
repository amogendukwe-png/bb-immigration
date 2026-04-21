/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const H3StudentDetailsBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const student = state.h3Student || {};

  const handleUpdate = (field: string, value: string) => {
    updateState({ h3Student: { ...student, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!student.familyName?.trim()) errors.familyName = 'Enter the student\'s family name';
    if (!student.firstName?.trim()) errors.firstName = 'Enter the student\'s first name';
    if (!student.dateOfBirth) errors.dateOfBirth = 'Enter the student\'s date of birth';
    if (!student.countryOfBirth?.trim()) errors.countryOfBirth = 'Enter the student\'s country of birth';
    if (!student.countryOfNationality?.trim()) errors.countryOfNationality = 'Enter the student\'s country of nationality';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo(0, 0);
      return;
    }
    setFormErrors({});
    goToNext();
  };

  return (
    <div className="space-y-8" id="h3-student-details">
      <p className="border-l-4 border-[var(--color-blue-40)] pl-4 text-[var(--color-mid-grey-00)]">
        Form H-3 — Part I: Student details
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

      <h1 className="text-3xl md:text-4xl font-bold">Student details</h1>
      <p className="text-xl opacity-80">Enter the non-immigrant student's personal information.</p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`flex flex-col gap-2 ${formErrors.familyName ? 'border-l-4 border-[var(--color-red-00)] pl-2' : ''}`}>
            <label className="text-xl font-bold" htmlFor="familyName">Family name</label>
            <p className="text-sm text-[var(--color-mid-grey-00)]">In capital letters</p>
            {formErrors.familyName && <span className="text-[var(--color-red-00)] font-bold text-base">{formErrors.familyName}</span>}
            <input
              id="familyName"
              type="text"
              value={student.familyName || ''}
              onChange={e => handleUpdate('familyName', e.target.value.toUpperCase())}
              className="border-2 border-[var(--color-black-00)] p-3 text-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
            />
          </div>
          <div className={`flex flex-col gap-2 ${formErrors.firstName ? 'border-l-4 border-[var(--color-red-00)] pl-2' : ''}`}>
            <label className="text-xl font-bold" htmlFor="firstName">First name</label>
            <p className="text-sm text-[var(--color-mid-grey-00)]">&nbsp;</p>
            {formErrors.firstName && <span className="text-[var(--color-red-00)] font-bold text-base">{formErrors.firstName}</span>}
            <input
              id="firstName"
              type="text"
              value={student.firstName || ''}
              onChange={e => handleUpdate('firstName', e.target.value)}
              className="border-2 border-[var(--color-black-00)] p-3 text-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl font-bold" htmlFor="middleName">Middle name</label>
            <p className="text-sm text-[var(--color-mid-grey-00)]">If applicable</p>
            <input
              id="middleName"
              type="text"
              value={student.middleName || ''}
              onChange={e => handleUpdate('middleName', e.target.value)}
              className="border-2 border-[var(--color-black-00)] p-3 text-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
            />
          </div>
        </div>

        {/* Date of birth */}
        <div className={`flex flex-col gap-2 ${formErrors.dateOfBirth ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="dateOfBirth">Date of birth</label>
          <p className="text-[var(--color-mid-grey-00)]">Year, Month, Day</p>
          {formErrors.dateOfBirth && <span className="text-[var(--color-red-00)] font-bold">{formErrors.dateOfBirth}</span>}
          <input
            id="dateOfBirth"
            type="date"
            value={student.dateOfBirth || ''}
            onChange={e => handleUpdate('dateOfBirth', e.target.value)}
            className="border-2 border-[var(--color-black-00)] p-3 text-xl w-56 focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
          />
        </div>

        {/* Country of birth */}
        <div className={`flex flex-col gap-2 ${formErrors.countryOfBirth ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="countryOfBirth">Country of birth</label>
          {formErrors.countryOfBirth && <span className="text-[var(--color-red-00)] font-bold">{formErrors.countryOfBirth}</span>}
          <input
            id="countryOfBirth"
            type="text"
            value={student.countryOfBirth || ''}
            onChange={e => handleUpdate('countryOfBirth', e.target.value)}
            className="border-2 border-[var(--color-black-00)] p-3 text-xl w-72 focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
          />
        </div>

        {/* Country of nationality */}
        <div className={`flex flex-col gap-2 ${formErrors.countryOfNationality ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
          <label className="text-xl font-bold" htmlFor="countryOfNationality">Country of nationality</label>
          {formErrors.countryOfNationality && <span className="text-[var(--color-red-00)] font-bold">{formErrors.countryOfNationality}</span>}
          <input
            id="countryOfNationality"
            type="text"
            value={student.countryOfNationality || ''}
            onChange={e => handleUpdate('countryOfNationality', e.target.value)}
            className="border-2 border-[var(--color-black-00)] p-3 text-xl w-72 focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
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
