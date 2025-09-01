'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Clock, Shield } from 'lucide-react';
import { StatBadges } from './StatBadges';

interface HeroProps {
  locale: string;
}

export function Hero({ locale }: HeroProps) {
  const t = useTranslations();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent-50 via-white to-accent-50">
      {/* Floating Bubbles Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large background blobs */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 left-20 w-72 h-72 bg-accent-500 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl"
        ></motion.div>
        
        {/* Laundry Bubbles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -40, 0],
              x: [0, Math.sin(i * 0.5) * 30, 0],
              scale: [1, 1.2, 0.8, 1],
              opacity: [0.4, 0.8, 0.3, 0.4]
            }}
            transition={{ 
              duration: 6 + i * 0.3, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.2
            }}
            className="absolute"
            style={{
              top: `${15 + (i * 8) % 70}%`,
              left: `${5 + (i * 12) % 90}%`,
              width: `${Math.max(8, 16 - Math.floor(i/3))}px`,
              height: `${Math.max(8, 16 - Math.floor(i/3))}px`,
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.1) 100%)`,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5), 0 0 5px rgba(255,255,255,0.3)',
            }}
          ></motion.div>
        ))}
        
        {/* Larger Bubbles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`large-${i}`}
            animate={{ 
              y: [0, -60, 0],
              x: [0, Math.cos(i * 0.8) * 40, 0],
              scale: [1, 1.3, 0.9, 1],
              opacity: [0.3, 0.6, 0.2, 0.3]
            }}
            transition={{ 
              duration: 8 + i * 0.4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.5
            }}
            className="absolute"
            style={{
              top: `${25 + (i * 15) % 60}%`,
              left: `${20 + (i * 18) % 80}%`,
              width: `${20 + Math.floor(i/2) * 4}px`,
              height: `${20 + Math.floor(i/2) * 4}px`,
              background: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.1) 100%)`,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.4)',
              boxShadow: 'inset 0 0 15px rgba(255,255,255,0.6), 0 0 8px rgba(255,255,255,0.4)',
            }}
          ></motion.div>
        ))}
        
        {/* Medium floating elements */}
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 right-1/4 w-4 h-4 bg-accent-400 rounded-full opacity-60"
        ></motion.div>
        
        <motion.div
          animate={{ 
            y: [20, -20, 20],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-accent-400 rounded-full opacity-60"
        ></motion.div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 mt-16 lg:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:col-span-2"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-6"
            >
              {t('hero.headline')}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed"
            >
              {t('hero.sub')}
            </motion.p>

            {/* Interactive CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/${locale}/pricing`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  {t('hero.cta.pricing')}
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="#branches"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-br from-white to-neutral-50 hover:from-neutral-50 hover:to-neutral-100 text-accent-500 border-2 border-accent-500 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  {t('hero.cta.branches')}
                  <Play size={20} className="ml-2 group-hover:scale-110 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12"
            >
              <StatBadges />
            </motion.div>
          </motion.div>

          {/* Large Interactive Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative group lg:col-span-3"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02]">
              <Image
                src="/images/banner.jpg"
                alt="LaundryZone"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
              />
              
              {/* Floating Interactive Elements */}
              <motion.div
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [-2, 2, -2]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-6 right-6 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20"
              >
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs md:text-sm font-semibold text-neutral-800">{t('hero.open_24_7')}</span>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [10, -10, 10],
                  rotate: [2, -2, 2]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute bottom-6 right-6 bg-transparent rounded-2xl p-4 shadow-lg border border-white/20"
              >
                {/* <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-neutral-800">{t('hero.lg_samsung')}</span>
                </div> */}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-6 border-2 border-neutral-300 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-neutral-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
