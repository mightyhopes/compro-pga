import React from 'react';
import { PhoneIcon } from '../../icons';

export const Footer = ({ t }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Brand Column */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center p-1">
              <img src="/assets/logo.webp" alt="PGA Logo" className="w-full h-full object-contain" />
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
          <div className="flex flex-col gap-2.5 text-xs font-semibold text-slate-400">
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
          <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <PhoneIcon />
            <span>0233-3602024</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
