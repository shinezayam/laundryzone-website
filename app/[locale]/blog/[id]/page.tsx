import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { BlogPost } from '@/components/BlogPost';
import { setRequestLocale } from 'next-intl/server';

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

// Get blog post data based on ID
function getBlogPost(id: string, locale: string) {
  const blogPosts = [
    {
      id: '1',
      slug: 'dust-mites-bed-bugs-mold',
      titleKey: 'posts.dust_mites.title',
      excerptKey: 'posts.dust_mites.excerpt',
      contentKey: 'posts.dust_mites.content',
      author: 'LaundryZone Team',
      date: '2022-01-25',
      categoryKey: 'categories.hygiene',
      image: '/images/Blog/Гэрийн тоосны хачиг, хөгц мөөгөнцөр.png',
      tags: ['hygiene', 'health', 'cleaning'],
      readTime: '5 min'
    },
    {
      id: '2',
      slug: 'new-technology-service',
      titleKey: 'posts.new_technology.title',
      excerptKey: 'posts.new_technology.excerpt',
      contentKey: 'posts.new_technology.content',
      author: 'LaundryZone Team',
      date: '2022-01-25',
      categoryKey: 'categories.company',
      image: '/images/Blog/ШИНЭ ТЕХНОЛОГИ-ЭЕРЭГ ХАНДЛАГА, СОЁЛТОЙ ҮЙЛЧИЛГЭЭ.png',
      tags: ['technology', 'service', 'award'],
      readTime: '4 min'
    },
    {
      id: '3',
      slug: 'bedding-care-habit',
      titleKey: 'posts.bedding_care.title',
      excerptKey: 'posts.bedding_care.excerpt',
      contentKey: 'posts.bedding_care.content',
      author: 'LaundryZone Team',
      date: '2022-01-25',
      categoryKey: 'categories.tips',
      image: '/images/Blog/Хөнжилөө тогтмол угааж хэвшицгээе.png',
      tags: ['bedding', 'care', 'hygiene'],
      readTime: '3 min'
    },
    {
      id: '4',
      slug: 'customer-guidelines',
      titleKey: 'posts.customer_guidelines.title',
      excerptKey: 'posts.customer_guidelines.excerpt',
      contentKey: 'posts.customer_guidelines.content',
      author: 'LaundryZone Team',
      date: '2022-01-25',
      categoryKey: 'categories.guidelines',
      image: '/images/Blog/Үйлчлүүлэгчдийн анхааралд.png',
      tags: ['guidelines', 'rules', 'safety'],
      readTime: '6 min'
    },
    {
      id: '5',
      slug: 'dryer-benefits',
      titleKey: 'posts.dryer_benefits.title',
      excerptKey: 'posts.dryer_benefits.excerpt',
      contentKey: 'posts.dryer_benefits.content',
      author: 'LaundryZone Team',
      date: '2022-01-25',
      categoryKey: 'categories.equipment',
      image: '/images/Blog/Яагаад заавал Ландризоны ХАТААХ машин гэж.png',
      tags: ['dryer', 'equipment', 'benefits'],
      readTime: '5 min'
    },
    {
      id: '6',
      slug: 'weight-calculation',
      titleKey: 'posts.weight_calculation.title',
      excerptKey: 'posts.weight_calculation.excerpt',
      contentKey: 'posts.weight_calculation.content',
      author: 'LaundryZone Team',
      date: '2022-01-25',
      categoryKey: 'categories.tips',
      image: '/images/Blog/Угаах хувцасны жинг хэрхэн тооцох вэ.png',
      tags: ['weight', 'calculation', 'tips'],
      readTime: '4 min'
    }
  ];

  return blogPosts.find(post => post.id === id);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id, locale } = await params;
  
  // Enable static rendering for this page
  setRequestLocale(locale);
  
  const blogPost = getBlogPost(id, locale);

  if (!blogPost) {
    notFound();
  }

  return <BlogPost post={blogPost} locale={locale} />;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { id, locale } = await params;
  const blogPost = getBlogPost(id, locale);

  if (!blogPost) {
    return {
      title: 'Blog Post Not Found - LaundryZone Mongolia',
    };
  }

  return {
    title: `Blog Post - LaundryZone Mongolia`,
    description: 'LaundryZone Mongolia Blog',
  };
}

export async function generateStaticParams() {
  const locales = ['en', 'mn', 'kr'];
  const blogIds = ['1', '2', '3', '4', '5', '6'];
  
  const params = [];
  for (const locale of locales) {
    for (const id of blogIds) {
      params.push({ locale, id });
    }
  }
  
  return params;
}