import Home from '../component/home';
import IRoute from '../interfaces/Route';
import Dashboard from '../component/admin/Dashboard';
import Teachers from '../component/admin/Teacher/index';
import EditTeacher from '../component/admin/Teacher/EditTeacher';
import Class from '../component/admin/Class';
import UpdateProfile from '../component/student/UpdateProfile';
import ChangePassword from '../component/user/ChangePassword';
import {
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
    field: 'fullName',
    headerName: 'FullName',
    sortable: false,
    width: 170,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  { field: 'gender', headerName: 'Gender', width: 70 },
  { 
    field: 'dateofBirth', 
    type: 'dateTime',
    headerName: 'Date of Birth', 
    width: 120,
    valueGetter: ({ value }) => value && new Date(value).toLocaleDateString()
  },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'subject', headerName: 'SubJect', width: 100 },
  { field: 'class', headerName: 'Class', width: 100 },
];

export const classColumns: GridColDef[] = [
  //{field: 'id', headerName: 'ID', width: 100},
  { field: 'name', headerName: 'Tên lớp', width: 100 },
  { field: 'teacher', headerName: 'Giáo viên chủ nhiệm', width: 200 },
  { field: 'totalStudent', headerName: 'Tổng số học sinh', width: 200 },
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
