/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FormState, FormStep } from '../types/form';

/**
 * Determines the next step in the form flow based on current state.
 *
 * Journey routing:
 *  PASSPORT        — personal → born abroad? → national status → passport → next of kin
 *                    → dependants → contact → lost passport? → [parents consent if 16-17]
 *                    → evidence → check → payment → confirmation
 *  CITIZENSHIP     — personal → address → residence history → contact → dependants
 *                    → background → excluded classes → evidence → check → payment → confirmation
 *  RESIDENCY       — personal → passport → address → residence history → contact
 *                    → dependants → background → excluded classes → evidence → check → payment → confirmation
 *  WORK_PERMIT     — personal → passport → skill category → [professional agency?]
 *                    → address → contact → dependants → evidence → check → payment → confirmation
 *  STUDY           — H1 reference → personal → address → contact → dependants
 *                    → evidence → check → payment → confirmation
 *  STAY_EXTENSION  — start page → personal → passport → extension details
 *                    → evidence → check → payment → confirmation
 *  SCHOOL_REPORT   — school details → student details → report type → [departure] → remarks
 *                    → check → confirmation (no payment)
 *  STUDENT_TRANSFER — start page → personal → passport → current institution → transfer institution
 *                    → reasons → evidence → check → payment → confirmation
 *  RE_ENTRY        — start page → personal → passport → enforcement history → reasons
 *                    → sponsor → evidence → check → payment → confirmation
 *  RENUNCIATION    — start page → personal → renunciation details → declaration
 *                    → check → confirmation (no payment)
 *  NATURALISATION  — start page → N1 eligibility → personal → passport → address
 *                    → residence history → N1 referees → N1 declaration
 *                    → evidence → check → payment → confirmation
 *  MEDICAL_FORM    — start page → medical applicant → medical history → physician section
 *                    → check → confirmation (no payment)
 */
