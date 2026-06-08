import React, { useState, useEffect } from 'react';
import { translations } from './i18n/translations';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Sections
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Products } from './components/sections/Products';
import { Gallery } from './components/sections/Gallery';
import { Capacity } from './components/sections/Capacity';
import { Certifications } from './components/sections/Certifications';
import { Contact } from './components/sections/Contact';

export default function App() {
  const [lang, setLang] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300 font-sans`}>
      
      <Navbar 
        navScrolled={navScrolled}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        lang={lang}
        setLang={setLang}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        t={t}
      />

      <main>
        <Hero t={t} />
        <About t={t} />
        <Products t={t} lang={lang} />
        <Gallery t={t} />
        <Capacity t={t} />
        <Certifications t={t} />
        <Contact t={t} />
      </main>

      <Footer t={t} />

    </div>
  );
}
