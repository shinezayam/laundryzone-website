import { Hero } from '@/components/Hero';
import { Advantages } from '@/components/Advantages';
import { PricingImages } from '@/components/PricingImages';
import { FacebookReelEmbed } from '@/components/FacebookReelEmbed';
import { FAQ } from '@/components/FAQ';
import { Branches } from '@/components/Branches';
import { CustomerGuidelines } from '@/components/CustomerGuidelines';
import { ContactCTA } from '@/components/ContactCTA';

interface HomePageProps {
  params: { locale: string };
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  return (
    <>
      <Hero locale={locale} />
      <Advantages locale={locale} />
      <PricingImages locale={locale} />
      <FacebookReelEmbed locale={locale} />
      <FAQ locale={locale} />
      <CustomerGuidelines locale={locale} />
      <Branches locale={locale} />
      <ContactCTA locale={locale} />
    </>
  );
}
