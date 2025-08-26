import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';

import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { CircleSvg, FloatLine, FloatPlusIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

const renderLines = () => (
  <>
    <FloatPlusIcon sx={{ top: 72, left: 72 }} />
    <FloatPlusIcon sx={{ bottom: 72, left: 72 }} />
    <FloatLine sx={{ top: 80, left: 0 }} />
    <FloatLine sx={{ bottom: 80, left: 0 }} />
    <FloatLine vertical sx={{ top: 0, left: 80 }} />
  </>
);

export function HomeMinimal({ sx, ...other }: BoxProps) {
  const renderDescription = () => (
    <>
      <SectionTitle
        caption="Visualizing Success"
        title="What's in"
        txtGradient="HayVietNammese?"
        sx={{ mb: { xs: 5, md: 8 }, textAlign: { xs: 'center', md: 'left' } }}
      />

      <Stack spacing={6} sx={{ maxWidth: { sm: 560, md: 400 }, mx: { xs: 'auto', md: 'unset' } }}>
        {ITEMS.map((item) => {
          return (
            <Box
              component={m.div}
              variants={varFade('inUp', { distance: 24 })}
              key={item.title}
              sx={[{ gap: 3, display: 'flex' }]}
            >
              <Typography variant="h4">{item.icon}</Typography>
              <Stack spacing={1}>
                <Typography variant="h5" component="h6">
                  {item.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </>
  );

  const renderImage = () => (
    <Stack
      component={m.div}
      variants={varFade('inRight', { distance: 24 })}
      sx={{
        height: 1,
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={[
          (theme) => ({
            left: 0,
            width: 720,
            borderRadius: 2,
            position: 'absolute',
            bgcolor: 'background.default',
            boxShadow: `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
            ...theme.applyStyles('dark', {
              boxShadow: `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.common.blackChannel, 0.16)}`,
            }),
          }),
        ]}
      >
        <Box
          component="img"
          alt="Home chart"
          src={`${CONFIG.assetsDir}/assets/images/home/home-chart.webp`}
          sx={{ width: 720, borderRadius: 1 }}
        />
      </Box>
    </Stack>
  );

  return (
    <Box
      component="section"
      sx={[
        {
          overflow: 'hidden',
          position: 'relative',
          py: { xs: 10, md: 20 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <MotionViewport>
        {renderLines()}

        <Container sx={{ position: 'relative' }}>
          <Grid container columnSpacing={{ xs: 0, md: 8 }} sx={{ position: 'relative', zIndex: 9 }}>
            <Grid size={{ xs: 12, md: 6, lg: 7 }}>{renderDescription()}</Grid>

            <Grid sx={{ display: { xs: 'none', md: 'block' } }} size={{ md: 6, lg: 5 }}>
              {renderImage()}
            </Grid>
          </Grid>

          <CircleSvg variants={varFade('in')} sx={{ display: { xs: 'none', md: 'block' } }} />
        </Container>
      </MotionViewport>
    </Box>
  );
}

// ----------------------------------------------------------------------

const ITEMS = [
  {
    title: 'Ngữ pháp & Từ vựng',
    description: 'Xây nền tảng tiếng Việt vững chắc với bài học ngắn gọn, dễ hiểu.',
    icon: '📚',
  },
  {
    title: 'Phát âm & Nghe hiểu',
    description: 'Luyện nghe giọng chuẩn và cải thiện khả năng giao tiếp hàng ngày.',
    icon: '🎤',
  },
  {
    title: 'Văn hóa & Giao tiếp',
    description: 'Khám phá văn hóa Việt Nam và học cách ứng xử trong đời sống.',
    icon: '🌏',
  },
];
