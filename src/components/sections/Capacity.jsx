import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { ImageWithSkeleton } from '../ui/ImageWithSkeleton';
import { Counter } from '../ui/Counter';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export const Capacity = ({ t }) => {
  const [capacityRef, capacityVisible] = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section id="capacity" ref={capacityRef} className="pt-24 bg-slate-50 dark:bg-slate-950 relative overflow-visible scroll-mt-24 z-20">
      
      {/* Machine image backdrop */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <img 
          src="/assets/products/whatsapp_2.webp" 
          alt="Factory production line" 
          className="w-full h-full object-cover filter blur-[2px]" 
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/95 to-slate-50 dark:from-slate-950 dark:via-slate-950/95 dark:to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className={`transition-all duration-1000 transform ${capacityVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} grid grid-cols-1 lg:grid-cols-12 gap-16 items-center pb-24 lg:pb-32`}>
          
          {/* Left Column: Machinery Statistics */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <SectionHeader title={t('capacity.title')} subtitle={t('capacity.subtitle')} className="mb-6" />
            
            <p className="text-slate-600 dark:text-slate-350 leading-relaxed mb-8 max-w-xl text-lg">
              {t('capacity.desc')}
            </p>

            {/* Grid of machines stats - OVERLAPPING to next section using negative bottom margin on large screens */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full absolute bottom-0 translate-y-1/2 left-0 px-6 sm:static sm:translate-y-0 sm:px-0 lg:translate-y-32 z-30">
              
              {/* Drawcord Card */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-4xl font-extrabold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-pga-blue to-teal-500 mb-2">
                  <Counter target="89" />
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{t('capacity.stats.drawcord.label')}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('capacity.stats.drawcord.desc')}</div>
                
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">{t('capacity.stats.dailyYield')}</div>
                  <div className="text-base font-extrabold text-pga-teal">75,000 YDS</div>
                </div>
              </div>

              {/* Elastic Card */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-4xl font-extrabold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-pga-blue to-teal-500 mb-2">
                  <Counter target="27" />
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{t('capacity.stats.elastic.label')}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('capacity.stats.elastic.desc')}</div>
                
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">{t('capacity.stats.dailyYield')}</div>
                  <div className="text-base font-extrabold text-pga-teal">50,000 YDS</div>
                </div>
              </div>

              {/* Herringbone Card */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-4xl font-extrabold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-pga-blue to-teal-500 mb-2">
                  <Counter target="7" />
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{t('capacity.stats.herringbone.label')}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('capacity.stats.herringbone.desc')}</div>
                
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">{t('capacity.stats.dailyYield')}</div>
                  <div className="text-base font-extrabold text-pga-teal">30,000 YDS</div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Visual Showcase of Real Machines */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] aspect-[1/1.3] relative bg-slate-200 dark:bg-slate-800 group">
              <ImageWithSkeleton 
                src="/assets/products/whatsapp_3.webp" 
                alt="Industrial needle loom machinery" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] aspect-[1/1.3] relative bg-slate-200 dark:bg-slate-800 group mt-12">
              <ImageWithSkeleton 
                src="/assets/products/whatsapp_4.webp" 
                alt="High speed knitting machine" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
