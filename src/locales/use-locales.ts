'use client';

import type { Namespace } from 'i18next';
import type { LangCode } from './locales-config';

import dayjs from 'dayjs';
import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation'; // 👈 thêm

import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { useSettingsContext } from 'src/components/settings';

import { fallbackLng, getCurrentLang, supportedLngs } from './locales-config';
import { wait } from 'src/utils/common';

// Các mã lang bạn hỗ trợ (khớp middleware)
const LANG_REGEX = new RegExp(`^/(${supportedLngs.join('|')})(/|$)`, 'i');

export function useTranslate(namespace?: Namespace) {
  const router = useRouter();
  const pathname = usePathname(); // 👈 lấy path hiện tại
  const settings = useSettingsContext();

  const { t, i18n } = useTranslation(namespace);
  const { t: tMessages } = useTranslation('messages');

  const currentLang = getCurrentLang(i18n.resolvedLanguage);

  const updateDirection = useCallback(
    (lang: LangCode) => {
      settings.setState({ direction: i18n.dir(lang) });
    },
    [i18n, settings]
  );

  const updateDayjsLocale = useCallback((lang: LangCode) => {
    const updatedLang = getCurrentLang(lang);
    dayjs.locale(updatedLang.adapterLocale);
  }, []);

  // 👉 chuẩn hoá URL đích có segment ngôn ngữ
  const buildTargetPath = useCallback(
    (lang: LangCode) => {
      const base = pathname?.replace(LANG_REGEX, '') || '/';
      return `/${lang}/${base === '' ? '/' : base}`;
    },
    [pathname]
  );

  const handleChangeLang = useCallback(
    async (lang: LangCode) => {
      try {
        // toast trong ngôn ngữ mới ngay trên client
        const changeLangPromise = i18n.changeLanguage(lang);

        toast.promise(changeLangPromise, {
          loading: tMessages('languageSwitch.loading'),
          success: () => tMessages('languageSwitch.success'),
          error: () => tMessages('languageSwitch.error'),
        });

        await changeLangPromise;

        updateDirection(lang);
        updateDayjsLocale(lang);

        // set cookie để lần vào '/' biết redirect đúng (middleware vẫn set lại trên response)
        document.cookie = `lng=${lang};path=/;max-age=31536000;samesite=lax`;
        // 🔁 điều hướng sang URL có /:lang (SEO-friendly, tránh hydration mismatch)
        await wait(1000);

        router.push(buildTargetPath(lang));
        // ❌ không cần router.refresh()
      } catch (error) {
        console.error(error);
      }
    },
    [i18n, router, tMessages, updateDayjsLocale, updateDirection, buildTargetPath]
  );

  const handleResetLang = useCallback(() => {
    handleChangeLang(fallbackLng);
  }, [handleChangeLang]);

  return {
    t,
    i18n,
    currentLang,
    onChangeLang: handleChangeLang,
    onResetLang: handleResetLang,
  };
}

// ----------------------------------------------------------------------

export function useLocaleDirectionSync() {
  const { i18n, currentLang } = useTranslate();
  const { state, setState } = useSettingsContext();

  const handleSync = useCallback(async () => {
    // chỉ sync direction; i18n.changeLanguage đã làm ở onChangeLang & I18nProvider
    const dir = i18n.dir(currentLang.value);
    if (state.direction !== dir) {
      setState({ direction: dir });
    }
  }, [currentLang.value, i18n, setState, state.direction]);

  useEffect(() => {
    handleSync();
  }, [handleSync]);

  return null;
}
