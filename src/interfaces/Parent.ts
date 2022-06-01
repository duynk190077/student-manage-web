export default interface Parent {
  id?: string;
  fullName: string;
  yearofBirth: Number | '';
  job: string;
  phoneNumber: string;
}

export const defaultParent: Parent = {
  fullName: '',
  yearofBirth: '',
  job: '',
  phoneNumber: '',
};

export interface ParentField {
  name: string;
  field: keyof Parent;
  editable: boolean;
}
