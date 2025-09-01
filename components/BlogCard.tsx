'use client';

import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from './BlogList';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface BlogCardProps {
  post: BlogPost;
  delay?: number;
  locale: string;
}

export function BlogCard({ post, delay = 0, locale }: BlogCardProps) {
  const t = useTranslations('blog');

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <Link href={`/${locale}/blog/${post.id}`} className="block h-full">
        <div className="bg-white rounded-xl shadow-soft border border-neutral-200 overflow-hidden hover:shadow-medium transition-all duration-300 h-full flex flex-col cursor-pointer">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={post.image}
            alt={t(post.titleKey)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-neutral-700">
            {t(post.categoryKey)}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-3 text-xs text-neutral-500">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <User size={12} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-accent-500 transition-colors">
            {t(post.titleKey)}
          </h3>

          {/* Excerpt */}
          <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
            {t(post.excerptKey)}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Read More Indicator */}
          <div className="inline-flex items-center gap-2 text-accent-500 font-medium text-sm group-hover:gap-3 transition-all duration-200 group-hover:text-accent-600">
            {t('read_more')}
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
      </Link>
    </motion.article>
  );
}