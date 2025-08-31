import { Metadata } from 'next/types';

import { CONFIG } from 'src/global-config';

import { SplitSignUpView } from 'src/auth/view/auth-demo/split';
import { getServerTranslations } from 'src/locales/server';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerTranslations('meta-data'); // ns 'meta' cho title/description

  const title = t('auth.signUp.title');
  const description = t('auth.signUp.description');

  return {
    title: `${title} - ${CONFIG.appName}`,
    description,
  };
}
export default async function Page() {
  const { t } = await getServerTranslations('content');
  return <SplitSignUpView content={t('auth.signUp.form', { returnObjects: true })} />;
}
