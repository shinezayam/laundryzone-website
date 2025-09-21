'use client';

import { useTranslations } from 'next-intl';

export default function CustomerPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen pt-44 lg:pt-52 pb-16">
      <div className="container-custom">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-900 mb-8">
            {t('nav.customer')}
          </h1>
          <p className="text-lg text-neutral-600">
            Coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}