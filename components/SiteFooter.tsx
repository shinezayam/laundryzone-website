import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react';

interface SiteFooterProps {
  locale: string;
}

export function SiteFooter({ locale }: SiteFooterProps) {
  const t = useTranslations();

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/images/logos.png" 
                alt="LaundryZone" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-neutral-300 text-sm leading-relaxed">
              {/* {t('footer.company_description')} */}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/laundryzone.mongolia"
                className="text-neutral-400 hover:text-accent-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/laundryzone_mongolia/"
                className="text-neutral-400 hover:text-accent-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('common.quick_links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-neutral-300 hover:text-white transition-colors text-sm"
                >
                  {t('common.about_us')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/competitive-advantage`}
                  className="text-neutral-300 hover:text-white transition-colors text-sm"
                >
                  {t('common.competitive_advantage')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/franchise`}
                  className="text-neutral-300 hover:text-white transition-colors text-sm"
                >
                  {t('common.franchise')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/equipment`}
                  className="text-neutral-300 hover:text-white transition-colors text-sm"
                >
                  {t('common.equipment')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/community`}
                  className="text-neutral-300 hover:text-white transition-colors text-sm"
                >
                  {t('common.community_relations')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('contact.title')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-accent-400" />
                <span className="text-neutral-300 text-sm">+976-7272-2121</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-accent-400" />
                <span className="text-neutral-300 text-sm">laundryzone.mongolia@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-accent-400" />
                <span className="text-neutral-300 text-sm">Ulaanbaatar, Mongolia</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock size={16} className="text-accent-400" />
                <span className="text-neutral-300 text-sm">08:00-24:00</span>
              </div>
            </div>
          </div>

                          {/* Equipment */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{t('common.equipment')}</h3>
            <ul className="space-y-2">
              <li className="text-neutral-300 text-sm">{t('common.self_service_washing')}</li>
              <li className="text-neutral-300 text-sm">{t('common.commercial_dryers')}</li>
              <li className="text-neutral-300 text-sm">{t('common.shoe_washing')}</li>
              <li className="text-neutral-300 text-sm">{t('common.detergent_available')}</li>
              <li className="text-neutral-300 text-sm">{t('common.free_wifi')}</li>
              <li className="text-neutral-300 text-sm">{t('common.cashless_payment')}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                         <p className="text-neutral-400 text-sm">
               © 2025 LaundryZone Mongolia. All rights reserved. Designed by{' '}
               <a
                 href="https://portfolio-sage-xi-54.vercel.app/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-accent-400 hover:text-accent-300 transition-colors font-medium"
               >
                 Shinezaya Myagmar
               </a>
             </p>
            <div className="flex space-x-6">
              <Link
                href={`/${locale}/privacy`}
                className="text-neutral-400 hover:text-white transition-colors text-sm"
              >
                {t('footer.links.privacy')}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-neutral-400 hover:text-white transition-colors text-sm"
              >
                {t('footer.links.terms')}
              </Link>
              <Link
                href={`/${locale}/franchise`}
                className="text-neutral-400 hover:text-white transition-colors text-sm"
              >
                {t('footer.links.franchise')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
