/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useForm } from '../../context/FormContext';
import { Upload, File as FileIcon, CheckCircle2, AlertCircle } from 'lucide-react';

export const EvidenceUploadBlock: React.FC = () => {
  const { state, goToNext } = useForm();
  const [uploads, setUploads] = React.useState<Record<string, any>>({});

  const journey = state.journeyType;

  const requiredDocs = {
    PASSPORT: ['Birth Certificate', '2 Passport Photographs', 'National ID'],
    WORK_PERMIT: ['Police Certificate', 'Employer Cover Letter', 'Qualifications'],
    CITIZENSHIP: ['Commonwealth Proof', 'Residence Evidence', 'Affidavits'],
    STUDY: ['Form H-1', 'Financial Support Proof'],
    RESIDENCY: ['Immigrant Certificate', 'Assets Proof']
  };

  const currentDocs = requiredDocs[journey || 'PASSPORT'];

  const handleFile = (docName: string) => {
    // Mock upload behavior
    setUploads(prev => ({ ...prev, [docName]: new File([], 'uploaded-doc.pdf') }));
  };

  return (
    <div className="space-y-8" id="evidence-upload-block">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 underline decoration-2 decoration-[var(--color-teal-00)] underline-offset-8">Upload documents</h1>
      <p className="text-xl mb-12 opacity-80 max-w-2xl leading-relaxed italic">
        You must upload a clear digital copy of the following documents. We accept PDF, JPG, and PNG files up to 5MB each.
      </p>

      <div className="space-y-6 max-w-3xl">
        {currentDocs.map((doc) => (
          <div key={doc} className={`p-6 border-2 flex items-center justify-between transition-all ${uploads[doc] ? 'border-[var(--color-teal-00)] bg-[#f3fcf6]' : 'border-[var(--color-black-00)] bg-white hover:border-[var(--color-teal-00)]'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 flex items-center justify-center rounded-sm ${uploads[doc] ? 'bg-[var(--color-teal-00)] text-white' : 'bg-[var(--color-white-00)] text-[var(--color-mid-grey-00)]'}`}>
                <FileIcon size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">{doc}</h3>
                {uploads[doc] ? (
                  <span className="text-[var(--color-teal-00)] flex items-center gap-1 font-bold">
                    <CheckCircle2 size={16} /> Attached
                  </span>
                ) : (
                  <span className="text-[var(--color-mid-grey-00)] flex items-center gap-1">
                    <AlertCircle size={16} /> Not yet uploaded
                  </span>
                )}
              </div>
            </div>
            
            <button
              onClick={() => handleFile(doc)}
              className="group flex flex-col items-center gap-1 text-[var(--color-teal-00)] hover:text-[#003078] transition-colors focus:ring-2 focus:ring-[var(--color-teal-100)] p-4 rounded-sm"
              id={`upload-${doc.toLowerCase().replace(/ /g, '-')}`}
            >
              <Upload size={32} className="group-hover:-translate-y-1 transition-transform" />
              <span className="font-bold underline decoration-2 underline-offset-4">Choose file</span>
            </button>
          </div>
        ))}
      </div>

      <div className="pt-12 border-t border-[var(--color-black-00)]">
        <button
          onClick={goToNext}
          className="bg-[var(--color-teal-00)] text-white px-10 py-4 rounded-sm font-bold text-2xl hover:bg-[var(--color-blue-00)] transition-all shadow-md active:translate-y-1 focus:ring-4 focus:ring-[var(--color-teal-100)] focus:outline-none"
        >
          Save and continue
        </button>
      </div>
    </div>
  );
};
