import { GuestGuard } from 'src/auth/guard';
import { AuthSplitLayout } from 'src/layouts/auth';
import { LangCode } from 'src/locales';
import { getServerTranslations } from 'src/locales/server';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang;
  const { t } = await getServerTranslations('content');

  return (
    <GuestGuard>
      <AuthSplitLayout
        slotProps={{
          section: { title: t('auth.signIn.title'), subtitle: t('auth.signIn.subtitle') },
          currLang: lang as LangCode,
        }}
      >
        {children}
      </AuthSplitLayout>
    </GuestGuard>
  );
}
