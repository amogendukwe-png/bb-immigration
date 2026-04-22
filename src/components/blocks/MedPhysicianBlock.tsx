/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const MedPhysicianBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const medical = state.medical || {};

  const handleUpdate = (field: string, value: any) => {
    updateState({ medical: { ...medical, [field]: value } });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!medical.examinationDate) errors.examinationDate = 'Enter the date of examination';
    if (!medical.heightCm?.trim()) errors.heightCm = 'Enter the applicant\'s height';
    if (!medical.weightKg?.trim()) errors.weightKg = 'Enter the applicant\'s weight';
    if (!medical.bloodPressure?.trim()) errors.bloodPressure = 'Enter the blood pressure reading';
    if (!medical.overallAssessment) errors.overallAssessment = 'Select the overall fitness assessment';
    if (!medical.physicianName?.trim()) errors.physicianName = 'Enter the examining physician\'s full name';
    if (!medical.physicianRegistration?.trim()) errors.physicianRegistration = 'Enter the physician\'s registration number';

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

  const systemField = (id: string, label: string) => (
    <div className="flex flex-col gap-1">
      <label className="font-bold text-base" htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        value={(medical as any)[id] || ''}
        onChange={e => handleUpdate(id, e.target.value)}
        placeholder="Findings or 'Normal'"
        className={`${inputClass} text-base`}
      />
    </div>
  );

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

      <h1 className="text-3xl md:text-4xl font-bold">Physician's clinical examination</h1>
      <p className="text-xl opacity-80">
        This section must be completed by a registered physician in Barbados. The physician must have examined the applicant in person.
      </p>

      <div className="bg-[var(--color-yellow-100)] border-l-4 border-[var(--color-black-00)] p-4 max-w-2xl">
        <p className="font-bold">For the physician</p>
        <p className="mt-1">Complete all required fields below based on your clinical examination. Your registration number will be verified against the Medical Council of Barbados register.</p>
      </div>

      <form onSubmit={validateAndSubmit} className="space-y-10 max-w-2xl">

        {/* Examination date */}
        <div className={fieldClass('examinationDate')}>
          <label className="text-xl font-bold" htmlFor="examinationDate">Date of examination</label>
          {formErrors.examinationDate && <span className="text-[var(--color-red-00)] font-bold">{formErrors.examinationDate}</span>}
          <input
            id="examinationDate"
            type="date"
            value={medical.examinationDate || ''}
            onChange={e => handleUpdate('examinationDate', e.target.value)}
            className={`${inputClass} w-56`}
          />
        </div>

        {/* Vital measurements */}
        <fieldset className="space-y-6 border-0 p-0">
          <legend className="text-2xl font-bold">Vital measurements</legend>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={fieldClass('heightCm')}>
              <label className="text-xl font-bold" htmlFor="heightCm">Height (cm)</label>
              {formErrors.heightCm && <span className="text-[var(--color-red-00)] font-bold text-sm">{formErrors.heightCm}</span>}
              <input
                id="heightCm"
                type="text"
                value={medical.heightCm || ''}
                onChange={e => handleUpdate('heightCm', e.target.value)}
                placeholder="e.g. 172"
                className={`${inputClass} w-full`}
              />
            </div>
            <div className={fieldClass('weightKg')}>
              <label className="text-xl font-bold" htmlFor="weightKg">Weight (kg)</label>
              {formErrors.weightKg && <span className="text-[var(--color-red-00)] font-bold text-sm">{formErrors.weightKg}</span>}
              <input
                id="weightKg"
                type="text"
                value={medical.weightKg || ''}
                onChange={e => handleUpdate('weightKg', e.target.value)}
                placeholder="e.g. 68"
                className={`${inputClass} w-full`}
              />
            </div>
            <div className={fieldClass('pulse')}>
              <label className="text-xl font-bold" htmlFor="pulse">Pulse (bpm)</label>
              {formErrors.pulse && <span className="text-[var(--color-red-00)] font-bold text-sm">{formErrors.pulse}</span>}
              <input
                id="pulse"
                type="text"
                value={medical.pulse || ''}
                onChange={e => handleUpdate('pulse', e.target.value)}
                placeholder="e.g. 72"
                className={`${inputClass} w-full`}
              />
            </div>
          </div>

          <div className={fieldClass('bloodPressure')}>
            <label className="text-xl font-bold" htmlFor="bloodPressure">Blood pressure (mmHg)</label>
            {formErrors.bloodPressure && <span className="text-[var(--color-red-00)] font-bold">{formErrors.bloodPressure}</span>}
            <input
              id="bloodPressure"
              type="text"
              value={medical.bloodPressure || ''}
              onChange={e => handleUpdate('bloodPressure', e.target.value)}
              placeholder="e.g. 120/80"
              className={`${inputClass} w-48`}
            />
          </div>
        </fieldset>

        {/* Systems review */}
        <fieldset className="space-y-4 border-0 p-0">
          <legend className="text-2xl font-bold">Systems review</legend>
          <p className="text-[var(--color-mid-grey-00)]">Record findings for each system or write "Normal" if no abnormalities found.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {systemField('eyesAndEars', 'Eyes and ears')}
            {systemField('respiratorySystem', 'Respiratory system')}
            {systemField('cardiovascularSystem', 'Cardiovascular system')}
            {systemField('abdomen', 'Abdomen')}
            {systemField('skinAndLymph', 'Skin and lymph nodes')}
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold text-base" htmlFor="hivTestResult">HIV test result</label>
            <select
              id="hivTestResult"
              value={medical.hivTestResult || ''}
              onChange={e => handleUpdate('hivTestResult', e.target.value)}
              className={`${inputClass} w-48 text-base`}
            >
              <option value="">Select</option>
              <option value="Negative">Negative</option>
              <option value="Positive">Positive</option>
              <option value="Not tested">Not tested</option>
            </select>
          </div>
        </fieldset>

        {/* Overall assessment */}
        <div className={fieldClass('overallAssessment')}>
          <p className="text-xl font-bold">Overall fitness assessment</p>
          {formErrors.overallAssessment && <span className="text-[var(--color-red-00)] font-bold">{formErrors.overallAssessment}</span>}
          <div className="flex flex-col gap-3 mt-1">
            {[
              { val: 'FIT', label: 'Fit — no medical concerns' },
              { val: 'FIT_WITH_CONDITIONS', label: 'Fit with conditions — see notes below' },
              { val: 'UNFIT', label: 'Unfit — applicant has a condition that may affect immigration eligibility' },
            ].map(opt => (
              <label key={opt.val} className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="overallAssessment"
                  value={opt.val}
                  checked={medical.overallAssessment === opt.val}
                  onChange={() => handleUpdate('overallAssessment', opt.val as any)}
                  className="w-6 h-6 accent-[var(--color-teal-00)] mt-1"
                />
                <span className="text-xl">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {(medical.overallAssessment === 'FIT_WITH_CONDITIONS' || medical.overallAssessment === 'UNFIT') && (
          <div className="flex flex-col gap-2">
            <label className="text-xl font-bold" htmlFor="assessmentNotes">Assessment notes</label>
            <p className="text-[var(--color-mid-grey-00)]">Describe the conditions or reasons for the fitness assessment.</p>
            <textarea
              id="assessmentNotes"
              rows={4}
              value={medical.assessmentNotes || ''}
              onChange={e => handleUpdate('assessmentNotes', e.target.value)}
              className="border-2 border-[var(--color-black-00)] p-3 text-xl w-full focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
            />
          </div>
        )}

        {/* Physician details */}
        <fieldset className="space-y-6 border-0 p-0">
          <legend className="text-2xl font-bold">Physician details</legend>

          <div className={fieldClass('physicianName')}>
            <label className="text-xl font-bold" htmlFor="physicianName">Full name of examining physician</label>
            {formErrors.physicianName && <span className="text-[var(--color-red-00)] font-bold">{formErrors.physicianName}</span>}
            <input
              id="physicianName"
              type="text"
              value={medical.physicianName || ''}
              onChange={e => handleUpdate('physicianName', e.target.value)}
              className={`${inputClass} w-full`}
            />
          </div>

          <div className={fieldClass('physicianRegistration')}>
            <label className="text-xl font-bold" htmlFor="physicianRegistration">Medical Council registration number</label>
            {formErrors.physicianRegistration && <span className="text-[var(--color-red-00)] font-bold">{formErrors.physicianRegistration}</span>}
            <input
              id="physicianRegistration"
              type="text"
              value={medical.physicianRegistration || ''}
              onChange={e => handleUpdate('physicianRegistration', e.target.value)}
              className={`${inputClass} w-64`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xl font-bold" htmlFor="physicianAddress">Practice address</label>
            <textarea
              id="physicianAddress"
              rows={3}
              value={medical.physicianAddress || ''}
              onChange={e => handleUpdate('physicianAddress', e.target.value)}
              className="border-2 border-[var(--color-black-00)] p-3 text-xl w-full focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-100)]"
            />
          </div>
        </fieldset>

        <button type="submit" className="bg-[var(--color-teal-00)] text-white px-8 py-4 text-xl font-bold hover:bg-[var(--color-blue-00)] transition-colors">
          Continue to check your answers
        </button>
      </form>
    </div>
  );
};
