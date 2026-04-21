/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';
import { JourneyType } from '../../types/form';

const pathways = [
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
        {pathways.map((pathway, i) => (
          <div key={pathway.id}>
            <div style={{ padding: '1.25rem 0' }}>
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
              </button>
              <p style={{ fontSize: '1rem', color: 'var(--color-mid-grey-00)', margin: 0 }}>
                {pathway.desc}
              </p>
            </div>
            {i < pathways.length - 1 && (
              <hr style={{ border: 'none', borderTop: '1px solid var(--color-grey-00)', margin: 0 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
