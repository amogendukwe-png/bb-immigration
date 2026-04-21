/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';
import { JourneyType } from '../../types/form';
import { ArrowRight, FileText, Clock, CreditCard } from 'lucide-react';

export const StartPage: React.FC = () => {
  const { state, goToNext } = useForm();
  const journey = state.journeyType || 'PASSPORT';

  const content: Record<JourneyType, any> = {
    PASSPORT: {
      title: 'Apply for a Barbados Passport',
      desc: 'Use this service to apply for a first or replacement passport for adults or children.',
      needs: [
        'Birth certificate',
        '2 passport-sized photographs',
        'National Identification Card',
        'Previous passport (if applicable)',
        'Credit or debit card for the fee ($100 - $150 BBD)'
      ],
      time: '20 to 30 minutes'
    },
    WORK_PERMIT: {
      title: 'Apply for a Work Permit',
      desc: 'Use this service to apply for standard or short-term work permits in Barbados.',
      needs: [
        'Employer details and job description',
        'Police certificates of character',
        'Educational and professional certificates',
        'Passport bio-data pages',
        'Payment receipt'
      ],
      time: '30 to 45 minutes'
    },
    CITIZENSHIP: {
      title: 'Register for Barbados Citizenship',
      desc: 'Apply for citizenship by descent, marriage, or other registration routes.',
      needs: [
        'Proof of Commonwealth or Irish citizenship',
        'Full address history in Barbados',
        'Two sworn affidavits from Barbadian national witnesses',
        'Medical form (completed by a physician)',
        'Application fee'
      ],
      time: '30 to 45 minutes'
    },
    STUDY: {
      title: 'Apply to Study in Barbados',
      desc: 'For non-citizens seeking leave to attend approved educational institutions.',
      needs: [
        'Form H-1 (Certificate of Eligibility from school)',
        'Proof of financial support',
        'Passport-sized photograph',
        'Relationship details of next of kin'
      ],
      time: '20 to 30 minutes'
    },
    RESIDENCY: {
      title: 'Reside Permanently in Barbados',
      desc: 'Apply for immigrant status or permanent residency.',
      needs: [
        'Evidence of 5 years continuous residence as an immigrant',
        'Proof of financial resources and assets',
        'Background declarations and excluded classes check',
        'Full family details including spouse and children'
      ],
      time: '45+ minutes'
    }
  };

  const active = content[journey];

  return (
    <div className="space-y-8" id="start-page">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{active.title}</h1>
      
      <p className="text-xl leading-relaxed max-w-2xl opacity-90 underline decoration-1 decoration-[var(--bb-navy-mid)] underline-offset-4 decoration-opacity-20">
        {active.desc}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
        <div className="bg-[var(--bb-gray)] p-6 border-l-4 border-[var(--bb-navy-mid)]">
          <div className="flex items-center gap-2 mb-4 text-[var(--bb-navy-mid)]">
            <Clock size={24} />
            <h3 className="font-bold text-lg">How long it takes</h3>
          </div>
          <p className="text-lg">Around {active.time} to complete. You should complete it in one go as progress is not currently saved.</p>
        </div>

        <div className="bg-[var(--bb-gray)] p-6 border-l-4 border-[var(--bb-navy-mid)]">
          <div className="flex items-center gap-2 mb-4 text-[var(--bb-navy-mid)]">
            <FileText size={24} />
            <h3 className="font-bold text-lg">Documents needed</h3>
          </div>
          <p className="text-lg">You will need to upload digital copies of several legal documents during this process.</p>
        </div>
      </div>

      <section className="space-y-6 bg-white p-8 border-2 border-[var(--bb-border)] rounded-sm">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <CreditCard className="text-[var(--bb-navy-mid)]" />
          What you will need
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {active.needs.map((item: string, i: number) => (
            <li key={i} className="flex gap-3 text-lg">
              <span className="text-[var(--bb-navy-mid)] font-bold">•</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="pt-8">
        <button
          onClick={goToNext}
          className="inline-flex items-center gap-3 bg-[var(--bb-navy-mid)] text-white px-10 py-5 rounded-sm font-bold text-2xl hover:bg-[var(--bb-navy-dark)] transition-all shadow-lg hover:shadow-xl active:translate-y-1 focus:ring-4 focus:ring-[var(--bb-focus)] focus:outline-none"
          id="start-now-button"
        >
          Start now
          <ArrowRight size={28} />
        </button>
      </div>

      <section className="pt-12 border-t border-[var(--bb-border)] opacity-70">
        <h2 className="text-xl font-bold mb-4 italic">Before you start</h2>
        <p className="text-lg max-w-2xl">
          By starting this application, you agree that the information you provide is true and accurate. 
          Providing false information is a serious offence under the Caribbean Community Act and the Immigration Act of Barbados.
        </p>
      </section>
    </div>
  );
};
