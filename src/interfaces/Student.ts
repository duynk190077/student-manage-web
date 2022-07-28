export default interface Student {
  id?: string;
  user: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  dateofBirth: Date | '' | null;
  phoneNumber: string;
  class?: string;
  nation: string;
  nationId: string;
  address: string;
  permanentResidence: string;
  religion: string;
  parents: string[];
  yearJoin?: number;
  image?: string;
}

export const defaultStudent: Student = {
  id: '',
  user: '',
  firstName: '',
  lastName: '',
  fullName: '',
  gender: '',
  dateofBirth: '',
  phoneNumber: '',
  nation: '',
  nationId: '',
  address: '',
  permanentResidence: '',
  religion: '',
  parents: [],
  image: '',
};

export interface StudentField {
  name: string;
  field: keyof Student;
  editable: boolean;
  input?: boolean;
  radio?: boolean;
  date?: boolean;
  select?: boolean;
  listSelect: readonly any[];
  listRadio?: any[];
}
