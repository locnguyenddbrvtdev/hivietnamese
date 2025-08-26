'use client';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Container from '@mui/material/Container';
import { CSSObject, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';
import { MotionContainer, varFade } from 'src/components/animate';
import Box from '@mui/material/Box';
import { mockCourses } from 'src/mock/course';

export function CourseView() {
  return (
    <LayoutHero>
      <Container>
        <MotionContainer sx={{ textAlign: 'center' }}>
          <m.div variants={varFade('inUp', { distance: 24 })}>
            <Typography variant="h3" component="h1">
              Our Courses
            </Typography>
          </m.div>

          <m.div variants={varFade('inUp', { distance: 24 })}>
            <Typography sx={{ color: 'text.secondary', mt: 3 }}>
              Learn Vietnamese smart with simple way
            </Typography>
          </m.div>
        </MotionContainer>

        <Box
          sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
          }}
        >
          {/* {mockCourses.map((course) => (
            <PostItemHorizontal
              key={post.id}
              post={post}
              detailsHref={paths.dashboard.post.details(post.title)}
              editHref={paths.dashboard.post.edit(post.title)}
            />
          ))} */}
        </Box>
      </Container>
    </LayoutHero>
  );
}

const LayoutHero = styled('section')(({ theme }) => {
  const backgroundStyles: CSSObject = {
    ...theme.mixins.bgGradient({
      images: [
        `linear-gradient(0deg, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.9)}, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.9)})`,
        `url(${CONFIG.assetsDir}/assets/background/background-3-blur.webp)`,
      ],
    }),
    top: 0,
    left: 0,
    zIndex: -1,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
    transform: 'scaleX(-1)',
  };

  return {
    minHeight: 240,
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    padding: theme.spacing(5, 0),
    '&::before': backgroundStyles,
  };
});
