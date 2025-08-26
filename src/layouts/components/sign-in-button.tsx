import type { ButtonProps } from '@mui/material/Button';

import Button from '@mui/material/Button';

import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/global-config';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }: ButtonProps) {
  return (
    <Button component={RouterLink} href={paths.maintenance} variant="outlined" sx={sx} {...other}>
      Sign in
    </Button>
  );
}
