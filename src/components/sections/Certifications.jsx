import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { ImageWithSkeleton } from '../ui/ImageWithSkeleton';
import { ZoomInIcon } from '../../icons';
import { CertModal } from '../ui/CertModal';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export const Certifications = ({ t }) => {
  const [certsRef, certsVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [selectedCertificate, setSelectedCertificate] = useState(null); // { type: 'grs'|'oeko'|'slf', page: 1 }

  return (
    <>
      <section id="certifications" ref={certsRef} className="pt-48 pb-24 bg-white dark:bg-slate-900 overflow-hidden scroll-mt-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className={`transition-all duration-1000 transform ${certsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-center max-w-3xl mx-auto mb-20`}>
            <SectionHeader title={t('certs.title')} subtitle={t('certs.subtitle')} className="mb-4" />
            <div className="h-1.5 w-24 bg-pga-blue mx-auto rounded-full"></div>
          </div>

          {/* Row 1: H&M Partner Banner */}
          <div className="mb-16 bg-slate-50 dark:bg-slate-800/20 rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-200/50 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Custom stylized audit portal graphic card */}
            <div className="md:col-span-4 flex flex-col justify-center bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm relative overflow-hidden h-44 text-center group hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-3 right-3 flex items-center gap-1 text-[9px] text-emerald-500 font-extrabold tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>COMPLIANT</span>
              </div>
              <div className="text-red-600 dark:text-red-500 font-outfit font-black text-5xl italic tracking-tighter mb-1 transform group-hover:scale-105 transition-transform duration-300">
                H&M
              </div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">
                Approved Supplier
              </div>
              <div className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold mt-4 border-t border-slate-100 dark:border-slate-800 pt-3">
                Facility ID: PGA-ID-2018
              </div>
            </div>

            {/* Content description */}
            <div className="md:col-span-8 flex flex-col items-start">
              <span className="px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-[10px] font-bold tracking-widest uppercase mb-3 inline-block">
                {t('partner.title')}
              </span>
              <h3 className="font-outfit font-extrabold text-2xl lg:text-3xl mb-4 text-slate-800 dark:text-white">
                {t('partner.subtitle')}
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-350 leading-relaxed max-w-2xl">
                {t('partner.hmDesc')}
              </p>
            </div>

          </div>

          {/* Row 2: Grid of Certificates (GRS, OEKO-TEX, SLF) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* GRS Certificate */}
            <div 
              onClick={() => setSelectedCertificate({ type: 'grs', page: 1 })}
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-lg flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
            >
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-[1/1.3] relative bg-slate-100 dark:bg-slate-900 mb-6">
                <ImageWithSkeleton src="/assets/certs/grs_page_1.webp" alt={t('certs.grsTitle')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="flex items-center gap-2 text-white bg-pga-blue/90 font-bold text-xs px-4 py-2 rounded-xl backdrop-blur-sm shadow-md">
                    <ZoomInIcon />
                    <span>{t('certs.viewCert')}</span>
                  </span>
                </div>
              </div>
              <h3 className="font-outfit font-extrabold text-lg mb-2 text-slate-800 dark:text-white group-hover:text-pga-blue transition-colors">{t('certs.grsTitle')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('certs.grsDesc')}
              </p>
            </div>

            {/* OEKO-TEX Certificate */}
            <div 
              onClick={() => setSelectedCertificate({ type: 'oeko', page: 1 })}
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-lg flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
            >
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-[1/1.3] relative bg-slate-100 dark:bg-slate-900 mb-6">
                <ImageWithSkeleton src="/assets/certs/oeko_page_1.webp" alt={t('certs.oekoTitle')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="flex items-center gap-2 text-white bg-pga-blue/90 font-bold text-xs px-4 py-2 rounded-xl backdrop-blur-sm shadow-md">
                    <ZoomInIcon />
                    <span>{t('certs.viewCert')}</span>
                  </span>
                </div>
              </div>
              <h3 className="font-outfit font-extrabold text-lg mb-2 text-slate-800 dark:text-white group-hover:text-pga-blue transition-colors">{t('certs.oekoTitle')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('certs.oekoDesc')}
              </p>
            </div>

            {/* SLF Certificate */}
            <div 
              onClick={() => setSelectedCertificate({ type: 'slf', page: 1 })}
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-lg flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
            >
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-[1/1.3] relative bg-slate-100 dark:bg-slate-900 mb-6">
                <ImageWithSkeleton src="/assets/certs/slf_page_1.webp" alt={t('certs.slfTitle')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="flex items-center gap-2 text-white bg-pga-blue/90 font-bold text-xs px-4 py-2 rounded-xl backdrop-blur-sm shadow-md">
                    <ZoomInIcon />
                    <span>{t('certs.viewCert')}</span>
                  </span>
                </div>
              </div>
              <h3 className="font-outfit font-extrabold text-lg mb-2 text-slate-800 dark:text-white group-hover:text-pga-blue transition-colors">{t('certs.slfTitle')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('certs.slfDesc')}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Cert Modal */}
      <CertModal 
        selectedCertificate={selectedCertificate} 
        setSelectedCertificate={setSelectedCertificate} 
        t={t} 
      />
    </>
  );
};
