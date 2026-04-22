/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';
import { JourneyType } from '../../types/form';

const pathways: {
  id: JourneyType | 'NATURALISATION' | 'MEDICAL_FORM';
  title: string;
  desc: string;
  comingSoon?: boolean;
}[] = [
  {
    id: 'PASSPORT',
    title: 'Apply for a Barbados passport',
    desc: 'First time applications, renewals, and replacements for adults and children.',
  },
  {
    id: 'CITIZENSHIP',
    title: 'Register Barbados citizenship',
    desc: 'Apply for citizenship by descent, by marriage, or by registration.',
  },
  {
    id: 'RESIDENCY',
    title: 'Apply for permanent residency',
    desc: 'Permanent residency status and returning national applications.',
  },
  {
    id: 'WORK_PERMIT',
    title: 'Apply for a work permit',
    desc: 'Long-term work permits (Form C2) and short-term permits or training attachments (Form C3).',
  },
  {
    id: 'STUDY',
    title: 'Study in Barbados',
    desc: 'Student eligibility certificates and non-immigrant student status (Form H1).',
  },
  {
    id: 'STUDENT_TRANSFER',
    title: 'Transfer to a different educational institution',
    desc: 'For non-immigrant students seeking to transfer from one approved institution to another (Form H-4).',
  },
  {
    id: 'STAY_EXTENSION',
    title: 'Extend your stay in Barbados',
    desc: 'Apply to vary or extend the period of your current permitted stay (Form B).',
  },
  {
    id: 'RE_ENTRY',
    title: 'Apply for re-entry after removal or deportation',
    desc: 'If you have previously been deported or removed from Barbados, apply to be permitted to return.',
  },
  {
    id: 'RENUNCIATION',
    title: 'Renounce your Barbadian citizenship',
    desc: 'Formally renounce your Barbadian citizenship if you hold, or are acquiring, citizenship of another country.',
  },
  {
    id: 'SCHOOL_REPORT',
    title: 'Submit a student status report',
    desc: 'For school officials — report a change in a non-immigrant student\'s attendance or departure (Form H-3).',
  },
  {
    id: 'NATURALISATION',
    title: 'Apply for naturalisation (Form N.1)',
    desc: 'Apply to become a Barbadian citizen by naturalisation after five years of legal residence.',
    comingSoon: true,
  },
  {
    id: 'MEDICAL_FORM',
    title: 'Submit a medical examination report',
    desc: 'Required as part of other immigration applications. The examining physician and applicant must both complete sections.',
    comingSoon: true,
  },
];

export const GatewayBlock: React.FC = () => {
  const { updateState, goToNext } = useForm();

  const handleSelect = (journey: JourneyType) => {
    updateState({ journeyType: journey });
    goToNext();
  };

  return (
    <div id="services">
      <div>
        {pathways.map((pathway) => (
          <div key={pathway.id}>
            <div style={{ padding: '1.25rem 0' }}>
              {pathway.comingSoon ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-mid-grey-00)' }}>
                      {pathway.title}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      backgroundColor: 'var(--color-mid-grey-00)',
                      color: 'white',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '2px'
                    }}>
                      Coming soon
                    </span>
                  </div>
                  <p style={{ fontSize: '1rem', color: 'var(--color-mid-grey-00)', margin: 0 }}>
                    {pathway.desc}
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => handleSelect(pathway.id as JourneyType)}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', display: 'block', width: '100%' }}
                  id={`service-${pathway.id.toLowerCase()}`}
                >
                  <span
                    style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-teal-00)', textDecoration: 'underline', display: 'block', marginBottom: '0.3rem' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-blue-00)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-teal-00)'; }}
                  >
                    {pathway.title}
                  </span>
                  <p style={{ fontSize: '1rem', color: 'var(--color-mid-grey-00)', margin: 0 }}>
                    {pathway.desc}
                  </p>
                </button>
              )}
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid var(--color-grey-00)', margin: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
};
