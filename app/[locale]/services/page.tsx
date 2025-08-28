import { Services } from '@/components/Services';
import { ServiceDetails } from '@/components/ServiceDetails';
import { PageHeader } from '@/components/PageHeader';

interface ServicesPageProps {
  params: { locale: string };
}

export default function ServicesPage({ params: { locale } }: ServicesPageProps) {
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
