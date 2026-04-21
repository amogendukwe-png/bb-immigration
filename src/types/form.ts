/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FormStep = 
  | 'GATEWAY'
  | 'START_PAGE'
  | 'ELIGIBILITY'
  | 'APPLICANT_DETAILS'
  | 'PERSONAL_DETAILS'
  | 'ADDRESS_BLOCK'
  | 'CONTACT_BLOCK'
  | 'PASSPORT_DETAILS'
  | 'SKILL_CATEGORY'
  | 'PROFESSIONAL_AGENCY'
  | 'RESIDENCE_HISTORY'
  | 'CROWN_SERVICE'
  | 'DEPENDANT_DETAILS'
  | 'H1_REFERENCE'
  | 'BACKGROUND_CHECKS'
  | 'EXCLUDED_CLASSES'
  | 'EVIDENCE_UPLOAD'
  | 'CHECK_YOUR_ANSWERS'
  | 'PAYMENT'
  | 'CONFIRMATION'
  | 'EXIT_INELIGIBLE';

export type JourneyType = 
  | 'PASSPORT'
  | 'WORK_PERMIT'
  | 'CITIZENSHIP'
  | 'STUDY'
  | 'RESIDENCY';

export interface FormState {
  currentStep: FormStep;
  journeyType?: JourneyType;
  subType?: string; // e.g., 'CHILD' vs 'ADULT' or 'DESCENT' vs 'MARRIAGE'
  
  // Eligibility & Initial Routing
  age?: number;
  isBarbadosCitizen?: boolean;
  isCaricomNational?: boolean;
  hasValidPassport?: boolean;
  relationshipToSubject?: 'SELF' | 'PARENT' | 'GUARDIAN' | 'AGENT';
  
  // Core Personal Details (Reused across forms)
  personalDetails?: {
    title?: string;
    firstName?: string;
    middleNames?: string;
    lastName?: string;
    maidenName?: string;
    dateOfBirth?: string;
    placeOfBirth?: string;
    countryOfBirth?: string;
    nationality?: string;
    sex?: 'MALE' | 'FEMALE' | 'OTHER';
    maritalStatus?: 'SINGLE' | 'MARRIED' | 'WIDOWED' | 'DIVORCED' | 'SEPARATED';
    occupation?: string;
  };

  // Passport Info (Reused)
  passport?: {
    number?: string;
    expiryDate?: string;
    countryOfIssue?: string;
    dateOfIssue?: string;
    placeOfIssue?: string;
  };

  // Address & Residence (Reused)
  addresses?: {
    current?: string;
    intendedBarbados?: string;
    history?: { address: string; from: string; to: string }[];
  };

  // Work & Skill (Specific to C2/C3/CARICOM)
  work?: {
    skillCategory?: string;
    employerName?: string;
    jobTitle?: string;
    professionalAgency?: { name: string; address: string; tel: string };
  };

  // Dependant Info (Repeatable)
  dependants?: {
    id: string;
    fullName: string;
    dateOfBirth: string;
    sex: 'MALE' | 'FEMALE';
    relationship: string;
    nationality: string;
    passportNumber?: string;
  }[];

  // Background & Vetting
  background?: {
    healthIssue?: boolean;
    healthDetails?: string;
    criminalRecord?: boolean;
    criminalDetails?: string;
    deported?: boolean;
    deportDetails?: string;
    visaRefusal?: boolean;
    visaDetails?: string;
    excludedClasses?: string[];
  };

  errors: Record<string, string>;
  isSubmitted: boolean;
}

export interface StepConfig {
  id: FormStep;
  next: (state: FormState) => FormStep;
  previous?: (state: FormState) => FormStep;
}
