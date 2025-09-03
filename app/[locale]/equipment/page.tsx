'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';
import { Equipment } from '@/components/Equipment';
import { Services } from '@/components/Services';
import Image from 'next/image';

interface EquipmentPageProps {
  params: { locale: string };
}

export default function EquipmentPage({ params: { locale } }: EquipmentPageProps) {
  const t = useTranslations();

  return (
    <>
      <PageHeader 
        title={t('equipment.title')}
        subtitle={t('equipment.subtitle')}
        locale={locale}
      />

      {/* Washing Machines Section */}
      <section id="washing-machines" className="section-padding bg-white scroll-mt-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t('nav.equipment_items.washing_machines')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Үйлчилгээний тусгай зориулалтын угаалгын машин, дэвшилтэт цэвэрлэгээний технологитой
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 mx-auto ">
            {[
              { name: "LR-18ss TP2", capacity: "18кг", image: "/images/washers/세탁기 LR-18 TP2.png", specs: ["Загвар: LG LR-18 TP2", "Даац: 18кг", "Эрчим хүч: 220V", "Угаах хугацаа: 30-45мин"] },
              { name: "LR-25 TP2", capacity: "25кг", image: "/images/washers/세탁기 LR-25 TP2.png", specs: ["Загвар: LG LR-25 TP2", "Даац: 25кг", "Эрчим хүч: 220V", "Угаах хугацаа: 35-50мин"] },
              { name: "LW-45N", capacity: "45кг", image: "/images/washers/세탁기 LW-45N.png", specs: ["Загвар: LG LW-45N", "Даац: 45кг", "Эрчим хүч: 380V", "Угаах хугацаа: 40-60мин"] },
              { name: "LW-70N", capacity: "70кг", image: "/images/washers/세탁기 LW-70N.png", specs: ["Загвар: LG LW-70N", "Даац: 70кг", "Эрчим хүч: 380V", "Угаах хугацаа: 45-70мин"] }
            ].map((machine, index) => (
              <motion.div
                key={machine.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative rounded-xl shadow-lg border border-neutral-200 overflow-hidden cursor-pointer ${index === 3 ? 'lg:col-start-2' : ''}`}
                style={{ backgroundColor: '#E5E5E5' }}
              >
                <div className="relative h-64 p-6">
                  <Image
                    src={machine.image}
                    alt={machine.name}
                    fill
                    className="object-contain transition-opacity duration-300 group-hover:opacity-30"
                  />
                </div>
                
                {/* Specifications overlay - hidden by default, shown on hover for desktop */}
                <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                  <h3 className="text-xl font-bold text-white mb-4 text-center">{machine.name}</h3>
                  <ul className="space-y-2 text-white text-center">
                    {machine.specs.map((spec, specIndex) => (
                      <li key={specIndex} className="text-sm">{spec}</li>
                    ))}
                  </ul>
                </div>

                {/* Mobile-only specifications - always visible on mobile */}
                <div className="lg:hidden bg-black bg-opacity-90 p-4">
                  <h3 className="text-lg font-bold text-white mb-2 text-center">{machine.name}</h3>
                  <p className="text-white text-center text-sm font-semibold">{machine.capacity}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dryer Machines Section */}
      <section id="dryer-machines" className="section-padding bg-neutral-50 scroll-mt-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t('nav.equipment_items.dryer_machines')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Чийгшил мэдрэгч, температур хяналттай өндөр хурдны коммерцийн хатаагч
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-start-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group relative rounded-xl shadow-lg border border-neutral-200 overflow-hidden cursor-pointer w-full"
                style={{ backgroundColor: '#E5E5E5' }}
              >
                <div className="relative h-64 p-6">
                  <Image
                    src="/images/dryers/ctn.png"
                    alt="CTN-50 хатаагч машин"
                    fill
                    className="object-contain transition-opacity duration-300 group-hover:opacity-30"
                  />
                </div>
                
                {/* Specifications overlay - hidden by default, shown on hover for desktop */}
                <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                  <h3 className="text-xl font-bold text-white mb-4 text-center">CTN-50(전기)<br/><span className="text-lg">CTN-50 (Цахилгаан)</span></h3>
                  <ul className="space-y-2 text-white text-center">
                    <li className="text-sm">Хатаах даац: 25кг</li>
                    <li className="text-sm">Хэмжээ: 993×1,200×1,830мм</li>
                    <li className="text-sm">Эрчим хүч: 15.2kW</li>
                    <li className="text-sm">Цахилгаан халаагч: 14.4kW</li>
                    <li className="text-sm">Жин: 370кг</li>
                  </ul>
                </div>

                {/* Mobile-only specifications - always visible on mobile */}
                <div className="lg:hidden bg-black bg-opacity-90 p-4">
                  <h3 className="text-lg font-bold text-white mb-2 text-center">CTN-50(전기)<br/><span className="text-sm">CTN-50 (Цахилгаан)</span></h3>
                  <p className="text-white text-center text-sm font-semibold">25кг</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Shoe Washing Machines Section */}
      <section id="shoe-washing-machines" className="section-padding bg-white scroll-mt-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t('nav.equipment_items.shoe_washing_machines')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Гутал цэвэрлэхэд зориулж тусгайлан зохион бүтээсэн тоног төхөөрөмж
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-start-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group relative rounded-xl shadow-lg border border-neutral-200 overflow-hidden cursor-pointer w-full"
                style={{ backgroundColor: '#E5E5E5' }}
              >
                <div className="relative h-64 p-6">
                  <Image
                    src="/images/washers/shoe.png"
                    alt="Гутлын угаалгын машин"
                    fill
                    className="object-contain transition-opacity duration-300 group-hover:opacity-30"
                  />
                </div>
                
                {/* Specifications overlay - hidden by default, shown on hover for desktop */}
                <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                  <h3 className="text-xl font-bold text-white mb-4 text-center">운동화 세탁기<br/><span className="text-lg">Гутлын угаалгын машин</span></h3>
                  <ul className="space-y-2 text-white text-center">
                    <li className="text-sm">Угаах даац: 6 хос гутал</li>
                    <li className="text-sm">Хэмжээ: 762×826×1083мм</li>
                    <li className="text-sm">Хүчин чадал: 3HP / 2.2KW</li>
                    <li className="text-sm">Угаах эргэлт: 47rpm</li>
                  </ul>
                </div>

                {/* Mobile-only specifications - always visible on mobile */}
                <div className="lg:hidden bg-black bg-opacity-90 p-4">
                  <h3 className="text-lg font-bold text-white mb-2 text-center">운동화 세탁기<br/><span className="text-sm">Гутлын угаалгын машин</span></h3>
                  <p className="text-white text-center text-sm font-semibold">6 хос гутал</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Shoe Dryer Machines Section */}
      <section id="shoe-dryer-machines" className="section-padding bg-neutral-50 scroll-mt-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t('nav.equipment_items.shoe_dryer_machines')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Гутлын хатаалтад зориулсан тусгай хатаагч машинууд
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-start-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group relative rounded-xl shadow-lg border border-neutral-200 overflow-hidden cursor-pointer w-full"
                style={{ backgroundColor: '#E5E5E5' }}
              >
                <div className="relative h-64 p-6">
                  <Image
                    src="/images/dryers/shoe.png"
                    alt="Гутлын хатаагч машин"
                    fill
                    className="object-contain transition-opacity duration-300 group-hover:opacity-30"
                  />
                </div>
                
                {/* Specifications overlay - hidden by default, shown on hover for desktop */}
                <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                  <h3 className="text-xl font-bold text-white mb-4 text-center">운동화 건조기<br/><span className="text-lg">Гутлын хатаагч машин</span></h3>
                  <ul className="space-y-2 text-white text-center">
                    <li className="text-sm">Хатаах даац: 6 хос гутал</li>
                    <li className="text-sm">Хэмжээ: 767×750×900мм</li>
                    <li className="text-sm">Эрчим хүч: 2.6KW</li>
                    <li className="text-sm">Жин: 58.5кг</li>
                    <li className="text-sm">Салхины хурд: 3.6-4.0 м³/мин</li>
                  </ul>
                </div>

                {/* Mobile-only specifications - always visible on mobile */}
                <div className="lg:hidden bg-black bg-opacity-90 p-4">
                  <h3 className="text-lg font-bold text-white mb-2 text-center">운동화 건조기<br/><span className="text-sm">Гутлын хатаагч машин</span></h3>
                  <p className="text-white text-center text-sm font-semibold">6 хос гутал</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Equipment Section */}
      <section id="other-equipment" className="section-padding bg-white scroll-mt-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t('nav.equipment_items.other_equipment')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Бусад нэмэлт тоног төхөөрөмж, туслах багаж хэрэгсэл
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Ариутгалын тоног төхөөрөмж",
                description: "Ариун цэврийн мэргэжлийн ариутгалын машинууд",
                icon: "🧼"
              },
              {
                title: "Угаалгын нунтагны автомат машин",
                description: "Автомат угаалгын нунтаг олгох машин, олон төрлийн угаалгын нунтаг",
                icon: "🥤"
              },
              {
                title: "Wi-Fi систем",
                description: "Үнэгүй Wi-Fi холболт болон хүлээлгийн хэсэг, үйлчлүүлэгчдийн тав тухыг хангах үүднээс",
                icon: "📶"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-neutral-200"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}