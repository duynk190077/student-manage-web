export interface StudentMark {
  id?: string;
  semester: string;
  subject?: string;
  student?: string;
  factor1: number[];
  factor2: number[];
  factor3: number[];
}

export const defaultStudentMark: StudentMark = {
  semester: '',
  subject: '',
  student: '',
  factor1: [],
  factor2: [],
  factor3: [],
};
