'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Zap, Droplets } from 'lucide-react';

interface PricingTeaserProps {
  locale: string;
}

export function PricingTeaser({ locale }: PricingTeaserProps) {
  const t = useTranslations();

  const topMachines = [
    {
      name: t('pricing.machines.washer_20kg_name'),
      price: '15,000',
      unit: t('pricing.units.cycle'),
      icon: Loader2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: t('pricing.machines.washer_20kg'),
    },
    {
      name: t('pricing.machines.dryer_25kg_name'),
      price: '10,000',
      unit: t('pricing.units.minutes'),
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: t('pricing.machines.dryer_25kg'),
    },
    {
      name: t('pricing.machines.shoe_washer_name'),
      price: '15,000',
      unit: t('pricing.units.cycle'),
      icon: Droplets,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: t('pricing.machines.shoe_washer'),
    },
  ];

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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {topMachines.map((machine, index) => (
            <motion.div
              key={machine.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card text-center group hover:shadow-medium"
            >
              <div className={`w-16 h-16 ${machine.bgColor} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200`}>
                <machine.icon size={28} className={machine.color} />
              </div>
              
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {machine.name}
              </h3>
              
              <p className="text-neutral-600 mb-4">
                {machine.description}
              </p>
              
              <div className="mb-6">
                                 <span className="text-3xl font-bold text-accent-500">
                  {machine.price}
                </span>
                <span className="text-neutral-600 ml-1">
                  {machine.unit}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center relative z-10"
        >
          <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl shadow-soft p-8 max-w-2xl mx-auto relative">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              {t('pricing.how_it_works')}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { step: t('pricing.steps.load'), icon: '👕' },
                { step: t('pricing.steps.pay'), icon: '💳' },
                { step: t('pricing.steps.wash'), icon: '🧺' },
                { step: t('pricing.steps.dry'), icon: '☀️' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-sm font-medium text-neutral-700">{item.step}</p>
                </div>
              ))}
            </div>
            
            <Link
              href={`/${locale}/pricing`}
              className="inline-flex items-center justify-center px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              onClick={() => console.log('Pricing button clicked, navigating to:', `/${locale}/pricing`)}
            >
              {t('pricing.see_full')}
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
