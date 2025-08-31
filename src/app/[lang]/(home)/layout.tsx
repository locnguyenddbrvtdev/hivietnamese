import { MainLayout } from 'src/layouts/main';
import { navData } from 'src/layouts/nav-config-main';
import { LangCode } from 'src/locales';
import { getServerTranslations } from 'src/locales/server';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const { t, i18n } = await getServerTranslations('main-nav');

  return (
    <MainLayout
      slotProps={{
        nav: { data: navData(t) },
        signInContent: t('signIn'),
        trailBtnContent: t('trialLesson'),
        currLang: i18n.language as LangCode,
      }}
    >
      {children}
    </MainLayout>
  );
}
