'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { DISPLAYED_BRANCH_COUNT } from '@/data/branches-data';

interface PricingImagesProps {
  locale: string;
}

export function PricingImages({ locale }: PricingImagesProps) {
  const t = useTranslations();

  return (
    <section className="section-padding bg-gradient-to-br from-neutral-50 to-accent-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        {/* Pricing Images Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Ulaanbaatar Pricing */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200"
          >
            <Image
              src="/images/price_ub.png"
              alt="Улаанбаатар хотын үнийн мэдээлэл"
              width={600}
              height={800}
              className="w-full h-auto object-contain"
            />
            {/* Branch count overlay (native 1639x2048: 98px left, 169px bottom, 181x141 box at 90% scale) */}
            <div
              className="absolute flex items-center justify-center pointer-events-none"
              style={{
                left: '5.98%',
                bottom: '8.25%',
                width: '9.94%',
                height: '6.20%',
              }}
            >
              <div className="bg-white rounded-2xl shadow-md flex items-center justify-center w-full h-full">
                <span
                  className="font-black text-accent-500 leading-none"
                  style={{ fontSize: 'clamp(0.9rem, 2.5vw, 2.5rem)' }}
                >
                  {DISPLAYED_BRANCH_COUNT}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Provinces Pricing */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200"
          >
            <Image
              src="/images/price_provinces.png"
              alt="Аймгийн үнийн мэдээлэл"
              width={600}
              height={800}
              className="w-full h-auto object-contain"
            />
            {/* Branch count overlay (native 1639x2048: 98px left, 169px bottom, 181x141 box at 90% scale) */}
            <div
              className="absolute flex items-center justify-center pointer-events-none"
              style={{
                left: '5.98%',
                bottom: '8.25%',
                width: '9.94%',
                height: '6.20%',
              }}
            >
              <div className="bg-white rounded-2xl shadow-md flex items-center justify-center w-full h-full">
                <span
                  className="font-black text-accent-500 leading-none"
                  style={{ fontSize: 'clamp(0.9rem, 2.5vw, 2.5rem)' }}
                >
                  {DISPLAYED_BRANCH_COUNT}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
