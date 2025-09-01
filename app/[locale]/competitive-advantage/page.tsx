'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';


interface CompetitiveAdvantagePageProps {
  params: { locale: string };
}

export default function CompetitiveAdvantagePage({ params: { locale } }: CompetitiveAdvantagePageProps) {
  const t = useTranslations();

  const advantages = [
    {
      key: 'industry_leader',
      href: `/competitive-advantage/industry-leader`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      key: 'digital_payment',
      href: `/competitive-advantage/digital-payment`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      key: 'expert_team',
      href: `/competitive-advantage/expert-team`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      key: 'international_recognition',
      href: `/competitive-advantage/international-recognition`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <>
      <PageHeader 
        title={t('nav.competitive_advantage')}
        subtitle="LaundryZone Mongolia-ын өрсөлдөх давуу талууд"
        locale={locale}
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                                  <div
                  id={advantage.key.replace('_', '-')}
                  className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-neutral-200 hover:border-accent-300 group scroll-mt-24"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-accent-500 text-white rounded-full flex items-center justify-center group-hover:bg-accent-600 transition-colors duration-300">
                      {advantage.icon}
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 ml-4 group-hover:text-accent-600 transition-colors duration-300">
                      {t(`nav.competitive_advantage_items.${advantage.key}`)}
                    </h3>
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    {advantage.key === 'industry_leader' && "LaundryZone нь Монголын угаалгын үйлчилгээний салбарт тэргүүлэгч байр суурь эзэлдэг, инновацийн технологи болон өндөр чанартай үйлчилгээгээрээ алдартай."}
                    {advantage.key === 'digital_payment' && "Орчин үеийн цахим төлбөрийн систем нь үйлчлүүлэгчдэд хялбар, хурдан, найдвартай төлбөр тооцооны боломжийг олгодог."}
                    {advantage.key === 'expert_team' && "Туршлагатай, мэргэшсэн ажилтны баг нь өдөр бүр танд хамгийн сайн үйлчилгээ үзүүлэхийн төлөө ажилладаг."}
                    {advantage.key === 'international_recognition' && "Олон улсын стандартад нийцсэн үйлчилгээ, Солонгосын технологи ашиглан дэлхийн стандартын үйлчилгээг санал болгож байна."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
