'use client';
import * as React from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Iconify } from 'src/components/iconify';
import { ICourseLessonGroup } from 'src/types/course';

interface Props {
  item: ICourseLessonGroup;
}

export function CourseLessonGroupItem({ item }: Props) {
  const open = useBoolean();

  return (
    <React.Fragment>
      <ListItemButton onClick={open.onToggle}>
        <ListItemIcon>
          {/* @ts-ignore */}
          <Iconify icon="material-symbols:tab-group-outline-rounded" width={24} />
        </ListItemIcon>
        <ListItemText primary={item.title} />
        <Iconify icon={open.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'} />
      </ListItemButton>
      <Collapse in={open.value} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.lessons.map((lesson, ind) => (
            <ListItemButton key={ind} sx={{ pl: 4 }}>
              <ListItemIcon>
                {/* @ts-ignore */}
                <Iconify icon="ic:twotone-play-lesson" width={24} />
              </ListItemIcon>
              <ListItemText primary={lesson.title} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
      <Divider />
    </React.Fragment>
  );
}
