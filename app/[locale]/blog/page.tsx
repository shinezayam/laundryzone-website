import { redirect } from 'next/navigation';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  // Redirect to community announcements section where blog content now lives
  redirect(`/${locale}/community#announcements`);
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { locale } = await params;
  return {
    title: 'Blog - LaundryZone Mongolia',
    description: 'Latest news, tips and insights from LaundryZone Mongolia professional laundry services.',
  };
}