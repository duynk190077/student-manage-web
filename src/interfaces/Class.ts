export default interface Classroom {
  id?: string;
  name: string;
  teacher: string;
  students: [];
  totalStudent: number;
}

export const defaultClassroom: Classroom = {
  name: '',
  teacher: '',
  students: [],
  totalStudent: 0,
};
