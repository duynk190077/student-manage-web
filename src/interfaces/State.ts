export default interface IState {
  userId: string;
  userInfo: any | null;
  role: string;
  accessToken: string;
  listSubject: string[];
  listClass: string[];
  semester: string;
  week: number;
  status: string;
}
