'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Tag, Share2, Facebook, Mail } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from './PageHeader';

interface BlogPostData {
  id: string;
  slug: string;
  titleKey: string;
  excerptKey: string;
  contentKey: string;
  author: string;
  date: string;
  categoryKey: string;
  image: string;
  tags: string[];
  readTime: string;
}

interface BlogPostProps {
  post: BlogPostData;
  locale: string;
}

export function BlogPost({ post, locale }: BlogPostProps) {
  const t = useTranslations('blog');
  const tGeneral = useTranslations();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === 'mn' ? 'mn-MN' : locale === 'kr' ? 'ko-KR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: t(post.titleKey),
        text: t(post.excerptKey),
        url: window.location.href,
      });
    }
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareByEmail = () => {
    const subject = encodeURIComponent(t(post.titleKey));
    const body = encodeURIComponent(`${t(post.excerptKey)}\n\n${window.location.href}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <main>
      <PageHeader
        title={t(post.titleKey)}
        subtitle={t(post.excerptKey)}
        locale={locale}
      />

      <article className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium transition-colors"
            >
              <ArrowLeft size={18} />
              {t('back_to_blog')}
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-neutral-500">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <div className="flex items-center gap-1">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{post.readTime} {t('read')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag size={16} />
                <span className="bg-accent-100 text-accent-700 px-2 py-1 rounded-md text-xs font-medium">
                  {t(post.categoryKey)}
                </span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              {t(post.titleKey)}
            </h1>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-neutral-100 text-neutral-600 text-sm rounded-lg"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-500 mr-2">{t('share')}:</span>
                <button
                  onClick={shareOnFacebook}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Share on Facebook"
                >
                  <Facebook size={18} />
                </button>
                <button
                  onClick={shareByEmail}
                  className="p-2 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors"
                  title="Share by Email"
                >
                  <Mail size={18} />
                </button>
                {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                  <button
                    onClick={sharePost}
                    className="p-2 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors"
                    title="Share"
                  >
                    <Share2 size={18} />
                  </button>
                )}
              </div>
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-soft">
              <img
                src={post.image}
                alt={t(post.titleKey)}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg prose-neutral max-w-none"
          >
            {/* Main Content */}
            <div className="text-lg leading-relaxed text-neutral-700 space-y-6">
              {getDetailedContent(post.id, t)}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 p-8 bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl border border-accent-200"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                {t('cta.title')}
              </h3>
              <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
                {t('cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/contact`}
                  className="bg-accent-500 text-white px-6 py-3 rounded-lg hover:bg-accent-600 transition-colors font-medium"
                >
                  {t('cta.contact')}
                </Link>
                <Link
                  href={`/${locale}/blog`}
                  className="bg-white text-accent-600 px-6 py-3 rounded-lg hover:bg-neutral-50 transition-colors font-medium border border-accent-300"
                >
                  {t('cta.more_articles')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </main>
  );
}

