'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  Droplets, 
  Wind, 
  Shirt, 
  Sparkles, 
  CheckCircle,
  Clock,
  Shield,
  Zap
} from 'lucide-react';

export function ServiceDetails() {
  const t = useTranslations('service_details');

  const services = [
    {
      id: 'washing',
      icon: Droplets,
      title: t('washing.title'),
      subtitle: t('washing.subtitle'),
      description: t('washing.description'),
      features: [
        t('washing.features.capacity_20kg'),
        t('washing.features.capacity_30kg'),
        t('washing.features.temperature_control'),
        t('washing.features.specialized_cycles'),
        t('washing.features.eco_friendly'),
        t('washing.features.iot_monitoring')
      ],
      benefits: [
        t('washing.benefits.deep_cleaning'),
        t('washing.benefits.fabric_care'),
        t('washing.benefits.time_saving'),
        t('washing.benefits.cost_effective')
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      time: t('washing.stats.time')
    },
    {
      id: 'drying',
      icon: Wind,
      title: t('drying.title'),
      subtitle: t('drying.subtitle'),
      description: t('drying.description'),
      features: [
        t('drying.features.moisture_sensor'),
        t('drying.features.temperature_control'),
        t('drying.features.fast_cycles'),
        t('drying.features.energy_efficient'),
        t('drying.features.fabric_protection'),
        t('drying.features.auto_stop')
      ],
      benefits: [
        t('drying.benefits.quick_drying'),
        t('drying.benefits.fabric_safety'),
        t('drying.benefits.energy_saving'),
        t('drying.benefits.convenient')
      ],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      time: t('drying.stats.time')
    },
    {
      id: 'shoe_washing',
      icon: Shirt,
      title: t('shoe_washing.title'),
      subtitle: t('shoe_washing.subtitle'),
      description: t('shoe_washing.description'),
      features: [
        t('shoe_washing.features.specialized_machines'),
        t('shoe_washing.features.gentle_cleaning'),
        t('shoe_washing.features.dedicated_dryers'),
        t('shoe_washing.features.all_materials'),
        t('shoe_washing.features.stain_removal'),
        t('shoe_washing.features.odor_elimination')
      ],
      benefits: [
        t('shoe_washing.benefits.professional_cleaning'),
        t('shoe_washing.benefits.material_safety'),
        t('shoe_washing.benefits.extended_life'),
        t('shoe_washing.benefits.fresh_appearance')
      ],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      time: t('shoe_washing.stats.time')
    },
    {
      id: 'sterilization',
      icon: Sparkles,
      title: t('sterilization.title'),
      subtitle: t('sterilization.subtitle'),
      description: t('sterilization.description'),
      features: [
        t('sterilization.features.bacteria_elimination'),
        t('sterilization.features.allergen_removal'),
        t('sterilization.features.hygiene_treatment'),
        t('sterilization.features.safe_process'),
        t('sterilization.features.complete_coverage'),
        t('sterilization.features.medical_grade')
      ],
      benefits: [
        t('sterilization.benefits.health_protection'),
        t('sterilization.benefits.allergy_relief'),
        t('sterilization.benefits.hygiene_confidence'),
        t('sterilization.benefits.family_safety')
      ],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      time: t('sterilization.stats.time')
    }
  ];

  return (
    <section className="py-16 bg-white">
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

        <div className="space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} lg:flex items-center gap-12`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${service.bgColor} ${service.color}`}>
                    <service.icon size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-lg text-gray-600">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-gray-900 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    {t('features_title')}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-gray-700">
                        <div className={`w-2 h-2 rounded-full ${service.color.replace('text-', 'bg-')} mr-3`}></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Zap className="w-5 h-5 text-yellow-600 mr-2" />
                    {t('benefits_title')}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {service.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center text-gray-700">
                        <div className={`w-2 h-2 rounded-full ${service.color.replace('text-', 'bg-')} mr-3`}></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image/Visual */}
              <div className="flex-1">
                <div className={`relative p-8 rounded-2xl ${service.bgColor} border-2 ${service.borderColor}`}>
                  <div className="aspect-square bg-gradient-to-br from-white to-gray-100 rounded-xl flex items-center justify-center">
                    <service.icon size={120} className={service.color} />
                  </div>
                  
                  {/* Service Stats */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            {service.time}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            {t('stats.quality')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {t('cta.title')}
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                {t('cta.view_pricing')}
              </a>
              <a
                href="#branches"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-300"
              >
                {t('cta.find_branch')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
