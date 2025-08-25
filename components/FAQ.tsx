'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import faqData from '@/data/faq.json';

interface FAQProps {
  locale: string;
}

interface FAQItem {
  id: string;
  q: {
    mn: string;
    en: string;
    kr: string;
  };
  a: {
    mn: string;
    en: string;
    kr: string;
  };
}

export function FAQ({ locale }: FAQProps) {
  const t = useTranslations();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const getLocalizedText = (obj: { mn: string; en: string; kr: string }) => {
    return obj[locale as keyof typeof obj] || obj.en;
  };

  const renderText = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.trim().startsWith('•')) {
        return (
          <li key={index} className="ml-4 text-neutral-600 leading-relaxed">
            {line.trim().substring(1).trim()}
          </li>
        );
      }
      return (
        <p key={index} className="text-neutral-600 leading-relaxed mb-2">
          {line}
        </p>
      );
    });
  };

  return (
    <section className="section-padding bg-gradient-to-br from-white to-neutral-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-full mb-6">
            <HelpCircle size={32} className="text-accent-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          {faqData.map((item: FAQItem, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full text-left bg-gradient-to-br from-neutral-50 to-neutral-100 hover:from-neutral-100 hover:to-neutral-200 rounded-2xl p-6 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
                aria-expanded={openItems.has(item.id)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-neutral-900 pr-4">
                    {getLocalizedText(item.q)}
                  </h3>
                  <motion.div
                    animate={{ rotate: openItems.has(item.id) ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                  >
                    <ChevronDown
                      size={20}
                      className="text-neutral-500"
                    />
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {openItems.has(item.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ 
                        duration: 0.4, 
                        ease: [0.4, 0.0, 0.2, 1],
                        opacity: { duration: 0.3 },
                        height: { duration: 0.4 }
                      }}
                      className="mt-4 pt-4 border-t border-neutral-200 overflow-hidden"
                    >
                      <motion.div 
                        className="text-neutral-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        {renderText(getLocalizedText(item.a))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
                     <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              {t('faq.still_have_questions')}
            </h3>
            <p className="text-neutral-600 mb-6">
              {t('faq.contact_description')}
            </p>
            <a
              href={`/${locale}/contact`}
              className="btn-primary inline-flex items-center justify-center"
            >
              {t('contact.title')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
