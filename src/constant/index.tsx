import Home from '../component/home';
import IRoute from '../interfaces/Route';
import Dashboard from '../component/admin/Dashboard';
import Teachers from '../component/admin/Teacher/index';
import EditTeacher from '../component/admin/Teacher/EditTeacher';
import Class from '../component/admin/Class';
import UpdateProfile from '../component/student/UpdateProfile';
import ChangePassword from '../component/user/ChangePassword';
import {
  GridRowsProp,
  GridColDef,
  GridValueGetterParams,
} from '@mui/x-data-grid';

export const PUCLIC_PAGES: IRoute[] = [
  {
    component: Home,
    path: '/',
    exact: true,
  },
  {
    component: Dashboard,
    path: '/Dashboard',
    exact: true,
  },
  {
    component: Teachers,
    path: '/Teacher',
    exact: true,
  },
  {
    component: EditTeacher,
    path: '/Teacher/:id',
    exact: false,
  },
  {
    component: Class,
    path: '/Class',
    exact: true,
  },
  {
    component: UpdateProfile,
    path: '/Students/UpdateProfile',
    exact: true,
  },
  {
    component: ChangePassword,
    path: '/Users/ChangePassword',
    exact: true,
  },
];

export const teacherColumns: GridColDef[] = [
  //{field: 'id', headerName: 'ID', hideable: false, width: 100},
  { field: 'firstName', headerName: 'FirstName', width: 150 },
  { field: 'lastName', headerName: 'LastName', width: 100 },
  {
    field: 'fullname',
    headerName: 'FullName',
    sortable: false,
    width: 170,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstname || ''} ${params.row.lastname || ''}`,
  },
  { field: 'gender', headerName: 'Gender', width: 70 },
  { field: 'dateofBirth', headerName: 'Date of Birth', width: 120 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'subject', headerName: 'SubJect', width: 100 },
  { field: 'class', headerName: 'Class', width: 100 },
];

export const classColumns: GridColDef[] = [
  //{field: 'id', headerName: 'ID', width: 100},
  { field: 'name', headerName: 'Name', width: 100 },
  { field: 'teacher', headerName: 'Teacher', width: 200 },
  { field: 'student', headerName: 'Student', width: 200 },
];

export const classRows: GridRowsProp = [
  {
    id: 1,
    name: '10A1',
    teacher: 'Nguyễn Khương Duy',
    student: 40,
  },
  {
    id: 2,
    name: '10A2',
    teacher: 'Trần Thị Huyền Trang',
    student: 39,
  },
];

export const listProperty = ['SubJect', 'Gender'];

export const listSubJect = ['Toán', 'Hóa'];

export const listGender = ['Nam', 'Nữ'];

export const listClass = ['10A1', '10A2', '10A3'];

export const roles = [
  {
    name: 'Student',
    value: 'Học sinh',
  },
  {
    name: 'Teacher',
    value: 'Giáo viên',
  },
  {
    name: 'Admin',
    value: 'Quản trị viên',
  },
];

export const BASE_URL = 'http://localhost:3000';
