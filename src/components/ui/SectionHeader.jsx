import React from 'react';

export const SectionHeader = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      {title && (
        <span className="text-sm font-bold text-pga-blue dark:text-pga-blue-light uppercase tracking-wider mb-2 block">
          {title}
        </span>
      )}
      {subtitle && (
        <h2 className="font-outfit font-extrabold text-3xl md:text-4xl lg:text-5xl text-slate-800 dark:text-white leading-tight">
          {subtitle}
        </h2>
      )}
    </div>
  );
};
