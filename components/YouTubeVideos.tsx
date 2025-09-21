'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface YouTubeVideosProps {
  locale: string;
}

export function YouTubeVideos({ locale }: YouTubeVideosProps) {
  const t = useTranslations();

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {locale === 'mn' ? 'Бидний үйлчилгээ' : 
             locale === 'kr' ? '우리의 서비스' : 
             'Our Service'}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {locale === 'mn' ? 'LaundryZone-ийн өөртөө үйлчлэх угаалгын газрын үйлчилгээний талаар дэлгэрэнгүй мэдээлэл' : 
             locale === 'kr' ? 'LaundryZone 셀프 서비스 세탁소 서비스에 대한 자세한 정보' : 
             'Learn more about LaundryZone\'s self-service laundry services'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Main YouTube Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/RI3KBcDgZy0?si=5vu8m_GIn_K4J2KH"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {locale === 'mn' ? 'LaundryZone үйлчилгээний танилцуулга' : 
                 locale === 'kr' ? 'LaundryZone 서비스 소개' : 
                 'LaundryZone Service Introduction'}
              </h3>
              <p className="text-neutral-600">
                {locale === 'mn' ? 'Манай өөртөө үйлчлэх угаалгын газрын үйлчилгээний талаар дэлгэрэнгүй мэдээлэл' : 
                 locale === 'kr' ? '셀프 서비스 세탁소 서비스에 대한 자세한 정보' : 
                 'Detailed information about our self-service laundry services'}
              </p>
            </div>
          </motion.div>

          {/* YouTube Short */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="aspect-[9/16] max-w-sm mx-auto">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/0zSFVc7qyAY?si=hYBzkOeiNt1MIohP"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {locale === 'mn' ? 'LaundryZone Short' : 
                 locale === 'kr' ? 'LaundryZone 숏' : 
                 'LaundryZone Short'}
              </h3>
              <p className="text-neutral-600">
                {locale === 'mn' ? 'Богино хугацааны видео - манай үйлчилгээний хурдан танилцуулга' : 
                 locale === 'kr' ? '짧은 영상 - 우리 서비스의 빠른 소개' : 
                 'Quick introduction to our services in a short format'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://www.youtube.com/@laundryzone"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 text-lg font-semibold shadow-lg hover:shadow-xl"
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            {locale === 'mn' ? 'YouTube-д бүртгүүлэх' : 
             locale === 'kr' ? 'YouTube 구독하기' : 
             'Subscribe on YouTube'}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
