/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';
import { ChevronRight } from 'lucide-react';
import { JourneyType } from '../../types/form';

export const GatewayBlock: React.FC = () => {
  const { updateState, goToNext } = useForm();

  const handleSelect = (journey: JourneyType) => {
    updateState({ journeyType: journey });
    goToNext();
  };

  const options = [
    {
      id: 'PASSPORT',
      title: 'Apply for a Barbados passport',
      desc: 'First time, renewal or lost passport for adults and children.',
      color: 'bg-[#1d70b8]'
    },
    {
      id: 'WORK_PERMIT',
      title: 'Apply for a work permit',
      desc: 'Standard (long-term) or short-term work permits and training attachments.',
      color: 'bg-[#f47738]'
    },
    {
      id: 'CITIZENSHIP',
      title: 'Register Barbados citizenship',
      desc: 'By descent, marriage or other registration routes.',
      color: 'bg-[var(--bb-navy-mid)]'
    },
    {
      id: 'STUDY',
      title: 'Study in Barbados',
      desc: 'Student eligibility certificates and non-immigrant student status.',
      color: 'bg-[#4c2d92]'
    },
    {
      id: 'RESIDENCY',
      title: 'Reside permanently in Barbados',
      desc: 'Immigrant status, permanent residency and CARICOM indefinite stay.',
      color: 'bg-[#1d70b8]'
    }
  ];

  return (
    <div className="space-y-8" id="gateway-page">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">What do you need to do?</h1>
      <p className="text-xl opacity-80 max-w-2xl mb-12">
        Select a service to begin your application. We will guide you through the requirements for each pathway.
      </p>

      <div className="grid grid-cols-1 gap-6 max-w-3xl">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.id as JourneyType)}
            className="group flex items-stretch text-left border-2 border-[var(--bb-border)] hover:border-[var(--bb-navy-mid)] hover:bg-[var(--bb-gray)] transition-all focus:ring-4 focus:ring-[var(--bb-focus)] focus:outline-none"
            id={`service-${opt.id.toLowerCase()}`}
          >
            <div className={`w-3 ${opt.color} self-stretch`} />
            <div className="p-6 flex-grow flex items-center justify-between pointer-events-none">
              <div>
                <h2 className="text-2xl font-bold mb-1 underline group-hover:text-[var(--bb-navy-mid)] decoration-2 underline-offset-4 tracking-tight">
                  {opt.title}
                </h2>
                <p className="text-[var(--bb-text-gray)]">{opt.desc}</p>
              </div>
              <ChevronRight size={32} className="text-[var(--bb-navy-mid)] opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
