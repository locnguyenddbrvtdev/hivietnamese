import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

// ----------------------------------------------------------------------
interface IProps extends BoxProps {
  content: any;
}
export function SignUpTerms({ sx, content, ...other }: IProps) {
  return (
    <Box
      component="span"
      sx={[
        () => ({
          mt: 3,
          display: 'block',
          textAlign: 'center',
          typography: 'caption',
          color: 'text.secondary',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {content.a}
      <Link underline="always" color="text.primary">
        {content.b}
      </Link>
      {content.c}
      <Link underline="always" color="text.primary">
        {content.d}
      </Link>
      .
    </Box>
  );
}
