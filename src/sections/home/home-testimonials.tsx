import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { fToNow } from 'src/utils/format-time';

import { _mock } from 'src/_mock';

import { varFade, MotionViewport, AnimateCountUp } from 'src/components/animate';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  carouselBreakpoints,
  CarouselArrowBasicButtons,
} from 'src/components/carousel';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatTriangleDownIcon } from './components/svg-elements';
import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

const renderLines = () => (
  <>
    <Stack
      spacing={8}
      alignItems="center"
      sx={{
        top: 64,
        left: 80,
        position: 'absolute',
        transform: 'translateX(-50%)',
      }}
    >
      <FloatTriangleDownIcon sx={{ position: 'static', opacity: 0.12 }} />
      <FloatTriangleDownIcon
        sx={{
          width: 30,
          height: 15,
          opacity: 0.24,
          position: 'static',
        }}
      />
    </Stack>

    <FloatLine vertical sx={{ top: 0, left: 80 }} />
  </>
);

export function HomeTestimonials({ sx, ...other }: BoxProps) {
  const carousel = useCarousel({
    align: 'start',
    slidesToShow: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
    },
    breakpoints: {
      [carouselBreakpoints.sm]: { slideSpacing: '24px' },
      [carouselBreakpoints.md]: { slideSpacing: '40px' },
      [carouselBreakpoints.lg]: { slideSpacing: '64px' },
    },
  });

  const renderDescription = () => (
    <SectionTitle
      caption="testimonials"
      title="Rumors are flying"
      txtGradient="that..."
      sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}
    />
  );

  const horizontalDivider = (position: 'top' | 'bottom') => (
    <Divider
      component="div"
      sx={[
        (theme) => ({
          width: 1,
          opacity: 0.16,
          height: '1px',
          border: 'none',
          position: 'absolute',
          background: `linear-gradient(to right, transparent 0%, ${theme.vars.palette.grey[500]} 50%, transparent 100%)`,
          ...(position === 'top' && { top: 0 }),
          ...(position === 'bottom' && { bottom: 0 }),
        }),
      ]}
    />
  );

  const verticalDivider = () => (
    <Divider
      component="div"
      orientation="vertical"
      flexItem
      sx={[
        (theme) => ({
          width: '1px',
          opacity: 0.16,
          border: 'none',
          background: `linear-gradient(to bottom, transparent 0%, ${theme.vars.palette.grey[500]} 50%, transparent 100%)`,
          display: { xs: 'none', md: 'block' },
        }),
      ]}
    />
  );

  const renderContent = () => (
    <Stack sx={{ position: 'relative', py: { xs: 5, md: 8 } }}>
      {horizontalDivider('top')}

      <Carousel carousel={carousel}>
        {TESTIMONIALS.map((item) => (
          <Stack key={item.id} component={m.div} variants={varFade('in')}>
            <Stack spacing={1} sx={{ typography: 'subtitle2' }}>
              <Rating size="small" name="read-only" value={item.rating} precision={0.5} readOnly />
              {item.category}
            </Stack>

            <Typography
              sx={(theme) => ({
                ...theme.mixins.maxLine({ line: 4, persistent: theme.typography.body1 }),
                mt: 2,
                mb: 3,
              })}
            >
              {item.content}
            </Typography>

            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <Avatar alt={item.name} src={item.avatar} sx={{ width: 48, height: 48 }} />
              <Stack sx={{ typography: 'subtitle1' }}>
                <Box component="span">{item.name}</Box>

                <Box component="span" sx={{ typography: 'body2', color: 'text.disabled' }}>
                  {fToNow(new Date(item.postedAt))}
                </Box>
              </Stack>
            </Box>
          </Stack>
        ))}
      </Carousel>

      <Box
        sx={{
          mt: { xs: 5, md: 8 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CarouselDotButtons
          variant="rounded"
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
        />

        <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />
      </Box>
    </Stack>
  );

  const renderNumber = () => (
    <Stack sx={{ py: { xs: 5, md: 8 }, position: 'relative' }}>
      {horizontalDivider('top')}

      <Stack
        divider={verticalDivider()}
        sx={{ gap: 5, flexDirection: { xs: 'column', md: 'row' } }}
      >
        {[
          { label: 'Registrations', value: 12.121 },
          { label: 'Happy students', value: 160 },
          { label: 'Review rate', value: 4.8 },
        ].map((item) => (
          <Stack key={item.label} spacing={2} sx={{ textAlign: 'center', width: 1 }}>
            <m.div variants={varFade('inUp', { distance: 24 })}>
              <AnimateCountUp
                to={item.value}
                unit={item.label === 'Registrations' ? 'k+' : '+'}
                toFixed={item.label === 'Happy students' ? 0 : 1}
                sx={[
                  (theme) => ({
                    fontWeight: 'fontWeightBold',
                    fontSize: { xs: 40, md: 64 },
                    lineHeight: { xs: 50 / 40, md: 80 / 64 },
                    fontFamily: theme.typography.fontSecondaryFamily,
                  }),
                ]}
              />
            </m.div>

            <m.div variants={varFade('inUp', { distance: 24 })}>
              <Box
                component="span"
                sx={[
                  (theme) => ({
                    ...theme.mixins.textGradient(
                      `90deg, ${theme.vars.palette.text.primary}, ${varAlpha(theme.vars.palette.text.primaryChannel, 0.2)}`
                    ),
                    opacity: 0.4,
                    typography: 'h6',
                  }),
                ]}
              >
                {item.label}
              </Box>
            </m.div>
          </Stack>
        ))}
      </Stack>

      {horizontalDivider('bottom')}
    </Stack>
  );

  return (
    <Box
      component="section"
      sx={[{ py: 10, position: 'relative' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <MotionViewport>
        {renderLines()}

        <Container>
          {renderDescription()}
          {renderContent()}
          {renderNumber()}
        </Container>
      </MotionViewport>
    </Box>
  );
}

// ----------------------------------------------------------------------

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Li Wei',
    avatar: `${CONFIG.assetsDir}/assets/images/mock/human-avatar-rating/1.webp`,
    rating: 5,
    category: 'Undergraduate Student at Tsinghua University, China',
    content: `The Vietnamese course here exceeded my expectations. The teachers are patient and very skilled in explaining difficult grammar points. The learning materials are modern and interactive. I feel much more confident speaking Vietnamese now.`,
    postedAt: 'April 20, 2024 23:15:30',
  },
  {
    id: 2,
    name: 'Kim Min-jun',
    avatar: `${CONFIG.assetsDir}/assets/images/mock/human-avatar-rating/2.webp`,
    rating: 5,
    category: 'Software Engineer at Samsung Electronics, South Korea',
    content: `Amazing experience! I needed Vietnamese for business meetings, and this center provided exactly what I needed. The role-play activities were incredibly helpful for real-life situations.`,
    postedAt: 'March 19, 2024 23:15:30',
  },
  {
    id: 3,
    name: 'Yuki Tanaka',
    avatar: `${CONFIG.assetsDir}/assets/images/mock/human-avatar-rating/3.webp`,
    rating: 5,
    category: 'Graduate Student at Kyoto University, Japan',
    content: `The classes are well-structured, and the teachers give a lot of personalized feedback. My pronunciation improved a lot, and I can now hold basic conversations with locals.`,
    postedAt: 'April 19, 2023 23:15:30',
  },
  {
    id: 4,
    name: 'Anna Müller',
    avatar: `${CONFIG.assetsDir}/assets/images/mock/human-avatar-rating/4.webp`,
    rating: 5,
    category: 'Marketing Manager at BMW Group, Germany',
    content: `Excellent customer support and flexible class schedules. The staff always responds quickly to my questions. The online platform is also very easy to use.`,
    postedAt: 'May 19, 2023 23:15:30',
  },
  {
    id: 5,
    name: 'Zhang Mei',
    avatar: '_mock.image.avatar(5)',
    rating: 5,
    category: 'Project Coordinator at Huawei Technologies, China',
    content: `Great teaching quality! The teachers are friendly and always encourage us to practice speaking. The cultural lessons were also very interesting.`,
    postedAt: 'June 19, 2023 23:15:30',
  },
  {
    id: 6,
    name: 'Erik Larsson',
    avatar: '_mock.image.avatar(6)',
    rating: 5,
    category: 'Data Analyst at Spotify, Sweden',
    content: `I never thought learning Vietnamese could be this fun! The games, group discussions, and speaking challenges kept me motivated throughout the course.`,
    postedAt: 'July 19, 2023 23:15:30',
  },
  {
    id: 7,
    name: 'Haruto Saito',
    avatar: '_mock.image.avatar(7)',
    rating: 5,
    category: 'Undergraduate Student at Waseda University, Japan',
    content: `As a complete beginner, I was nervous at first, but the beginner course was perfect for me. Now I can introduce myself and order food in Vietnamese without any problem.`,
    postedAt: 'August 19, 2023 23:15:30',
  },
  {
    id: 8,
    name: 'Park Ji-eun',
    avatar: '_mock.image.avatar(8)',
    rating: 5,
    category: 'HR Specialist at Hyundai Motor Company, South Korea',
    content: `The lessons are practical and up-to-date with modern Vietnamese usage. I appreciate the business-oriented vocabulary lessons.`,
    postedAt: 'September 19, 2023 23:15:30',
  },
];
