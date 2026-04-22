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
    },
    STAY_EXTENSION: {
      title: 'Extend Your Stay in Barbados',
      desc: 'Apply to vary or extend the period of your current permitted stay under the Immigration Act (Form B).',
      needs: [
        'Your passport (valid)',
        'Details of your current permitted period of stay',
        'Reasons for requesting an extension',
        'Any previous extension details'
      ],
      time: '20 to 30 minutes'
    },
    SCHOOL_REPORT: {
      title: 'Submit a Student Status Report',
      desc: 'For authorised school officials — report a change in a non-immigrant student\'s attendance, enrolment, or departure (Form H-3).',
      needs: [
        'Your school\'s official registration details',
        'The student\'s passport and personal details',
        'Details of the circumstances being reported'
      ],
      time: '15 to 20 minutes'
    },
    STUDENT_TRANSFER: {
      title: 'Transfer to a Different Educational Institution',
      desc: 'For non-immigrant students who wish to transfer from their current approved institution to another (Form H-4).',
      needs: [
        'Your student visa number and expiry date',
        'Details of your current institution',
        'Details of the institution you wish to transfer to',
        'Course information at the new institution',
        'Your passport bio-data page',
        'Credit or debit card for the fee ($100 BBD)'
      ],
      time: '20 to 30 minutes'
    },
    RE_ENTRY: {
      title: 'Apply for Re-Entry to Barbados',
      desc: 'If you have previously been removed or deported from Barbados, use this service to apply to be permitted to return.',
      needs: [
        'Your passport',
        'Details of your previous removal or deportation',
        'Details of a sponsor in Barbados',
        'Reasons for requesting re-entry',
        'Credit or debit card for the fee ($100 BBD)'
      ],
      time: '25 to 35 minutes'
    },
    RENUNCIATION: {
      title: 'Renounce Your Barbadian Citizenship',
      desc: 'Formally renounce your Barbadian citizenship. You must hold, or be in the process of acquiring, citizenship of another country.',
      needs: [
        'Your Barbadian passport or national identification',
        'Proof of other citizenship (passport or citizenship certificate)',
        'A Justice of the Peace to witness your declaration in person'
      ],
      time: '15 to 20 minutes'
    },
    NATURALISATION: {
      title: 'Apply for Naturalisation (Form N.1)',
      desc: 'Apply to become a Barbadian citizen by naturalisation. Aliens must have resided continuously in Barbados for at least 5 years; British Protected Persons for at least 1 year.',
      needs: [
        'Your passport (valid)',
        'Proof of continuous residence in Barbados (e.g. utility bills, rental agreements)',
        'Details of four Barbadian national referees who can vouch for your character',
        'Evidence that you have published a notice of intention to apply in a local newspaper',
        'A Justice of the Peace to witness your signed declaration in person',
        'Medical examination report',
        'Application fee ($100 BBD)'
      ],
      time: '45 to 60 minutes'
    },
    MEDICAL_FORM: {
      title: 'Medical Examination Report',
      desc: 'Required as part of certain immigration applications. The applicant and an approved examining physician must each complete separate sections.',
      needs: [
        'Your passport or national identification',
        'Details of any previous illnesses, surgeries or current medications',
        'An approved examining physician registered with the Medical Council of Barbados',
        'The physician must examine you in person before completing their section'
      ],
      time: '15 to 20 minutes'
    }
  };

  const active = content[journey];

  return (
    <div className="space-y-8" id="start-page">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{active.title}</h1>
      
      <p className="text-xl leading-relaxed max-w-2xl opacity-90 underline decoration-1 decoration-[var(--color-teal-00)] underline-offset-4 decoration-opacity-20">
        {active.desc}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
        <div className="bg-[var(--color-white-00)] p-6 border-l-4 border-[var(--color-teal-00)]">
          <div className="flex items-center gap-2 mb-4 text-[var(--color-teal-00)]">
            <Clock size={24} />
            <h3 className="font-bold text-lg">How long it takes</h3>
          </div>
          <p className="text-lg">Around {active.time} to complete. You should complete it in one go as progress is not currently saved.</p>
        </div>

        <div className="bg-[var(--color-white-00)] p-6 border-l-4 border-[var(--color-teal-00)]">
          <div className="flex items-center gap-2 mb-4 text-[var(--color-teal-00)]">
            <FileText size={24} />
            <h3 className="font-bold text-lg">Documents needed</h3>
          </div>
          <p className="text-lg">You will need to upload digital copies of several legal documents during this process.</p>
        </div>
      </div>

      <section className="space-y-6 bg-white p-8 border-2 border-[var(--color-black-00)] rounded-sm">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <CreditCard className="text-[var(--color-teal-00)]" />
          What you will need
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {active.needs.map((item: string, i: number) => (
            <li key={i} className="flex gap-3 text-lg">
              <span className="text-[var(--color-teal-00)] font-bold">•</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="pt-8">
        <button
          onClick={goToNext}
          className="inline-flex items-center gap-3 bg-[var(--color-teal-00)] text-white px-10 py-5 rounded-sm font-bold text-2xl hover:bg-[var(--color-blue-00)] transition-all shadow-lg hover:shadow-xl active:translate-y-1 focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
          id="start-now-button"
        >
          Start now
          <ArrowRight size={28} />
        </button>
      </div>

      <section className="pt-12 border-t border-[var(--color-black-00)] opacity-70">
        <h2 className="text-xl font-bold mb-4 italic">Before you start</h2>
        <p className="text-lg max-w-2xl">
          By starting this application, you agree that the information you provide is true and accurate. 
          Providing false information is a serious offence under the Caribbean Community Act and the Immigration Act of Barbados.
        </p>
      </section>
    </div>
  );
};
