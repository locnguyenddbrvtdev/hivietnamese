export interface ICourse {
  id: number;
  title: string;
  description: string;
  summaryContent: string[];
  content: ICourseContentGroup[];
  knowledgeRequired: string[];
  price: number;
  discountPercent: number;
  isPublish: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICourseContentGroup {
  title: string;
  lessonCount: number;
  lessons: ICourseLesson[];
}

export interface ICourseLesson {
  title: string;
  content: any;
}
