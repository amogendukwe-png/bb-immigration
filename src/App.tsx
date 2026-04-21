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
      className={`w-full bg-[#00703c] text-white px-8 py-4 rounded-sm font-bold text-xl hover:bg-[#005a30] transition-all flex items-center justify-center gap-3 ${isProcessing ? 'opacity-70 cursor-wait' : ''}`}
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
      case 'H1_REFERENCE':
        return <H1ReferenceBlock />;
      case 'EXIT_INELIGIBLE':
        return <ExitIneligible />;
      case 'CHECK_YOUR_ANSWERS':
        return <CheckYourAnswersBlock />;
      case 'PAYMENT':
        return (
          <div className="space-y-8 max-w-xl">
            <h1 className="text-4xl font-bold">Processing payment</h1>
            <div className="bg-white p-8 border-2 border-[#b1b4b6] space-y-6 shadow-sm">
              <div className="flex justify-between text-xl border-b pb-4">
                <span>Application Fee</span>
                <span className="font-bold">$100.00 BBD</span>
              </div>
              <p className="text-[#505a5f] leading-relaxed">
                In the live system, you would now be redirected to the secure government payment gateway <strong>EZPay+</strong> to complete your transaction.
              </p>
              <PaymentSimulator />
            </div>
          </div>
        );
      case 'CONFIRMATION':
        return (
          <div className="space-y-10 py-10 text-center max-w-2xl mx-auto">
            <div className="bg-[#00703c] text-white p-8 rounded-sm shadow-lg transform scale-105">
              <h1 className="text-4xl font-bold mb-4">Application complete</h1>
              <p className="text-2xl">Your reference number is</p>
              <p className="text-5xl font-black mt-4 font-mono tracking-wider">PB-2026-X8V2K9</p>
            </div>
            <div className="space-y-4 text-left">
              <h2 className="text-2xl font-bold">What happens next</h2>
              <p className="text-xl opacity-80">
                We have sent a confirmation email to your registered address. 
                An immigration officer will review your application within 20 working days.
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="py-20 text-center border-4 border-dashed border-[#b1b4b6]">
            <h1 className="text-3xl font-bold mb-4 text-[#505a5f]">Coming Soon: {state.currentStep}</h1>
            <p className="text-xl opacity-60">This section is part of the alpha iterative release.</p>
            <div className="mt-8 p-4 bg-[#f3f2f1] text-sm font-mono max-w-md mx-auto overflow-auto">
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
