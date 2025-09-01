import { redirect } from 'next/navigation';

interface BlogPageProps {
  params: {
    locale: string;
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  // Redirect to community announcements section where blog content now lives
  redirect(`/${params.locale}/community#announcements`);
}

export async function generateMetadata({ params }: BlogPageProps) {
  return {
    title: 'Blog - LaundryZone Mongolia',
    description: 'Latest news, tips and insights from LaundryZone Mongolia professional laundry services.',
  };
}