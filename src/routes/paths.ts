import { kebabCase } from 'es-toolkit';

import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];
const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  root: '/',
  ourCourses: '/our-courses',
  contact: '/contact',
  aboutUs: '/about-us',
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
};
