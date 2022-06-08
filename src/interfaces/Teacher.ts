export default interface Teacher {
  id?: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateofBirth: Date | null;
  phoneNumber: string;
  email: string;
  subject: string;
}

export const defaultTeacher: Teacher = {
  id: '',
  firstName: '',
  lastName: '',
  gender: '',
  dateofBirth: null,
  phoneNumber: '',
  email: '',
  subject: '',
}
