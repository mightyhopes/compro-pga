import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from './i18n/translations';

// SVG Icons to guarantee compile safety and self-contained styling
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

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
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

const ZoomInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
);

// Count-Up Component
const Counter = ({ target, duration = 1.5 }) => {
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

// Intersection Observer Hook
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const node = elementRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
};

// Image component with Skeleton Loader
const ImageWithSkeleton = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
      )}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
      />
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProductTab, setActiveProductTab] = useState('drawcord');
  const [selectedCertificate, setSelectedCertificate] = useState(null); // { type: 'grs'|'oeko'|'slf', page: 1 }
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);
  const [inquirySent, setInquirySent] = useState(false);
  
  // Modal image loading helper to avoid layout shift
  const [certImageLoading, setCertImageLoading] = useState(true);

  // Hero slideshow (using clean machinery/factory floor images)
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  const heroSlides = [
    '/assets/products/whatsapp_2.webp',
    '/assets/products/whatsapp_1.webp',
    '/assets/details/detail_1.webp',
  ];

  // Gallery filter state
  const [galleryFilter, setGalleryFilter] = useState('product');

  // Translation helper
  const t = (key, replaceObj = {}) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    let valueStr = String(value);
    Object.keys(replaceObj).forEach(varKey => {
      valueStr = valueStr.replace(`{{${varKey}}}`, replaceObj[varKey]);
    });
    return valueStr;
  };

  // Hero slideshow interval
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Handle scroll events for navbar glassmorphism
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

  // Section references for fade-in scroll animations
  const [aboutRef, aboutVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [productsRef, productsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [galleryRef, galleryVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [capacityRef, capacityVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [certsRef, certsVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [contactRef, contactVisible] = useIntersectionObserver({ threshold: 0.1 });

  // Consolidate gallery assets with correct filters and labels
  const galleryItems = [
    // Products (Cleaned paths matching verified filesystem content)
    { id: 'p1', path: '/assets/products/drawcord.webp', type: 'product', tag: 'Drawcords' },
    { id: 'p2', path: '/assets/products/drawcord_metal.webp', type: 'product', tag: 'Metal Tipped Cords' },
    { id: 'p3', path: '/assets/products/drawcord_plastic.webp', type: 'product', tag: 'Plastic Tipped Cords' },
    { id: 'p4', path: '/assets/factory/factory_5.webp', type: 'product', tag: 'Purple Cords' },
    { id: 'p5', path: '/assets/products/elastic_band.webp', type: 'product', tag: 'Elastic Bands' },
    { id: 'p6', path: '/assets/products/elastic_woven.webp', type: 'product', tag: 'Woven Elastics' },
    { id: 'p7', path: '/assets/factory/factory_7.webp', type: 'product', tag: 'Elastic Spools' },
    { id: 'p8', path: '/assets/factory/factory_9.webp', type: 'product', tag: 'Buttonhole Elastics' },
    { id: 'p9', path: '/assets/factory/factory_1.webp', type: 'product', tag: 'Blue Ribbon Tapes' },
    { id: 'p10', path: '/assets/factory/factory_3.webp', type: 'product', tag: 'Checkerboard Tapes' },
    { id: 'p11', path: '/assets/details/detail_5.webp', type: 'product', tag: 'Cotton Webbings' },
    { id: 'p12', path: '/assets/details/detail_6.webp', type: 'product', tag: 'Herringbone Tapes' },
    { id: 'p13', path: '/assets/details/detail_9.webp', type: 'product', tag: 'Striped Tapes' },
    // Machinery & Factory Floor (ONLY valid photos)
    { id: 'm1', path: '/assets/products/whatsapp_1.webp', type: 'factory', tag: 'Braiding Winder' },
    { id: 'm2', path: '/assets/products/whatsapp_2.webp', type: 'factory', tag: 'Needle Loom Room' },
    { id: 'm3', path: '/assets/products/whatsapp_3.webp', type: 'factory', tag: 'Weaving Loom Close-up' },
    { id: 'm4', path: '/assets/products/whatsapp_4.webp', type: 'factory', tag: 'Knitting Loom' },
    { id: 'm5', path: '/assets/details/detail_1.webp', type: 'factory', tag: 'Weaving Factory Hall' },
    { id: 'm6', path: '/assets/details/detail_20.webp', type: 'factory', tag: 'CNC Control Unit' },
    { id: 'm7', path: '/assets/details/detail_21.webp', type: 'factory', tag: 'Active Looms Line' },
    { id: 'm8', path: '/assets/details/detail_22.webp', type: 'factory', tag: 'Finished Goods Warehouse' },
    { id: 'm9', path: '/assets/details/detail_23.webp', type: 'factory', tag: 'Spool Braider unit' },
    { id: 'm10', path: '/assets/details/detail_24.webp', type: 'factory', tag: 'High Speed Braiders' },
  ];

  // Filtered gallery items
  const filteredGalleryItems = galleryItems.filter(item => item.type === galleryFilter);

  // Certificate total pages
  const certSpecs = {
    grs: { total: 3, base: '/assets/certs/grs_page_' },
    oeko: { total: 1, base: '/assets/certs/oeko_page_' },
    slf: { total: 3, base: '/assets/certs/slf_page_' },
  };

  const handleCertPageNav = (direction) => {
    if (!selectedCertificate) return;
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

  // Dynamic contrast classes for Navbar items based on scroll and dark theme
  const navbarTextColor = navScrolled
    ? "text-slate-800 hover:text-pga-blue dark:text-slate-100 dark:hover:text-pga-blue-light"
    : "text-white hover:text-slate-300 dark:text-slate-100 dark:hover:text-slate-350";

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-pga-dark text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300 font-sans`}>
      
      {/* Navigation Bar */}
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-white/70 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all text-xs font-bold shadow-sm ${navScrolled ? 'border-slate-350 dark:border-slate-700 text-slate-800 dark:text-white' : 'border-white/20 text-slate-800 dark:text-white'}`}
              title="Change Language / 切换语言"
            >
              <GlobeIcon />
              <span>{lang === 'en' ? '中文' : 'EN'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full border bg-white/70 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all shadow-sm ${navScrolled ? 'border-slate-350 dark:border-slate-700 text-slate-800 dark:text-white' : 'border-white/20 text-slate-800 dark:text-white'}`}
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
                <a href="#home" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200/50 dark:border-slate-850">{t('nav.home')}</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200/50 dark:border-slate-850">{t('nav.about')}</a>
                <a href="#products" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200/50 dark:border-slate-850">{t('nav.products')}</a>
                <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200/50 dark:border-slate-850">{t('nav.gallery')}</a>
                <a href="#capacity" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200/50 dark:border-slate-850">{t('nav.capacity')}</a>
                <a href="#certifications" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200/50 dark:border-slate-850">{t('nav.certifications')}</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2">{t('nav.contact')}</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section with Interactive Slideshow */}
      <header id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden scroll-mt-24">
        
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
            <span className="px-4 py-1.5 rounded-full bg-pga-blue/30 text-pga-blue-light border border-pga-blue/45 text-xs font-bold tracking-wider uppercase mb-6 inline-block backdrop-blur-md">
              {t('hero.subtitle')}
            </span>
            <h1 className="font-outfit font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] mb-6 drop-shadow-md">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-slate-200 font-semibold max-w-2xl border-l-4 border-pga-blue pl-4 mb-8 italic">
              "{t('hero.slogan')}"
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="#products" className="px-8 py-4 bg-pga-blue hover:bg-pga-blue-hover text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-pga-blue/25 hover:translate-y-[-2px] transition-all">
                <span>{t('hero.exploreBtn')}</span>
                <ArrowRightIcon />
              </a>
              <a href="#contact" className="px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-all hover:translate-y-[-2px] backdrop-blur-sm">
                <span>{t('hero.contactBtn')}</span>
              </a>
            </div>
          </div>

          {/* Hero Quick Badge Overlay */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
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
          </div>

        </div>

      </header>

      {/* About Us Section */}
      <section id="about" ref={aboutRef} className="py-24 bg-white dark:bg-slate-900 overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className={`fade-in-section ${aboutVisible ? 'is-visible' : ''} grid grid-cols-1 lg:grid-cols-12 gap-16 items-center`}>
            
            {/* Left Column: Visual Stack using Real Factory Assets */}
            <div className="lg:col-span-5 grid grid-cols-12 gap-4 relative">
              <div className="col-span-12 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 aspect-[1.5/1] bg-slate-100 dark:bg-slate-950">
                <ImageWithSkeleton 
                  src="/assets/products/whatsapp_2.webp" 
                  alt="PGA Factory Needle Loom Room" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="col-span-7 col-start-6 -mt-16 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-900 aspect-[1.1/1] relative z-10 bg-slate-200 dark:bg-slate-800">
                <ImageWithSkeleton 
                  src="/assets/details/detail_1.webp" 
                  alt="PGA Active Weaving Machine Floor" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="absolute left-4 bottom-4 bg-pga-blue text-white px-5 py-3.5 rounded-xl shadow-lg z-20">
                <div className="text-3xl font-extrabold font-outfit">2018</div>
                <div className="text-[10px] font-bold tracking-wider text-slate-350 uppercase">{t('about.estYear')}</div>
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
              
              <p className="text-slate-600 dark:text-slate-350 leading-relaxed mb-6">
                {t('about.p1')}
              </p>
              
              <p className="text-slate-600 dark:text-slate-350 leading-relaxed mb-8">
                {t('about.p2')}
              </p>

              <div className="w-full bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 mb-8">
                <div className="text-pga-blue dark:text-pga-blue-light font-outfit font-bold text-lg mb-2">
                  {t('about.tagline')}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
                  <MapPinIcon />
                  <span>{t('about.location')}</span>
                </div>
              </div>

              {/* Vision & Mission Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                
                {/* Vision Card */}
                <div className="glass-card p-6 rounded-2xl flex flex-col items-start shadow-sm border border-slate-200/50 dark:border-slate-800/50">
                  <span className="p-3 bg-pga-blue-light dark:bg-pga-blue/20 text-pga-blue dark:text-pga-blue-light rounded-xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  </span>
                  <h3 className="font-outfit font-bold text-lg mb-2">{t('about.visionTitle')}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('about.visionDesc')}</p>
                </div>

                {/* Mission Card */}
                <div className="glass-card p-6 rounded-2xl flex flex-col items-start shadow-sm border border-slate-200/50 dark:border-slate-800/50">
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
      <section id="products" ref={productsRef} className="py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className={`fade-in-section ${productsVisible ? 'is-visible' : ''} text-center max-w-3xl mx-auto mb-16`}>
            <span className="text-sm font-bold text-pga-blue dark:text-pga-blue-light uppercase tracking-wider mb-2 block">
              {t('products.title')}
            </span>
            <h2 className="font-outfit font-extrabold text-3xl sm:text-4xl mb-4 text-slate-800 dark:text-white">
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

          {/* Tab Content Panel with New Restructured Assets */}
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
                  
                  <p className="text-slate-600 dark:text-slate-350 leading-relaxed mb-8 text-base">
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

                  <a href="#contact" className="px-6 py-3 bg-pga-blue hover:bg-pga-blue-hover text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2">
                    <span>{t('products.inquireBtn')}</span>
                    <ArrowRightIcon />
                  </a>
                </div>

                {/* Product Image Layout adapted to restructured assets */}
                <div className="lg:col-span-6">
                  
                  {activeProductTab === 'drawcord' && (
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                      {/* Main Drawcord image */}
                      <div className="sm:col-span-12 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md aspect-[1.8/1] relative bg-slate-100 dark:bg-slate-950">
                        <ImageWithSkeleton src="/assets/products/drawcord.webp" alt="Drawcords collection" className="w-full h-full object-cover" />
                        <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">Braided Drawcords</span>
                      </div>
                      {/* Metal Ending */}
                      <div className="sm:col-span-6 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-[1.4/1] relative bg-slate-100 dark:bg-slate-950">
                        <ImageWithSkeleton src="/assets/products/drawcord_metal.webp" alt="Drawcord with metal ending" className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">Metal End Tips</span>
                      </div>
                      {/* Clear Plastic Ending */}
                      <div className="sm:col-span-6 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-[1.4/1] relative bg-slate-100 dark:bg-slate-950">
                        <ImageWithSkeleton src="/assets/products/drawcord_plastic.webp" alt="Drawcord with clear plastic ending" className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">Plastic End Tips</span>
                      </div>
                    </div>
                  )}

                  {activeProductTab === 'elastic' && (
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                      {/* Elastic Band */}
                      <div className="sm:col-span-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md aspect-[1/1] relative bg-slate-100 dark:bg-slate-950">
                        <ImageWithSkeleton src="/assets/products/elastic_band.webp" alt="Elastic Band" className="w-full h-full object-cover" />
                        <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-1 rounded-md">Elastic Band Rolls</span>
                      </div>
                      {/* Elastic Woven */}
                      <div className="sm:col-span-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md aspect-[1/1] relative bg-slate-100 dark:bg-slate-950">
                        <ImageWithSkeleton src="/assets/products/elastic_woven.webp" alt="Elastic Woven" className="w-full h-full object-cover" />
                        <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-1 rounded-md">Woven Elastics</span>
                      </div>
                    </div>
                  )}

                  {/* Tape and Herringbone now display correct assets */}
                  {activeProductTab === 'tape' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md aspect-[1.2/1] relative bg-slate-100 dark:bg-slate-950">
                        <ImageWithSkeleton src="/assets/factory/factory_1.webp" alt="Blue ribbon tape" className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">Blue Flat Ribbon</span>
                      </div>
                      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md aspect-[1.2/1] relative bg-slate-100 dark:bg-slate-950">
                        <ImageWithSkeleton src="/assets/factory/factory_3.webp" alt="Checkerboard tape" className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">Checkerboard Ribbon</span>
                      </div>
                      <div className="col-span-2 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-[2.4/1] relative bg-slate-100 dark:bg-slate-950">
                        <ImageWithSkeleton src="/assets/details/detail_9.webp" alt="Striped cotton webbings" className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">Striped Cotton Webbings</span>
                      </div>
                    </div>
                  )}

                  {activeProductTab === 'herringbone' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-[2.4/1] relative bg-slate-100 dark:bg-slate-950">
                        <ImageWithSkeleton src="/assets/details/detail_6.webp" alt="Herringbone twill weave close-up" className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">Herringbone Twill Weave</span>
                      </div>
                      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md aspect-[1.2/1] relative bg-slate-100 dark:bg-slate-950">
                        <ImageWithSkeleton src="/assets/details/detail_7.webp" alt="Beige herringbone V twill pattern" className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">Twill V-Pattern</span>
                      </div>
                      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md aspect-[1.2/1] relative bg-slate-100 dark:bg-slate-950">
                        <ImageWithSkeleton src="/assets/details/detail_5.webp" alt="Multi color narrow webbing spools" className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">Color Spools</span>
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Interactive Media Gallery */}
      <section id="gallery" ref={galleryRef} className="py-24 bg-white dark:bg-slate-900 overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className={`fade-in-section ${galleryVisible ? 'is-visible' : ''} text-center max-w-3xl mx-auto mb-16`}>
            <span className="text-sm font-bold text-pga-blue dark:text-pga-blue-light uppercase tracking-wider mb-2 block">
              {t('gallery.title')}
            </span>
            <h2 className="font-outfit font-extrabold text-3xl sm:text-4xl mb-4 text-slate-800 dark:text-white">
              {t('gallery.subtitle')}
            </h2>
            <div className="h-1.5 w-24 bg-pga-blue mx-auto rounded-full mb-8"></div>
            
            {/* Gallery Filters */}
            <div className="flex justify-center gap-2 flex-wrap">
              <button 
                onClick={() => setGalleryFilter('product')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${galleryFilter === 'product' ? 'bg-pga-blue text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                {t('gallery.filterProducts')}
              </button>
              <button 
                onClick={() => setGalleryFilter('factory')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${galleryFilter === 'factory' ? 'bg-pga-blue text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                {t('gallery.filterFactory')}
              </button>
            </div>
          </div>

          {/* Media Grid (Restructured with correct tags/filters and no broken files) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredGalleryItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedGalleryItem(item)}
                  className="group relative rounded-2xl overflow-hidden shadow-md border border-slate-200/50 dark:border-slate-800 aspect-[1.1/1] cursor-pointer bg-slate-100 dark:bg-slate-950"
                >
                  <ImageWithSkeleton 
                    src={item.path} 
                    alt={item.tag} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <span className="flex items-center gap-2 text-white bg-pga-blue/95 font-bold text-xs px-4 py-2 rounded-xl backdrop-blur-sm shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <ZoomInIcon />
                      <span>{t('gallery.viewDetail')}</span>
                    </span>
                  </div>
                  {/* Tag and type badges */}
                  <span className={`absolute top-3 left-3 text-[9px] font-extrabold px-2 py-0.5 rounded-md text-white uppercase tracking-wider backdrop-blur-sm ${item.type === 'product' ? 'bg-pga-blue/80' : 'bg-pga-teal/80'}`}>
                    {item.type === 'product' ? 'PRODUCT' : 'MACHINERY'}
                  </span>
                  <span className="absolute bottom-3 left-3 text-[10px] text-white font-bold px-2 py-0.5 bg-black/60 rounded-md backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.tag}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Production Capacity Section */}
      <section id="capacity" ref={capacityRef} className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden scroll-mt-24">
        
        {/* Machine image backdrop */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
          <ImageWithSkeleton 
            src="/assets/products/whatsapp_2.webp" 
            alt="Factory production line" 
            className="w-full h-full object-cover filter blur-[1px]" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/95 to-slate-50 dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Machinery Statistics & Counters */}
            <div className={`lg:col-span-7 flex flex-col items-start fade-in-section ${capacityVisible ? 'is-visible' : ''}`}>
              <span className="text-sm font-bold text-pga-blue dark:text-pga-blue-light uppercase tracking-wider mb-2">
                {t('capacity.title')}
              </span>
              <h2 className="font-outfit font-extrabold text-3xl sm:text-4xl mb-6 text-slate-800 dark:text-white">
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

            {/* Right Column: Visual Showcase of Real Machines */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg aspect-[1/1.2] relative bg-slate-100 dark:bg-slate-950">
                <ImageWithSkeleton 
                  src="/assets/products/whatsapp_3.webp" 
                  alt="Industrial needle loom machinery" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg aspect-[1/1.2] relative bg-slate-100 dark:bg-slate-950">
                <ImageWithSkeleton 
                  src="/assets/products/whatsapp_4.webp" 
                  alt="High speed knitting machine" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Partners & Certifications */}
      <section id="certifications" ref={certsRef} className="py-24 bg-white dark:bg-slate-900 overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className={`fade-in-section ${certsVisible ? 'is-visible' : ''} text-center max-w-3xl mx-auto mb-20`}>
            <span className="text-sm font-bold text-pga-blue dark:text-pga-blue-light uppercase tracking-wider mb-2 block">
              {t('certs.title')}
            </span>
            <h2 className="font-outfit font-extrabold text-3xl sm:text-4xl mb-4 text-slate-800 dark:text-white">
              {t('certs.subtitle')}
            </h2>
            <div className="h-1.5 w-24 bg-pga-blue mx-auto rounded-full"></div>
          </div>

          {/* Row 1: H&M Partner Banner with a premium SVG Audited layout card */}
          <div className="mb-16 bg-slate-50 dark:bg-slate-800/20 rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-200/50 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Custom stylized audit portal graphic card */}
            <div className="md:col-span-4 flex flex-col justify-center bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm relative overflow-hidden h-44 text-center">
              <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] text-emerald-500 font-extrabold tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>COMPLIANT</span>
              </div>
              <div className="text-red-650 dark:text-red-500 font-outfit font-black text-4xl italic tracking-tighter mb-1">
                H&M
              </div>
              <div className="text-[10px] font-bold text-slate-655 dark:text-slate-400 uppercase tracking-widest mt-1">
                Approved Supplier
              </div>
              <div className="text-[9px] text-slate-450 dark:text-slate-500 font-semibold mt-4 border-t border-slate-100 dark:border-slate-900 pt-2">
                Facility ID: PGA-ID-2018
              </div>
            </div>

            {/* Content description */}
            <div className="md:col-span-8 flex flex-col items-start">
              <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/40 text-red-650 dark:text-red-350 text-[10px] font-bold tracking-widest uppercase mb-3 inline-block">
                {t('partner.title')}
              </span>
              <h3 className="font-outfit font-extrabold text-xl lg:text-2xl mb-3 text-slate-800 dark:text-white">
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
            <div 
              onClick={() => { setSelectedCertificate({ type: 'grs', page: 1 }); setCertImageLoading(true); }}
              className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 bg-white cursor-pointer group"
            >
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-[1/1.3] relative bg-slate-100 dark:bg-slate-950 mb-4">
                <ImageWithSkeleton src="/assets/certs/grs_page_1.webp" alt={t('certs.grsTitle')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="flex items-center gap-2 text-white bg-pga-blue/90 font-bold text-xs px-4 py-2 rounded-xl backdrop-blur-sm shadow-md">
                    <ZoomInIcon />
                    <span>{t('certs.viewCert')}</span>
                  </span>
                </div>
              </div>
              <h3 className="font-outfit font-extrabold text-base mb-1.5 text-slate-800 dark:text-white group-hover:text-pga-blue transition-colors">{t('certs.grsTitle')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('certs.grsDesc')}
              </p>
            </div>

            {/* OEKO-TEX Certificate */}
            <div 
              onClick={() => { setSelectedCertificate({ type: 'oeko', page: 1 }); setCertImageLoading(true); }}
              className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 bg-white cursor-pointer group"
            >
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-[1/1.3] relative bg-slate-100 dark:bg-slate-950 mb-4">
                <ImageWithSkeleton src="/assets/certs/oeko_page_1.webp" alt={t('certs.oekoTitle')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="flex items-center gap-2 text-white bg-pga-blue/90 font-bold text-xs px-4 py-2 rounded-xl backdrop-blur-sm shadow-md">
                    <ZoomInIcon />
                    <span>{t('certs.viewCert')}</span>
                  </span>
                </div>
              </div>
              <h3 className="font-outfit font-extrabold text-base mb-1.5 text-slate-800 dark:text-white group-hover:text-pga-blue transition-colors">{t('certs.oekoTitle')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('certs.oekoDesc')}
              </p>
            </div>

            {/* SLF Certificate */}
            <div 
              onClick={() => { setSelectedCertificate({ type: 'slf', page: 1 }); setCertImageLoading(true); }}
              className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 bg-white cursor-pointer group"
            >
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-[1/1.3] relative bg-slate-100 dark:bg-slate-950 mb-4">
                <ImageWithSkeleton src="/assets/certs/slf_page_1.webp" alt={t('certs.slfTitle')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="flex items-center gap-2 text-white bg-pga-blue/90 font-bold text-xs px-4 py-2 rounded-xl backdrop-blur-sm shadow-md">
                    <ZoomInIcon />
                    <span>{t('certs.viewCert')}</span>
                  </span>
                </div>
              </div>
              <h3 className="font-outfit font-extrabold text-base mb-1.5 text-slate-800 dark:text-white group-hover:text-pga-blue transition-colors">{t('certs.slfTitle')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('certs.slfDesc')}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" ref={contactRef} className="py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className={`fade-in-section ${contactVisible ? 'is-visible' : ''} grid grid-cols-1 lg:grid-cols-12 gap-16`}>
            
            {/* Left Column: Contact Cards & WeChat QR */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <span className="text-sm font-bold text-pga-blue dark:text-pga-blue-light uppercase tracking-wider mb-2">
                {t('contact.title')}
              </span>
              <h2 className="font-outfit font-extrabold text-3xl sm:text-4xl mb-6 text-slate-800 dark:text-white">
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
                    <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed max-w-sm font-semibold">
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

                {/* Contact Persons */}
                <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-6 w-full">
                  <h4 className="font-bold text-xs uppercase text-pga-gray tracking-wider mb-3">{t('contact.contactPersons')}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Welly */}
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 shadow-sm">
                      <div className="font-bold text-sm text-slate-800 dark:text-white">Welly</div>
                      <a href="tel:081298313588" className="text-xs text-pga-blue dark:text-pga-blue-light hover:underline block mt-1 font-bold">081298313588</a>
                      <a href="mailto:welly@dingxingtrims.com" className="text-[10px] text-slate-500 dark:text-slate-400 hover:underline block mt-0.5">welly@dingxingtrims.com</a>
                    </div>

                    {/* Wang Jianrong */}
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 shadow-sm">
                      <div className="font-bold text-sm text-slate-800 dark:text-white">Wang Jianrong</div>
                      <a href="tel:087808235700" className="text-xs text-pga-blue dark:text-pga-blue-light hover:underline block mt-1 font-bold">087808235700</a>
                      <a href="mailto:jianrong@dingxingtrims.com" className="text-[10px] text-slate-500 dark:text-slate-400 hover:underline block mt-0.5">jianrong@dingxingtrims.com</a>
                    </div>

                  </div>
                </div>

              </div>



            </div>

            {/* Right Column: Inquiry Form with complete customer input fields */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 lg:p-10 shadow-xl border border-slate-200/50 dark:border-slate-700">
                <h3 className="font-outfit font-extrabold text-xl lg:text-2xl mb-6 text-slate-800 dark:text-white">{t('contact.formTitle')}</h3>
                
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
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pga-blue dark:focus:ring-pga-blue-light transition-all text-sm font-semibold" 
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
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pga-blue dark:focus:ring-pga-blue-light transition-all text-sm font-semibold" 
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      {t('contact.formPhone')}
                    </label>
                    <input 
                      type="text" 
                      id="phone" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pga-blue dark:focus:ring-pga-blue-light transition-all text-sm font-semibold" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      {t('contact.formMsg')}
                    </label>
                    <textarea 
                      id="message" 
                      rows="5" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pga-blue dark:focus:ring-pga-blue-light transition-all text-sm font-semibold"
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
                        className="p-4 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-250 dark:border-emerald-900/50 rounded-xl text-xs font-semibold"
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
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-white overflow-hidden p-1.5 flex items-center justify-center">
                <img src="/assets/logo.webp" alt="PT. PGA Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-outfit font-bold text-lg text-white">PT. Perfect Garment Accessories</span>
            </div>
            <p className="text-xs text-slate-500 mb-6 max-w-sm italic">
              "{t('hero.slogan')}"
            </p>
            <div className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
              © {new Date().getFullYear()} PT. Perfect Garment Accessories. All Rights Reserved.
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3">
            <h4 className="text-white font-outfit font-bold text-sm uppercase tracking-wider mb-4">{t('contact.quickLinks')}</h4>
            <div className="flex flex-col gap-2.5 text-xs font-semibold">
              <a href="#home" className="hover:text-white transition-colors">{t('nav.home')}</a>
              <a href="#about" className="hover:text-white transition-colors">{t('nav.about')}</a>
              <a href="#products" className="hover:text-white transition-colors">{t('nav.products')}</a>
              <a href="#gallery" className="hover:text-white transition-colors">{t('nav.gallery')}</a>
              <a href="#capacity" className="hover:text-white transition-colors">{t('nav.capacity')}</a>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-4">
            <h4 className="text-white font-outfit font-bold text-sm uppercase tracking-wider mb-4">{t('contact.sumedangFactory')}</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              {t('contact.addressVal')}
            </p>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <PhoneIcon />
              <span>0233-3602024</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Paginated Certificate Modal Lightbox (Reworked to prevent layout shift) */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-3xl h-[85vh] bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
              
              {/* Header with FIXED Close Button */}
              <div className="p-4 border-b border-slate-800/80 flex justify-between items-center bg-slate-950 text-white z-10">
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

              {/* Document Image Body - Fixed Height Container with Loading Skeleton to avoid layout jumps */}
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
                  className={`max-w-full h-auto max-h-[60vh] object-contain rounded shadow-lg border border-slate-850 transition-opacity duration-300 ${certImageLoading ? 'opacity-0' : 'opacity-100'}`}
                  onLoad={() => setCertImageLoading(false)}
                />

                {/* Left Arrow (Previous) */}
                {certSpecs[selectedCertificate.type].total > 1 && (
                  <button 
                    onClick={() => handleCertPageNav('prev')}
                    className="absolute left-4 p-3 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white border border-slate-800/50 transition-all flex items-center justify-center shadow-lg"
                    title="Previous Page"
                  >
                    <ChevronLeftIcon />
                  </button>
                )}

                {/* Right Arrow (Next) */}
                {certSpecs[selectedCertificate.type].total > 1 && (
                  <button 
                    onClick={() => handleCertPageNav('next')}
                    className="absolute right-4 p-3 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white border border-slate-800/50 transition-all flex items-center justify-center shadow-lg"
                    title="Next Page"
                  >
                    <ChevronRightIcon />
                  </button>
                )}

              </div>

              {/* Footer and Page Navigator */}
              <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-between items-center text-xs text-slate-400">
                <span>PT. Perfect Garment Accessories</span>
                
                {/* Dots indicator for pages */}
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
        )}
      </AnimatePresence>

      {/* Gallery Image Lightbox */}
      <AnimatePresence>
        {selectedGalleryItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedGalleryItem(null)}
          >
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={() => setSelectedGalleryItem(null)}
                  className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors shadow-md border border-white/10"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950">
                <img 
                  src={selectedGalleryItem.path} 
                  alt={selectedGalleryItem.tag} 
                  loading="lazy"
                  className="max-w-full h-auto max-h-[80vh] object-contain rounded shadow-2xl" 
                />
              </div>

              <div className="p-4 bg-slate-900 border-t border-slate-800 text-center text-xs text-slate-400 uppercase tracking-widest font-bold">
                PT. PGA Corporate Gallery Asset - {selectedGalleryItem.tag} ({selectedGalleryItem.type})
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
