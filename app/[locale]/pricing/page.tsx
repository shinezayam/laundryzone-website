import { redirect } from 'next/navigation';

interface PricingPageProps {
  params: { locale: string };
}

export default function PricingPage({ params: { locale } }: PricingPageProps) {
  // Redirect to community pricing section where pricing content now lives
  redirect(`/${locale}/community#pricing-info`);
}
