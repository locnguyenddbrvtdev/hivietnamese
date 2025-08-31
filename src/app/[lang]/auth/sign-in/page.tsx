import { Metadata } from 'next/types';

import { SplitSignInView } from 'src/auth/view/auth-demo/split';
import { CONFIG } from 'src/global-config';
import { getServerTranslations } from 'src/locales/server';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerTranslations('meta-data'); // ns 'meta' cho title/description

  const title = t('auth.signIn.title');
  const description = t('auth.signIn.description');

  return {
    title: `${title} - ${CONFIG.appName}`,
    description,
  };
}

export default async function Page() {
  const { t } = await getServerTranslations('content');

  return <SplitSignInView content={t('auth.signIn.form', { returnObjects: true })} />;
}
