/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';
import { JourneyType } from '../../types/form';

const services = [
  {
    id: 'PASSPORT',
    title: 'Apply for a Barbados passport',
    desc: 'First time, renewal or replacement for adults and children.',
    category: 'Travel, ID and citizenship',
  },
  {
    id: 'CITIZENSHIP',
    title: 'Register Barbados citizenship',
    desc: 'By descent, marriage, or other registration routes.',
    category: 'Travel, ID and citizenship',
  },
  {
    id: 'RESIDENCY',
    title: 'Apply for permanent residency',
    desc: 'Immigrant status, permanent residency and returning national status.',
    category: 'Travel, ID and citizenship',
  },
  {
    id: 'WORK_PERMIT',
    title: 'Apply for a work permit',
    desc: 'Long-term or short-term work permits and training attachments.',
    category: 'Work and employment',
  },
  {
    id: 'STUDY',
    title: 'Study in Barbados',
    desc: 'Student eligibility certificates and non-immigrant student status.',
    category: 'Education',
  },
];

export const GatewayBlock: React.FC = () => {
  const { updateState, goToNext } = useForm();
  const [search, setSearch] = React.useState('');

  const handleSelect = (journey: JourneyType) => {
    updateState({ journeyType: journey });
    goToNext();
  };

  const filtered = services.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div id="services">

      {/* Alpha services section */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>Alpha services</h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-mid-grey-00)', marginBottom: '1.5rem' }}>
          These services are new. We're working on them and they are likely to change as we learn more.
        </p>

        {/* Search */}
        <div style={{ marginBottom: '2rem' }}>
          <label htmlFor="service-search" style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.05rem' }}>
            Search for a service
          </label>
          <div style={{ display: 'flex', gap: '0' }}>
            <input
              id="service-search"
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder=""
              style={{ border: '2px solid var(--color-black-00)', padding: '0.6rem 0.75rem', fontSize: '1rem', flex: 1, outline: 'none' }}
              onFocus={e => (e.currentTarget.style.outline = '3px solid var(--color-teal-100)')}
              onBlur={e => (e.currentTarget.style.outline = 'none')}
            />
            <button
              style={{ backgroundColor: 'var(--color-teal-00)', color: 'var(--color-white-00)', border: 'none', padding: '0.6rem 1.25rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-blue-00)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--color-teal-00)')}
              onClick={() => {}}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Services list */}
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>Government services</h2>
        <div>
          {filtered.length === 0 && (
            <p style={{ color: 'var(--color-mid-grey-00)', fontSize: '1rem', padding: '1rem 0' }}>
              No services found matching "{search}".
            </p>
          )}
          {filtered.map((svc, i) => (
            <div key={svc.id}>
              <div style={{ padding: '1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-mid-grey-00)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {svc.category}
                </span>
                <button
                  onClick={() => handleSelect(svc.id as JourneyType)}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', display: 'block' }}
                >
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-teal-00)', textDecoration: 'underline', display: 'block', marginBottom: '0.2rem' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-blue-00)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-teal-00)'; }}
                  >
                    {svc.title}
                  </span>
                </button>
                <p style={{ fontSize: '1rem', color: 'var(--color-mid-grey-00)', margin: 0 }}>{svc.desc}</p>
              </div>
              {i < filtered.length - 1 && (
                <hr style={{ border: 'none', borderTop: '1px solid var(--color-grey-00)', margin: 0 }} />
              )}
            </div>
          ))}
        </div>

        {search === '' && (
          <a href="#" style={{ display: 'inline-block', marginTop: '1.5rem', color: 'var(--color-teal-00)', textDecoration: 'underline', fontSize: '1rem' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-blue-00)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-teal-00)')}
          >
            View all services
          </a>
        )}
      </div>
    </div>
  );
};
