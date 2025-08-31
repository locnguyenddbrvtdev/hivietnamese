import type { Metadata } from 'next';
import { CONFIG } from 'src/global-config';
import { getServerTranslations } from 'src/locales/server';
import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerTranslations('meta-data'); // ns 'meta' cho title/description

  const title = t('root.title');
  const description = t('root.description');

  return {
    title: `${title} - ${CONFIG.appName}`,
    description,
  };
}

export default async function Page() {
  const { t } = await getServerTranslations('content');

  const ssrContent = t('root', { returnObjects: true });

  return <HomeView ssrContent={ssrContent} />;
}
