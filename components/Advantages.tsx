'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Settings,
  Wifi,
  Shield,
  Zap,
  CreditCard,
  Headphones
} from 'lucide-react';

interface AdvantagesProps {
  locale: string;
}

export function Advantages({ locale }: AdvantagesProps) {
  const t = useTranslations();

  const advantages = [
    {
      icon: Settings,
      title: t('advantages.premium.title'),
      description: t('advantages.premium.desc'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Wifi,
      title: t('advantages.iot.title'),
      description: t('advantages.iot.desc'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Shield,
      title: t('advantages.clean.title'),
      description: t('advantages.clean.desc'),
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    { 
      icon: Zap,
      title: t('advantages.fast.title'),
      description: t('advantages.fast.desc'),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      icon: CreditCard,
      title: t('advantages.payment.title'),
      description: t('advantages.payment.desc'),
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      icon: Headphones,
      title: t('advantages.support.title'),
      description: t('advantages.support.desc'),
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-white to-neutral-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-3 md:mb-4">
            {t('advantages.title')}
          </h2>
          <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
            {t('advantages.subtitle')}
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group hover:shadow-medium"
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${advantage.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                  <advantage.icon size={16} className={`${advantage.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-semibold text-neutral-900 mb-2 leading-tight">
                    {advantage.title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-3 md:mb-4">
              {t('advantages.cta.title')}
            </h3>
            <p className="text-sm md:text-base text-neutral-600 mb-5 md:mb-6 max-w-2xl mx-auto px-2">
              {t('advantages.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a
                href="#branches"
                className="btn-primary inline-flex items-center justify-center text-sm md:text-base"
              >
                {t('advantages.cta.find_branch')}
              </a>
              <Link
                href={`/${locale}/pricing`}
                className="btn-secondary inline-flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 text-sm md:text-base"
              >
                {t('advantages.cta.view_pricing')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
