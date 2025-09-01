'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';
import { FranchiseForm } from '@/components/FranchiseForm';

interface FranchisePageProps {
  params: { locale: string };
}

export default function FranchisePage({ params: { locale } }: FranchisePageProps) {
  const t = useTranslations();

  const businessSteps = [
    {
      number: "01",
      title: "Бизнесийн танилцуулга ба Бизнес эхлүүлэх зөвлөгөө",
      items: [
        "Салбаруудаар зочлож тоног төхөөрөмжтэй танилцах",
        "Гэрээний нөхцөлүүдтэй танилцах ба бизнесийн алсын харааг ярилцах",
        "Салбар эрхлэхтэй холбоотой урьдчилсан суурь мэдлэг олгох зөвлөгөө",
        "Бизнесийн загварын тайлбар"
      ],
      note: "Хувь хүний хөрөнгийн байдал, худалдааны ур чадвар болон мэдлэгийн түвшнээс хамааран төв оффисын хариуцсан борлуулалтын баг таньд тохируулсан зөвлөгөөг өгнө."
    },
    {
      number: "02",
      title: "Байршил сонголт ба салбар эрхлэх бүсийн шинжилгээ",
      items: [
        "Байршлын судалгаа",
        "Хэрэглэгчийн судалгаа, байршлын онцлог, ижил төрлийн болон бусад салбарын нөхцөл байдлын судалгаа",
        "Ашгийн түвшин таамаглах шинжилгээ",
        "Үйл ажиллагаа эрхлэхтэй холбоотой зөвшөөрлийн судалгаа"
      ],
      note: "Монгол Улсад хамгийн анхны өөртөө үйлчлэх угаалгын үйлчилгээг амжилттай нэвтрүүлж чадсан арвин туршлагатай баг хамт олон өөрсдийн мэдлэг, мэдээллийн бааздаа тулгуурлан эзэмшигч танд хамгийн тохиромжтой байршлын нөхцөл ба эрэлтэт бүсийг шинжилж санал болгоно."
    },
    {
      number: "03",
      title: "Салбарын судалгаа",
      items: [
        "Төлөвлөсөн салбарын үнэлгээ",
        "Тоног төхөөрөмж болон дотоод засал чимэглэлийн үнийн санал",
        "Дотоод засал чимэглэлийн зураг төсөл (санаа, загвар) танилцуулах",
        "Тоног төхөөрөмж суурилуулалтын эцсийн дүгнэлт гаргах"
      ],
      note: "Салбарт суурилагдах тоног төхөөрөмжийн нарийвчилсан үнэлгээ болон зураг төслийн саналыг гаргаж, хамгийн оновчтой өөртөө үйлчлэх угаалгын газар байгуулах төлөвлөгөөг боловсруулна."
    },
    {
      number: "04",
      title: "Дэлгүүр түрээсийн гэрээ ба угаалгын тоног төхөөрөмж худалдан авах гэрээ",
      items: [
        "Гэрээ бичиг боловсруулах",
        "Салбарын онцлог нөхцөлүүдийг зөвшилцөх, шалгах",
        "Салбар нээх ажлын \"баг\"ийн уулзалт (Дизайн / Хяналт / Барилга угсралт / Програмчлал / Маркетинг)",
        "Дотоод засал чимэглэлийн зураг төслийн эцсийн баталгаажуулалт"
      ],
      note: "Угаалгын газрын мэргэшсэн барилга угсралтын компанийн оролцоотойгоор төгс барилгын ажлыг гүйцэтгэж өгнө. Эсвэл \"салбар эрхлэгч\" төв компаниас өгсөн чиглүүлгийн дагуу өөрийн хүн хүчээрээ заслын ажлаа гүйцэтгэж болно."
    },
    {
      number: "05",
      title: "Талбай дээрх барилга угсралт",
      items: [
        "Тоног төхөөрөмжийн нийлүүлэлт",
        "Угаалгын тоног төхөөрөмж болон хатаах төхөөрөмжийн суурилуулалт",
        "Өөртөө үйлчлэх угаалгын газрын төрөл бүрийн байгууламжийн угсралт"
      ],
      note: "Барилгын ажлын эхний шатанд эзэмшигчтэй тогтмол харилцаж, гүйцэтгэлийн явцыг зөвшилцөнө."
    },
    {
      number: "06",
      title: "Барилгын ажлын явц",
      items: [
        "Тоног төхөөрөмжийн угсралт, суурилуулалтын ажил",
        "Дотоод засал чимэглэлийн ажил",
        "Тоног төхөөрөмжийг тогтмол шалгах",
        "Туршилтын ажиллагаа явуулах"
      ],
      note: "Дотор заслыг хийж байх явцад тоног төхөөрөмжийг тогтмол шалгаж, нээлтийн бэлтгэл ажлыг саадгүй үргэлжлүүлэн хийх нөхцөлөөр хангана."
    },
    {
      number: "07",
      title: "Туршилтын нээлт ба Албан ёсны нээлт",
      items: [
        "Тоног төхөөрөмж / Системийн яаралтай ажиллагааны сургалт",
        "Салбар эзэмшигч, менежерүүдэд үйл ажиллагаа эрхлэхэд шаардагатай суурь мэдлэгийн сургалтыг газар дээр нь олгоно",
        "Системийн Маркетингийн тохиргоог бүрэн хийж гүйцэтгэнэ"
      ],
      note: "Өөртөө үйлчлэх угаалгын газрын үйл ажиллагаатай холбоотой сургалт явагдаж, албан ёсны нээлт эхэлнэ."
    },
    {
      number: "08",
      title: "Үйл ажиллагаа эхлүүлэх",
      items: [
        "Албан ёсны нээлт",
        "Нээлтийн арга хэмжээ",
        "Борлуулалт удирдах ба маркетингийн дэмжлэг",
        "Эхний нэг сарын хугацаанд тогтмол хяналт тавьж удирдлага чиглүүлэг өгнө"
      ],
      note: "Салбар эзэмшигчтэй тогтмол харилцаатай байж, зөвшилцлөөр үйл ажиллагааг саадгүй гүйцэтгэхэд тусална."
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
              Лондризоны франчайз эрх авах - Бизнес эхлүүлэх үе шат
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              LaundryZone франчайзын бизнес эхлүүлэх алхам алхмын процесс
            </p>
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
              Франчайзтай холбоотой түгээмэл асуултууд болон хариулт
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "Франчайз эхлүүлэхэд хэр их хөрөнгө шаардагдах вэ?",
                answer: "Франчайзын хөрөнгө оруулалт нь байршил, салбарын хэмжээ болон тоног төхөөрөмжийн тооноос хамаарна. Дэлгэрэнгүй мэдээллийг бидэнтэй холбогдож авна уу."
              },
              {
                question: "Хэр хугацаанд эргэн төлөгдөх вэ?",
                answer: "Ерөнхийдөө 2-3 жилийн хугацаанд эргэн төлөгддөг боловч энэ нь байршил, удирдлага болон зах зээлийн нөхцөл байдлаас хамаарна."
              },
              {
                question: "Ямар дэмжлэг үзүүлдэг вэ?",
                answer: "Бид танд байршил сонголт, тоног төхөөрөмж суурилуулалт, сургалт, маркетинг болон үйл ажиллагааны бүхий л шатанд бүрэн дэмжлэг үзүүлнэ."
              },
              {
                question: "Гэрээний хугацаа хэд вэ?",
                answer: "Франчайзын гэрээ ерөнхийдөө 5-10 жилийн хугацаатай байдаг бөгөөд сунгах боломжтой."
              }
            ].map((faq, index) => (
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
