'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Loader2, Zap, Droplets, Check } from 'lucide-react';

interface PricingTableProps {
  locale: string;
}

interface PricingItem {
  name: string;
  price: number;
  unit: string;
  description: string;
}

interface PricingData {
  washers: PricingItem[];
  dryers: PricingItem[];
  extras: PricingItem[];
}

export function PricingTable({ locale }: PricingTableProps) {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<'washers' | 'dryers' | 'extras'>('washers');

  // Pricing data
  const pricingData: PricingData = {
    washers: [
      {
        name: t('pricing.machines.washer_20kg_cold'),
        price: 15000,
        unit: t('pricing.units.cycle'),
        description: t('pricing.descriptions.washer_20kg_cold')
      },
      {
        name: t('pricing.machines.washer_20kg_hot'),
        price: 17000,
        unit: t('pricing.units.cycle'),
        description: t('pricing.descriptions.washer_20kg_hot')
      },
      {
        name: t('pricing.machines.washer_20kg_deep'),
        price: 19000,
        unit: t('pricing.units.cycle'),
        description: t('pricing.descriptions.washer_20kg_deep')
      },
      {
        name: t('pricing.machines.washer_30kg_cold'),
        price: 17000,
        unit: t('pricing.units.cycle'),
        description: t('pricing.descriptions.washer_30kg_cold')
      },
      {
        name: t('pricing.machines.washer_30kg_hot'),
        price: 19000,
        unit: t('pricing.units.cycle'),
        description: t('pricing.descriptions.washer_30kg_hot')
      },
      {
        name: t('pricing.machines.washer_30kg_deep'),
        price: 21000,
        unit: t('pricing.units.cycle'),
        description: t('pricing.descriptions.washer_30kg_deep')
      }
    ],
    dryers: [
      {
        name: t('pricing.machines.dryer_25kg_20min'),
        price: 10000,
        unit: t('pricing.units.cycle'),
        description: t('pricing.descriptions.dryer_25kg_20min')
      },
      {
        name: t('pricing.machines.dryer_25kg_30min'),
        price: 15000,
        unit: t('pricing.units.cycle'),
        description: t('pricing.descriptions.dryer_25kg_30min')
      }
    ],
    extras: [
      {
        name: t('pricing.machines.shoe_washer'),
        price: 15000,
        unit: t('pricing.units.cycle'),
        description: t('pricing.descriptions.shoe_washer')
      },
      {
        name: t('pricing.machines.shoe_dryer'),
        price: 15000,
        unit: t('pricing.units.cycle'),
        description: t('pricing.descriptions.shoe_dryer')
      },
      {
        name: t('pricing.machines.detergent'),
        price: 1000,
        unit: t('pricing.units.piece'),
        description: t('pricing.descriptions.detergent')
      },
      {
        name: t('pricing.machines.sterilization'),
        price: 1000,
        unit: t('pricing.units.piece'),
        description: t('pricing.descriptions.sterilization')
      }
    ]
  };

  const tabs = [
    { id: 'washers', label: t('pricing.washers'), icon: Loader2 },
    { id: 'dryers', label: t('pricing.dryers'), icon: Zap },
    { id: 'extras', label: t('pricing.extras'), icon: Droplets },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'washers':
        return Loader2;
      case 'dryers':
        return Zap;
      case 'extras':
        return Droplets;
      default:
        return Loader2;
    }
  };

  return (
    <section className="section-padding bg-gradient-to-br from-white to-neutral-50">
      <div className="container-custom">
        {/* How it works section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t('pricing.how_it_works')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: t('pricing.steps.load'), icon: '👕' },
              { step: t('pricing.steps.pay'), icon: '💳' },
              { step: t('pricing.steps.wash'), icon: '🧺' },
              { step: t('pricing.steps.dry'), icon: '☀️' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <p className="text-sm font-medium text-neutral-700">{item.step}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Tabs */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === tab.id
                    ? 'bg-accent-500 text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Pricing Cards */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {pricingData[activeTab].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center group hover:shadow-medium"
              >
                <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  {React.createElement(getIcon(activeTab), {
                    size: 28,
                    className: "text-accent-500"
                  })}
                </div>

                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {item.name}
                </h3>

                <p className="text-neutral-600 mb-4">
                  {item.description}
                </p>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-accent-500">
                    {item.price.toLocaleString()}
                  </span>
                  <span className="text-neutral-600 ml-1">
                    {item.unit}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-neutral-600">
                  <div className="flex items-center justify-center space-x-2">
                    <Check size={16} className="text-green-500" />
                    <span>{t('common.premium_quality')}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Check size={16} className="text-green-500" />
                    <span>{t('common.fast_service')}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Check size={16} className="text-green-500" />
                    <span>{t('common.available_24_7')}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              {t('common.need_help')}
            </h3>
            <p className="text-neutral-600 mb-6">
              {t('pricing.help_description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${locale}/contact`}
                className="btn-primary inline-flex items-center justify-center"
              >
                {t('contact.title')}
              </a>
              <a
                href={`/${locale}#branches`}
                className="btn-secondary inline-flex items-center justify-center"
              >
                {t('branches.find_nearest')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
