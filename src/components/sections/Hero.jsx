import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon } from '../../icons';

const heroSlides = [
  '/assets/products/whatsapp_2.webp',
  '/assets/products/whatsapp_1.webp',
  '/assets/details/detail_1.webp',
];

export const Hero = ({ t }) => {
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header id="home" className="relative min-h-screen flex items-center pt-24 overflow-visible scroll-mt-24 pb-12 lg:pb-0">
      
      {/* Full-screen Crossfade Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={heroSlideIdx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={heroSlides[heroSlideIdx]} 
              alt="PGA Factory Production Floor" 
              className="w-full h-full object-cover filter brightness-[0.4] dark:brightness-[0.25]" 
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/80 to-transparent pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 py-16 text-white grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Hero Main Content */}
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="px-4 py-1.5 rounded-full bg-pga-blue/30 text-pga-blue-light border border-pga-blue/45 text-xs font-bold tracking-wider uppercase mb-6 inline-block backdrop-blur-md"
          >
            {t('hero.subtitle')}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-outfit font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] mb-6 drop-shadow-md"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-200 font-semibold max-w-2xl border-l-4 border-pga-blue pl-4 mb-8 italic"
          >
            "{t('hero.slogan')}"
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a href="#products" className="px-8 py-4 bg-pga-blue hover:bg-pga-blue-hover text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-pga-blue/25 hover:translate-y-[-2px] transition-all">
              <span>{t('hero.exploreBtn')}</span>
              <ArrowRightIcon />
            </a>
            <a href="#contact" className="px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-all hover:translate-y-[-2px] backdrop-blur-sm">
              <span>{t('hero.contactBtn')}</span>
            </a>
          </motion.div>
        </div>

        {/* Hero Quick Badge Overlay - OVERLAPPING SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-4 flex justify-center lg:justify-end lg:translate-y-32 z-20"
        >
          <div className="relative p-8 rounded-3xl max-w-xs w-full text-white flex flex-col gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden group border border-white/10 hover:border-white/20 transition-all duration-500">
            {/* Glass Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl z-0"></div>
            
            {/* Glossy reflection highlight */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-50 z-0 pointer-events-none"></div>

            {/* Glow effect */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-pga-blue rounded-full blur-[50px] opacity-60 z-0 transition-opacity duration-500 group-hover:opacity-80"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pga-teal rounded-full blur-[50px] opacity-30 z-0 transition-opacity duration-500 group-hover:opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gradient-to-br from-pga-blue to-pga-blue-hover rounded-2xl flex items-center justify-center font-extrabold text-white text-xl shadow-[0_0_15px_rgba(1,53,154,0.5)]">
                  PGA
                </div>
                <div className="flex flex-col">
                  <div className="font-outfit font-extrabold text-sm tracking-wide">PT. Perfect Garment</div>
                  <div className="text-[9px] uppercase tracking-[0.2em] text-blue-200 font-bold mt-0.5">Accessories</div>
                </div>
              </div>
              
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium tracking-wide">{t('hero.card.estYear')}</span>
                  <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded text-[10px]">2018</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium tracking-wide">{t('hero.card.location')}</span>
                  <span className="font-bold text-white">Sumedang, ID</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium tracking-wide">{t('hero.card.compliance')}</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5 bg-emerald-400/10 px-2 py-0.5 rounded text-[10px] border border-emerald-400/20">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(52,211,153,0.8)]"></span>
                    {t('hero.card.audited')}
                  </span>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="flex justify-center gap-2 mt-2 pt-2 border-t border-white/5">
                {heroSlides.map((_, idx) => (
                  <button 
                    key={idx}
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => setHeroSlideIdx(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${heroSlideIdx === idx ? 'w-6 bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </header>
  );
};
