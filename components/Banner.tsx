'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, Shield } from 'lucide-react';

interface BannerProps {
  locale: string;
}

export function Banner({ locale }: BannerProps) {
  const t = useTranslations();

  return (
    <section className="section-padding bg-gradient-to-br from-accent-50 to-accent-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t('banner.title')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('banner.subtitle')}
          </p>
        </motion.div>

        {/* Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Main Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-soft hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/images/banner.jpg"
                alt="LaundryZone premium service"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                  <span className="text-sm font-medium text-accent-200">
                    {t('banner.premium')}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {t('banner.main.title')}
                </h3>
                <p className="text-white/90 mb-4">
                  {t('banner.main.description')}
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="text-yellow-400" />
                    <span>4.9</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={16} className="text-blue-300" />
                    <span>{t('banner.fast')}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-soft hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-accent-500 to-accent-500">
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <span className="text-sm font-medium text-white/80">
                    {t('banner.featured')}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  {t('banner.secondary.title')}
                </h3>
                <p className="text-white/90 mb-6">
                  {t('banner.secondary.description')}
                </p>
                
                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Shield size={16} className="text-white" />
                    </div>
                    <span className="text-sm">{t('banner.features.hygiene')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Clock size={16} className="text-white" />
                    </div>
                    <span className="text-sm">{t('banner.features.hours')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Star size={16} className="text-white" />
                    </div>
                    <span className="text-sm">{t('banner.features.quality')}</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-soft hover:shadow-md transition-shadow cursor-pointer group">
            <span className="font-semibold text-neutral-900">
              {t('banner.cta')}
            </span>
                             <ArrowRight size={20} className="text-accent-500 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
