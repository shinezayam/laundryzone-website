import { getTranslations } from 'next-intl/server';
import { PageHeader } from '@/components/PageHeader';
import { PricingTable } from '@/components/PricingTable';

interface PricingPageProps {
  params: { locale: string };
}

export default async function PricingPage({ params: { locale } }: PricingPageProps) {
  const t = await getTranslations();

  return (
    <>
      <PageHeader 
        title={t('pricing.title')}
        subtitle={t('pricing.subtitle')}
        locale={locale}
      />
      
      <PricingTable locale={locale} />
    </>
  );
}
