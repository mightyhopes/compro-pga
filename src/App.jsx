import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from './i18n/translations';

// SVG Icons to avoid Lucide dependency resolution issues in sandbox
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6v7z"/><path d="m9 12 2 2 4-4"/></svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
);

// Count-Up Component using React hooks
const Counter = ({ target, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const end = parseInt(target, 10);
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
};

// Intersection Observer Hook for custom scroll animation
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
};

export default function App() {
  const [lang, setLang] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProductTab, setActiveProductTab] = useState('drawcord');
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [inquirySent, setInquirySent] = useState(false);

  // Translation helper
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value;
  };

  // Handle scroll events for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavScrolled(true);
      } else {
        setNavScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync Dark/Light theme class to html element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Form submission handler
  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      e.target.reset();
    }, 5000);
  };

  // Section references for fade-in animations
  const [aboutRef, aboutVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [productsRef, productsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [capacityRef, capacityVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [certsRef, certsVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [contactRef, contactVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-pga-dark text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300 font-sans`}>
      
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navScrolled ? 'glass shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Corporate Logo */}
          <a href="#home" className="flex items-center gap-2">
            <span className="h-10 w-10 rounded-lg bg-pga-blue flex items-center justify-center text-white font-extrabold text-xl shadow-lg border border-white/20">
              PGA
            </span>
            <div className="flex flex-col">
              <span className="font-outfit font-bold text-lg leading-tight tracking-tight text-pga-blue dark:text-white">
                PT. Perfect Garment
              </span>
              <span className="text-[10px] tracking-widest text-pga-gray uppercase leading-none font-bold">
                Accessories
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <a href="#home" className="hover:text-pga-blue dark:hover:text-pga-blue-light transition-colors">{t('nav.home')}</a>
            <a href="#about" className="hover:text-pga-blue dark:hover:text-pga-blue-light transition-colors">{t('nav.about')}</a>
            <a href="#products" className="hover:text-pga-blue dark:hover:text-pga-blue-light transition-colors">{t('nav.products')}</a>
            <a href="#capacity" className="hover:text-pga-blue dark:hover:text-pga-blue-light transition-colors">{t('nav.capacity')}</a>
            <a href="#certifications" className="hover:text-pga-blue dark:hover:text-pga-blue-light transition-colors">{t('nav.certifications')}</a>
            <a href="#contact" className="hover:text-pga-blue dark:hover:text-pga-blue-light transition-colors">{t('nav.contact')}</a>
          </div>

          {/* Controls: Language, Theme, Mobile Menu */}
          <div className="flex items-center gap-4">
            
            {/* Language Toggle */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all text-xs font-bold shadow-sm"
              title="Change Language / 切换语言"
            >
              <GlobeIcon />
              <span>{lang === 'en' ? '中文' : 'EN'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all shadow-sm"
              title="Toggle Theme"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
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
              className="md:hidden glass border-t border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4 text-sm font-semibold">
                <a href="#home" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200/50 dark:border-slate-800/50">{t('nav.home')}</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200/50 dark:border-slate-800/50">{t('nav.about')}</a>
                <a href="#products" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200/50 dark:border-slate-800/50">{t('nav.products')}</a>
                <a href="#capacity" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200/50 dark:border-slate-800/50">{t('nav.capacity')}</a>
                <a href="#certifications" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200/50 dark:border-slate-800/50">{t('nav.certifications')}</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2">{t('nav.contact')}</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-pga-dark dark:via-slate-900 dark:to-slate-950">
        
        {/* Decorative Blurred Orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-pga-blue/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-pga-teal/10 rounded-full blur-[100px] animate-pulse-slow"></div>

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
          
          {/* Left: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="px-4 py-1.5 rounded-full bg-pga-blue-light dark:bg-pga-blue/20 text-pga-blue dark:text-pga-blue-light text-xs font-bold tracking-wider uppercase mb-6 inline-block">
              {t('hero.subtitle')}
            </span>
            <h1 className="font-outfit font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 font-semibold max-w-2xl border-l-4 border-pga-blue pl-4 mb-8 italic">
              "{t('hero.slogan')}"
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="#products" className="px-8 py-4 bg-pga-blue hover:bg-pga-blue-hover text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-pga-blue/25 hover:translate-y-[-2px] transition-all">
                <span>{t('hero.exploreBtn')}</span>
                <ArrowRightIcon />
              </a>
              <a href="#contact" className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-all hover:translate-y-[-2px]">
                <span>{t('hero.contactBtn')}</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-300/50 dark:border-slate-700/50 w-full max-w-md">
              <div>
                <div className="text-2xl font-bold text-pga-blue dark:text-white">2018</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Est. Year</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pga-blue dark:text-white">120+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Machines</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pga-blue dark:text-white">150k+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">YDS/Day</div>
              </div>
            </div>

          </div>

          {/* Right: Immersive Cover Frame */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[400px] aspect-[1/1.4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 transform rotate-1 hover:rotate-0 transition-transform duration-500 group">
              <img 
                src="/assets/page_1_part_1.png" 
                alt="PGA Company Profile Cover" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold text-pga-gray uppercase tracking-widest mb-1">Company Profile</span>
                <span className="font-outfit font-extrabold text-xl">PT. Perfect Garment Accessories</span>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-pga-teal rounded-lg -z-10 shadow-lg transform -rotate-12"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-pga-blue rounded-full -z-10 shadow-lg opacity-50 blur-md"></div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60">
          <span className="text-[10px] tracking-widest font-bold uppercase">Scroll Down</span>
          <div className="w-5 h-8 border-2 border-slate-800 dark:border-white rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-slate-800 dark:bg-white rounded-full"
            />
          </div>
        </div>

      </header>

      {/* About Us Section */}
      <section id="about" ref={aboutRef} className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className={`fade-in-section ${aboutVisible ? 'is-visible' : ''} grid grid-cols-1 lg:grid-cols-12 gap-16 items-center`}>
            
            {/* Left Column: Visual Stack */}
            <div className="lg:col-span-5 grid grid-cols-12 gap-4 relative">
              <div className="col-span-12 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 aspect-[1.6/1]">
                <img 
                  src="/assets/page_3_part_3.png" 
                  alt="PGA Factory Exterior" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="col-span-7 col-start-6 -mt-16 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-900 aspect-[1.2/1] relative z-10 bg-slate-200 dark:bg-slate-800">
                <img 
                  src="/assets/page_4_part_2.png" 
                  alt="PGA Factory Interior" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="absolute left-4 bottom-4 bg-pga-blue text-white px-6 py-4 rounded-xl shadow-lg z-20">
                <div className="text-3xl font-extrabold font-outfit">2018</div>
                <div className="text-xs font-semibold tracking-wider text-pga-gray/80 uppercase">{t('about.estYear')}</div>
              </div>
            </div>

            {/* Right Column: About Details */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="text-sm font-bold text-pga-blue dark:text-pga-blue-light uppercase tracking-wider mb-2">
                {t('about.title')}
              </span>
              <h2 className="font-outfit font-extrabold text-3xl sm:text-4xl mb-6">
                {t('about.subtitle')}
              </h2>
              
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {t('about.p1')}
              </p>
              
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                {t('about.p2')}
              </p>

              <div className="w-full bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 mb-8">
                <div className="text-pga-blue dark:text-pga-blue-light font-outfit font-bold text-lg mb-2">
                  {t('about.tagline')}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-2">
                  <MapPinIcon />
                  <span>{t('about.location')}</span>
                </div>
              </div>

              {/* Vision & Mission Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                
                {/* Vision Card */}
                <div className="glass-card p-6 rounded-2xl flex flex-col items-start shadow-sm border border-slate-100 dark:border-slate-800">
                  <span className="p-3 bg-pga-blue-light dark:bg-pga-blue/20 text-pga-blue dark:text-pga-blue-light rounded-xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  </span>
                  <h3 className="font-outfit font-bold text-lg mb-2">{t('about.visionTitle')}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('about.visionDesc')}</p>
                </div>

                {/* Mission Card */}
                <div className="glass-card p-6 rounded-2xl flex flex-col items-start shadow-sm border border-slate-100 dark:border-slate-800">
                  <span className="p-3 bg-pga-blue-light dark:bg-pga-blue/20 text-pga-blue dark:text-pga-blue-light rounded-xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                  </span>
                  <h3 className="font-outfit font-bold text-lg mb-2">{t('about.missionTitle')}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('about.missionDesc')}</p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section id="products" ref={productsRef} className="py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className={`fade-in-section ${productsVisible ? 'is-visible' : ''} text-center max-w-3xl mx-auto mb-16`}>
            <span className="text-sm font-bold text-pga-blue dark:text-pga-blue-light uppercase tracking-wider mb-2 block">
              {t('products.title')}
            </span>
            <h2 className="font-outfit font-extrabold text-3xl sm:text-4xl mb-4">
              {t('products.subtitle')}
            </h2>
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
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-100 dark:border-slate-800/80">
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
                <div className="lg:col-span-7 flex flex-col items-start">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-3 w-3 rounded-full bg-pga-blue"></span>
                    <h3 className="font-outfit font-extrabold text-2xl lg:text-3xl">
                      {t(`products.${activeProductTab}.title`)}
                    </h3>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 text-base">
                    {t(`products.${activeProductTab}.desc`)}
                  </p>

                  <h4 className="font-bold text-sm text-pga-gray uppercase tracking-widest mb-4">Key Specifications & Options</h4>
                  <ul className="space-y-3.5 mb-8">
                    {translations[lang].products[activeProductTab].features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-medium">
                        <span className="h-5 w-5 bg-pga-blue-light dark:bg-pga-blue/20 text-pga-blue dark:text-pga-blue-light rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckIcon />
                        </span>
                        <span className="text-slate-700 dark:text-slate-200">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="#contact" className="px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2">
                    <span>Request Custom Quote & Samples</span>
                    <ArrowRightIcon />
                  </a>
                </div>

                {/* Product Image Stack */}
                <div className="lg:col-span-5 grid grid-cols-1 gap-4">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg aspect-[1.1/1] relative bg-slate-100 dark:bg-slate-950 group">
                    <img 
                      src={
                        activeProductTab === 'drawcord' ? '/assets/page_6_part_1.png' :
                        activeProductTab === 'tape' ? '/assets/page_7_part_1.png' :
                        activeProductTab === 'elastic' ? '/assets/page_10_part_2.png' :
                        '/assets/page_11_part_1.png'
                      } 
                      alt={t(`products.${activeProductTab}.title`)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-xs font-bold bg-pga-blue/80 px-3 py-1 rounded-full backdrop-blur-sm">Product Catalogue Image</span>
                    </div>
                  </div>

                  {/* Secondary Context Image/Showcase */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-850 shadow-sm aspect-video bg-slate-200 dark:bg-slate-800">
                      <img 
                        src={
                          activeProductTab === 'drawcord' ? '/assets/page_6_part_1.png' :
                          activeProductTab === 'tape' ? '/assets/page_8_part_1.png' :
                          activeProductTab === 'elastic' ? '/assets/page_9_part_1.png' :
                          '/assets/page_12_part_1.png'
                        } 
                        alt="Application Sample 1" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-850 shadow-sm aspect-video bg-slate-200 dark:bg-slate-800 flex items-center justify-center p-4 text-center">
                      <div>
                        <div className="text-xs font-extrabold text-pga-blue dark:text-pga-blue-light uppercase tracking-wider">Premium Grade</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">100% Tested Quality</div>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Applications Banner */}
          <div className="mt-16 bg-gradient-to-r from-pga-blue/5 to-pga-teal/5 dark:from-pga-blue/10 dark:to-pga-teal/10 rounded-3xl p-8 border border-slate-200/50 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <h4 className="font-outfit font-extrabold text-xl mb-2">{t('products.appShowcase')}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-350">{t('products.appDesc')}</p>
            </div>
            <div className="md:col-span-4 flex justify-end gap-3 flex-wrap">
              <span className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold shadow-sm">Hoodies & Jackets</span>
              <span className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold shadow-sm">Sportswear</span>
              <span className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold shadow-sm">Underwear & Masks</span>
              <span className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold shadow-sm">Bags & Luggage</span>
            </div>
          </div>

        </div>
      </section>

      {/* Production Capacity Section */}
      <section id="capacity" ref={capacityRef} className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        
        {/* Parallax-like background elements */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
          <img 
            src="/assets/page_15_part_2.png" 
            alt="Factory floor background" 
            className="w-full h-full object-cover filter blur-[2px]" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-900 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: Text Info & Machinery statistics */}
            <div className={`lg:col-span-7 flex flex-col items-start fade-in-section ${capacityVisible ? 'is-visible' : ''}`}>
              <span className="text-sm font-bold text-pga-blue dark:text-pga-blue-light uppercase tracking-wider mb-2">
                {t('capacity.title')}
              </span>
              <h2 className="font-outfit font-extrabold text-3xl sm:text-4xl mb-6">
                {t('capacity.subtitle')}
              </h2>
              <p className="text-slate-600 dark:text-slate-350 leading-relaxed mb-8 max-w-xl">
                {t('capacity.desc')}
              </p>

              {/* Grid of machines stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-8">
                
                {/* Drawcord Card */}
                <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-md">
                  <div className="text-3xl font-extrabold font-outfit text-pga-blue dark:text-white flex items-baseline gap-1">
                    <Counter target="89" />
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">{t('capacity.stats.drawcord.label')}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{t('capacity.stats.drawcord.desc')}</div>
                  
                  <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/50">
                    <div className="text-[10px] uppercase font-bold text-pga-gray tracking-wider">{t('capacity.stats.dailyYield')}</div>
                    <div className="text-sm font-extrabold text-pga-teal mt-0.5">75,000 YDS</div>
                  </div>
                </div>

                {/* Elastic Card */}
                <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-md">
                  <div className="text-3xl font-extrabold font-outfit text-pga-blue dark:text-white">
                    <Counter target="27" />
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">{t('capacity.stats.elastic.label')}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{t('capacity.stats.elastic.desc')}</div>
                  
                  <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/50">
                    <div className="text-[10px] uppercase font-bold text-pga-gray tracking-wider">{t('capacity.stats.dailyYield')}</div>
                    <div className="text-sm font-extrabold text-pga-teal mt-0.5">50,000 YDS</div>
                  </div>
                </div>

                {/* Herringbone Card */}
                <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-md">
                  <div className="text-3xl font-extrabold font-outfit text-pga-blue dark:text-white">
                    <Counter target="7" />
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">{t('capacity.stats.herringbone.label')}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{t('capacity.stats.herringbone.desc')}</div>
                  
                  <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/50">
                    <div className="text-[10px] uppercase font-bold text-pga-gray tracking-wider">{t('capacity.stats.dailyYield')}</div>
                    <div className="text-sm font-extrabold text-pga-teal mt-0.5">30,000 YDS</div>
                  </div>
                </div>

              </div>

            </div>

            {/* Right: Immersive images of factory machines */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg aspect-[1/1.2] relative bg-slate-100 dark:bg-slate-950">
                <img 
                  src="/assets/page_14_part_1.png" 
                  alt="Specialized Machinery Detailing" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg aspect-[1/1.2] relative bg-slate-100 dark:bg-slate-950 flex flex-col justify-between">
                <img 
                  src="/assets/page_16_part_2.png" 
                  alt="Weaving Machinery Floor" 
                  className="w-full h-5/6 object-cover hover:scale-105 transition-transform duration-500" 
                />
                <div className="bg-slate-900 text-white p-3 text-center text-xs font-bold tracking-widest uppercase">
                  100% Active Production
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Partners & Certifications */}
      <section id="certifications" ref={certsRef} className="py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className={`fade-in-section ${certsVisible ? 'is-visible' : ''} text-center max-w-3xl mx-auto mb-20`}>
            <span className="text-sm font-bold text-pga-blue dark:text-pga-blue-light uppercase tracking-wider mb-2 block">
              {t('certs.title')}
            </span>
            <h2 className="font-outfit font-extrabold text-3xl sm:text-4xl mb-4">
              {t('certs.subtitle')}
            </h2>
            <div className="h-1.5 w-24 bg-pga-blue mx-auto rounded-full"></div>
          </div>

          {/* Row 1: Valued Partner Card */}
          <div className="mb-16 bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-100 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Logo frame */}
            <div className="md:col-span-4 flex justify-center bg-slate-50 dark:bg-slate-950 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800 relative group overflow-hidden">
              <img 
                src="/assets/page_17_part_1.png" 
                alt="H&M Logo Card" 
                className="max-h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-pga-teal font-extrabold tracking-wider bg-pga-teal/10 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-pga-teal rounded-full animate-ping"></span>
                <span>AUDITED</span>
              </div>
            </div>

            {/* Content text */}
            <div className="md:col-span-8 flex flex-col items-start">
              <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-[10px] font-bold tracking-widest uppercase mb-3 inline-block">
                {t('partner.title')}
              </span>
              <h3 className="font-outfit font-extrabold text-xl lg:text-2xl mb-3">
                {t('partner.subtitle')}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                {t('partner.hmDesc')}
              </p>
            </div>

          </div>

          {/* Row 2: Grid of Certificates (GRS, OEKO-TEX, SLF) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* GRS Certificate */}
            <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col justify-between items-start hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 bg-white">
              <div>
                <span className="p-4 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 rounded-2xl mb-6 inline-block">
                  <ShieldCheckIcon />
                </span>
                <h3 className="font-outfit font-extrabold text-lg mb-3">{t('certs.grsTitle')}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {t('certs.grsDesc')}
                </p>
              </div>
              <button 
                onClick={() => setSelectedCertificate('grs')}
                className="text-xs font-bold text-pga-blue dark:text-pga-blue-light hover:underline flex items-center gap-1 mt-auto"
              >
                <span>{t('certs.viewCert')}</span>
                <ArrowRightIcon />
              </button>
            </div>

            {/* OEKO-TEX Certificate */}
            <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col justify-between items-start hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 bg-white">
              <div>
                <span className="p-4 bg-pga-blue-light dark:bg-pga-blue/20 text-pga-blue dark:text-pga-blue-light rounded-2xl mb-6 inline-block">
                  <ShieldCheckIcon />
                </span>
                <h3 className="font-outfit font-extrabold text-lg mb-3">{t('certs.oekoTitle')}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {t('certs.oekoDesc')}
                </p>
              </div>
              <button 
                onClick={() => setSelectedCertificate('oeko')}
                className="text-xs font-bold text-pga-blue dark:text-pga-blue-light hover:underline flex items-center gap-1 mt-auto"
              >
                <span>{t('certs.viewCert')}</span>
                <ArrowRightIcon />
              </button>
            </div>

            {/* SLF Certificate */}
            <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col justify-between items-start hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 bg-white">
              <div>
                <span className="p-4 bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 rounded-2xl mb-6 inline-block">
                  <ShieldCheckIcon />
                </span>
                <h3 className="font-outfit font-extrabold text-lg mb-3">{t('certs.slfTitle')}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {t('certs.slfDesc')}
                </p>
              </div>
              <button 
                onClick={() => setSelectedCertificate('slf')}
                className="text-xs font-bold text-pga-blue dark:text-pga-blue-light hover:underline flex items-center gap-1 mt-auto"
              >
                <span>{t('certs.viewCert')}</span>
                <ArrowRightIcon />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" ref={contactRef} className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className={`fade-in-section ${contactVisible ? 'is-visible' : ''} grid grid-cols-1 lg:grid-cols-12 gap-16`}>
            
            {/* Left Column: Contact Cards & QR */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <span className="text-sm font-bold text-pga-blue dark:text-pga-blue-light uppercase tracking-wider mb-2">
                {t('contact.title')}
              </span>
              <h2 className="font-outfit font-extrabold text-3xl sm:text-4xl mb-6">
                {t('contact.subtitle')}
              </h2>
              
              <div className="space-y-6 w-full mb-8">
                
                {/* Address Card */}
                <div className="flex gap-4">
                  <span className="h-10 w-10 bg-pga-blue-light dark:bg-pga-blue/20 text-pga-blue dark:text-pga-blue-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPinIcon />
                  </span>
                  <div>
                    <h4 className="font-bold text-xs uppercase text-pga-gray tracking-wider mb-1">{t('contact.addressLabel')}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm">
                      {t('contact.addressVal')}
                    </p>
                  </div>
                </div>

                {/* Telephone Card */}
                <div className="flex gap-4">
                  <span className="h-10 w-10 bg-pga-blue-light dark:bg-pga-blue/20 text-pga-blue dark:text-pga-blue-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <PhoneIcon />
                  </span>
                  <div>
                    <h4 className="font-bold text-xs uppercase text-pga-gray tracking-wider mb-1">{t('contact.phoneLabel')}</h4>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">
                      0233-3602024
                    </p>
                  </div>
                </div>

                {/* Contact Persons Cards */}
                <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-6 w-full">
                  <h4 className="font-bold text-xs uppercase text-pga-gray tracking-wider mb-3">{t('contact.contactPersons')}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Welly */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-750">
                      <div className="font-bold text-sm">Welly</div>
                      <a href="tel:081298313588" className="text-xs text-pga-blue dark:text-pga-blue-light hover:underline block mt-1">081298313588</a>
                      <a href="mailto:welly@dingxingtrims.com" className="text-[10px] text-slate-500 dark:text-slate-450 hover:underline block mt-0.5">welly@dingxingtrims.com</a>
                    </div>

                    {/* Wang Jianrong */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-750">
                      <div className="font-bold text-sm">Wang Jianrong</div>
                      <a href="tel:087808235700" className="text-xs text-pga-blue dark:text-pga-blue-light hover:underline block mt-1">087808235700</a>
                      <a href="mailto:jianrong@dingxingtrims.com" className="text-[10px] text-slate-500 dark:text-slate-450 hover:underline block mt-0.5">jianrong@dingxingtrims.com</a>
                    </div>

                  </div>
                </div>

              </div>

              {/* QR Code Scan Frame */}
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-850 flex items-center gap-6 w-full max-w-sm shadow-sm relative overflow-hidden group">
                <div className="w-24 h-24 bg-white p-1 rounded-lg border border-slate-200 overflow-hidden flex-shrink-0">
                  {/* Cropped QR Code from image 19 */}
                  <img src="/assets/page_19_part_2.png" alt="WeChat QR Code" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-outfit font-extrabold text-sm mb-1">{t('contact.wechatQR')}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-405 leading-relaxed">
                    Scan our WeChat QR code to connect directly with our sales team for instant support.
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-2 h-full bg-pga-blue"></div>
              </div>

            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-8 lg:p-10 shadow-xl border border-slate-200/50 dark:border-slate-800/80">
                <h3 className="font-outfit font-extrabold text-xl lg:text-2xl mb-6">{t('contact.formTitle')}</h3>
                
                <form onSubmit={handleInquirySubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        {t('contact.formName')}
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        required 
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-pga-blue dark:focus:ring-pga-blue-light transition-all text-sm" 
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        {t('contact.formEmail')}
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        required 
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-pga-blue dark:focus:ring-pga-blue-light transition-all text-sm" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      {t('contact.formMsg')}
                    </label>
                    <textarea 
                      id="message" 
                      rows="5" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-pga-blue dark:focus:ring-pga-blue-light transition-all text-sm"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4 bg-pga-blue hover:bg-pga-blue-hover text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-pga-blue/20 flex items-center justify-center gap-2"
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
                        className="p-4 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-250 dark:border-emerald-900/50 rounded-xl text-xs font-medium"
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

      {/* Corporate Footer */}
      <footer className="bg-slate-900 text-slate-450 border-t border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-9 w-9 rounded-lg bg-pga-blue flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
                PGA
              </span>
              <span className="font-outfit font-bold text-lg text-white">PT. Perfect Garment Accessories</span>
            </div>
            <p className="text-xs text-slate-400 mb-6 max-w-sm italic">
              "{t('hero.slogan')}"
            </p>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              © {new Date().getFullYear()} PT. PGA. All Rights Reserved.
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3">
            <h4 className="text-white font-outfit font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2.5 text-xs font-medium">
              <a href="#home" className="hover:text-white transition-colors">{t('nav.home')}</a>
              <a href="#about" className="hover:text-white transition-colors">{t('nav.about')}</a>
              <a href="#products" className="hover:text-white transition-colors">{t('nav.products')}</a>
              <a href="#capacity" className="hover:text-white transition-colors">{t('nav.capacity')}</a>
              <a href="#certifications" className="hover:text-white transition-colors">{t('nav.certifications')}</a>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-4">
            <h4 className="text-white font-outfit font-bold text-sm uppercase tracking-wider mb-4">Sumedang Factory</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {t('contact.addressVal')}
            </p>
            <div className="text-xs font-semibold text-white flex items-center gap-2">
              <PhoneIcon />
              <span>0233-3602024</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Full-Screen Certificate Modal Viewer */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
              
              {/* Header */}
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950 text-white">
                <span className="font-outfit font-extrabold text-sm uppercase tracking-wider">
                  {selectedCertificate === 'grs' ? t('certs.grsTitle') :
                   selectedCertificate === 'oeko' ? t('certs.oekoTitle') :
                   t('certs.slfTitle')}
                </span>
                <button 
                  onClick={() => setSelectedCertificate(null)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Image Body */}
              <div className="flex-1 overflow-auto p-6 flex justify-center bg-slate-950">
                <img 
                  src="/assets/page_18_part_1.png" 
                  alt="Certificate Details Document" 
                  className="max-w-full h-auto object-contain max-h-[70vh] rounded-md shadow-lg" 
                />
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-900 text-center text-xs text-slate-400">
                Document Preview Page (Page 18) - PT. Perfect Garment Accessories
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
