/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FormProvider, useForm } from './context/FormContext';
import { GovBBLayout } from './components/layout/GovBBLayout';
import { GatewayBlock } from './components/blocks/GatewayBlock';
import { StartPage } from './components/blocks/StartPage';
import { EligibilityBlock } from './components/blocks/EligibilityBlock';
import { PersonalDetailsBlock } from './components/blocks/PersonalDetailsBlock';
import { PassportDetailsBlock } from './components/blocks/PassportDetailsBlock';
import { AddressBlock } from './components/blocks/AddressBlock';
import { SkillCategoryBlock } from './components/blocks/SkillCategoryBlock';
import { ContactBlock } from './components/blocks/ContactBlock';
import { ResidenceHistoryBlock } from './components/blocks/ResidenceHistoryBlock';
import { DependantDetailsBlock } from './components/blocks/DependantDetailsBlock';
import { BackgroundChecksBlock } from './components/blocks/BackgroundChecksBlock';
import { ExcludedClassesBlock } from './components/blocks/ExcludedClassesBlock';
import { EvidenceUploadBlock } from './components/blocks/EvidenceUploadBlock';
import { H1ReferenceBlock } from './components/blocks/H1ReferenceBlock';
import { ExitIneligible } from './components/blocks/ExitIneligible';
import { CheckYourAnswersBlock } from './components/blocks/CheckYourAnswersBlock';
import { BornAbroadBlock } from './components/blocks/BornAbroadBlock';
import { NationalStatusBlock } from './components/blocks/NationalStatusBlock';
import { NextOfKinBlock } from './components/blocks/NextOfKinBlock';
import { LostPassportBlock } from './components/blocks/LostPassportBlock';
import { ParentsConsentBlock } from './components/blocks/ParentsConsentBlock';
import { StayExtensionDetailsBlock } from './components/blocks/StayExtensionDetailsBlock';
import { H3SchoolDetailsBlock } from './components/blocks/H3SchoolDetailsBlock';
import { H3StudentDetailsBlock } from './components/blocks/H3StudentDetailsBlock';
import { H3ReportTypeBlock } from './components/blocks/H3ReportTypeBlock';
import { H3DepartureDetailsBlock } from './components/blocks/H3DepartureDetailsBlock';
import { H3RemarksBlock } from './components/blocks/H3RemarksBlock';
import { H4CurrentInstitutionBlock } from './components/blocks/H4CurrentInstitutionBlock';
import { H4TransferInstitutionBlock } from './components/blocks/H4TransferInstitutionBlock';
import { H4ReasonsBlock } from './components/blocks/H4ReasonsBlock';
import { ReEntryEnforcementBlock } from './components/blocks/ReEntryEnforcementBlock';
import { ReEntryReasonsBlock } from './components/blocks/ReEntryReasonsBlock';
import { ReEntrySponsorBlock } from './components/blocks/ReEntrySponsorBlock';
import { RenunciationDetailsBlock } from './components/blocks/RenunciationDetailsBlock';
import { RenunciationDeclarationBlock } from './components/blocks/RenunciationDeclarationBlock';
import { N1EligibilityBlock } from './components/blocks/N1EligibilityBlock';
import { N1EligibilityQuestionsBlock } from './components/blocks/N1EligibilityQuestionsBlock';
import { N1ExitIneligibleBlock } from './components/blocks/N1ExitIneligibleBlock';
import { N1RefereesBlock } from './components/blocks/N1RefereesBlock';
import { N1DeclarationBlock } from './components/blocks/N1DeclarationBlock';
import { MedApplicantBlock } from './components/blocks/MedApplicantBlock';
import { MedHistoryBlock } from './components/blocks/MedHistoryBlock';
import { MedPhysicianBlock } from './components/blocks/MedPhysicianBlock';

