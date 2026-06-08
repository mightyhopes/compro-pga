import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobeIcon, SunIcon, MoonIcon, MenuIcon, CloseIcon } from '../../icons';

export const Navbar = ({ 
  navScrolled, 
  darkMode, 
  setDarkMode, 
  lang, 
  setLang, 
  mobileMenuOpen, 
  setMobileMenuOpen,
  t 
}) => {
  const navbarTextColor = navScrolled ? 'text-slate-600 hover:text-pga-blue dark:text-slate-300 dark:hover:text-white' : 'text-slate-300 hover:text-white';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navScrolled ? 'glass shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Corporate Logo with High-Res Image Card */}
        <a href="#home" className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-white overflow-hidden shadow-lg border border-slate-200/50 flex items-center justify-center p-1.5">
            <img src="/assets/logo.webp" alt="PT. PGA Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className={`font-outfit font-extrabold text-xl leading-tight tracking-tight transition-colors duration-300 ${navScrolled ? 'text-slate-900 dark:text-white' : 'text-white dark:text-white'}`}>
              PT. Perfect Garment
            </span>
            <span className={`text-[10px] tracking-[0.22em] uppercase leading-none font-bold transition-colors duration-300 ${navScrolled ? 'text-slate-500 dark:text-slate-400' : 'text-slate-300 dark:text-slate-400'}`}>
              Accessories
            </span>
          </div>
        </a>

        {/* Desktop Nav Items with Dynamic scroll contrast */}
        <div className={`hidden lg:flex items-center gap-8 font-bold text-sm transition-colors duration-350 ${navbarTextColor}`}>
          <a href="#home" className="transition-colors">{t('nav.home')}</a>
          <a href="#about" className="transition-colors">{t('nav.about')}</a>
          <a href="#products" className="transition-colors">{t('nav.products')}</a>
          <a href="#gallery" className="transition-colors">{t('nav.gallery')}</a>
          <a href="#capacity" className="transition-colors">{t('nav.capacity')}</a>
          <a href="#certifications" className="transition-colors">{t('nav.certifications')}</a>
          <a href="#contact" className="transition-colors">{t('nav.contact')}</a>
        </div>

        {/* Controls: Language, Theme, Mobile Menu */}
        <div className="flex items-center gap-4">
          
          {/* Language Toggle */}
          <button 
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-white/70 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all text-xs font-bold shadow-sm ${navScrolled ? 'border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white' : 'border-white/20 text-slate-800 dark:text-white'}`}
            title="Change Language / 切换语言"
          >
            <GlobeIcon />
            <span>{lang === 'en' ? '中文' : 'EN'}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full border bg-white/70 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all shadow-sm ${navScrolled ? 'border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white' : 'border-white/20 text-slate-800 dark:text-white'}`}
            title="Toggle Theme"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            className={`p-2 lg:hidden rounded-lg hover:bg-slate-100/10 transition-colors ${navScrolled ? 'text-slate-800 dark:text-white' : 'text-white dark:text-white'}`}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4 text-sm font-bold">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200/50 dark:border-slate-800">{t('nav.home')}</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200/50 dark:border-slate-800">{t('nav.about')}</a>
              <a href="#products" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200/50 dark:border-slate-800">{t('nav.products')}</a>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200/50 dark:border-slate-800">{t('nav.gallery')}</a>
              <a href="#capacity" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200/50 dark:border-slate-800">{t('nav.capacity')}</a>
              <a href="#certifications" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200/50 dark:border-slate-800">{t('nav.certifications')}</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2">{t('nav.contact')}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