export const getNextStep = (state: FormState): FormStep => {
  const j = state.journeyType;

  switch (state.currentStep) {

    // ── Universal start ────────────────────────────────────────────
    case 'GATEWAY':
      // School Report bypasses START_PAGE and goes straight to school details
      if (j === 'SCHOOL_REPORT') return 'H3_SCHOOL_DETAILS';
      return 'START_PAGE';

    case 'START_PAGE':
      // These journeys skip eligibility and go straight to personal details
      if (j === 'STAY_EXTENSION' || j === 'STUDENT_TRANSFER' || j === 'RE_ENTRY' || j === 'RENUNCIATION') {
        return 'PERSONAL_DETAILS';
      }
      // Medical Form goes straight to its own applicant screen
      if (j === 'MEDICAL_FORM') return 'MED_APPLICANT';
      // Naturalisation has its own eligibility check screen
      if (j === 'NATURALISATION') return 'N1_ELIGIBILITY_CHECK';
      return 'ELIGIBILITY';

    // ── Eligibility ────────────────────────────────────────────────
    case 'ELIGIBILITY':
      if (j === 'PASSPORT') {
        if (state.age === 15 && state.isBarbadosCitizen === false) return 'EXIT_INELIGIBLE';
        if (state.isBarbadosCitizen === false) return 'EXIT_INELIGIBLE';
        return 'PERSONAL_DETAILS';
      }
      if (j === 'STUDY') return 'H1_REFERENCE';
      return 'PERSONAL_DETAILS';

    // ── Study: H1 Reference ────────────────────────────────────────
    case 'H1_REFERENCE':
      return 'PERSONAL_DETAILS';

    // ── Personal Details ───────────────────────────────────────────
    // ── Naturalisation: eligibility check ─────────────────────────
    case 'N1_ELIGIBILITY_CHECK':
      if (state.isBarbadosCitizen === true) return 'EXIT_INELIGIBLE';
      return 'PERSONAL_DETAILS';

    // ── Medical Form ───────────────────────────────────────────────
    case 'MED_APPLICANT':
      return 'MED_HISTORY';

    case 'MED_HISTORY':
      return 'MED_PHYSICIAN';

    case 'MED_PHYSICIAN':
      return 'CHECK_YOUR_ANSWERS';

    // ── Personal Details ───────────────────────────────────────────
    case 'PERSONAL_DETAILS':
      if (j === 'PASSPORT') {
        return state.bornAbroad ? 'BORN_ABROAD' : 'NATIONAL_STATUS';
      }
      if (j === 'STUDY') return 'ADDRESS_BLOCK';
      if (j === 'RENUNCIATION') return 'RENUNCIATION_DETAILS';
      // CITIZENSHIP, WORK_PERMIT, RESIDENCY, STAY_EXTENSION, STUDENT_TRANSFER, RE_ENTRY, NATURALISATION
      return 'PASSPORT_DETAILS';

    // ── Passport: Born Abroad ──────────────────────────────────────
    case 'BORN_ABROAD':
      return 'NATIONAL_STATUS';

    // ── Passport: National Status ──────────────────────────────────
    case 'NATIONAL_STATUS':
      return 'PASSPORT_DETAILS';

    // ── Passport / Travel Document Details ────────────────────────
    case 'PASSPORT_DETAILS':
      if (j === 'PASSPORT') return 'NEXT_OF_KIN';
      if (j === 'WORK_PERMIT') return 'SKILL_CATEGORY';
      if (j === 'STAY_EXTENSION') return 'STAY_EXTENSION_DETAILS';
      if (j === 'STUDENT_TRANSFER') return 'H4_CURRENT_INSTITUTION';
      if (j === 'RE_ENTRY') return 'REENTRY_ENFORCEMENT';
      // CITIZENSHIP, RESIDENCY → address block
      return 'ADDRESS_BLOCK';

    // ── Form B: Stay Extension Details ────────────────────────────
    case 'STAY_EXTENSION_DETAILS':
      return 'EVIDENCE_UPLOAD';

    // ── Form H-4: Student Transfer ────────────────────────────────
    case 'H4_CURRENT_INSTITUTION':
      return 'H4_TRANSFER_INSTITUTION';

    case 'H4_TRANSFER_INSTITUTION':
      return 'H4_REASONS';

    case 'H4_REASONS':
      return 'EVIDENCE_UPLOAD';

    // ── Re-Entry Application ──────────────────────────────────────
    case 'REENTRY_ENFORCEMENT':
      return 'REENTRY_REASONS';

    case 'REENTRY_REASONS':
      return 'REENTRY_SPONSOR';

    case 'REENTRY_SPONSOR':
      return 'EVIDENCE_UPLOAD';

    // ── Renunciation of Citizenship ───────────────────────────────
    case 'RENUNCIATION_DETAILS':
      return 'RENUNCIATION_DECLARATION';

    case 'RENUNCIATION_DECLARATION':
      return 'CHECK_YOUR_ANSWERS';

    // ── Passport: Next of Kin ─────────────────────────────────────
    case 'NEXT_OF_KIN':
      return 'DEPENDANT_DETAILS';

    // ── Work Permit: Skill Category ────────────────────────────────
    case 'SKILL_CATEGORY': {
      const needsAgency = ['NURSE', 'TEACHER', 'MEDIA_PERSON', 'ARTISAN'].includes(
        state.work?.skillCategory || ''
      );
      return needsAgency ? 'PROFESSIONAL_AGENCY' : 'ADDRESS_BLOCK';
    }

    case 'PROFESSIONAL_AGENCY':
      return 'ADDRESS_BLOCK';

    // ── Naturalisation: referees & declaration ─────────────────────
    case 'N1_REFEREES':
      return 'N1_DECLARATION';

    case 'N1_DECLARATION':
      return 'EVIDENCE_UPLOAD';

    // ── Address / Residence ────────────────────────────────────────
    case 'ADDRESS_BLOCK':
      if (j === 'CITIZENSHIP' || j === 'RESIDENCY' || j === 'NATURALISATION') return 'RESIDENCE_HISTORY';
      return 'CONTACT_BLOCK';

    case 'RESIDENCE_HISTORY':
      if (j === 'NATURALISATION') return 'N1_REFEREES';
      return 'CONTACT_BLOCK';

    // ── Contact Block ──────────────────────────────────────────────
    case 'CONTACT_BLOCK':
      if (j === 'PASSPORT') return 'LOST_PASSPORT';
      return 'DEPENDANT_DETAILS';

    // ── Passport: Lost / Stolen Passport ──────────────────────────
    case 'LOST_PASSPORT':
      if (state.age === 17) return 'PARENTS_CONSENT';
      return 'EVIDENCE_UPLOAD';

    // ── Passport: Parents Consent (16-17 only) ─────────────────────
    case 'PARENTS_CONSENT':
      return 'EVIDENCE_UPLOAD';

    // ── Dependants / Children ─────────────────────────────────────
    case 'DEPENDANT_DETAILS':
      if (j === 'CITIZENSHIP' || j === 'RESIDENCY') return 'BACKGROUND_CHECKS';
      return 'EVIDENCE_UPLOAD';

    // ── Background Checks & Excluded Classes ──────────────────────
    case 'BACKGROUND_CHECKS':
      return 'EXCLUDED_CLASSES';

    case 'EXCLUDED_CLASSES':
      return 'EVIDENCE_UPLOAD';

    // ── Form H-3: School Report ───────────────────────────────────
    case 'H3_SCHOOL_DETAILS':
      return 'H3_STUDENT_DETAILS';

    case 'H3_STUDENT_DETAILS':
      return 'H3_REPORT_TYPE';

    case 'H3_REPORT_TYPE': {
      const type = state.h3Report?.reportType;
      if (type === 'C' || type === 'D') return 'H3_DEPARTURE_DETAILS';
      return 'H3_REMARKS';
    }

    case 'H3_DEPARTURE_DETAILS':
      return 'H3_REMARKS';

    case 'H3_REMARKS':
      return 'CHECK_YOUR_ANSWERS';

    // ── Shared end of journey ─────────────────────────────────────
    case 'EVIDENCE_UPLOAD':
      return 'CHECK_YOUR_ANSWERS';

    case 'CHECK_YOUR_ANSWERS':
      // No payment required for: School Report, Renunciation, Medical Form
      if (j === 'SCHOOL_REPORT' || j === 'RENUNCIATION' || j === 'MEDICAL_FORM') return 'CONFIRMATION';
      return 'PAYMENT';

    case 'PAYMENT':
      return 'CONFIRMATION';

    default:
      return 'GATEWAY';
  }
};

