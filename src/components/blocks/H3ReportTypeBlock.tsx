/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

const reportOptions: Array<{ value: 'A' | 'B' | 'C' | 'D'; label: string; hint?: string }> = [
  {
    value: 'A',
    label: 'Did not register personally at this school within 14 days of the expected date.',
  },
  {
    value: 'B',
    label: 'Is carrying less than a full course of study, or is attending classes to a lesser extent than formally required.',
    hint: 'Explain in the Remarks section.',
  },
  {
    value: 'C',
    label: 'Terminated attendance at this school before completion of the school year.',
    hint: 'You will be asked for the termination date and departure details.',
  },
  {
    value: 'D',
    label: 'Terminated attendance at this school upon completion of the school term.',
    hint: 'You will be asked for the termination date and departure details.',
  },
];

export const H3ReportTypeBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const report = state.h3Report || {};

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!report.reportType) {
      setFormErrors({ reportType: 'Select the circumstance that applies to the student' });
      return;
    }
    if ((report.reportType === 'C' || report.reportType === 'D') && !report.terminationDate) {
      setFormErrors({ terminationDate: 'Enter the termination date' });
      return;
    }
    setFormErrors({});
    goToNext();
  };

  return (
    <div className="space-y-8" id="h3-report-type">
      <p className="border-l-4 border-[var(--color-blue-40)] pl-4 text-[var(--color-mid-grey-00)]">
        Form H-3 — Part III: Report of school concerning student
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

      <h1 className="text-3xl md:text-4xl font-bold">Report type</h1>
      <p className="text-xl opacity-80">
        Select the circumstance that applies to{' '}
        <strong>
          {state.h3Student?.firstName
            ? `${state.h3Student.firstName} ${state.h3Student.familyName}`
            : 'the student'}
        </strong>.
      </p>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">
        <fieldset>
          <legend className="text-xl font-bold mb-6">The student (check one)</legend>
          {formErrors.reportType && (
            <p className="text-[var(--color-red-00)] font-bold mb-4">{formErrors.reportType}</p>
          )}
          <div className="flex flex-col gap-4">
            {reportOptions.map(opt => (
              <label
                key={opt.value}
                className={`flex gap-4 items-start p-4 border-2 cursor-pointer transition-colors ${
                  report.reportType === opt.value
                    ? 'border-[var(--color-teal-00)] bg-[var(--color-teal-10)]'
                    : 'border-[var(--color-grey-00)] hover:border-[var(--color-teal-00)]'
                }`}
              >
                <input
                  type="radio"
                  name="reportType"
                  value={opt.value}
                  checked={report.reportType === opt.value}
                  onChange={() => updateState({ h3Report: { ...report, reportType: opt.value as 'A'|'B'|'C'|'D' } })}
                  className="mt-1 w-5 h-5 accent-[var(--color-teal-00)] shrink-0"
                />
                <div>
                  <span className="text-xl">
                    <strong>({opt.value})</strong> {opt.label}
                  </span>
                  {opt.hint && (
                    <p className="text-[var(--color-mid-grey-00)] mt-1">{opt.hint}</p>
                  )}
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Termination date — only for C and D */}
        {(report.reportType === 'C' || report.reportType === 'D') && (
          <div className={`flex flex-col gap-2 ${formErrors.terminationDate ? 'border-l-4 border-[var(--color-red-00)] pl-4' : ''}`}>
            <label className="text-xl font-bold" htmlFor="terminationDate">Termination date</label>
            {formErrors.terminationDate && (
              <span className="text-[var(--color-red-00)] font-bold">{formErrors.terminationDate}</span>
            )}
            <input
              id="terminationDate"
              type="date"
              value={report.terminationDate || ''}
              onChange={e => updateState({ h3Report: { ...report, terminationDate: e.target.value } })}
              className="border-2 border-[var(--color-black-00)] p-3 text-xl w-56 focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
            />
          </div>
        )}

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
