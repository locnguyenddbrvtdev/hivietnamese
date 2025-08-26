import type { NavMainProps } from './main/nav/types';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navData: NavMainProps['data'] = [
  { title: 'Home', path: '/', icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" /> },
  {
    title: 'Our Courses',
    icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
    path: paths.ourCourses,
  },
  {
    title: 'About Us',
    path: paths.aboutUs,
    icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  },
  {
    title: 'Contact',
    path: paths.contact,
    icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  },
];
