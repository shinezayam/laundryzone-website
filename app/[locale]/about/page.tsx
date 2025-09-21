'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';
import { useState, useEffect } from 'react';
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
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t('about.timeline.title')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              {t('about.timeline.subtitle')}
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-accent-500 to-accent-600 h-full"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {/* 2019 - First Branch */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-accent-500">
                    <div className="flex items-center justify-end mb-2">
                      <span className="text-accent-500 font-bold text-sm">2019</span>
                      <div className="ml-2 w-3 h-3 bg-accent-500 rounded-full"></div>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">LaundryZone - 1</h3>
                    <p className="text-neutral-600 text-sm">
                      {t('about.timeline.branch_1_desc')}
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8"></div>
              </motion.div>

              {/* 2020 - Second Branch */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-r-4 border-accent-500">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
                      <span className="text-accent-500 font-bold text-sm ml-2">2020</span>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">LaundryZone - 2</h3>
                    <p className="text-neutral-600 text-sm">
                      {t('about.timeline.branch_2_desc')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 2021 - Third Branch */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-accent-500">
                    <div className="flex items-center justify-end mb-2">
                      <span className="text-accent-500 font-bold text-sm">2021</span>
                      <div className="ml-2 w-3 h-3 bg-accent-500 rounded-full"></div>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">LaundryZone - 3</h3>
                    <p className="text-neutral-600 text-sm">
                      {t('about.timeline.branch_3_desc')}
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8"></div>
              </motion.div>

              {/* 2021 - Fourth Branch */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-r-4 border-accent-500">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
                      <span className="text-accent-500 font-bold text-sm ml-2">2021</span>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">LaundryZone - 4</h3>
                    <p className="text-neutral-600 text-sm">
                      {t('about.timeline.branch_4_desc')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 2022 - Fifth Branch */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-accent-500">
                    <div className="flex items-center justify-end mb-2">
                      <span className="text-accent-500 font-bold text-sm">2022</span>
                      <div className="ml-2 w-3 h-3 bg-accent-500 rounded-full"></div>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">LaundryZone - 5</h3>
                    <p className="text-neutral-600 text-sm">
                      {t('about.timeline.branch_5_desc')}
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8"></div>
              </motion.div>

              {/* 2022 - Sixth Branch */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-r-4 border-accent-500">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
                      <span className="text-accent-500 font-bold text-sm ml-2">2022</span>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">LaundryZone - 6</h3>
                    <p className="text-neutral-600 text-sm">
                      {t('about.timeline.branch_6_desc')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 2022 - Seventh Branch */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-accent-500">
                    <div className="flex items-center justify-end mb-2">
                      <span className="text-accent-500 font-bold text-sm">2022</span>
                      <div className="ml-2 w-3 h-3 bg-accent-500 rounded-full"></div>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">LaundryZone - 7</h3>
                    <p className="text-neutral-600 text-sm">
                      {t('about.timeline.branch_7_desc')}
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8"></div>
              </motion.div>

              {/* 2022 - Eighth Branch */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-r-4 border-accent-500">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
                      <span className="text-accent-500 font-bold text-sm ml-2">2022</span>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">LaundryZone - 8</h3>
                    <p className="text-neutral-600 text-sm">
                      {t('about.timeline.branch_8_desc')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 2022 - Ninth Branch */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-accent-500">
                    <div className="flex items-center justify-end mb-2">
                      <span className="text-accent-500 font-bold text-sm">2022</span>
                      <div className="ml-2 w-3 h-3 bg-accent-500 rounded-full"></div>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">LaundryZone - 9</h3>
                    <p className="text-neutral-600 text-sm">
                      {t('about.timeline.branch_9_desc')}
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8"></div>
              </motion.div>

              {/* 2022 - Tenth Branch */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.0 }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-r-4 border-accent-500">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
                      <span className="text-accent-500 font-bold text-sm ml-2">2022</span>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">LaundryZone - 10</h3>
                    <p className="text-neutral-600 text-sm">
                      {t('about.timeline.branch_10_desc')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 2022 - Eleventh Branch */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.2 }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-accent-500">
                    <div className="flex items-center justify-end mb-2">
                      <span className="text-accent-500 font-bold text-sm">2022</span>
                      <div className="ml-2 w-3 h-3 bg-accent-500 rounded-full"></div>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">LaundryZone - 11</h3>
                    <p className="text-neutral-600 text-sm">
                      {t('about.timeline.branch_11_desc')}
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8"></div>
              </motion.div>

              {/* 2023 - Twelfth Branch */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.4 }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-r-4 border-accent-500">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
                      <span className="text-accent-500 font-bold text-sm ml-2">2023</span>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">LaundryZone - 12</h3>
                    <p className="text-neutral-600 text-sm">
                      {t('about.timeline.branch_12_desc')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 2023 - Thirteenth Branch */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.6 }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-accent-500">
                    <div className="flex items-center justify-end mb-2">
                      <span className="text-accent-500 font-bold text-sm">2023</span>
                      <div className="ml-2 w-3 h-3 bg-accent-500 rounded-full"></div>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">LaundryZone - 13</h3>
                    <p className="text-neutral-600 text-sm">
                      {t('about.timeline.branch_13_desc')}
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8"></div>
              </motion.div>

              {/* 2023 - Fourteenth Branch */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.8 }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-r-4 border-accent-500">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
                      <span className="text-accent-500 font-bold text-sm ml-2">2023</span>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">LaundryZone - 14</h3>
                    <p className="text-neutral-600 text-sm">
                      {t('about.timeline.branch_14_desc')}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
