import { Equipment } from '@/components/Equipment';
import { PageHeader } from '@/components/PageHeader';

interface EquipmentPageProps {
  params: { locale: string };
}

export default function EquipmentPage({ params: { locale } }: EquipmentPageProps) {
  return (
    <>
      <PageHeader 
        title="equipment.title"
        subtitle="equipment.subtitle"
        locale={locale}
      />
      <Equipment />
    </>
  );
}