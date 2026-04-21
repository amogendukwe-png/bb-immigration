/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FormStep =
  | 'GATEWAY'
  | 'START_PAGE'
  | 'ELIGIBILITY'
  | 'PERSONAL_DETAILS'
  | 'BORN_ABROAD'
  | 'NATIONAL_STATUS'
  | 'PASSPORT_DETAILS'
  | 'NEXT_OF_KIN'
  | 'LOST_PASSPORT'
  | 'PARENTS_CONSENT'
  | 'ADDRESS_BLOCK'
  | 'CONTACT_BLOCK'
  | 'SKILL_CATEGORY'
  | 'PROFESSIONAL_AGENCY'
  | 'RESIDENCE_HISTORY'
  | 'DEPENDANT_DETAILS'
  | 'H1_REFERENCE'
  | 'BACKGROUND_CHECKS'
  | 'EXCLUDED_CLASSES'
  | 'EVIDENCE_UPLOAD'
  | 'CHECK_YOUR_ANSWERS'
  | 'PAYMENT'
  | 'CONFIRMATION'
  | 'EXIT_INELIGIBLE'
  // Form B — Stay Extension
  | 'STAY_EXTENSION_DETAILS'
  // Form H-3 — School report on non-immigrant student
  | 'H3_SCHOOL_DETAILS'
  | 'H3_STUDENT_DETAILS'
  | 'H3_REPORT_TYPE'
  | 'H3_DEPARTURE_DETAILS'
  | 'H3_REMARKS';

export type JourneyType =
  | 'PASSPORT'
  | 'WORK_PERMIT'
  | 'CITIZENSHIP'
  | 'STUDY'
  | 'RESIDENCY'
  | 'STAY_EXTENSION'
  | 'SCHOOL_REPORT';

export interface FormState {
  currentStep: FormStep;
  journeyType?: JourneyType;
  subType?: string;

  // Eligibility routing flags
  age?: number;               // 15=child(<16), 17=young adult(16-17), 18=adult(18+)
  isBarbadosCitizen?: boolean;
  isUnder18?: boolean;        // citizenship age gate
  bornAbroad?: boolean;       // passport conditional
  hasLostPassport?: boolean;  // passport conditional

  // Personal Details
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
    height?: string;
    marksOfIdentification?: string;
  };

  // Born Abroad — passport conditional
  bornAbroadDetails?: {
    countryOfBirth?: string;
    dateOfArrival?: string;
    portOfEntry?: string;
    howBecameCitizen?: string;
  };

  // National Status — passport
  nationalStatus?: {
    howAcquired?: 'BIRTH' | 'DESCENT' | 'REGISTRATION' | 'MARRIAGE' | 'NATURALISATION';
    previousNationality?: string;
    certificateNumber?: string;
  };

  // Passport / Travel Document
  passport?: {
    number?: string;
    expiryDate?: string;
    countryOfIssue?: string;
    dateOfIssue?: string;
    placeOfIssue?: string;
    isFirst?: boolean;
  };

  // Next of Kin — passport
  nextOfKin?: {
    fullName?: string;
    relationship?: string;
    address?: string;
    telephone?: string;
  };

  // Lost / Stolen / Damaged Passport
  lostPassport?: {
    isLost?: boolean;
    previousPassportNumber?: string;
    dateLastSeen?: string;
    circumstances?: string;
    policeReportNumber?: string;
    policeStation?: string;
  };

  // Parental Consent — passport 16-17 only
  parentsConsent?: {
    parent1Name?: string;
    parent1Nationality?: string;
    parent1Relationship?: string;
    parent2Name?: string;
    parent2Nationality?: string;
    consentGiven?: boolean;
  };

  // Address & Residence
  addresses?: {
    current?: string;
    intendedBarbados?: string;
    history?: { address: string; from: string; to: string }[];
  };

  // Work & Skill — C2/C3 only
  work?: {
    skillCategory?: string;
    employerName?: string;
    jobTitle?: string;
    professionalAgency?: { name: string; address: string; tel: string };
  };

  // Dependants / Children
  dependants?: {
    id: string;
    fullName: string;
    dateOfBirth: string;
    sex: 'MALE' | 'FEMALE';
    relationship: string;
    nationality: string;
    passportNumber?: string;
  }[];

  // Background & Vetting — citizenship, residency
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

  // H1 Reference — Study only
  h1Reference?: {
    institutionName?: string;
    referenceNumber?: string;
    courseStart?: string;
    courseEnd?: string;
  };

  // Form B — Stay Extension
  stayExtension?: {
    dateOfEntry?: string;
    currentPermitPeriod?: string;
    extensionRequested?: string;
    previousExtensions?: { date: string; lengthSought: string; granted: string }[];
    reasons?: string;
  };

  // Form H-3 — School Report on Non-Immigrant Student
  h3School?: {
    schoolName?: string;
    schoolOfficial?: string;
    schoolAddress?: string;
  };
  h3Student?: {
    familyName?: string;
    firstName?: string;
    middleName?: string;
    dateOfBirth?: string;
    countryOfBirth?: string;
    countryOfNationality?: string;
  };
  h3Report?: {
    reportType?: 'A' | 'B' | 'C' | 'D';
    terminationDate?: string;
    lastAddressInBarbados?: string;
    hasDeparted?: boolean;
    dateOfDeparture?: string;
    portOfDeparture?: string;
    transportName?: string;
    addressAbroad?: string;
    remarks?: string;
  };

  errors: Record<string, string>;
  isSubmitted: boolean;
}

export interface StepConfig {
  id: FormStep;
  next: (state: FormState) => FormStep;
  previous?: (state: FormState) => FormStep;
}
