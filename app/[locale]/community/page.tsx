'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';
import { Branches } from '@/components/Branches';
import { BlogCard } from '@/components/BlogCard';
import type { BlogPost } from '@/components/BlogList';
import Image from 'next/image';

interface CommunityPageProps {
  params: { locale: string };
}

export default function CommunityPage({ params: { locale } }: CommunityPageProps) {
  const t = useTranslations();

  // Blog posts data for announcements section
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      slug: 'dust-mites-bed-bugs-mold',
      titleKey: 'posts.dust_mites.title',
      excerptKey: 'posts.dust_mites.excerpt',
      contentKey: 'posts.dust_mites.content',
      author: 'LaundryZone Team',
      date: '2022-01-25',
      categoryKey: 'categories.hygiene',
      image: '/images/Blog/Гэрийн тоосны хачиг, хөгц мөөгөнцөр.png',
      tags: ['hygiene', 'health', 'cleaning'],
      readTime: '5 min'
    },
    {
      id: '2',
      slug: 'new-technology-service',
      titleKey: 'posts.new_technology.title',
      excerptKey: 'posts.new_technology.excerpt',
      contentKey: 'posts.new_technology.content',
      author: 'LaundryZone Team',
      date: '2022-01-25',
      categoryKey: 'categories.company',
      image: '/images/Blog/ШИНЭ ТЕХНОЛОГИ-ЭЕРЭГ ХАНДЛАГА, СОЁЛТОЙ ҮЙЛЧИЛГЭЭ.png',
      tags: ['technology', 'service', 'award'],
      readTime: '4 min'
    },
    {
      id: '3',
      slug: 'bedding-care-habit',
      titleKey: 'posts.bedding_care.title',
      excerptKey: 'posts.bedding_care.excerpt',
      contentKey: 'posts.bedding_care.content',
      author: 'LaundryZone Team',
      date: '2022-01-25',
      categoryKey: 'categories.tips',
      image: '/images/Blog/Хөнжилөө тогтмол угааж хэвшицгээе.png',
      tags: ['bedding', 'care', 'hygiene'],
      readTime: '3 min'
    }
  ];

  return (
    <>
      <PageHeader 
        title={t('nav.community_relations')}
        subtitle="LaundryZone Mongolia хөршүүдтэйгээ харилцах, холбогдох мэдээлэл"
        locale={locale}
      />

      {/* Announcements Section */}
      <section id="announcements" className="section-padding bg-white scroll-mt-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t('nav.community_relations_items.announcements')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              LaundryZone Mongolia-ын хамгийн сүүлийн мэдээ, зарууд болон чухал мэдэгдлүүд
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                delay={index * 0.1}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Branch Locations Section */}
      <section id="branch-locations" className="section-padding bg-neutral-50 scroll-mt-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t('nav.community_relations_items.branch_locations')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Улаанбаатар хот даяарх манай салбаруудын байршил, хаяг, холбогдох мэдээлэл
            </p>
          </motion.div>
        </div>
        <Branches locale={locale} />
      </section>

      {/* Pricing Information Section */}
      <section id="pricing-info" className="section-padding bg-white scroll-mt-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t('nav.community_relations_items.pricing_info')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Бүх төрлийн угаалгын үйлчилгээний үнийн мэдээлэл, хөнгөлөлттэй саналууд
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200"
            >
              <Image
                src="/images/123.png"
                alt="Үйлчилгээний үнийн мэдээлэл 1"
                width={600}
                height={800}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200"
            >
              <Image
                src="/images/1234.png"
                alt="Үйлчилгээний үнийн мэдээлэл 2"
                width={600}
                height={800}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section id="press-releases" className="section-padding bg-neutral-50 scroll-mt-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t('nav.community_relations_items.press_releases')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Хэвлэлийн мэдээ, LaundryZone Mongolia-ын үйл ажиллагаатай холбоотой албан ёсны мэдэгдлүүд
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-neutral-200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-neutral-900">Хэвлэлийн мэдээ {index}</h3>
                    <p className="text-sm text-neutral-500">2025.01.{5 + index}</p>
                  </div>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  LaundryZone Mongolia-ын шинэ технологи, салбар нээлт, түншлэл болон бусад чухал үйл ажиллагаатай холбоотой мэдээ.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
