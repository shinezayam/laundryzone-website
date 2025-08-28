import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

const locales = ['mn', 'en', 'kr'];

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
  
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    locale: locale // Return the locale as required
  };
});
