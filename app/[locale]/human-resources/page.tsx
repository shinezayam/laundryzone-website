'use client';

import { useParams } from 'next/navigation';
import { HumanResource } from '@/components/HumanResource';

export default function HumanResourcesPage() {
  const params = useParams();
  const locale = params.locale as string;

  return <HumanResource locale={locale} />;
}