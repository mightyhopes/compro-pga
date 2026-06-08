import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from '../../icons';

export const certSpecs = {
  grs: { total: 3, base: '/assets/certs/grs_page_' },
  oeko: { total: 1, base: '/assets/certs/oeko_page_' },
  slf: { total: 3, base: '/assets/certs/slf_page_' },
};

export const CertModal = ({ selectedCertificate, setSelectedCertificate, t }) => {
  const [certImageLoading, setCertImageLoading] = useState(true);

  if (!selectedCertificate) return null;

  const handleCertPageNav = (direction) => {
    const { type, page } = selectedCertificate;
    const spec = certSpecs[type];
    
    setCertImageLoading(true);
    if (direction === 'next') {
      const nextPage = page < spec.total ? page + 1 : 1;
      setSelectedCertificate({ type, page: nextPage });
    } else {
      const prevPage = page > 1 ? page - 1 : spec.total;
      setSelectedCertificate({ type, page: prevPage });
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={() => setSelectedCertificate(null)}
      >
        <div 
          className="relative w-full max-w-3xl h-[85vh] bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950 text-white z-10">
            <span className="font-outfit font-extrabold text-xs sm:text-sm uppercase tracking-wider">
              {selectedCertificate.type === 'grs' ? t('certs.grsTitle') :
               selectedCertificate.type === 'oeko' ? t('certs.oekoTitle') :
               t('certs.slfTitle')}
            </span>
            <button 
              onClick={() => setSelectedCertificate(null)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Document Image Body */}
          <div className="flex-1 relative overflow-auto p-4 flex items-center justify-center bg-slate-950">
            {certImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-20">
                <div className="w-12 h-12 border-4 border-slate-700 border-t-pga-blue rounded-full animate-spin"></div>
              </div>
            )}

            <img 
              src={`${certSpecs[selectedCertificate.type].base}${selectedCertificate.page}.webp`} 
              alt={`Certificate page ${selectedCertificate.page}`} 
              loading="lazy"
              className={`max-w-full h-auto max-h-[60vh] object-contain rounded shadow-lg border border-slate-800 transition-opacity duration-300 ${certImageLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setCertImageLoading(false)}
            />

            {/* Left Arrow */}
            {certSpecs[selectedCertificate.type].total > 1 && (
              <button 
                onClick={() => handleCertPageNav('prev')}
                className="absolute left-4 p-3 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white border border-slate-800/50 transition-all flex items-center justify-center shadow-lg backdrop-blur-md"
                title="Previous Page"
              >
                <ChevronLeftIcon />
              </button>
            )}

            {/* Right Arrow */}
            {certSpecs[selectedCertificate.type].total > 1 && (
              <button 
                onClick={() => handleCertPageNav('next')}
                className="absolute right-4 p-3 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white border border-slate-800/50 transition-all flex items-center justify-center shadow-lg backdrop-blur-md"
                title="Next Page"
              >
                <ChevronRightIcon />
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-between items-center text-xs text-slate-400">
            <span>PT. Perfect Garment Accessories</span>
            
            {certSpecs[selectedCertificate.type].total > 1 && (
              <div className="flex gap-2">
                {Array.from({ length: certSpecs[selectedCertificate.type].total }).map((_, i) => (
                  <button 
                    key={i}
                    aria-label={`Go to certificate page ${i + 1}`}
                    onClick={() => { setSelectedCertificate({ type: selectedCertificate.type, page: i + 1 }); setCertImageLoading(true); }}
                    className={`h-2 rounded-full transition-all ${selectedCertificate.page === i + 1 ? 'w-4 bg-pga-blue' : 'w-2 bg-slate-700'}`}
                  />
                ))}
              </div>
            )}
            
            <span>
              {t('certs.pageOf', { current: selectedCertificate.page, total: certSpecs[selectedCertificate.type].total })}
            </span>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
