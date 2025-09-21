'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageSwitcher } from './LanguageSwitcher';

interface SiteHeaderProps {
  locale: string;
}

export function SiteHeader({ locale }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const t = useTranslations();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Top row navigation items
  const topNavItems = [
    { href: `/${locale}/about`, label: t('nav.about') },
    {
      key: 'competitive_advantage',
      href: `/${locale}/competitive-advantage`,
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
      href: `/${locale}/franchise`,
      label: t('nav.franchise'),
      dropdown: [
        { href: `/${locale}/franchise#business-steps`, label: t('nav.franchise_items.business_start_steps') },
        { href: `/${locale}/franchise#detailed-info`, label: t('nav.franchise_items.detailed_information') },
        { href: `/${locale}/franchise#faq`, label: t('nav.franchise_items.faq') },
      ]
    },
    { href: `/${locale}/human-resources`, label: t('nav.human_resources') },
  ];

  // Bottom row navigation items
  const bottomNavItems = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/community#branch-locations`, label: t('nav.branch_locations') },
    {
      key: 'equipment',
      href: `/${locale}/equipment`,
      label: t('nav.equipment'),
      dropdown: [
        { href: `/${locale}/equipment#washing-machines`, label: t('nav.equipment_items.washing_machines') },
        { href: `/${locale}/equipment#dryer-machines`, label: t('nav.equipment_items.dryer_machines') },
        { href: `/${locale}/equipment#shoe-washing-machines`, label: t('nav.equipment_items.shoe_washing_machines') },
        { href: `/${locale}/equipment#shoe-dryer-machines`, label: t('nav.equipment_items.shoe_dryer_machines') },
        { href: `/${locale}/equipment#other-equipment`, label: t('nav.equipment_items.other_equipment') },
      ]
    },
    { href: `/${locale}/customer`, label: t('nav.customer') },
    { href: `/${locale}/contact`, label: t('nav.contact') },
  ];

  const allNavItems = [...topNavItems, ...bottomNavItems];

  // Create a flattened list of all menu items for search
  const allMenuItems = useMemo(() => {
    const items: Array<{ href: string; label: string; category: string }> = [];
    
    allNavItems.forEach(item => {
      // Add main item
      items.push({
        href: item.href,
        label: item.label,
        category: item.key === 'competitive_advantage' ? 'Competitive Advantage' :
                 item.key === 'franchise' ? 'Franchise' :
                 item.key === 'equipment' ? 'Equipment' : 'Main Menu'
      });
      
      // Add dropdown items
      if (item.dropdown) {
        item.dropdown.forEach(subItem => {
          items.push({
            href: subItem.href,
            label: subItem.label,
            category: item.label
          });
        });
      }
    });
    
    return items;
  }, [allNavItems, t]);

  // Filter menu items based on search query
  const filteredMenuItems = useMemo(() => {
    if (!searchQuery.trim()) return allMenuItems;
    
    const query = searchQuery.toLowerCase();
    return allMenuItems.filter(item => 
      item.label.toLowerCase().includes(query) ||
      item.href.toLowerCase().includes(query)
    );
  }, [searchQuery, allMenuItems]);

  const isActive = (href?: string, key?: string) => {
    if (href) {
      if (href === `/${locale}`) {
        return pathname === `/${locale}`;
      }
      return pathname.startsWith(href);
    }
    if (key) {
      // Check if any dropdown item is active
      const item = allNavItems.find(nav => nav.key === key);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsSearchActive(e.target.value.length > 0);
  };

  const handleSearchFocus = () => {
    setIsSearchActive(true);
  };

  const handleSearchBlur = () => {
    // Delay hiding to allow clicking on search results
    setTimeout(() => {
      setIsSearchActive(false);
      setSearchQuery('');
    }, 200);
  };

  const handleSearchItemClick = () => {
    setIsSearchActive(false);
    setSearchQuery('');
  };

  const renderNavItem = (item: any, isBottomRow = false) => {
    if (item.dropdown) {
      return (
        <div
          key={item.key}
          className="relative"
          onMouseEnter={() => handleMouseEnter(item.key!)}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href={item.href}
            className={`relative flex items-center px-4 py-3 text-sm font-semibold transition-colors duration-200 hover:scale-105 ${
              isBottomRow
                ? isActive(item.href) || isActive(undefined, item.key)
                  ? 'text-white bg-white/20 rounded-lg'
                  : 'text-white hover:text-white hover:bg-white/10 rounded-lg'
                : isActive(item.href) || isActive(undefined, item.key)
                  ? 'text-accent-500'
                  : 'text-neutral-700 hover:text-accent-500'
            }`}
          >
            {item.label}
            <ChevronDown
              size={18}
              className={`ml-2 transition-transform duration-200 ${
                activeDropdown === item.key ? 'rotate-180' : ''
              }`}
            />
            {!isBottomRow && (isActive(item.href) || isActive(undefined, item.key)) && (
              <motion.div
                layoutId="activeTabTop"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>

          <AnimatePresence>
            {activeDropdown === item.key && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-1 w-72 bg-white shadow-lg rounded-lg border border-neutral-200 overflow-hidden z-50"
              >
                {item.dropdown.map((dropdownItem: any) => (
                  <Link
                    key={dropdownItem.href}
                    href={dropdownItem.href}
                    className={`block px-4 py-3 text-sm transition-colors duration-200 ${
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
          className={`relative px-4 py-3 text-sm font-semibold transition-colors duration-200 hover:scale-105 ${
            isBottomRow
              ? isActive(item.href)
                ? 'text-white bg-white/20 rounded-lg'
                : 'text-white hover:text-white hover:bg-white/10 rounded-lg'
              : isActive(item.href)
                ? 'text-accent-500'
                : 'text-neutral-700 hover:text-accent-500'
          }`}
        >
          {item.label}
          {!isBottomRow && isActive(item.href) && (
            <motion.div
              layoutId="activeTabTop"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </Link>
      );
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
    >
      {/* Top Row - White Background */}
      <div className={`transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-white'
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center">
              <img
                src="/images/logos.png"
                alt="LaundryZone"
                className="h-8 lg:h-10 w-auto object-contain"
              />
            </Link>

            {/* Desktop Top Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {topNavItems.map((item) => renderNavItem(item, false))}
            </nav>

            {/* Language Switcher */}
            <div className="hidden lg:flex items-center">
              <LanguageSwitcher currentLocale={locale} />
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
      </div>

      {/* Bottom Row - Orange Background */}
      <div className="bg-accent-500 hidden lg:block">
        <div className="container-custom">
          <div className="flex items-center justify-between h-12">
            {/* Bottom Navigation - aligned with logo */}
            <nav className="flex items-center space-x-8">
              {bottomNavItems.map((item) => renderNavItem(item, true))}
            </nav>

            {/* Search functionality */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="flex items-center bg-white/20 rounded-lg px-3 py-2">
                  <input
                    type="text"
                    placeholder={t('common.search') || 'Search...'}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    className="bg-transparent text-white placeholder-white/70 text-sm border-none outline-none w-48"
                  />
                  <Search className="text-white/70 w-4 h-4 ml-2" />
                </div>

                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {isSearchActive && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-neutral-200 max-h-96 overflow-y-auto z-50"
                    >
                      <div className="p-2">
                        {filteredMenuItems.length > 0 ? (
                          <div className="space-y-1">
                            {filteredMenuItems.map((item, index) => (
                              <Link
                                key={`${item.href}-${index}`}
                                href={item.href}
                                onClick={handleSearchItemClick}
                                className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors group"
                              >
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-neutral-900 group-hover:text-accent-600">
                                    {item.label}
                                  </div>
                                  <div className="text-xs text-neutral-500 mt-1">
                                    {item.category}
                                  </div>
                                </div>
                                <div className="text-xs text-neutral-400 ml-2">
                                  {item.href.replace(`/${locale}`, '') || '/'}
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : searchQuery.trim() ? (
                          <div className="p-4 text-center text-neutral-500 text-sm">
                            No results found for "{searchQuery}"
                          </div>
                        ) : (
                          <div className="p-4 text-center text-neutral-500 text-sm">
                            Start typing to search menu items...
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
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
              {/* Mobile Search */}
              <div className="mb-6">
                <div className="relative">
                  <div className="flex items-center bg-neutral-100 rounded-lg px-3 py-2">
                    <input
                      type="text"
                      placeholder={t('common.search') || 'Search...'}
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                      className="bg-transparent text-neutral-900 placeholder-neutral-500 text-sm border-none outline-none w-full"
                    />
                    <Search className="text-neutral-500 w-4 h-4 ml-2" />
                  </div>

                  {/* Mobile Search Results */}
                  <AnimatePresence>
                    {isSearchActive && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-neutral-200 max-h-64 overflow-y-auto z-50"
                      >
                        <div className="p-2">
                          {filteredMenuItems.length > 0 ? (
                            <div className="space-y-1">
                              {filteredMenuItems.map((item, index) => (
                                <Link
                                  key={`mobile-${item.href}-${index}`}
                                  href={item.href}
                                  onClick={() => {
                                    handleSearchItemClick();
                                    setIsMobileMenuOpen(false);
                                  }}
                                  className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors group"
                                >
                                  <div className="flex-1">
                                    <div className="text-sm font-medium text-neutral-900 group-hover:text-accent-600">
                                      {item.label}
                                    </div>
                                    <div className="text-xs text-neutral-500 mt-1">
                                      {item.category}
                                    </div>
                                  </div>
                                  <div className="text-xs text-neutral-400 ml-2">
                                    {item.href.replace(`/${locale}`, '') || '/'}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ) : searchQuery.trim() ? (
                            <div className="p-4 text-center text-neutral-500 text-sm">
                              No results found for "{searchQuery}"
                            </div>
                          ) : (
                            <div className="p-4 text-center text-neutral-500 text-sm">
                              Start typing to search menu items...
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <nav className="flex flex-col space-y-3">
                {allNavItems.map((item) => {
                  if (item.dropdown) {
                    return (
                      <div key={item.key} className="space-y-2">
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg ${
                            isActive(item.href) || isActive(undefined, item.key)
                              ? 'text-accent-500 bg-gradient-to-br from-accent-50 to-accent-100'
                              : 'text-neutral-700 hover:text-accent-500 hover:bg-neutral-50'
                          }`}
                        >
                          {item.label}
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${
                              activeDropdown === item.key ? 'rotate-180' : ''
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDropdownToggle(item.key!);
                            }}
                          />
                        </Link>

                        <AnimatePresence>
                          {activeDropdown === item.key && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-1"
                            >
                              {item.dropdown.map((dropdownItem: any) => (
                                <Link
                                  key={dropdownItem.href}
                                  href={dropdownItem.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className={`block px-4 py-2 text-sm transition-colors duration-200 rounded-lg ${
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
                        className={`px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg ${
                          isActive(item.href)
                            ? 'text-accent-500 bg-gradient-to-br from-accent-50 to-accent-100'
                            : 'text-neutral-700 hover:text-accent-500 hover:bg-neutral-50'
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
