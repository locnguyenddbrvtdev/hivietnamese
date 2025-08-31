import type { AccountDrawerProps } from './components/account-drawer';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const _account: AccountDrawerProps['data'] = [
  {
    label: 'My Learning',
    href: '/learning',
    // @ts-ignore
    icon: <Iconify icon="dashicons:welcome-learn-more" />,
  },
  // {
  //   label: 'Account Settings',
  //   href: '/user/edit-profile',
  //   // @ts-ignore
  //   icon: <Iconify icon="mdi:account-circle" />,
  // },
  {
    label: 'Cart',
    href: '/cart',
    // @ts-ignore
    icon: <Iconify icon="pepicons-print:cart" />,
    info: '0',
  },
  {
    label: 'Payment methods',
    href: '/user/edit-payment-methods',
    // @ts-ignore
    icon: <Iconify icon="streamline-ultimate:cash-payment-sign-2-bold" />,
  },
  {
    label: 'Subscription',
    href: '#',
    icon: <Iconify icon="custom:invoice-duotone" />,
  },
  // { label: 'Security', href: '#', icon: <Iconify icon="solar:shield-keyhole-bold-duotone" /> },
  {
    label: 'Account settings',
    href: '/user/edit-profile',
    icon: <Iconify icon="solar:settings-bold-duotone" />,
  },
];
