'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

// CountUp Component
const CountUp = ({ end, duration = 2, delay = 0 }: { end: number; duration?: number; delay?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = Date.now();
      const startValue = 0;
      
      const updateCount = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        
        const currentCount = Math.floor(startValue + (end - startValue) * progress);
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };
      
      updateCount();
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [end, duration, delay]);

  return <span>{count.toLocaleString()}</span>;
};

export default function AboutPage() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const branchRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  useEffect(() => {
    if (isPlaying && timelineRef.current) {
      const interval = setInterval(() => {
        setCurrentBranch((prev) => {
          const next = prev + 1;
          if (next >= 35) {
            setIsPlaying(false);
            return 0;
          }
          
          // Scroll to the next branch
          const nextBranch = branchRefs.current[next];
          if (nextBranch) {
            nextBranch.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }
          
          return next;
        });
      }, 2000); // 2 seconds per branch

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      setCurrentBranch(0);
    }
  };

  return (
    <>
      <PageHeader
        title={t('about.title')}
        subtitle={t('about.subtitle')}
        locale={locale}
      />

      {/* Statistics Section */}
      <section className="section-padding bg-gradient-to-br from-accent-500 to-accent-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('about.stats.title')}
            </h2>
            <p className="text-lg text-accent-100 max-w-2xl mx-auto">
              {t('about.stats.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Washing Machines */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <CountUp end={50} duration={2.5} delay={0.5} />+
                </div>
                <p className="text-accent-100 font-medium">
                  {t('about.stats.washing_machines')}
                </p>
              </div>
            </motion.div>

            {/* Dryers */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <CountUp end={50} duration={2.5} delay={0.7} />+
                </div>
                <p className="text-accent-100 font-medium">
                  {t('about.stats.dryers')}
                </p>
              </div>
            </motion.div>

            {/* Shoe Washers & Dryers */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <CountUp end={40} duration={2.5} delay={0.9} />+
                </div>
                <p className="text-accent-100 font-medium text-sm">
                  {t('about.stats.shoe_machines')}
                </p>
              </div>
            </motion.div>

            {/* Total Users */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <CountUp end={100000} duration={3} delay={1.1} />+
                </div>
                <p className="text-accent-100 font-medium text-sm">
                  {t('about.stats.total_users')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Franchise CTA at very bottom */}
      <section className="py-10 bg-white">
        <div className="container-custom">
          <div className="flex justify-center">
            <Link
              href={`/${locale}/franchise`}
              className="inline-flex items-center px-6 py-3 rounded-full bg-accent-500 hover:bg-accent-600 text-white font-semibold shadow-lg transition-colors"
            >
              {t('about.timeline.cta_franchise')}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* New About Content Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Main Description */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                {t('about.about_section.title')}
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                {t('about.about_section.description')}
              </p>
            </div>

            {/* Vision and Mission */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-accent-50 rounded-xl p-6 border border-accent-200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">{t('about.about_section.vision.title')}</h3>
                </div>
                <p className="text-neutral-700 leading-relaxed">
                  {t('about.about_section.vision.content')}
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-blue-50 rounded-xl p-6 border border-blue-200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">{t('about.about_section.mission.title')}</h3>
                </div>
                <ul className="text-neutral-700 space-y-2">
                  {t.raw('about.about_section.mission.content').map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Advantages */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-green-50 rounded-xl p-8 border border-green-200"
            >
              <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">{t('about.about_section.advantages.title')}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {t.raw('about.about_section.advantages.items').map((item: any, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1" style={{ aspectRatio: '1/1', minWidth: '32px', minHeight: '32px' }}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-1">{item.title}</h4>
                      {item.description && (
                        <p className="text-sm text-neutral-600">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Final Statement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mt-12"
            >
              <p className="text-lg text-neutral-700 leading-relaxed">
                {t('about.about_section.final_statement')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 rounded-full mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              {t('about.timeline.title')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {t('about.timeline.subtitle')}
            </p>
            
            {/* Play Button */}
            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                isPlaying 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-accent-500 hover:bg-accent-600 text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                  {t('about.timeline.stop')}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  {t('about.timeline.play')}
                </>
              )}
            </motion.button>
            
            {isPlaying && (
              <div className="mt-4">
                <div className="text-sm text-neutral-500 mb-2">
                  Branch {currentBranch + 1} of 35
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2 max-w-md mx-auto">
                  <motion.div 
                    className="bg-accent-500 h-2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((currentBranch + 1) / 35) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}
          </motion.div>

          {/* Optional Stats removed to keep palette consistent */}

          <div className="relative" ref={timelineRef}>
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-accent-500 to-accent-600 h-full"></div>
            
            {/* Timeline Items - Enhanced with Auto-Play */}
            <div className="space-y-12">
              {Array.from({ length: 35 }, (_, index) => {
                const branchNumber = index + 1;
                const isLeft = index % 2 === 0;
                const delay = index * 0.1;
                const isCurrentBranch = currentBranch === index;
                const isPastBranch = currentBranch > index;
                
                return (
                  <motion.div
                    key={branchNumber}
                    ref={(el) => { branchRefs.current[index] = el; }}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      scale: isCurrentBranch ? 1.05 : 1,
                      y: isCurrentBranch ? -5 : 0
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: isPlaying ? 0 : delay,
                      type: isCurrentBranch ? "spring" : "tween",
                      stiffness: isCurrentBranch ? 100 : undefined
                    }}
                    className={`relative flex items-center transition-all duration-500 ${
                      isCurrentBranch ? 'z-10' : ''
                    }`}
                  >
                    {isLeft ? (
                      <>
                        <div className="w-1/2 pr-8 text-right">
                          <motion.div 
                            className={`rounded-lg p-6 shadow-lg border-l-4 transition-all duration-500 ${
                              isCurrentBranch 
                                ? 'bg-accent-50 border-accent-600 shadow-xl shadow-accent-200' 
                                : isPastBranch 
                                  ? 'bg-white border-accent-500 opacity-75' 
                                  : 'bg-white border-accent-500'
                            }`}
                            animate={{
                              boxShadow: isCurrentBranch 
                                ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                                : "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                            }}
                          >
                            <div className="flex items-center justify-end mb-2">
                              <span className={`font-bold text-sm ${
                                isCurrentBranch ? 'text-accent-700' : 'text-accent-500'
                              }`}>
                                {t(`about.timeline.branch_${branchNumber}_date`)}
                              </span>
                              <motion.div 
                                className={`ml-2 w-3 h-3 rounded-full ${
                                  isCurrentBranch ? 'bg-accent-600' : 'bg-accent-500'
                                }`}
                                animate={{
                                  scale: isCurrentBranch ? [1, 1.2, 1] : 1,
                                }}
                                transition={{
                                  duration: 1,
                                  repeat: isCurrentBranch ? Infinity : 0
                                }}
                              />
                            </div>
                            <h3 className={`text-lg font-semibold mb-2 ${
                              isCurrentBranch ? 'text-accent-800' : 'text-neutral-900'
                            }`}>
                              {t(`about.timeline.branch_${branchNumber}`)}
                            </h3>
                            <p className={`text-sm ${
                              isCurrentBranch ? 'text-accent-700' : 'text-neutral-600'
                            }`}>
                              {t(`about.timeline.branch_${branchNumber}_desc`)}
                            </p>
                            {isCurrentBranch && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-3 flex justify-end"
                              >
                                <span className="bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                  {t('about.timeline.current')}
                                </span>
                              </motion.div>
                            )}
                          </motion.div>
                        </div>
                        <motion.div 
                          className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white shadow-lg ${
                            isCurrentBranch ? 'bg-accent-600' : 'bg-accent-500'
                          }`}
                          animate={{
                            scale: isCurrentBranch ? [1, 1.3, 1] : 1,
                            boxShadow: isCurrentBranch 
                              ? "0 0 0 8px rgba(59, 130, 246, 0.3)" 
                              : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                          }}
                          transition={{
                            duration: 1,
                            repeat: isCurrentBranch ? Infinity : 0
                          }}
                        />
                        <div className="w-1/2 pl-8"></div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/2 pr-8"></div>
                        <motion.div 
                          className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white shadow-lg ${
                            isCurrentBranch ? 'bg-accent-600' : 'bg-accent-500'
                          }`}
                          animate={{
                            scale: isCurrentBranch ? [1, 1.3, 1] : 1,
                            boxShadow: isCurrentBranch 
                              ? "0 0 0 8px rgba(59, 130, 246, 0.3)" 
                              : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                          }}
                          transition={{
                            duration: 1,
                            repeat: isCurrentBranch ? Infinity : 0
                          }}
                        />
                        <div className="w-1/2 pl-8">
                          <motion.div 
                            className={`rounded-lg p-6 shadow-lg border-r-4 transition-all duration-500 ${
                              isCurrentBranch 
                                ? 'bg-accent-50 border-accent-600 shadow-xl shadow-accent-200' 
                                : isPastBranch 
                                  ? 'bg-white border-accent-500 opacity-75' 
                                  : 'bg-white border-accent-500'
                            }`}
                            animate={{
                              boxShadow: isCurrentBranch 
                                ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                                : "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                            }}
                          >
                            <div className="flex items-center mb-2">
                              <motion.div 
                                className={`w-3 h-3 rounded-full ${
                                  isCurrentBranch ? 'bg-accent-600' : 'bg-accent-500'
                                }`}
                                animate={{
                                  scale: isCurrentBranch ? [1, 1.2, 1] : 1,
                                }}
                                transition={{
                                  duration: 1,
                                  repeat: isCurrentBranch ? Infinity : 0
                                }}
                              />
                              <span className={`font-bold text-sm ml-2 ${
                                isCurrentBranch ? 'text-accent-700' : 'text-accent-500'
                              }`}>
                                {t(`about.timeline.branch_${branchNumber}_date`)}
                              </span>
                            </div>
                            <h3 className={`text-lg font-semibold mb-2 ${
                              isCurrentBranch ? 'text-accent-800' : 'text-neutral-900'
                            }`}>
                              {t(`about.timeline.branch_${branchNumber}`)}
                            </h3>
                            <p className={`text-sm ${
                              isCurrentBranch ? 'text-accent-700' : 'text-neutral-600'
                            }`}>
                              {t(`about.timeline.branch_${branchNumber}_desc`)}
                            </p>
                            {isCurrentBranch && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-3"
                              >
                                <span className="bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                  {t('about.timeline.current')}
                                </span>
                              </motion.div>
                            )}
                          </motion.div>
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
            {/* End marker removed to keep minimal palette */}
            
            {/* CTA inside timeline bottom */}
            <div className="pt-6 flex justify-center">
              <Link
                href={`/${locale}/franchise`}
                className="inline-flex items-center px-6 py-3 rounded-full bg-accent-500 hover:bg-accent-600 text-white font-semibold shadow-lg transition-colors"
              >
                {t('about.timeline.cta_franchise')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
