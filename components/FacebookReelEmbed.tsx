'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useRef } from 'react';

interface VideoEmbedProps {
  locale: string;
}

export function FacebookReelEmbed({ locale }: VideoEmbedProps) {
  const t = useTranslations();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t('social.facebook_reel_title')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('social.facebook_reel_description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="aspect-[9/16] relative">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              poster="/images/banner.jpg"
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onLoadedData={() => console.log('Video loaded successfully')}
              onError={(e) => console.error('Video error:', e)}
            >
              <source src="/videos/laundryzone-reel.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {!isPlaying && (
              <button 
                onClick={handlePlayClick}
                className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-opacity duration-300 hover:bg-opacity-30"
                style={{ zIndex: 1 }}
                aria-label="Play video"
              >
                <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all duration-200 hover:scale-110">
                  <svg 
                    className="w-6 h-6 text-neutral-800 ml-1" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
            )}
          </div>
          
          <div className="p-4 text-center">
            <a
              href="https://www.facebook.com/share/r/1AwDcTXMWj/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
            >
              {t('social.view_on_facebook')}
              <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}