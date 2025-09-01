import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/PageHeader';
import { BlogList } from '@/components/BlogList';

interface BlogPageProps {
  params: {
    locale: string;
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  const t = useTranslations('blog');

  return (
    <main>
      <PageHeader
        title={t('title')}
        subtitle={t('description')}
        locale={params.locale}
      />
      <BlogList locale={params.locale} />
    </main>
  );
}

export async function generateMetadata({ params }: BlogPageProps) {
  return {
    title: 'Blog - LaundryZone Mongolia',
    description: 'Latest news, tips and insights from LaundryZone Mongolia professional laundry services.',
  };
}