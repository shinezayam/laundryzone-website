import { redirect } from 'next/navigation';

interface PricingPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  // Redirect to community pricing section where pricing content now lives
  redirect(`/${locale}/community#pricing-info`);
}
