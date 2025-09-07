export interface ICourse {
  id: number;
  title: string;
  description: string;
  summaryContent: string[];
  content: ICourseLessonGroup[];
  knowledgeRequired: string[];
  price: number;
  discountPercent: number;
  thumbnailPath: string;
  isPublish: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICourseLessonGroup {
  title: string;
  count: number;
  lessons: ICourseLesson[];
}

export interface ICourseLesson {
  title: string;
  content: string;
}
