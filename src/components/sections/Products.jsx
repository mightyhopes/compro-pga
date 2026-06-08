import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../../i18n/translations';
import { CheckIcon, ArrowRightIcon } from '../../icons';
import { ImageWithSkeleton } from '../ui/ImageWithSkeleton';
import { SectionHeader } from '../ui/SectionHeader';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export const Products = ({ t, lang }) => {
  const [productsRef, productsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [activeProductTab, setActiveProductTab] = useState('drawcord');

  return (
    <section id="products" ref={productsRef} className="py-24 bg-slate-50 dark:bg-slate-950 overflow-visible scroll-mt-24 relative z-0">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className={`transition-all duration-1000 transform ${productsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-center max-w-3xl mx-auto mb-16`}>
          <SectionHeader title={t('products.title')} subtitle={t('products.subtitle')} className="mb-4" />
          <div className="h-1.5 w-24 bg-pga-blue mx-auto rounded-full"></div>
        </div>

        {/* Interactive Navigation Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 shadow-md">
            {Object.keys(translations.en.products.categories).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveProductTab(tab)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeProductTab === tab
                    ? 'bg-pga-blue text-white shadow-lg shadow-pga-blue/20'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {t(`products.categories.${tab}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Panel */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-200/50 dark:border-slate-800/80">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProductTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Product Detail Text */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-3 w-3 rounded-full bg-pga-blue"></span>
                  <h3 className="font-outfit font-extrabold text-2xl lg:text-3xl text-pga-blue dark:text-white">
                    {t(`products.${activeProductTab}.title`)}
                  </h3>
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 text-base">
                  {t(`products.${activeProductTab}.desc`)}
                </p>

                <h4 className="font-bold text-xs text-pga-gray uppercase tracking-widest mb-4">Core Specifications & Options</h4>
                <ul className="space-y-3.5 mb-8">
                  {translations[lang].products[activeProductTab].features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm font-semibold">
                      <span className="h-5 w-5 bg-pga-blue-light dark:bg-pga-blue/20 text-pga-blue dark:text-pga-blue-light rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckIcon />
                      </span>
                      <span className="text-slate-700 dark:text-slate-200">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a href="#contact" className="px-6 py-3 bg-pga-blue hover:bg-pga-blue-hover text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-1 flex items-center gap-2">
                  <span>{t('products.inquireBtn')}</span>
                  <ArrowRightIcon />
                </a>
              </div>

              {/* Product Image Layout */}
              <div className="lg:col-span-6">
                
                {activeProductTab === 'drawcord' && (
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    {/* Main Drawcord image */}
                    <div className="sm:col-span-12 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md aspect-[1.8/1] relative bg-slate-100 dark:bg-slate-950 group">
                      <ImageWithSkeleton src="/assets/products/drawcord.webp" alt="Drawcords collection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">Braided Drawcords</span>
                    </div>
                    {/* Metal Ending */}
                    <div className="sm:col-span-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-[1.4/1] relative bg-slate-100 dark:bg-slate-950 group">
                      <ImageWithSkeleton src="/assets/products/drawcord_metal.webp" alt="Drawcord with metal ending" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">Metal End Tips</span>
                    </div>
                    {/* Clear Plastic Ending */}
                    <div className="sm:col-span-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-[1.4/1] relative bg-slate-100 dark:bg-slate-950 group">
                      <ImageWithSkeleton src="/assets/products/drawcord_plastic.webp" alt="Drawcord with clear plastic ending" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">Plastic End Tips</span>
                    </div>
                  </div>
                )}

                {activeProductTab === 'tape' && (
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-12 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md aspect-[1.6/1] relative bg-slate-100 dark:bg-slate-950 group">
                      <ImageWithSkeleton src="/assets/products/whatsapp_4.webp" alt="Tape and Ribbons" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">Various Woven Tapes</span>
                    </div>
                  </div>
                )}

                {activeProductTab === 'elastic' && (
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md aspect-[1/1.2] relative bg-slate-100 dark:bg-slate-950 group">
                      <ImageWithSkeleton src="/assets/products/elastic_woven.webp" alt="Woven Elastic" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">Woven Jacquard Elastic</span>
                    </div>
                    <div className="sm:col-span-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md aspect-[1/1.2] relative bg-slate-100 dark:bg-slate-950 group">
                      <ImageWithSkeleton src="/assets/products/elastic_band.webp" alt="Elastic Bands" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">High-Tension Bands</span>
                    </div>
                  </div>
                )}

                {activeProductTab === 'herringbone' && (
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-12 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md aspect-[1.6/1] relative bg-slate-100 dark:bg-slate-950 group">
                      <ImageWithSkeleton src="/assets/products/whatsapp_3.webp" alt="Herringbone Tapes" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">Classic V-Shape Twill</span>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
