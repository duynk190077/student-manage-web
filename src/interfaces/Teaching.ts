export interface Teaching {
  id?: string;
  semester: string;
  class: string;
  subject: string;
  teacher: string;
}

export const defaultTeaching: Teaching = {
  id: '',
  semester: '',
  class: '',
  subject: '',
  teacher: '',
};
