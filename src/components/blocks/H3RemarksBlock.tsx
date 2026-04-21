/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const H3RemarksBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const report = state.h3Report || {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToNext();
  };

  return (
    <div className="space-y-8" id="h3-remarks">
      <p className="border-l-4 border-[var(--color-blue-40)] pl-4 text-[var(--color-mid-grey-00)]">
        Form H-3 — Part III: Remarks
      </p>

      <h1 className="text-3xl md:text-4xl font-bold">Remarks</h1>
      <p className="text-xl opacity-80">
        Add any additional information relevant to this report.
        {report.reportType === 'B' && (
          <> This field is required for option (B) — please explain why the student is carrying less than a full course of study.</>
        )}
      </p>

      <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl">
        <div className="flex flex-col gap-2">
          <label className="text-xl font-bold" htmlFor="remarks">Remarks</label>
          <p className="text-[var(--color-mid-grey-00)]">Optional, except for option (B) where an explanation is required.</p>
          <textarea
            id="remarks"
            rows={8}
            value={report.remarks || ''}
            onChange={e => updateState({ h3Report: { ...report, remarks: e.target.value } })}
            className="border-2 border-[var(--color-black-00)] p-3 text-xl w-full focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
          />
        </div>

        <div className="border-4 border-[var(--color-yellow-100)] bg-[var(--color-yellow-10)] p-4">
          <p className="font-bold mb-1">Declaration</p>
          <p className="text-[var(--color-mid-grey-00)]">
            By submitting this report you confirm that the information provided is true and correct, and that you are an authorised school official.
            A false report may result in withdrawal of your school's approval to accept non-immigrant students.
          </p>
        </div>

        <button
          type="submit"
          className="bg-[var(--color-teal-00)] text-white px-8 py-4 text-xl font-bold hover:bg-[var(--color-blue-00)] transition-colors"
        >
          Review and submit
        </button>
      </form>
    </div>
  );
};
