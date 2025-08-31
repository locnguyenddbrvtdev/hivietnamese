import type { ButtonProps } from '@mui/material/Button';

import Button from '@mui/material/Button';
import { useTranslate } from 'src/locales';

import { RouterLink } from 'src/routes/components';

import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------
interface SignInButtonProps extends ButtonProps {
  ssrContent?: string;
}

export function SignInButton({ sx, ssrContent, ...other }: SignInButtonProps) {
  const navTrans = useTranslate('main-nav');

  return (
    <Button component={RouterLink} href={paths.auth.signIn} variant="outlined" sx={sx} {...other}>
      {ssrContent || navTrans.t('signIn')}
    </Button>
  );
}
