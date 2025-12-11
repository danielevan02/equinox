import {getRequestConfig} from 'next-intl/server';
import {getCookie} from '@/lib/cookies';

export default getRequestConfig(async () => {
  // Get locale from cookie, default to 'en'
  const locale = (await getCookie('locale')) || 'en';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});