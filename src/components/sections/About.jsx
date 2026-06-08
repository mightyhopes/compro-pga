import React from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon } from '../../icons';
import { ImageWithSkeleton } from '../ui/ImageWithSkeleton';
import { SectionHeader } from '../ui/SectionHeader';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export const About = ({ t }) => {
  const [aboutRef, aboutVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="about" ref={aboutRef} className="py-24 pt-32 lg:pt-40 bg-slate-50 dark:bg-slate-900 overflow-visible scroll-mt-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className={`transition-all duration-1000 transform ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} grid grid-cols-1 lg:grid-cols-12 gap-16 items-center`}>
          
          {/* Left Column: Visual Stack with Overlapping Bento Concept */}
          <div className="lg:col-span-5 grid grid-cols-12 gap-4 relative lg:-translate-y-8">
            <div className="col-span-12 rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-[1.5/1] bg-slate-200 dark:bg-slate-800">
              <ImageWithSkeleton 
                src="/assets/products/whatsapp_2.webp" 
                alt="PGA Factory Needle Loom Room" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              />
            </div>
            
            {/* Overlapping secondary image */}
            <div className="col-span-8 col-start-5 -mt-20 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-8 border-slate-50 dark:border-slate-900 aspect-square relative z-10 bg-slate-200 dark:bg-slate-800 group">
              <ImageWithSkeleton 
                src="/assets/details/detail_1.webp" 
                alt="PGA Active Weaving Machine Floor" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Floating Est Year Badge */}
            <div className="absolute left-0 bottom-10 bg-white dark:bg-slate-800 text-pga-blue dark:text-white px-6 py-4 rounded-2xl shadow-xl z-20 border border-slate-100 dark:border-slate-700 animate-float">
              <div className="text-4xl font-extrabold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-pga-blue to-teal-500">2018</div>
              <div className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mt-1">{t('about.estYear')}</div>
            </div>
          </div>

          {/* Right Column: About Details */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <SectionHeader title={t('about.title')} subtitle={t('about.subtitle')} className="mb-8" />
            
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-lg">
              {t('about.p1')}
            </p>
            
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              {t('about.p2')}
            </p>

            <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 mb-10 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-pga-blue dark:text-pga-blue-light font-outfit font-bold text-xl mb-3 flex items-center gap-3">
                <div className="w-2 h-8 bg-pga-teal rounded-full"></div>
                {t('about.tagline')}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
                <MapPinIcon />
                <span>{t('about.location')}</span>
              </div>
            </div>

            {/* Vision & Mission Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              
              {/* Vision Card */}
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl flex flex-col items-start shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-300 group hover:-translate-y-1">
                <span className="p-4 bg-blue-50 dark:bg-pga-blue/20 text-pga-blue dark:text-pga-blue-light rounded-2xl mb-6 group-hover:bg-pga-blue group-hover:text-white transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                </span>
                <h3 className="font-outfit font-bold text-xl mb-3 text-slate-900 dark:text-white">{t('about.visionTitle')}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('about.visionDesc')}</p>
              </div>

              {/* Mission Card */}
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl flex flex-col items-start shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-300 group hover:-translate-y-1">
                <span className="p-4 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-2xl mb-6 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                </span>
                <h3 className="font-outfit font-bold text-xl mb-3 text-slate-900 dark:text-white">{t('about.missionTitle')}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('about.missionDesc')}</p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
