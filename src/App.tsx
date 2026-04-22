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
      className={`w-full bg-[var(--color-teal-00)] text-white px-8 py-4 rounded-sm font-bold text-xl hover:bg-[var(--color-blue-00)] transition-all flex items-center justify-center gap-3 ${isProcessing ? 'opacity-70 cursor-wait' : ''}`}
    >
      {isProcessing ? (
        <>
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
          <div className="w-full max-w-xl space-y-8">
            <h1 className="text-3xl md:text-4xl font-bold">Processing payment</h1>
            <div className="bg-white p-4 md:p-8 border-2 border-[var(--color-black-00)] space-y-6">
              <div className="border-b pb-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <span className="text-xl">Application fee</span>
                  <span className="text-xl font-bold">$100.00 BBD</span>
                </div>
              </div>
              <p className="text-[var(--color-mid-grey-00)] leading-relaxed">
                In the live system, you would be redirected to the secure government payment gateway{' '}
                <strong>EZPay+</strong> to complete your transaction.
              </p>
              <PaymentSimulator />
            </div>
          </div>
        );
      case 'CONFIRMATION':
        return (
          <div className="space-y-10 py-6 max-w-2xl">
            <div className="bg-[var(--color-teal-00)] text-white p-6 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="20" cy="20" r="20" fill="rgba(255,255,255,0.2)"/>
                  <path d="M11 20l7 7 11-14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h1 className="text-3xl md:text-4xl font-bold">Application submitted</h1>
              </div>
              <p className="text-xl mb-2">Your reference number is</p>
              <p className="text-4xl md:text-5xl font-black font-mono tracking-wider mt-2">PB-2026-X8V2K9</p>
              <p className="mt-4 opacity-80">Keep this number — you will need it if you contact us about your application.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">What happens next</h2>
              <p className="text-xl leading-relaxed">
                We have sent a confirmation to your registered email address. An immigration officer will review your application within <strong>20 working days</strong>.
              </p>
              <p className="text-xl leading-relaxed">
                If we need additional information or documents, we will contact you using the details you provided.
              </p>
            </div>

            <div className="pt-6 border-t border-[var(--color-black-00)]">
              <button
                onClick={() => { window.location.reload(); }}
                className="bg-[var(--color-teal-00)] text-white px-8 py-4 text-xl font-bold hover:bg-[var(--color-blue-00)] transition-colors"
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
