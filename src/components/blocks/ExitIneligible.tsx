/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';

export const ExitIneligible: React.FC = () => {
  const { state } = useForm();

  let message = "You cannot use this service.";
  let guidance = "Based on your answers, you are not eligible to use this digital service at this time.";

  if (state.isUnder16 === false) {
    message = "Child is 16 or over";
    guidance = "Children aged 16 and over must apply using Form A (adult passport application).";
  } else if (state.isBarbadosCitizen === false) {
    message = "Child must be a Citizen of Barbados";
    guidance = "The child must be a Citizen of Barbados to apply for a Barbados passport. Contact the Immigration Department for guidance.";
  }

  return (
    <div className="space-y-8" id="exit-page">
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--bb-red)]">{message}</h1>
      <p className="text-xl leading-relaxed max-w-2xl">{guidance}</p>
      
      <div className="pt-8 border-t border-[var(--bb-border)] mt-12">
        <h2 className="text-xl font-bold mb-4">What to do next</h2>
        <p className="text-lg mb-4">
          You may need to contact the Barbados Immigration Department directly for further assistance.
        </p>
        <div className="bg-[var(--bb-gray)] p-6 border-l-4 border-[var(--bb-text-gray)]">
          <p className="font-bold">Immigration Department</p>
          <p>Careenage House, The Wharf</p>
          <p>Bridgetown, Barbados</p>
          <p className="mt-2 text-[var(--bb-navy-mid)] font-medium underline cursor-pointer">immigration.dept@barbados.gov.bb</p>
        </div>
      </div>
    </div>
  );
};
