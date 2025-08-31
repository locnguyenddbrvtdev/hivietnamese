export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  avatarPath: string | null;
  createdAt: Date;
}

export enum InternalRole {
  admin = 'admin',
  teacher = 'teacher',
  contentWriter = 'content-writer',
}

export interface IInternal extends IUser {
  employeeId: string;
  roles: InternalRole[];
}

export interface IStudent extends IUser {
  studentId: string;
  enrolledCourses: number[];
}
