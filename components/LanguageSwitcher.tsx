'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const languages = [
    { code: 'mn', name: 'MN', fullName: 'Монгол' },
    { code: 'en', name: 'EN', fullName: 'English' },
    { code: 'kr', name: 'KR', fullName: '한국어' },
  ];

  const switchLanguage = (locale: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
    const newPath = `/${locale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center space-x-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLanguage(lang.code)}
          className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
            currentLocale === lang.code
              ? 'bg-accent-500 text-white shadow-sm'
              : 'text-neutral-600 hover:text-accent-500 hover:bg-gradient-to-br hover:from-accent-50 hover:to-accent-100'
          }`}
          aria-label={`Switch to ${lang.fullName}`}
        >
          {currentLocale === lang.code && (
            <motion.div
              layoutId="activeLanguage"
              className="absolute inset-0 bg-accent-500 rounded-lg"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{lang.name}</span>
        </button>
      ))}
    </div>
  );
}
