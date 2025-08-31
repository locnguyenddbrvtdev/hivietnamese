import type { NavMainProps } from './main/nav/types';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { TFunction } from 'i18next';

// ----------------------------------------------------------------------

export const navData = (t: TFunction<any, any>) => [
  {
    title: t('home'),
    path: '/',
    icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
  },
  {
    title: t('ourCourses'),
    icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
    path: paths.ourCourses,
  },
  {
    title: t('aboutUs'),
    path: paths.aboutUs,
    icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  },
  {
    title: t('contact'),
    path: paths.contact,
    icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  },
];
