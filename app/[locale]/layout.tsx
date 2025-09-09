import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Chatbot } from '@/components/Chatbot';
import { ErrorHandler } from '@/components/ErrorHandler';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['mn', 'en', 'kr'];

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ErrorHandler />
      <div className="min-h-screen flex flex-col">
        <SiteHeader locale={locale} />
        <main className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} />
        <Chatbot locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
