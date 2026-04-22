/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const H4CurrentInstitutionBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const h4 = state.h4 || {};

  const handleUpdate = (field: string, value: any) => {
    updateState({ h4: { ...h4, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!h4.studentVisaNumber?.trim()) errors.studentVisaNumber = 'Enter your student visa number';
    if (!h4.visaExpiryDate) errors.visaExpiryDate = 'Enter your student visa expiry date';
    if (!h4.dateOfEntry) errors.dateOfEntry = 'Enter the date you entered Barbados';
    if (!h4.currentInstitutionName?.trim()) errors.currentInstitutionName = 'Enter the name of your current institution';
    if (!h4.currentInstitutionAddress?.trim()) errors.currentInstitutionAddress = 'Enter the address of your current institution';
    if (!h4.terminationDate) errors.terminationDate = 'Enter the termination date at your current institution';

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

      <h1 className="text-3xl md:text-4xl font-bold">Student visa and current institution</h1>
      <p className="text-xl opacity-80">Provide details of your student visa and the institution you currently attend.</p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        <fieldset className="space-y-6 border-0 p-0">
          <legend className="text-2xl font-bold mb-4">Student visa details</legend>

          <div className={fieldClass('studentVisaNumber')}>
            <label className="text-xl font-bold" htmlFor="studentVisaNumber">Student visa number</label>
            {formErrors.studentVisaNumber && <span className="text-[var(--color-red-00)] font-bold">{formErrors.studentVisaNumber}</span>}
            <input
              id="studentVisaNumber"
              type="text"
              value={h4.studentVisaNumber || ''}
              onChange={e => handleUpdate('studentVisaNumber', e.target.value)}
              className={`${inputClass} w-64`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className={fieldClass('visaIssueDate')}>
              <label className="text-xl font-bold" htmlFor="visaIssueDate">Visa issue date</label>
              <p className="text-[var(--color-mid-grey-00)]">For example, 15 03 2023</p>
              {formErrors.visaIssueDate && <span className="text-[var(--color-red-00)] font-bold">{formErrors.visaIssueDate}</span>}
              <input
                id="visaIssueDate"
                type="date"
                value={h4.visaIssueDate || ''}
                onChange={e => handleUpdate('visaIssueDate', e.target.value)}
                className={`${inputClass} w-full`}
              />
            </div>
            <div className={fieldClass('visaExpiryDate')}>
              <label className="text-xl font-bold" htmlFor="visaExpiryDate">Visa expiry date</label>
              <p className="text-[var(--color-mid-grey-00)]">For example, 15 03 2026</p>
              {formErrors.visaExpiryDate && <span className="text-[var(--color-red-00)] font-bold">{formErrors.visaExpiryDate}</span>}
              <input
                id="visaExpiryDate"
                type="date"
                value={h4.visaExpiryDate || ''}
                onChange={e => handleUpdate('visaExpiryDate', e.target.value)}
                className={`${inputClass} w-full`}
              />
            </div>
          </div>

          <div className={fieldClass('dateOfEntry')}>
            <label className="text-xl font-bold" htmlFor="dateOfEntry">Date you entered Barbados</label>
            <p className="text-[var(--color-mid-grey-00)]">For example, 01 09 2024</p>
            {formErrors.dateOfEntry && <span className="text-[var(--color-red-00)] font-bold">{formErrors.dateOfEntry}</span>}
            <input
              id="dateOfEntry"
              type="date"
              value={h4.dateOfEntry || ''}
              onChange={e => handleUpdate('dateOfEntry', e.target.value)}
              className={`${inputClass} w-56`}
            />
          </div>
        </fieldset>

        <fieldset className="space-y-6 border-0 p-0">
          <legend className="text-2xl font-bold mb-4">Current institution</legend>

          <div className={fieldClass('currentInstitutionName')}>
            <label className="text-xl font-bold" htmlFor="currentInstitutionName">Name of institution</label>
            {formErrors.currentInstitutionName && <span className="text-[var(--color-red-00)] font-bold">{formErrors.currentInstitutionName}</span>}
            <input
              id="currentInstitutionName"
              type="text"
              value={h4.currentInstitutionName || ''}
              onChange={e => handleUpdate('currentInstitutionName', e.target.value)}
              className={`${inputClass} w-full`}
            />
          </div>

          <div className={fieldClass('currentInstitutionAddress')}>
            <label className="text-xl font-bold" htmlFor="currentInstitutionAddress">Address of institution</label>
            {formErrors.currentInstitutionAddress && <span className="text-[var(--color-red-00)] font-bold">{formErrors.currentInstitutionAddress}</span>}
            <textarea
              id="currentInstitutionAddress"
              rows={3}
              value={h4.currentInstitutionAddress || ''}
              onChange={e => handleUpdate('currentInstitutionAddress', e.target.value)}
              className={`${inputClass} w-full`}
            />
          </div>

          <div className={fieldClass('terminationDate')}>
            <label className="text-xl font-bold" htmlFor="terminationDate">Date of termination at current institution</label>
            <p className="text-[var(--color-mid-grey-00)]">The date your attendance or enrolment ends.</p>
            {formErrors.terminationDate && <span className="text-[var(--color-red-00)] font-bold">{formErrors.terminationDate}</span>}
            <input
              id="terminationDate"
              type="date"
              value={h4.terminationDate || ''}
              onChange={e => handleUpdate('terminationDate', e.target.value)}
              className={`${inputClass} w-56`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">Are you transferring mid-course?</p>
            <p className="text-[var(--color-mid-grey-00)]">Select yes if you have not completed the course at your current institution.</p>
            <div className="flex flex-col gap-3 mt-2">
              {[{ label: 'Yes', val: true }, { label: 'No', val: false }].map(opt => (
                <label key={String(opt.val)} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="isMidCourse"
                    checked={h4.isMidCourse === opt.val}
                    onChange={() => handleUpdate('isMidCourse', opt.val)}
                    className="w-6 h-6 accent-[var(--color-teal-00)]"
                  />
                  <span className="text-xl">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </fieldset>

        <button type="submit" className="bg-[var(--color-teal-00)] text-white px-8 py-4 text-xl font-bold hover:bg-[var(--color-blue-00)] transition-colors">
          Continue
        </button>
      </form>
    </div>
  );
};
