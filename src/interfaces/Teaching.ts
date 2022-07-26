export default interface Teaching {
  id?: string;
  semester: string | null;
  class: string | null;
  subject: string | null;
  teacher: string | null;
}

export const defaultTeaching: Teaching = {
  id: '',
  semester: '',
  class: null,
  subject: null,
  teacher: null,
};
