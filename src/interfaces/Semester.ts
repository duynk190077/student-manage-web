export interface Semester {
  semester: string;
  week: number;
  status: string | null;
}

export const defaultSemester: Semester = {
  semester: '',
  week: 0,
  status: '',
};
