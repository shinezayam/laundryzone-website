'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  Droplets, 
  Wind, 
  Shirt, 
  Sparkles,
  Clock,
  Shield,
  Zap
} from 'lucide-react';

export function Services() {
  const t = useTranslations('equipment');

  const services = [
    {
      id: 'washing',
      icon: Droplets,
      title: t('washing.title'),
      description: t('washing.description'),
      features: [
        t('washing.features.capacity'),
        t('washing.features.cycles'),
        t('washing.features.eco')
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'drying',
      icon: Wind,
      title: t('drying.title'),
      description: t('drying.description'),
      features: [
        t('drying.features.sensor'),
        t('drying.features.speed'),
        t('drying.features.energy')
      ],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'shoe_washing',
      icon: Shirt,
      title: t('shoe_washing.title'),
      description: t('shoe_washing.description'),
      features: [
        t('shoe_washing.features.specialized'),
        t('shoe_washing.features.gentle'),
        t('shoe_washing.features.all_types')
      ],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'detergent',
      icon: Sparkles,
      title: t('detergent.title'),
      description: t('detergent.description'),
      features: [
        t('detergent.features.quality'),
        t('detergent.features.included'),
        t('detergent.features.variety')
      ],
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    },
    {
      id: 'sterilization',
      icon: Shield,
      title: t('sterilization.title'),
      description: t('sterilization.description'),
      features: [
        t('sterilization.features.bacteria'),
        t('sterilization.features.allergen'),
        t('sterilization.features.hygiene')
      ],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'convenience',
      icon: Clock,
      title: t('convenience.title'),
      description: t('convenience.description'),
      features: [
        t('convenience.features.wifi'),
        t('convenience.features.payment'),
        t('convenience.features.hours')
      ],
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-6 shadow-lg border-2 ${service.borderColor} hover:shadow-xl transition-shadow duration-300`}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${service.bgColor} ${service.color} mb-6`}>
                <service.icon size={32} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <div className={`w-2 h-2 rounded-full ${service.color.replace('text-', 'bg-')} mr-3`}></div>
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50 text-blue-600 mb-4">
                  <Clock size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t('highlights.fast.title')}
                </h3>
                <p className="text-gray-600">
                  {t('highlights.fast.description')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-green-50 text-green-600 mb-4">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t('highlights.clean.title')}
                </h3>
                <p className="text-gray-600">
                  {t('highlights.clean.description')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-purple-50 text-purple-600 mb-4">
                  <Zap size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t('highlights.efficient.title')}
                </h3>
                <p className="text-gray-600">
                  {t('highlights.efficient.description')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
