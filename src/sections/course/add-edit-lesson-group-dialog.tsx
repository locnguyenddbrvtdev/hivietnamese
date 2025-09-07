'use client';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { useBoolean, UseBooleanReturn, useSetState } from 'minimal-shared/hooks';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';

import { CourseCreateSchemaType } from './view/course-create-view';
import { EmptyContent } from 'src/components/empty-content';
import { ICourseLesson } from 'src/types/course';
import { Iconify } from 'src/components/iconify';

type IProps = { openDialog: UseBooleanReturn; type: 'add' | 'edit' };

export function AddEditLessonGroupDialog({ openDialog, type }: IProps) {
  const openAddLessonDialog = useBoolean();

  const { state, resetState, setField } = useSetState<{
    title: string;
    lessons: ICourseLesson[];
    errMss: string;
  }>({ title: '', lessons: [], errMss: '' });

  const { setValue, watch } = useFormContext<CourseCreateSchemaType>();

  const lessonGroup = watch('content');

  const handleSubmit = React.useCallback(() => {
    if (type === 'add') {
      const existing = lessonGroup.find((item) => item.title === state.title);
      if (state.title === '') {
        setField('errMss', 'Lesson group title is required');
        return;
      }
      if (existing) {
        setField('errMss', 'Lesson group title already exists');
        return;
      }
      setValue('content', [
        ...lessonGroup,
        { title: state.title, count: state.lessons.length, lessons: state.lessons },
      ]);
      openDialog.onFalse();
      resetState();
    }
    if (type === 'edit') {
    }
  }, [type, lessonGroup, state.title, state.errMss, setField, setValue, openDialog, resetState]);

  return (
    <React.Fragment>
      <Dialog open={openDialog.value} scroll="paper" aria-hidden={false} fullWidth>
        <DialogTitle sx={{ pb: 2 }}>
          {type === 'add' ? 'Add Lesson Group' : 'Edit Lesson Group'}
        </DialogTitle>
        <DialogContent dividers sx={{ justifyContent: 'center', display: 'flex', pt: 2 }}>
          <Stack spacing={2} sx={{ width: '100%', minHeight: 400 }}>
            <TextField
              label="Title"
              value={state.title}
              onChange={(e) => setField('title', e.target.value)}
              fullWidth
              size="small"
              error={!!state.errMss}
              helperText={state.errMss}
            />
            <Typography variant="subtitle2" sx={{ px: 1 }}>
              Lesson:
            </Typography>
            <Button variant="outlined" onClick={openAddLessonDialog.onTrue}>
              Add Lesson
            </Button>
            {state.lessons.length === 0 && <EmptyContent />}
            {state.lessons.length > 0 && (
              <List sx={{ width: 1, bgcolor: 'background.paper' }}>
                {state.lessons.map((lesson, index) => (
                  <CourseLessonItem key={index} item={lesson} />
                ))}
              </List>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              openDialog.onFalse();
              resetState();
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {type === 'add' ? 'Add new' : 'Edit'}
          </Button>
        </DialogActions>
      </Dialog>
      <AddEditLessonDialog
        openDialog={openAddLessonDialog}
        type="add"
        currLessons={state.lessons}
        onSetLessons={(lessons: ICourseLesson[]) => setField('lessons', lessons)}
      />
    </React.Fragment>
  );
}

interface IAddEditLessonDialogProps {
  openDialog: UseBooleanReturn;
  type: 'add' | 'edit';
  currLessons: ICourseLesson[];
  onSetLessons: (lessons: ICourseLesson[]) => void;
}

function AddEditLessonDialog({
  openDialog,
  type,
  currLessons,
  onSetLessons,
}: IAddEditLessonDialogProps) {
  const { state, resetState, setField } = useSetState({
    title: '',
    content: '',
    errMss: { title: '', content: '' },
  });

  const handleSubmit = React.useCallback(() => {
    if (type === 'add') {
      let existErr = false;
      if (state.title === '') {
        setField('errMss', { ...state.errMss, title: 'Lesson title is required' });
        existErr = true;
      }
      if (state.content === '') {
        setField('errMss', { ...state.errMss, content: 'Lesson content is required' });
        existErr = true;
      }
      if (existErr) return;
      // Submit the new lesson
      onSetLessons([...currLessons, { title: state.title, content: state.content }]);
      openDialog.onFalse();
      resetState();
    }
    if (type === 'edit') {
    }
  }, [state, resetState, setField]);

  return (
    <Dialog open={openDialog.value} scroll="paper" aria-hidden={false} fullWidth>
      <DialogTitle sx={{ pb: 2 }}>{type === 'add' ? 'Add Lesson' : 'Edit Lesson'}</DialogTitle>
      <DialogContent dividers sx={{ justifyContent: 'center', display: 'flex', pt: 2 }}>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <TextField
            label="Title"
            value={state.title}
            onChange={(e) => setField('title', e.target.value)}
            fullWidth
            size="small"
            error={!!state.errMss.title}
            helperText={state.errMss.title}
          />
          <TextField
            label="Content"
            value={state.content}
            onChange={(e) => setField('content', e.target.value)}
            fullWidth
            size="small"
            multiline
            rows={8}
            error={!!state.errMss.content}
            helperText={state.errMss.content}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            openDialog.onFalse();
            resetState();
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {type === 'add' ? 'Add new' : 'Edit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function CourseLessonItem({ item }: { item: ICourseLesson }) {
  const open = useBoolean();

  return (
    <React.Fragment>
      <ListItemButton onClick={open.onToggle}>
        <ListItemIcon>
          {/* @ts-ignore */}
          <Iconify icon="ic:twotone-play-lesson" width={24} />
        </ListItemIcon>
        <ListItemText primary={item.title} />
        <Iconify icon={open.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'} />
      </ListItemButton>
      <Collapse in={open.value} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Lessons" />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider />
    </React.Fragment>
  );
}
