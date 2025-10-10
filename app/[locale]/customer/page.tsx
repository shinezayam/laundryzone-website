'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function CustomerPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-44 lg:pt-52 pb-16 bg-gradient-to-br from-accent-500 to-accent-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('nav.customer')}
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
              Coming soon...
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}