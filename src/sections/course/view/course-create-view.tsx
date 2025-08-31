'use client';

import { z as zod } from 'zod';
import { m, number } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Container from '@mui/material/Container';
import { CSSObject, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';
import { MotionContainer, varFade } from 'src/components/animate';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Field, Form } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ICourse } from 'src/types/course';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';

export type CourseCreateSchemaType = zod.infer<typeof CourseCreateSchema>;

export const CourseCreateSchema = zod.object({});

export function CourseCreateView() {
  const defaultValues: Omit<ICourse, 'id' | 'createdAt' | 'updatedAt'> = {
    title: '',
    description: '',
    summaryContent: [],
    content: [],
    knowledgeRequired: [],
    price: 0,
    discountPercent: 0,
    isPublish: false,
  };

  const methods = useForm({
    resolver: zodResolver(CourseCreateSchema),
    defaultValues,
  });

  return (
    <>
      <LayoutHero>
        <Container>
          <MotionContainer sx={{ textAlign: 'center' }}>
            <m.div variants={varFade('inUp', { distance: 24 })}>
              <Typography variant="h3" component="h1">
                Create Course
              </Typography>
            </m.div>

            <m.div variants={varFade('inUp', { distance: 24 })}>
              <Typography sx={{ color: 'text.secondary', mt: 3 }}>Thêm khoá học</Typography>
            </m.div>
          </MotionContainer>
        </Container>
      </LayoutHero>
      <Stack alignItems={'center'} py={8} px={{ md: 24, xs: 2 }} gap={2}>
        <Form invisible methods={methods} onSubmit={() => {}}>
          <Card>
            <CardHeader
              title="Overviews"
              subheader="Title, short description, image..."
              // action={renderCollapseButton(openDetails.value, openDetails.onToggle)}
              sx={{ mb: 3 }}
            />

            <Collapse in={true}>
              <Divider />

              <Stack spacing={3} sx={{ p: 3 }}>
                <Field.Text
                  name="title"
                  label="Title"
                  placeholder="Enter course title"
                  slotProps={{ inputLabel: { shrink: true } }}
                />
                <Field.Text
                  name="description"
                  label="Description"
                  placeholder="Enter course description"
                  slotProps={{ inputLabel: { shrink: true } }}
                  multiline
                  rows={4}
                />
                <Field.Text
                  name="highLight"
                  label="Summary Content"
                  placeholder="Enter course summary content"
                  slotProps={{ inputLabel: { shrink: true } }}
                  multiline
                  rows={4}
                />
                <Field.Text
                  name="knowledgeRequired"
                  label="Knowledge Required"
                  placeholder="Enter knowledge required for the course"
                  slotProps={{ inputLabel: { shrink: true } }}
                  multiline
                  rows={4}
                />
                <Stack flexDirection={'row'} width={'100%'} gap={2}>
                  <Field.Text
                    name="price"
                    label="Price"
                    placeholder="Enter course price"
                    type="number"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                  <Field.Text
                    name="discountPercent"
                    label="Discount Percent"
                    placeholder="Enter course discount percent"
                    type="number"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Content</Typography>
                  <Field.Editor name="content" sx={{ maxHeight: 480 }} />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Cover</Typography>
                  <Field.Upload name="coverUrl" maxSize={3145728} onDelete={() => {}} />
                </Stack>
              </Stack>
            </Collapse>
          </Card>
          <Card sx={{ width: '100%' }}>
            <CardHeader
              title="Content"
              subheader="List of lessons"
              // action={renderCollapseButton(openDetails.value, openDetails.onToggle)}
              sx={{ mb: 3 }}
            />

            <Collapse in={true}>
              <Divider />

              <Stack spacing={3} sx={{ p: 3 }}>
                <Button variant="outlined">Add Lesson Group</Button>
                {/* <Field.Text
                  name="title"
                  label="Title"
                  placeholder="Enter course title"
                  slotProps={{ inputLabel: { shrink: true } }}
                /> */}

                {/* <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Content</Typography>
                  <Field.Editor name="content" sx={{ maxHeight: 480 }} />
                </Stack> */}
              </Stack>
            </Collapse>
          </Card>
          <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
            <FormControlLabel
              label="Publish"
              control={<Switch defaultChecked slotProps={{ input: { id: 'publish-switch' } }} />}
            />
            <Stack flexDirection={'row'} gap={1}>
              <Button variant="outlined">Cancel</Button>
              <Button variant="contained">Create</Button>
            </Stack>
          </Stack>
        </Form>
      </Stack>
    </>
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
