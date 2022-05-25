export default interface Student {
  id?: string;
  user: string;
  fullName: string;
  gender: string;
  dateofBirth: Date | '' | null;
  phoneNumber: string;
  nation: string;
  nationId: string;
  address: string;
  permanentResidence: string;
  religion: string;
  parents: string[];
  image?: string;
}

export const defaultStuden: Student = {
  id: '',
  user: '',
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
  listRadio?: any[];
}
