import { defaultStudentMark, StudentMark } from './StudetMark';

export interface MarkTeacher {
  class: string;
  studentmarks: StudentMark[];
}

export const defaultTeacherMark: MarkTeacher = {
  class: '',
  studentmarks: [defaultStudentMark],
};
