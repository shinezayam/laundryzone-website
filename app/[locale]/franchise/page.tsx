import { getTranslations } from 'next-intl/server';
import { PageHeader } from '@/components/PageHeader';
import { FranchiseForm } from '@/components/FranchiseForm';

interface FranchisePageProps {
  params: { locale: string };
}

export default async function FranchisePage({ params: { locale } }: FranchisePageProps) {
  const t = await getTranslations();

  return (
    <>
      <PageHeader 
        title={t('franchise.title')}
        subtitle={t('franchise.subtitle')}
        locale={locale}
      />
      
      <FranchiseForm locale={locale} />
    </>
  );
}
