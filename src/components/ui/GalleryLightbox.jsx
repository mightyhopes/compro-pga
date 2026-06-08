import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon } from '../../icons';

export const GalleryLightbox = ({ selectedItem, onClose }) => {
  return (
    <AnimatePresence>
      {selectedItem && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10" onClick={e => e.stopPropagation()}>
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={onClose}
                className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors shadow-md border border-white/20 backdrop-blur-md"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950/50">
              <img 
                src={selectedItem.path} 
                alt={selectedItem.tag} 
                loading="lazy"
                className="max-w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-2xl" 
              />
            </div>

            <div className="p-5 bg-slate-900/80 backdrop-blur-md border-t border-slate-800 text-center text-xs text-slate-300 uppercase tracking-widest font-bold">
              PT. PGA Corporate Gallery Asset - <span className="text-white">{selectedItem.tag}</span> ({selectedItem.type})
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
