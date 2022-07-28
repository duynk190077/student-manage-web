export interface SemesterAnalytic {
  totalStudent: number;
  totalTeacher: number;
  totalStudentMale: number;
  totalStudentFemale: number;
  excellentStudent?: number;
  goodStudent?: number;
}

export const defaultSemesterAnalytic: SemesterAnalytic = {
  totalStudent: 0,
  totalStudentFemale: 0,
  totalStudentMale: 0,
  totalTeacher: 0,
};
