'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';
import { FranchiseForm } from '@/components/FranchiseForm';
import { BusinessStepsPDF } from '@/components/BusinessStepsPDF';

interface FranchisePageProps {
  params: { locale: string };
}

export default function FranchisePage({ params: { locale } }: FranchisePageProps) {
  const t = useTranslations();

  const businessSteps = [
    {
      number: "01",
      title: t('business_steps.step_01.title'),
      items: [
        t('business_steps.step_01.items.0'),
        t('business_steps.step_01.items.1'),
        t('business_steps.step_01.items.2'),
        t('business_steps.step_01.items.3')
      ],
      note: t('business_steps.step_01.note')
    },
    {
      number: "02",
      title: t('business_steps.step_02.title'),
      items: [
        t('business_steps.step_02.items.0'),
        t('business_steps.step_02.items.1'),
        t('business_steps.step_02.items.2'),
        t('business_steps.step_02.items.3')
      ],
      note: t('business_steps.step_02.note')
    },
    {
      number: "03",
      title: t('business_steps.step_03.title'),
      items: [
        t('business_steps.step_03.items.0'),
        t('business_steps.step_03.items.1'),
        t('business_steps.step_03.items.2'),
        t('business_steps.step_03.items.3')
      ],
      note: t('business_steps.step_03.note')
    },
    {
      number: "04",
      title: t('business_steps.step_04.title'),
      items: [
        t('business_steps.step_04.items.0'),
        t('business_steps.step_04.items.1'),
        t('business_steps.step_04.items.2'),
        t('business_steps.step_04.items.3')
      ],
      note: t('business_steps.step_04.note')
    },
    {
      number: "05",
      title: t('business_steps.step_05.title'),
      items: [
        t('business_steps.step_05.items.0'),
        t('business_steps.step_05.items.1'),
        t('business_steps.step_05.items.2')
      ],
      note: t('business_steps.step_05.note')
    },
    {
      number: "06",
      title: t('business_steps.step_06.title'),
      items: [
        t('business_steps.step_06.items.0'),
        t('business_steps.step_06.items.1'),
        t('business_steps.step_06.items.2'),
        t('business_steps.step_06.items.3')
      ],
      note: t('business_steps.step_06.note')
    },
    {
      number: "07",
      title: t('business_steps.step_07.title'),
      items: [
        t('business_steps.step_07.items.0'),
        t('business_steps.step_07.items.1'),
        t('business_steps.step_07.items.2')
      ],
      note: t('business_steps.step_07.note')
    },
    {
      number: "08",
      title: t('business_steps.step_08.title'),
      items: [
        t('business_steps.step_08.items.0'),
        t('business_steps.step_08.items.1'),
        t('business_steps.step_08.items.2'),
        t('business_steps.step_08.items.3')
      ],
      note: t('business_steps.step_08.note')
    }
  ];

  return (
    <>
      <PageHeader 
        title={t('franchise.title')}
        subtitle={t('franchise.subtitle')}
        locale={locale}
      />

      {/* Business Steps Section */}
      <section id="business-steps" className="section-padding bg-neutral-50 scroll-mt-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t('nav.franchise_items.business_start_steps')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              {t('nav.franchise_items.business_start_steps_subtitle')}
            </p>
            
            {/* PDF Download Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8"
            >
              <BusinessStepsPDF locale={locale} />
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 relative hover:shadow-lg transition-all duration-300 w-full h-[30rem] flex flex-col overflow-hidden"
              >
                {/* Watermark Number in Background */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0, scale: 1.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
                >
                  <span className="text-gray-100 text-9xl font-bold select-none">
                    {step.number}
                  </span>
                </motion.div>

                {/* Small Step Number */}
                <motion.div 
                  className="absolute top-4 right-4 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm z-10"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2 + 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {step.number}
                </motion.div>

                {/* Step Title */}
                <motion.h3 
                  className="text-base font-bold text-gray-900 mb-3 mt-4 pr-16 flex-shrink-0 leading-tight relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                >
                  {step.title}
                </motion.h3>

                {/* Step Items */}
                <ul className="space-y-1.5 mb-3 flex-grow relative z-10">
                  {step.items.map((item, itemIndex) => (
                    <motion.li 
                      key={itemIndex} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.2 + 0.4 + itemIndex * 0.1 
                      }}
                    >
                      <span className="text-gray-600 mr-2 mt-0.5 flex-shrink-0 text-xs">•</span>
                      <span className="text-gray-700 leading-snug text-xs">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Step Note */}
                <motion.div 
                  className="bg-gray-50 border-l-4 border-gray-400 p-2.5 rounded-r-lg flex-shrink-0 mt-auto relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.8 }}
                >
                  <p className="text-xs text-gray-700 leading-snug">
                    <span className="font-semibold">* </span>
                    {step.note}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Information Section */}
      <section id="detailed-info" className="section-padding bg-white scroll-mt-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t('nav.franchise_items.detailed_information')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Франчайзын талаар дэлгэрэнгүй мэдээлэл авахыг хүсвэл бидэнтэй холбогдоорой
            </p>
          </motion.div>
        </div>
        <FranchiseForm locale={locale} />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding bg-neutral-50 scroll-mt-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t('nav.franchise_items.faq')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {t('franchise_faq.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {t.raw('franchise_faq.items').map((faq: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
