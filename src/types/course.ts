export interface ICourse {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  rating: { point: number; count: number };
  students: number;
  price: number;
  content: ICourseGroup[];
}

export interface ICourseGroup {
  id: number;
  title: string;
  lectures: ICourseLecture[];
}

export interface ICourseLecture {
  id: number;
  title: string;
  description: string;
  duration: number;
}

export interface ICourseRating {
  id: number;
  courseId: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: Date;
}
