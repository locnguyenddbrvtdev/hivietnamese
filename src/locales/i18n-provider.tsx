'use client';

import type { InitOptions } from 'i18next';
import type { LangCode } from './locales-config';

import { useEffect, useMemo } from 'react';
import i18next, { createInstance, type i18n } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, I18nextProvider as Provider } from 'react-i18next';

import { i18nOptions, i18nResourceLoader } from './locales-config';

// Giữ singleton client-side để không re-init mỗi render
let i18nClient: i18n | null = null;

type I18nProviderProps = {
  lang: LangCode; // nên bắt buộc, lấy từ params.lang
  children: React.ReactNode;
};

export function I18nProvider({ lang, children }: I18nProviderProps) {
  const instance = useMemo(() => {
    if (!i18nClient) {
      i18nClient = createInstance();

      const opts: InitOptions = {
        ...i18nOptions(),
        lng: lang, // MATCH SSR ngay từ đầu
        fallbackLng: 'en', // tuỳ bạn
        // Khi đã set lng, detector sẽ không chạy lần đầu.
        detection: { caches: ['cookie'], order: ['cookie'] },
        react: { useSuspense: false },
      };

      i18nClient
        .use(initReactI18next)
        .use(i18nResourceLoader)
        .use(LanguageDetector) // vẫn dùng để ghi/đọc cookie các lần sau
        .init(opts);
    }
    return i18nClient!;
  }, []);

  // Đồng bộ khi URL /[lang] thay đổi
  useEffect(() => {
    if (instance.language !== lang) {
      instance.changeLanguage(lang);
    }
    // (tuỳ chọn) lưu cookie để middleware ở "/" biết redirect
    document.cookie = `lng=${lang};path=/;max-age=31536000;samesite=lax`;
  }, [lang, instance]);

  return <Provider i18n={instance}>{children}</Provider>;
}
