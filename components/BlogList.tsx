'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { BlogCard } from './BlogCard';
import { Calendar, Tag, User } from 'lucide-react';
import Link from 'next/link';

export interface BlogPost {
  id: string;
  slug: string;
  titleKey: string;
  excerptKey: string;
  contentKey: string;
  author: string;
  date: string;
  categoryKey: string;
  image: string;
  tags: string[];
  readTime: string;
}

interface BlogListProps {
  locale: string;
}

export function BlogList({ locale }: BlogListProps) {
  const t = useTranslations('blog');

  // Real blog posts data from LaundryZone Mongolia
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
    },
    {
      id: '4',
      slug: 'customer-guidelines',
      titleKey: 'posts.customer_guidelines.title',
      excerptKey: 'posts.customer_guidelines.excerpt',
      contentKey: 'posts.customer_guidelines.content',
      author: 'LaundryZone Team',
      date: '2022-01-25',
      categoryKey: 'categories.guidelines',
      image: '/images/Blog/Үйлчлүүлэгчдийн анхааралд.png',
      tags: ['guidelines', 'rules', 'safety'],
      readTime: '6 min'
    },
    {
      id: '5',
      slug: 'dryer-benefits',
      titleKey: 'posts.dryer_benefits.title',
      excerptKey: 'posts.dryer_benefits.excerpt',
      contentKey: 'posts.dryer_benefits.content',
      author: 'LaundryZone Team',
      date: '2022-01-25',
      categoryKey: 'categories.equipment',
      image: '/images/Blog/Яагаад заавал Ландризоны ХАТААХ машин гэж.png',
      tags: ['dryer', 'equipment', 'benefits'],
      readTime: '5 min'
    },
    {
      id: '6',
      slug: 'weight-calculation',
      titleKey: 'posts.weight_calculation.title',
      excerptKey: 'posts.weight_calculation.excerpt',
      contentKey: 'posts.weight_calculation.content',
      author: 'LaundryZone Team',
      date: '2022-01-25',
      categoryKey: 'categories.tips',
      image: '/images/Blog/Угаах хувцасны жинг хэрхэн тооцох вэ.png',
      tags: ['weight', 'calculation', 'tips'],
      readTime: '4 min'
    }
  ];

  const categories = [
    t('categories.all'),
    t('categories.hygiene'),
    t('categories.company'),
    t('categories.tips'),
    t('categories.guidelines'),
    t('categories.equipment')
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container-custom">
        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Link href={`/${locale}/blog/${blogPosts[0].id}`} className="block group">
            <div className="bg-white rounded-2xl shadow-soft border border-neutral-200 overflow-hidden hover:shadow-medium transition-all duration-300 cursor-pointer">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={blogPosts[0].image}
                  alt={t(blogPosts[0].titleKey)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  {t('featured')}
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4 text-sm text-neutral-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag size={16} />
                    <span>{t(blogPosts[0].categoryKey)}</span>
                  </div>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4 group-hover:text-accent-500 transition-colors">
                  {t(blogPosts[0].titleKey)}
                </h2>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {t(blogPosts[0].excerptKey)}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {blogPosts[0].tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-neutral-500">{blogPosts[0].readTime} {t('read')}</span>
                </div>
              </div>
            </div>
            </div>
          </Link>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900">
              {t('recent_posts')}
            </h2>
            <div className="text-sm text-neutral-500">
              {blogPosts.length - 1} {t('posts')}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                delay={index * 0.1}
                locale={locale}
              />
            ))}
          </div>
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-8 lg:p-12 text-white text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              {t('newsletter.title')}
            </h3>
            <p className="text-accent-100 mb-8 max-w-2xl mx-auto">
              {t('newsletter.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 px-4 py-3 rounded-lg text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-3 bg-white text-accent-600 font-medium rounded-lg hover:bg-neutral-50 transition-colors">
                {t('newsletter.subscribe')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}