const PaymentSimulator: React.FC = () => {
  const { goToNext } = useForm();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      goToNext();
    }, 1500);
  };

  return (
    <button
      onClick={handlePay}
      disabled={isProcessing}
      style={{
        width: '100%',
        background: isProcessing ? 'var(--color-teal-00)' : 'var(--color-teal-00)',
        color: 'white',
        padding: '1rem 2rem',
        fontWeight: 700,
        fontSize: '1.25rem',
        border: 'none',
        cursor: isProcessing ? 'wait' : 'pointer',
        opacity: isProcessing ? 0.7 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        transition: 'background 0.2s',
      }}
      onMouseEnter={e => { if (!isProcessing) (e.currentTarget as HTMLElement).style.background = 'var(--color-blue-00)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-teal-00)'; }}
    >
      {isProcessing ? (
        <>
          <span style={{ width: '1.25rem', height: '1.25rem', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
          Processing...
        </>
      ) : (
        'Pay $100.00 BBD and Apply'
      )}
    </button>
  );
};

const FormManager: React.FC = () => {
  const { state } = useForm();

  const renderStep = () => {
    switch (state.currentStep) {
      case 'GATEWAY':
        return <GatewayBlock />;
      case 'START_PAGE':
        return <StartPage />;
      case 'ELIGIBILITY':
        return <EligibilityBlock />;
      case 'PERSONAL_DETAILS':
        return <PersonalDetailsBlock />;
      case 'PASSPORT_DETAILS':
        return <PassportDetailsBlock />;
      case 'ADDRESS_BLOCK':
        return <AddressBlock />;
      case 'SKILL_CATEGORY':
        return <SkillCategoryBlock />;
      case 'CONTACT_BLOCK':
        return <ContactBlock />;
      case 'RESIDENCE_HISTORY':
        return <ResidenceHistoryBlock />;
      case 'DEPENDANT_DETAILS':
        return <DependantDetailsBlock />;
      case 'BACKGROUND_CHECKS':
        return <BackgroundChecksBlock />;
      case 'EXCLUDED_CLASSES':
        return <ExcludedClassesBlock />;
      case 'EVIDENCE_UPLOAD':
        return <EvidenceUploadBlock />;
      case 'BORN_ABROAD':
        return <BornAbroadBlock />;
      case 'NATIONAL_STATUS':
        return <NationalStatusBlock />;
      case 'NEXT_OF_KIN':
        return <NextOfKinBlock />;
      case 'LOST_PASSPORT':
        return <LostPassportBlock />;
      case 'PARENTS_CONSENT':
        return <ParentsConsentBlock />;
      case 'H1_REFERENCE':
        return <H1ReferenceBlock />;
      case 'EXIT_INELIGIBLE':
        return <ExitIneligible />;
      case 'STAY_EXTENSION_DETAILS':
        return <StayExtensionDetailsBlock />;
      case 'H3_SCHOOL_DETAILS':
        return <H3SchoolDetailsBlock />;
      case 'H3_STUDENT_DETAILS':
        return <H3StudentDetailsBlock />;
      case 'H3_REPORT_TYPE':
        return <H3ReportTypeBlock />;
      case 'H3_DEPARTURE_DETAILS':
        return <H3DepartureDetailsBlock />;
      case 'H3_REMARKS':
        return <H3RemarksBlock />;
      // Form H-4 — Student Transfer
      case 'H4_CURRENT_INSTITUTION':
        return <H4CurrentInstitutionBlock />;
      case 'H4_TRANSFER_INSTITUTION':
        return <H4TransferInstitutionBlock />;
      case 'H4_REASONS':
        return <H4ReasonsBlock />;
      // Re-Entry Application
      case 'REENTRY_ENFORCEMENT':
        return <ReEntryEnforcementBlock />;
      case 'REENTRY_REASONS':
        return <ReEntryReasonsBlock />;
      case 'REENTRY_SPONSOR':
        return <ReEntrySponsorBlock />;
      // Renunciation of Citizenship
      case 'RENUNCIATION_DETAILS':
        return <RenunciationDetailsBlock />;
      case 'RENUNCIATION_DECLARATION':
        return <RenunciationDeclarationBlock />;
      // Naturalisation — Form N.1
      case 'N1_ELIGIBILITY_CHECK':
        return <N1EligibilityBlock />;
      case 'N1_ELIGIBILITY_QUESTIONS':
        return <N1EligibilityQuestionsBlock />;
      case 'N1_EXIT_INELIGIBLE':
        return <N1ExitIneligibleBlock />;
      case 'N1_REFEREES':
        return <N1RefereesBlock />;
      case 'N1_DECLARATION':
        return <N1DeclarationBlock />;
      // Medical Examination Form
      case 'MED_APPLICANT':
        return <MedApplicantBlock />;
      case 'MED_HISTORY':
        return <MedHistoryBlock />;
      case 'MED_PHYSICIAN':
        return <MedPhysicianBlock />;
      case 'CHECK_YOUR_ANSWERS':
        return <CheckYourAnswersBlock />;
      case 'PAYMENT':
        return (
          <div style={{ width: '100%', maxWidth: '560px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, lineHeight: 1.2 }}>Processing payment</h1>
            <div style={{ background: 'white', padding: '2rem', border: '2px solid var(--color-black-00)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>Application fee</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>$100.00 BBD</span>
                </div>
              </div>
              <p style={{ color: 'var(--color-mid-grey-00)', lineHeight: 1.6 }}>
                In the live system, you would be redirected to the secure government payment gateway{' '}
                <strong>EZPay+</strong> to complete your transaction.
              </p>
              <PaymentSimulator />
            </div>
          </div>
        );
      case 'CONFIRMATION':
        return (
          <div style={{ width: '100%', maxWidth: '680px', display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingTop: '1.5rem' }}>
            <div style={{ background: 'var(--color-teal-00)', color: 'white', padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <circle cx="20" cy="20" r="20" fill="rgba(255,255,255,0.2)"/>
                  <path d="M11 20l7 7 11-14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, lineHeight: 1.2 }}>Application submitted</h1>
              </div>
              <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Your reference number is</p>
              <p style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 900, fontFamily: 'monospace', letterSpacing: '0.1em', marginTop: '0.5rem' }}>PB-2026-X8V2K9</p>
              <p style={{ marginTop: '1rem', opacity: 0.85 }}>Keep this number — you will need it if you contact us about your application.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>What happens next</h2>
              <p style={{ fontSize: '1.25rem', lineHeight: 1.6 }}>
                We have sent a confirmation to your registered email address. An immigration officer will review your application within <strong>20 working days</strong>.
              </p>
              <p style={{ fontSize: '1.25rem', lineHeight: 1.6 }}>
                If we need additional information or documents, we will contact you using the details you provided.
              </p>
            </div>

            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--color-black-00)' }}>
              <button
                onClick={() => { window.location.reload(); }}
                style={{ background: 'var(--color-teal-00)', color: 'white', padding: '1rem 2rem', fontSize: '1.25rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-blue-00)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-teal-00)'; }}
              >
                Start a new application
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="py-20 text-center border-4 border-dashed border-[var(--color-black-00)]">
            <h1 className="text-3xl font-bold mb-4 text-[var(--color-mid-grey-00)]">Coming Soon: {state.currentStep}</h1>
            <p className="text-xl opacity-60">This section is part of the alpha iterative release.</p>
            <div className="mt-8 p-4 bg-[var(--color-white-00)] text-sm font-mono max-w-md mx-auto overflow-auto">
                Debug: {JSON.stringify(state, null, 2)}
            </div>
          </div>
        );
    }
  };

  return <GovBBLayout>{renderStep()}</GovBBLayout>;
};

export default function App() {
  return (
    <FormProvider>
      <FormManager />
    </FormProvider>
  );
}
