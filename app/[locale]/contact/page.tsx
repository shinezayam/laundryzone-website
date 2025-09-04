import { getTranslations } from 'next-intl/server';
import { PageHeader } from '@/components/PageHeader';
import { ContactForm } from '@/components/ContactForm';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

interface ContactPageProps {
  params: { locale: string };
}

export default async function ContactPage({ params: { locale } }: ContactPageProps) {
  const t = await getTranslations();

  return (
    <>
      <PageHeader 
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
        locale={locale}
      />
      
      <section className="section-padding bg-gradient-to-br from-white to-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  {t('common.get_in_touch')}
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {t('contact.get_in_touch_desc')}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl">
                  <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                    <Phone size={24} className="text-accent-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{t('contact.info.phone')}</h3>
                    <p className="text-neutral-600">+976-7272-2121</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl">
                  <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                    <Mail size={24} className="text-accent-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{t('contact.info.email')}</h3>
                    <p className="text-neutral-600">laundryzone.mongolia@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl">
                  <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                    <MapPin size={24} className="text-accent-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{t('contact.info.address')}</h3>
                    <p className="text-neutral-600">БЗД, 36-р хороо, Санни таун ү/4Б тоот</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl">
                  <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                    <Clock size={24} className="text-accent-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{t('contact.info.hours')}</h3>
                    <p className="text-neutral-600">08:00 - 24:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">{t('common.send_message')}</h3>
              </div>
              
              <ContactForm locale={locale} variant="light" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
