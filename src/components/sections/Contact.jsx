import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { MapPinIcon, PhoneIcon, ArrowRightIcon } from '../../icons';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export const Contact = ({ t }) => {
  const [contactRef, contactVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [inquirySent, setInquirySent] = useState(false);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      e.target.reset();
    }, 5000);
  };

  return (
    <section id="contact" ref={contactRef} className="py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden scroll-mt-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className={`transition-all duration-1000 transform ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} grid grid-cols-1 lg:grid-cols-12 gap-16`}>
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <SectionHeader title={t('contact.title')} subtitle={t('contact.subtitle')} className="mb-6" />
            
            <div className="space-y-6 w-full mb-8">
              
              {/* Address Card */}
              <div className="flex gap-4">
                <span className="h-12 w-12 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-pga-blue dark:text-pga-blue-light rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPinIcon />
                </span>
                <div>
                  <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider mb-1">{t('contact.addressLabel')}</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-sm font-semibold">
                    {t('contact.addressVal')}
                  </p>
                </div>
              </div>

              {/* Telephone Card */}
              <div className="flex gap-4">
                <span className="h-12 w-12 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-pga-blue dark:text-pga-blue-light rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <PhoneIcon />
                </span>
                <div>
                  <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider mb-1">{t('contact.phoneLabel')}</h4>
                  <p className="text-base font-extrabold text-slate-800 dark:text-white">
                    0233-3602024
                  </p>
                </div>
              </div>

              {/* Contact Persons */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-6 w-full mt-4">
                <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider mb-4">{t('contact.contactPersons')}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Welly */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                    <div className="font-bold text-base text-slate-800 dark:text-white">Welly</div>
                    <a href="tel:081298313588" className="text-sm text-pga-blue dark:text-pga-blue-light hover:underline block mt-1 font-bold">081298313588</a>
                    <a href="mailto:welly@dingxingtrims.com" className="text-[11px] text-slate-500 dark:text-slate-400 hover:underline block mt-1">welly@dingxingtrims.com</a>
                  </div>

                  {/* Wang Jianrong */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                    <div className="font-bold text-base text-slate-800 dark:text-white">Wang Jianrong</div>
                    <a href="tel:087808235700" className="text-sm text-pga-blue dark:text-pga-blue-light hover:underline block mt-1 font-bold">087808235700</a>
                    <a href="mailto:jianrong@dingxingtrims.com" className="text-[11px] text-slate-500 dark:text-slate-400 hover:underline block mt-1">jianrong@dingxingtrims.com</a>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-10 shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pga-blue/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
              
              <h3 className="font-outfit font-extrabold text-2xl lg:text-3xl mb-8 text-slate-800 dark:text-white">{t('contact.formTitle')}</h3>
              
              <form onSubmit={handleInquirySubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                      {t('contact.formName')}
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      required 
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pga-blue/50 focus:border-pga-blue transition-all text-sm font-semibold" 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                      {t('contact.formEmail')}
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      required 
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pga-blue/50 focus:border-pga-blue transition-all text-sm font-semibold" 
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                    {t('contact.formPhone')}
                  </label>
                  <input 
                    type="text" 
                    id="phone" 
                    required 
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pga-blue/50 focus:border-pga-blue transition-all text-sm font-semibold" 
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                    {t('contact.formMsg')}
                  </label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    required 
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pga-blue/50 focus:border-pga-blue transition-all text-sm font-semibold resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-pga-blue hover:bg-pga-blue-hover text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-pga-blue/30 flex items-center justify-center gap-2 hover:-translate-y-1"
                >
                  <span>{t('contact.formSubmit')}</span>
                  <ArrowRightIcon />
                </button>

                <AnimatePresence>
                  {inquirySent && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-4 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl text-xs font-semibold flex items-center justify-center"
                    >
                      {t('contact.formSuccess')}
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
