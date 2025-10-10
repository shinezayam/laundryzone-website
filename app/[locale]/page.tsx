import { Hero } from '@/components/Hero';
import { Advantages } from '@/components/Advantages';
import { PricingImages } from '@/components/PricingImages';
import { YouTubeVideos } from '@/components/YouTubeVideos';
import { FAQ } from '@/components/FAQ';
import { Branches } from '@/components/Branches';
import { CustomerGuidelines } from '@/components/CustomerGuidelines';
import { ContactCTA } from '@/components/ContactCTA';
import { BranchAnnouncementModal } from '@/components/BranchAnnouncementModal';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  return (
    <>
      <BranchAnnouncementModal locale={locale} />
      <Hero locale={locale} />
      <Advantages locale={locale} />
      <PricingImages locale={locale} />
      <YouTubeVideos locale={locale} />
      <FAQ locale={locale} />
      <CustomerGuidelines locale={locale} />
      <Branches locale={locale} />
      <ContactCTA locale={locale} />
    </>
  );
}
