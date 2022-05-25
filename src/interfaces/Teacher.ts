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
