import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { ImageWithSkeleton } from '../ui/ImageWithSkeleton';
import { GalleryLightbox } from '../ui/GalleryLightbox';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const galleryItems = [
  // Products
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
  // Machinery & Factory Floor
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

const getBentoClass = (index) => {
  const sizes = [
    'md:col-span-2 md:row-span-2 aspect-[1/1]', // Big square
    'md:col-span-1 md:row-span-1 aspect-[1/1]', // Small square
    'md:col-span-1 md:row-span-1 aspect-[1/1]', // Small square
    'md:col-span-1 md:row-span-1 aspect-[1/1]', // Small square
    'md:col-span-1 md:row-span-1 aspect-[1/1]', // Small square
    'md:col-span-2 md:row-span-1 aspect-[2/1]', // Wide rectangle
    'md:col-span-1 md:row-span-1 aspect-[1/1]', // Small square
    'md:col-span-1 md:row-span-1 aspect-[1/1]', // Small square
    'md:col-span-2 md:row-span-2 aspect-[1/1]', // Big square
    'md:col-span-2 md:row-span-1 aspect-[2/1]', // Wide rectangle
  ];
  return sizes[index % sizes.length] || 'aspect-[1/1]';
};

export const Gallery = ({ t }) => {
  const [galleryRef, galleryVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [galleryFilter, setGalleryFilter] = useState('product');
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);

  const filteredGalleryItems = galleryItems.filter(item => item.type === galleryFilter);

  return (
    <>
      <section id="gallery" ref={galleryRef} className="py-24 bg-white dark:bg-slate-900 overflow-hidden scroll-mt-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className={`transition-all duration-1000 transform ${galleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-center max-w-3xl mx-auto mb-16`}>
            <SectionHeader title={t('gallery.title')} subtitle={t('gallery.subtitle')} className="mb-4" />
            <div className="h-1.5 w-24 bg-pga-blue mx-auto rounded-full mb-8"></div>
            
            {/* Gallery Filters */}
            <div className="flex justify-center gap-2 flex-wrap">
              <button 
                onClick={() => setGalleryFilter('product')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${galleryFilter === 'product' ? 'bg-pga-blue text-white shadow-lg shadow-pga-blue/30 scale-105' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                {t('gallery.filterProducts')}
              </button>
              <button 
                onClick={() => setGalleryFilter('factory')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${galleryFilter === 'factory' ? 'bg-pga-blue text-white shadow-lg shadow-pga-blue/30 scale-105' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                {t('gallery.filterFactory')}
              </button>
            </div>
          </div>

          {/* Media Grid (Bento Layout) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-min grid-flow-dense">
            <AnimatePresence>
              {filteredGalleryItems.map((item, index) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedGalleryItem(item)}
                  className={`group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-slate-100 dark:border-slate-800 cursor-pointer bg-slate-100 dark:bg-slate-950 transition-shadow duration-300 ${getBentoClass(index)}`}
                >
                  <ImageWithSkeleton 
                    src={item.path} 
                    alt={item.tag} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-white font-bold text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {item.tag}
                    </span>
                    <span className="text-blue-300 text-[10px] uppercase tracking-wider font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {t('gallery.viewDetail')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Lightbox */}
      <GalleryLightbox selectedItem={selectedGalleryItem} onClose={() => setSelectedGalleryItem(null)} />
    </>
  );
};
