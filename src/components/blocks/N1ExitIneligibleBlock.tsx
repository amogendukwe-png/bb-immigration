/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

const reasons: Record<
  string,
  { heading: string; body: string; alternatives: string[] }
> = {
  neither: {
    heading: 'You cannot apply for naturalisation using this service',
    body: 'Naturalisation is only available to aliens (non-Commonwealth citizens) and British Protected Persons. If you are a Commonwealth citizen or hold another status, you may be able to apply for citizenship through a different route.',
    alternatives: [
      'If you are a Commonwealth citizen married to a Barbadian national, you may be eligible to register as a citizen by marriage.',
      'If you were born to a Barbadian parent, you may be eligible to register as a citizen by descent.',
      'Contact the Immigration Department to discuss your individual circumstances.',
    ],
  },
  intent: {
    heading: 'You do not meet the residency intention requirement',
    body: 'To be eligible for naturalisation, you must intend to remain in Barbados after your application is approved. If your circumstances change in the future, you may be able to reapply.',
    alternatives: [
      'If your plans change and you intend to remain in Barbados, you can return to this service to apply.',
      'Contact the Immigration Department if you believe there are exceptional circumstances relevant to your case.',
    ],
  },
  character: {
    heading: 'You do not meet the good character requirement',
    body: 'Applicants for naturalisation must be of good character. This means having no serious criminal convictions in Barbados or abroad. The Immigration Department may consider the nature and age of any convictions.',
    alternatives: [
      'You may wish to seek independent legal advice before applying.',
      'Contact the Immigration Department directly to discuss your situation in confidence.',
    ],
  },
  language: {
    heading: 'You do not meet the English language requirement',
    body: 'Applicants must have an adequate knowledge of the English language. If you are currently improving your English, you may be able to reapply once you meet this requirement.',
    alternatives: [
      'Consider enrolling in an English language course at an approved institution in Barbados.',
      'Once you have adequate English language ability, you can return to this service to apply.',
      'Contact the Immigration Department if you believe you have mitigating circumstances.',
    ],
  },
};

export const N1ExitIneligibleBlock: React.FC = () => {
  const { state, updateState, goToNext } = useForm();

  const reason = state.n1?.applicantType === 'NEITHER'
    ? 'neither'
    : state.n1?.ineligibilityReason || 'neither';

  const content = reasons[reason] || reasons.neither;

  const handleReturnToGateway = () => {
    // Clear n1 state and go back to gateway
    updateState({
      journeyType: undefined,
      n1: undefined,
      currentStep: 'GATEWAY',
    } as any);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Red banner */}
      <div className="border-l-4 border-[var(--color-red-00)] pl-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-red-00)]">
          {content.heading}
        </h1>
      </div>

      <p className="text-xl leading-relaxed">{content.body}</p>

      {/* What to do next */}
      <div className="space-y-4 pt-4 border-t border-[var(--color-black-00)]">
        <h2 className="text-2xl font-bold">What you can do</h2>
        <ul className="space-y-3">
          {content.alternatives.map((alt, i) => (
            <li key={i} className="flex gap-3 text-lg">
              <span className="text-[var(--color-teal-00)] font-bold flex-shrink-0">—</span>
              {alt}
            </li>
          ))}
        </ul>
      </div>

      {/* Contact block */}
      <div className="bg-white p-6 border-2 border-[var(--color-black-00)] space-y-3">
        <h3 className="text-xl font-bold">Contact the Immigration Department</h3>
        <p className="text-lg">
          If you are unsure whether you are eligible or want to discuss your options, contact the
          Immigration Department directly.
        </p>
        <div className="text-lg space-y-1 mt-2">
          <p className="font-bold">Barbados Immigration Department</p>
          <p>Careenage House, The Wharf</p>
          <p>Bridgetown, Barbados</p>
          <p className="text-[var(--color-teal-00)] underline mt-1">
            immigration.dept@barbados.gov.bb
          </p>
        </div>
      </div>

      {/* Return to gateway */}
      <div className="pt-4">
        <button
          onClick={handleReturnToGateway}
          className="text-[var(--color-teal-00)] underline text-xl hover:text-[var(--color-blue-00)] transition-colors"
        >
          ← Return to all services
        </button>
      </div>
    </div>
  );
};
