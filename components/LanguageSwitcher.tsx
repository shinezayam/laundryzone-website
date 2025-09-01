'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'mn', name: 'Монгол', flag: '/images/language_mn.png' },
    { code: 'en', name: 'English', flag: '/images/language_uk.png' },
    { code: 'kr', name: '한국어', flag: '/images/language_kr.png' },
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLocale);

  const switchLanguage = (locale: string) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
    const newPath = `/${locale}${pathWithoutLocale}`;
    router.push(newPath);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-neutral-200 hover:border-accent-300 transition-colors duration-200 bg-white shadow-sm"
        aria-label="Select language"
      >
        <img 
          src={currentLanguage?.flag} 
          alt={currentLanguage?.name}
          className="w-5 h-5 rounded-sm object-cover"
        />
        <span className="text-sm font-medium text-neutral-700 hidden sm:block">
          {currentLanguage?.name}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-neutral-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 bg-white border border-neutral-200 rounded-lg shadow-lg py-1 z-50 min-w-[140px]"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm hover:bg-neutral-50 transition-colors duration-150 ${
                  currentLocale === lang.code
                    ? 'bg-accent-50 text-accent-600'
                    : 'text-neutral-700'
                }`}
              >
                <img 
                  src={lang.flag} 
                  alt={lang.name}
                  className="w-5 h-5 rounded-sm object-cover"
                />
                <span className="font-medium">{lang.name}</span>
                {currentLocale === lang.code && (
                  <div className="ml-auto w-2 h-2 bg-accent-500 rounded-full" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
