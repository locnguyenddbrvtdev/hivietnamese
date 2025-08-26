import type { Metadata } from 'next';

import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'HayVietnamese: The Vietnamese Language School',
  description:
    'The starting point for your next project with HayVietnamese, built on the newest version of Material-UI ©, ready to be customized to your style',
};

export default function Page() {
  return <HomeView />;
}
