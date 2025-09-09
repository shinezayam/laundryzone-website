'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';

interface VideoEmbedProps {
  locale: string;
}

export function FacebookReelEmbed({ locale }: VideoEmbedProps) {
  const t = useTranslations();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Prevent browser extension errors from interfering
  useEffect(() => {
    // Override chrome extension message handlers to prevent errors
    if (typeof window !== 'undefined') {
      const originalAddEventListener = window.addEventListener;
      const originalConsoleError = console.error;
      
      // Suppress extension-related errors
      console.error = (...args: any[]) => {
        const message = args[0]?.toString() || '';
        if (message.includes('onMessage') || message.includes('sendMessage') || message.includes('chrome-extension://')) {
          return; // Suppress extension errors
        }
        originalConsoleError.apply(console, args);
      };

      return () => {
        console.error = originalConsoleError;
      };
    }
  }, []);

  const handlePlayClick = async () => {
    console.log('Play button clicked');
    if (videoRef.current) {
      console.log('Video element found, current state:', {
        paused: videoRef.current.paused,
        readyState: videoRef.current.readyState,
        networkState: videoRef.current.networkState,
        currentSrc: videoRef.current.currentSrc
      });
      
      try {
        if (videoRef.current.paused) {
          console.log('Attempting to play video...');
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            console.log('Video play successful');
            setIsPlaying(true);
          }
        } else {
          console.log('Pausing video...');
          videoRef.current.pause();
          setIsPlaying(false);
        }
      } catch (error) {
        console.log('Video play error:', error);
        setHasError(true);
      }
    } else {
      console.log('Video element not found');
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
              muted={false}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onLoadedData={() => console.log('Video loaded successfully')}
              onError={(e) => {
                console.log('Video loading error:', e);
                setHasError(true);
              }}
              onCanPlay={() => {
                console.log('Video can play');
                setHasError(false);
              }}
            >
              <source src="/videos/laundryzone-reel.mp4" type="video/mp4" />
              <p>Your browser does not support the video tag.</p>
            </video>
            
            {!isPlaying && !hasError && (
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
            
            {hasError && (
              <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center" style={{ zIndex: 1 }}>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Video temporarily unavailable</p>
                  <button 
                    onClick={() => {
                      setHasError(false);
                      if (videoRef.current) {
                        videoRef.current.load();
                      }
                    }}
                    className="mt-2 text-xs text-blue-600 hover:underline"
                  >
                    Try again
                  </button>
                </div>
              </div>
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