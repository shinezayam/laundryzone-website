import { Services } from '@/components/Services';
import { ServiceDetails } from '@/components/ServiceDetails';
import { PageHeader } from '@/components/PageHeader';

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  return (
    <>
      <PageHeader
        title="services.title"
        subtitle="services.subtitle"
        locale={locale}
      />
      <Services />
      <ServiceDetails />
    </>
  );
}
