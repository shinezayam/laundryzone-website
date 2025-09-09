'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageSwitcher } from './LanguageSwitcher';

interface SiteHeaderProps {
  locale: string;
}

export function SiteHeader({ locale }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const t = useTranslations();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: `/${locale}/about`, label: t('nav.about') },
    { 
      key: 'competitive_advantage',
      label: t('nav.competitive_advantage'),
      dropdown: [
        { href: `/${locale}/competitive-advantage#industry-leader`, label: t('nav.competitive_advantage_items.industry_leader') },
        { href: `/${locale}/competitive-advantage#digital-payment`, label: t('nav.competitive_advantage_items.digital_payment') },
        { href: `/${locale}/competitive-advantage#expert-team`, label: t('nav.competitive_advantage_items.expert_team') },
        { href: `/${locale}/competitive-advantage#international-recognition`, label: t('nav.competitive_advantage_items.international_recognition') },
      ]
    },
    { 
      key: 'franchise',
      label: t('nav.franchise'),
      dropdown: [
        { href: `/${locale}/franchise#business-steps`, label: t('nav.franchise_items.business_start_steps') },
        { href: `/${locale}/franchise#detailed-info`, label: t('nav.franchise_items.detailed_information') },
        { href: `/${locale}/franchise#faq`, label: t('nav.franchise_items.faq') },
      ]
    },
    { 
      key: 'equipment',
      label: t('nav.equipment'),
      dropdown: [
        { href: `/${locale}/equipment#washing-machines`, label: t('nav.equipment_items.washing_machines') },
        { href: `/${locale}/equipment#dryer-machines`, label: t('nav.equipment_items.dryer_machines') },
        { href: `/${locale}/equipment#shoe-washing-machines`, label: t('nav.equipment_items.shoe_washing_machines') },
        { href: `/${locale}/equipment#shoe-dryer-machines`, label: t('nav.equipment_items.shoe_dryer_machines') },
        { href: `/${locale}/equipment#other-equipment`, label: t('nav.equipment_items.other_equipment') },
      ]
    },
    { 
      key: 'community_relations',
      label: t('nav.community_relations'),
      dropdown: [
        { href: `/${locale}/community#press-releases`, label: t('nav.community_relations_items.press_releases') },
        { href: `/${locale}/community#announcements`, label: t('nav.community_relations_items.announcements') },
        { href: `/${locale}/community#branch-locations`, label: t('nav.community_relations_items.branch_locations') },
        { href: `/${locale}/community#pricing-info`, label: t('nav.community_relations_items.pricing_info') },
      ]
    },
  ];

  const isActive = (href?: string, key?: string) => {
    if (href) {
      if (href === `/${locale}`) {
        return pathname === `/${locale}`;
      }
      return pathname.startsWith(href);
    }
    if (key) {
      // Check if any dropdown item is active
      const item = navItems.find(nav => nav.key === key);
      if (item && item.dropdown) {
        return item.dropdown.some(subItem => pathname.startsWith(subItem.href));
      }
    }
    return false;
  };

  const handleDropdownToggle = (key: string) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const handleMouseEnter = (key: string) => {
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-12 lg:h-14">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center justify-center">
            <img 
              src="/images/logos.png" 
              alt="LaundryZone" 
              className="h-8 w-auto object-contain align-middle -translate-y-1"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              if (item.dropdown) {
                return (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.key!)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className={`relative flex items-center px-2 py-2 text-xs font-medium transition-colors duration-200 ${
                        isActive(undefined, item.key)
                          ? 'text-accent-500'
                          : 'text-neutral-700 hover:text-accent-500'
                      }`}
                    >
                      {item.label}
                      <ChevronDown 
                        size={18} 
                        className={`ml-1 transition-transform duration-200 ${
                          activeDropdown === item.key ? 'rotate-180' : ''
                        }`}
                      />
                      {isActive(undefined, item.key) && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === item.key && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-lg border border-neutral-200 overflow-hidden z-50"
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              className={`block px-3 py-2 text-xs transition-colors duration-200 ${
                                isActive(dropdownItem.href)
                                  ? 'text-accent-500 bg-accent-50'
                                  : 'text-neutral-700 hover:text-accent-500 hover:bg-neutral-50'
                              }`}
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              } else {
                return (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className={`relative px-2 py-2 text-xs font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-accent-500'
                        : 'text-neutral-700 hover:text-accent-500'
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              }
            })}
          </nav>

          {/* Desktop CTA and Language Switcher */}
          <div className="hidden lg:flex items-center space-x-2">
            <LanguageSwitcher currentLocale={locale} />
            <Link
              href={`/${locale}/contact`}
              className="btn-primary text-xs font-semibold"
            >
              {t('nav.contact')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-accent-500 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-neutral-200"
          >
            <div className="container-custom py-6">
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => {
                  if (item.dropdown) {
                    return (
                      <div key={item.key} className="space-y-2">
                        <button
                          onClick={() => handleDropdownToggle(item.key!)}
                          className={`w-full flex items-center justify-between px-4 py-2 text-xs font-medium transition-colors duration-200 ${
                            isActive(undefined, item.key)
                              ? 'text-accent-500 bg-gradient-to-br from-accent-50 to-accent-100 rounded-lg'
                              : 'text-neutral-700 hover:text-accent-500'
                          }`}
                        >
                          {item.label}
                          <ChevronDown 
                            size={16} 
                            className={`transition-transform duration-200 ${
                              activeDropdown === item.key ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === item.key && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-1"
                            >
                              {item.dropdown.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.href}
                                  href={dropdownItem.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className={`block px-4 py-1.5 text-xs transition-colors duration-200 rounded-lg ${
                                    isActive(dropdownItem.href)
                                      ? 'text-accent-500 bg-accent-50'
                                      : 'text-neutral-600 hover:text-accent-500 hover:bg-neutral-50'
                                  }`}
                                >
                                  {dropdownItem.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  } else {
                    return (
                      <Link
                        key={item.href}
                        href={item.href!}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`px-4 py-2 text-xs font-medium transition-colors duration-200 ${
                          isActive(item.href)
                            ? 'text-accent-500 bg-gradient-to-br from-accent-50 to-accent-100 rounded-lg'
                            : 'text-neutral-700 hover:text-accent-500'
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  }
                })}
                <div className="pt-6 border-t border-neutral-200">
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm text-neutral-500">{t('common.language')}</span>
                    <LanguageSwitcher currentLocale={locale} />
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