/**
 * Determines the previous step for the "Back" button.
 * Must be the exact mirror image of getNextStep.
 */
export const getPreviousStep = (state: FormState): FormStep => {
  const j = state.journeyType;

  switch (state.currentStep) {
    case 'START_PAGE':       return 'GATEWAY';
    case 'ELIGIBILITY':      return 'START_PAGE';

    // Naturalisation — Form N.1
    case 'N1_ELIGIBILITY_CHECK': return 'START_PAGE';
    case 'N1_REFEREES':          return 'RESIDENCE_HISTORY';
    case 'N1_DECLARATION':       return 'N1_REFEREES';

    // Medical Form
    case 'MED_APPLICANT':  return 'START_PAGE';
    case 'MED_HISTORY':    return 'MED_APPLICANT';
    case 'MED_PHYSICIAN':  return 'MED_HISTORY';

    // Form H-3
    case 'H3_SCHOOL_DETAILS':    return 'GATEWAY';
    case 'H3_STUDENT_DETAILS':   return 'H3_SCHOOL_DETAILS';
    case 'H3_REPORT_TYPE':       return 'H3_STUDENT_DETAILS';
    case 'H3_DEPARTURE_DETAILS': return 'H3_REPORT_TYPE';
    case 'H3_REMARKS':
      return (state.h3Report?.reportType === 'C' || state.h3Report?.reportType === 'D')
        ? 'H3_DEPARTURE_DETAILS'
        : 'H3_REPORT_TYPE';

    // Form B — Stay Extension
    case 'STAY_EXTENSION_DETAILS': return 'PASSPORT_DETAILS';

    // Form H-4 — Student Transfer
    case 'H4_CURRENT_INSTITUTION':   return 'PASSPORT_DETAILS';
    case 'H4_TRANSFER_INSTITUTION':  return 'H4_CURRENT_INSTITUTION';
    case 'H4_REASONS':               return 'H4_TRANSFER_INSTITUTION';

    // Re-Entry Application
    case 'REENTRY_ENFORCEMENT': return 'PASSPORT_DETAILS';
    case 'REENTRY_REASONS':     return 'REENTRY_ENFORCEMENT';
    case 'REENTRY_SPONSOR':     return 'REENTRY_REASONS';

    // Renunciation of Citizenship
    case 'RENUNCIATION_DETAILS':     return 'PERSONAL_DETAILS';
    case 'RENUNCIATION_DECLARATION': return 'RENUNCIATION_DETAILS';

    case 'H1_REFERENCE':      return 'ELIGIBILITY';

    case 'PERSONAL_DETAILS':
      if (j === 'STUDY') return 'H1_REFERENCE';
      if (j === 'NATURALISATION') return 'N1_ELIGIBILITY_CHECK';
      // Journeys that skip ELIGIBILITY go back to START_PAGE
      if (j === 'STAY_EXTENSION' || j === 'STUDENT_TRANSFER' || j === 'RE_ENTRY' || j === 'RENUNCIATION') {
        return 'START_PAGE';
      }
      return 'ELIGIBILITY';

    case 'BORN_ABROAD':      return 'PERSONAL_DETAILS';

    case 'NATIONAL_STATUS':
      return state.bornAbroad ? 'BORN_ABROAD' : 'PERSONAL_DETAILS';

    case 'PASSPORT_DETAILS':
      if (j === 'PASSPORT') return 'NATIONAL_STATUS';
      return 'PERSONAL_DETAILS';

    case 'CHECK_YOUR_ANSWERS':
      if (j === 'SCHOOL_REPORT') return 'H3_REMARKS';
      if (j === 'RENUNCIATION') return 'RENUNCIATION_DECLARATION';
      if (j === 'MEDICAL_FORM') return 'MED_PHYSICIAN';
      return 'EVIDENCE_UPLOAD';

    case 'NEXT_OF_KIN':      return 'PASSPORT_DETAILS';

    case 'SKILL_CATEGORY':   return 'PASSPORT_DETAILS';

    case 'PROFESSIONAL_AGENCY': return 'SKILL_CATEGORY';

    case 'ADDRESS_BLOCK':
      if (j === 'WORK_PERMIT') {
        const needsAgency = ['NURSE', 'TEACHER', 'MEDIA_PERSON', 'ARTISAN'].includes(
          state.work?.skillCategory || ''
        );
        return needsAgency ? 'PROFESSIONAL_AGENCY' : 'SKILL_CATEGORY';
      }
      if (j === 'CITIZENSHIP' || j === 'RESIDENCY') return 'PASSPORT_DETAILS';
      if (j === 'STUDY') return 'PERSONAL_DETAILS';
      return 'PERSONAL_DETAILS';

    case 'RESIDENCE_HISTORY':
      return 'ADDRESS_BLOCK';

    case 'CONTACT_BLOCK':
      if (j === 'CITIZENSHIP' || j === 'RESIDENCY') return 'RESIDENCE_HISTORY';
      if (j === 'PASSPORT') return 'DEPENDANT_DETAILS';
      return 'ADDRESS_BLOCK';

    case 'LOST_PASSPORT':    return 'CONTACT_BLOCK';

    case 'PARENTS_CONSENT':  return 'LOST_PASSPORT';

    case 'DEPENDANT_DETAILS':
      if (j === 'PASSPORT') return 'NEXT_OF_KIN';
      return 'CONTACT_BLOCK';

    case 'BACKGROUND_CHECKS': return 'DEPENDANT_DETAILS';

    case 'EXCLUDED_CLASSES': return 'BACKGROUND_CHECKS';

    case 'EVIDENCE_UPLOAD':
      if (j === 'PASSPORT') {
        return state.age === 17 ? 'PARENTS_CONSENT' : 'LOST_PASSPORT';
      }
      if (j === 'CITIZENSHIP' || j === 'RESIDENCY') return 'EXCLUDED_CLASSES';
      if (j === 'STAY_EXTENSION') return 'STAY_EXTENSION_DETAILS';
      if (j === 'STUDENT_TRANSFER') return 'H4_REASONS';
      if (j === 'RE_ENTRY') return 'REENTRY_SPONSOR';
      if (j === 'NATURALISATION') return 'N1_DECLARATION';
      return 'DEPENDANT_DETAILS';

    case 'PAYMENT': return 'CHECK_YOUR_ANSWERS';

    default: return 'GATEWAY';
  }
};
