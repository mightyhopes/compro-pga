import React, { useState } from 'react';

export const ImageWithSkeleton = ({ src, alt, className }) => {
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
