import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { _socials, _carouselsMembers } from 'src/_mock';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';
import { Carousel, useCarousel, CarouselArrowFloatButtons } from 'src/components/carousel';

// ----------------------------------------------------------------------

export function AboutTeam({ sx, ...other }: BoxProps) {
  const carousel = useCarousel({
    align: 'start',
    slideSpacing: '24px',
    slidesToShow: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
    },
  });

  return (
    <Box
      component="section"
      sx={[{ overflow: 'hidden' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <Container component={MotionViewport} sx={{ textAlign: 'center', py: { xs: 10, md: 15 } }}>
        <m.div variants={varFade('inDown')}>
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Dream team
          </Typography>
        </m.div>

        <m.div variants={varFade('inUp')}>
          <Typography variant="h2" sx={{ my: 3 }}>
            Great team is the key
          </Typography>
        </m.div>

        <m.div variants={varFade('inUp')}>
          <Typography sx={{ mx: 'auto', maxWidth: 640, color: 'text.secondary' }}>
            HayVietnamese luôn đồng hành cùng bạn trong suốt quá trình học, sẵn sàng hỗ trợ khi bạn
            gặp khó khăn. Đội ngũ chăm sóc học viên sẽ phản hồi trong vòng 24 giờ, kèm theo tài liệu
            hướng dẫn chi tiết để bạn tự tin tiếp tục hành trình chinh phục tiếng Việt.
          </Typography>
        </m.div>

        <Box sx={{ position: 'relative' }}>
          <CarouselArrowFloatButtons {...carousel.arrows} options={carousel.options} />

          <Carousel carousel={carousel} sx={{ px: 0.5 }}>
            {[
              {
                id: '100',
                name: 'Trân Nguyễn',
                role: 'Owner',
                avatarUrl:
                  'https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-6/487173771_3201491646701525_9202851489155338782_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEQjORTcj-EF4yJJ2xvlEzpQTvumLuFVAFBO-6Yu4VUASZjCJH7syXS2N_Wcxqnl5K9jyJJ7lFz_n9isXeHvpzk&_nc_ohc=YV6t7XJfl1sQ7kNvwHhvsRV&_nc_oc=AdmvBptm0yR19chhSxxolJS_1jfBy5ACb8oyejbZBMry1R-IWR79N8iYxAMTVrmHwAg&_nc_zt=23&_nc_ht=scontent.fhan3-2.fna&_nc_gid=zS-kHgfStYejHde4FQ-ebw&oh=00_AfU2WFGAWSJ4QGj4_7LGLiiD2juPLmLg6_4csJK8OpknUQ&oe=689F543E',
              },
              ..._carouselsMembers,
            ].map((member) => (
              <Box
                key={member.id}
                component={m.div}
                variants={varFade('in')}
                sx={{ py: { xs: 8, md: 10 } }}
              >
                <MemberCard member={member} />
              </Box>
            ))}
          </Carousel>
        </Box>

        <Button
          size="large"
          color="inherit"
          variant="outlined"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={24} />}
          sx={{ mx: 'auto' }}
        >
          All members
        </Button>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type MemberCardProps = {
  member: (typeof _carouselsMembers)[number];
};

function MemberCard({ member }: MemberCardProps) {
  return (
    <Card>
      <Typography variant="subtitle1" sx={{ mt: 2.5, mb: 0.5 }}>
        {member.name}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2.5, color: 'text.secondary' }}>
        {member.role}
      </Typography>

      <Box sx={{ px: 1 }}>
        <Image alt={member.name} src={member.avatarUrl} ratio="1/1" sx={{ borderRadius: 2 }} />
      </Box>

      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {_socials.map((social) => (
          <IconButton key={social.label}>
            {social.value === 'twitter' && <Iconify icon="socials:twitter" />}
            {social.value === 'facebook' && <Iconify icon="socials:facebook" />}
            {social.value === 'instagram' && <Iconify icon="socials:instagram" />}
            {social.value === 'linkedin' && <Iconify icon="socials:linkedin" />}
          </IconButton>
        ))}
      </Box>
    </Card>
  );
}
