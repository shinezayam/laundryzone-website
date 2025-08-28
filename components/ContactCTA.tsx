'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { ContactForm } from './ContactForm';

interface ContactCTAProps {
  locale: string;
}

export function ContactCTA({ locale }: ContactCTAProps) {
  const t = useTranslations();

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.info.phone'),
      value: '+976-72-722-121',
      href: 'tel:+976-72-722-121',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      value: 'laundryzone.mongolia@gmail.com',
      href: 'mailto:laundryzone.mongolia@gmail.com',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: MapPin,
      title: t('contact.info.address'),
      value: 'Ulaanbaatar, Mongolia',
      href: '#',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Clock,
      title: t('contact.info.hours'),
      value: '08:00-00:00',
      href: '#',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">{t('common.get_in_touch')}</h3>
              <p className="text-neutral-300 mb-8 leading-relaxed">
                {t('contact.get_in_touch_desc')}
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-200 group"
                >
                  <div className={`p-3 rounded-lg ${info.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                    <info.icon size={20} className={info.color} />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-200">{info.title}</h4>
                    <p className="text-white font-semibold">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Media */}
            <div className="pt-8 border-t border-neutral-700">
              <h4 className="text-lg font-semibold mb-4">{t('common.follow_us')}</h4>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/laundryzone.mn"
                  className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/laundryzone.mn"
                  className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg transition-all duration-200"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                  </svg>
                </a>
                <a
                  href="https://t.me/laundryzone_mn"
                  className="p-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-200"
                  aria-label="Telegram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: '#000000' }}>{t('common.send_message')}</h3>
              </div>
              
              <ContactForm locale={locale} />
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-8">
                         <h3 className="text-2xl font-bold mb-4">
               {t('common.get_started')}
             </h3>
             <p className="text-accent-100 mb-6 max-w-2xl mx-auto">
               {t('contact.get_in_touch_desc')}
             </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+976-11-123-4567"
                className="bg-gradient-to-br from-white to-neutral-100 text-accent-500 hover:from-neutral-50 hover:to-neutral-200 font-medium py-3 px-6 rounded-2xl transition-all duration-200 inline-flex items-center justify-center"
              >
                <Phone size={20} className="mr-2" />
                                 {t('contact.info.phone')}
               </a>
               <a
                 href="#branches"
                 className="bg-gradient-to-br from-white/20 to-white/10 text-white hover:from-white/30 hover:to-white/20 border border-white/30 font-medium py-3 px-6 rounded-2xl transition-all duration-200 inline-flex items-center justify-center"
               >
                 <MapPin size={20} className="mr-2" />
                 {t('branches.find_nearest')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
