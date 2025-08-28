'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  locale: string;
}

export function PageHeader({ title, subtitle, locale }: PageHeaderProps) {
  const t = useTranslations();
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-accent-50 via-white to-accent-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
            {t(title)}
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            {t(subtitle)}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
