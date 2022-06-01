export default interface Classroom {
  id?: string;
  name: string;
  teacher: string;
  totalStudent: number;
}

export const defaultClassroom: Classroom = {
  name: '',
  teacher: '',
  totalStudent: 0
}