// Function to get detailed content for each blog post
function getDetailedContent(postId: string, t: any) {
  switch (postId) {
    case '1': // Dust Mites
      return (
        <>
          <p>
            {t('posts.dust_mites.content')}
          </p>
          <h3 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Тоосны хачигтай тэмцэх арга</h3>
          <p>
            Тоосны хачиг нь гэрийн тоосонд амьдардаг жижиг хачиг юм. Тэд хүний арьсны үхсэн эсүүдээр хооллодог бөгөөд харшил үүсгэж болно. LaundryZone-ийн өндөр температурын угаалга, хатаалга нь эдгээр хачигийг 100% устгана.
          </p>
          <h3 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Мөөгөнцөртэй тэмцэх</h3>
          <p>
            Чийгтэй орчинд мөөгөнцөр хөгждөг. Манай тусгай цэвэрлэх бодис болон өндөр температурын хатаалга нь мөөгөнцрийн спорыг бүрэн устгаж, танай хувцас, хөнжлийг эрүүл ахуйн шаардлага хангуулан цэвэрлэнэ.
          </p>
        </>
      );

    case '2': // New Technology
      return (
        <>
          <p>
            {t('posts.new_technology.content')}
          </p>
          <h3 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Шинэ технологийн давуу тал</h3>
          <p>
            LaundryZone Mongolia нь LG болон Samsung брэндийн хамгийн сүүлийн үеийн угаалгын машинуудыг ашигладаг. Эдгээр машинууд нь:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Эрчим хүчний хэмнэлттэй</li>
            <li>Усны хэмнэлттэй</li>
            <li>Чанартай цэвэрлэгээ</li>
            <li>Хурдан угаалга, хатаалгын горим</li>
            <li>Автомат тунглаг тохиргоо</li>
          </ul>
          <h3 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Үйлчилгээний чанар</h3>
          <p>
            Манай баг бүх үйлчлүүлэгчдэд найрсаг, мэргэжлийн үйлчилгээ үзүүлэхийг зорьдог. 24 цагийн үйлчилгээ, цэвэр орчин, аюулгүй байдлыг хангасан салбаруудаар танд үйлчлэх бэлэн байна.
          </p>
        </>
      );

    case '3': // Bedding Care
      return (
        <>
          <p>
            {t('posts.bedding_care.content')}
          </p>
          <h3 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Хөнжил угаах давтамж</h3>
          <p>
            Эрүүл мэндийн мэргэжилтнүүд хөнжлийг долоо хоногт нэг удаа угаахыг зөвлөдөг. Гэхдээ дараах тохиолдолд илүү ойр ойрхон угаах хэрэгтэй:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Өвчтэй үед өдөр бүр</li>
            <li>Харшилтай хүмүүст 2-3 хоногт нэг удаа</li>
            <li>Амьтантай хамт унтдаг бол 3-4 хоногт нэг удаа</li>
            <li>Хүүхдийн хөнжлийг 2-3 хоногт нэг удаа</li>
          </ul>
          <h3 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">LaundryZone-ийн давуу тал</h3>
          <p>
            Манай том оврын машинууд нь хөнжил, дэрний дэрлэгийг бүрэн багтааж, өндөр температурт угааж, бүрэн хатааж өгдөг. Энэ нь гэрийн жижиг машинд боломжгүй юм.
          </p>
        </>
      );

    case '4': // Customer Guidelines
      return (
        <>
          <p>
            {t('posts.customer_guidelines.content')}
          </p>
          <h3 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Машин ашиглах заавар</h3>
          <p>
            Машин ашиглахын өмнө дараах зүйлсийг анхаарна уу:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Өмдний халаас цэвэрлэх</li>
            <li>Металл эд зүйлс гаргах</li>
            <li>Өнгөөр ялгаж угаах</li>
            <li>Тохирох машин сонгох</li>
            <li>Зөв хэмжээний угаалгын нунтаг хэрэглэх</li>
          </ul>
          <h3 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Аюулгүй байдал</h3>
          <p>
            Бүх салбарт камер суурилуулсан, аюулгүй орчин бүрдүүлсэн. Асуудал гарвал ажилтанд хандана уу. 
            Хүүхдүүдийг хараа хяналтгүй орхихгүй байхыг анхаарна уу.
          </p>
        </>
      );

    case '5': // Dryer Benefits
      return (
        <>
          <p>
            {t('posts.dryer_benefits.content')}
          </p>
          <h3 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">LaundryZone хатаах машины онцлог</h3>
          <p>
            Манай хатаах машинууд нь дараах давуу талуудтай:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Том багтаамж - нэг удаа их хэмжээний хувцас</li>
            <li>Хурдан хатаах - 30-60 минутад бэлэн</li>
            <li>Өөр температурын режим</li>
            <li>Автомат хэмжих систем</li>
            <li>Эрчим хүчний хэмнэлт</li>
          </ul>
          <h3 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Агаарын чанар</h3>
          <p>
            Өвлийн улиралд гадаа хатаах боломжгүй байдаг. LaundryZone-ийн хатаах машинууд нь:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Хувцсыг бүрэн хатаана</li>
            <li>Үнэр багатай болгоно</li>
            <li>Нойтон, хөгц мөөгөнцрөөс сэргийлнэ</li>
            <li>Цэвэр, эрүүл орчинд хатаана</li>
          </ul>
        </>
      );

    case '6': // Weight Calculation
      return (
        <>
          <p>
            {t('posts.weight_calculation.content')}
          </p>
          <h3 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Жинг тооцоолох арга</h3>
          <p>
            Дараах заавруудаар угаалгын жинг тооцоолоод тохирох машин сонгоно уу:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>8кг машин:</strong> Хувцасны нэг ачаа, 1-2 хүний долоо хоногийн хувцас</li>
            <li><strong>15кг машин:</strong> 3-4 хүний хувцас эсвэл нэг том хөнжил</li>
            <li><strong>25кг машин:</strong> Гэр бүлийн хувцас эсвэл хоёр том хөнжил</li>
            <li><strong>40кг машин:</strong> Их хэмжээний хувцас, пальто, куртка</li>
          </ul>
          <h3 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Зөвлөмж</h3>
          <p>
            Машинд хэт их ачих нь цэвэрлэгээний чанарыг бууруулна. Машины багтаамжийн 80-90%-ийг ашиглах нь хамгийн тохиромжтой. 
            Эргэлзсэн тохиолдолд манай ажилтантай зөвлөлдөөрэй.
          </p>
        </>
      );

    default:
      return <p>{t('posts.default.content')}</p>;
  }
}