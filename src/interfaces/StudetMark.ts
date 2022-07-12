export interface StudentMark {
  id?: string;
  semester: string;
  subject?: string;
  student?: string;
  fullName?: string;
  factor1: number[];
  factor2: number[];
  factor3: number[];
}

export const defaultStudentMark: StudentMark = {
  semester: '',
  subject: '',
  student: '',
  fullName: '',
  factor1: [],
  factor2: [],
  factor3: [],
};
