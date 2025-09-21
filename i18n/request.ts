import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

const locales = ['mn', 'en', 'kr'];

export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that the incoming locale is valid
  if (!locale || !locales.includes(locale)) {
    locale = 'mn'; // fallback to default
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
