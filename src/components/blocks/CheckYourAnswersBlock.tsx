/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';
import { FormStep } from '../../types/form';

export const CheckYourAnswersBlock: React.FC = () => {
  const { state, setStep, goToNext } = useForm();

  const handleEdit = (step: FormStep) => {
    setStep(step);
    window.scrollTo(0, 0);
  };

  const sections = [
    {
      title: 'Eligibility',
      step: 'ELIGIBILITY' as FormStep,
      hide: state.journeyType === 'STUDY' || state.journeyType === 'RESIDENCY',
      rows: [
        { label: 'Subject age', value: state.age !== undefined ? (state.age < 16 ? 'Under 16' : '16 or over') : 'Not provided' },
        { label: 'Barbados Citizen', value: state.isBarbadosCitizen ? 'Yes' : 'No' },
        { label: 'Relationship to subject', value: state.relationshipToSubject ? state.relationshipToSubject.replace(/_/g, ' ') : 'Not provided' }
      ]
    },
    {
      title: 'Personal details',
      step: 'PERSONAL_DETAILS' as FormStep,
      rows: [
        { label: 'Family name', value: state.personalDetails?.lastName },
        { label: 'Given names', value: state.personalDetails?.firstName },
        { label: 'Date of birth', value: state.personalDetails?.dateOfBirth },
        { label: 'Sex', value: state.personalDetails?.sex },
        { label: 'Occupation', value: state.personalDetails?.occupation }
      ]
    },
    {
      title: 'Passport details',
      step: 'PASSPORT_DETAILS' as FormStep,
      rows: [
        { label: 'Passport number', value: state.passport?.number },
        { label: 'Expiry date', value: state.passport?.expiryDate },
        { label: 'Issuing country', value: state.passport?.countryOfIssue }
      ]
    },
    {
      title: 'Residence',
      step: 'ADDRESS_BLOCK' as FormStep,
      rows: [
        { label: 'Current address', value: state.addresses?.current },
        { label: 'Intended address', value: state.addresses?.intendedBarbados }
      ]
    },
    {
      title: 'Dependants',
      step: 'DEPENDANT_DETAILS' as FormStep,
      rows: (state.dependants || []).map((dep, i) => ({
        label: `Dependant ${i + 1}`,
        value: `${dep.fullName} (${dep.relationship})`
      }))
    },
    {
      title: 'Background declarations',
      step: 'BACKGROUND_CHECKS' as FormStep,
      rows: [
        { label: 'Health issues', value: state.background?.healthIssue ? `Yes: ${state.background.healthDetails}` : 'No' },
        { label: 'Criminal record', value: state.background?.criminalRecord ? `Yes: ${state.background.criminalDetails}` : 'No' },
        { label: 'Deportation history', value: state.background?.deported ? `Yes: ${state.background.deportDetails}` : 'No' }
      ]
    }
  ];

  return (
    <div className="space-y-12" id="check-answers-page">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Check your answers</h1>
      <p className="text-xl opacity-80 max-w-2xl">Check the information you have provided carefully before you submit your application.</p>

      <div className="space-y-16">
        {sections.filter(s => !s.hide).map((section) => (
          <section key={section.title} className="space-y-4">
            <h2 className="text-2xl font-bold border-b-2 border-black pb-2">{section.title}</h2>
            <dl className="divide-y divide-[var(--color-black-00)]">
              {section.rows.map((row) => (
                <div key={row.label} className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <dt className="font-bold text-lg">{row.label}</dt>
                  <dd className="text-lg opacity-90 uppercase">{row.value || 'Not provided'}</dd>
                  <dd className="text-right">
                    <button 
                      onClick={() => handleEdit(section.step)}
                      className="text-[var(--color-teal-00)] underline decoration-2 underline-offset-4 font-bold hover:text-[#003078]"
                    >
                      Change
                    </button>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <div className="pt-12 border-t border-[var(--color-black-00)] space-y-8">
        <h2 className="text-3xl font-bold">Now send your application</h2>
        <p className="text-xl">By submitting this application you are confirming that, to the best of your knowledge, the details you are providing are correct.</p>
        
        <button
          onClick={goToNext}
          className="bg-[var(--color-teal-00)] text-white px-12 py-4 rounded-sm font-bold text-2xl hover:bg-[var(--color-blue-00)] transition-all shadow-md active:translate-y-1"
        >
          Accept and send
        </button>
      </div>
    </div>
  );
};
