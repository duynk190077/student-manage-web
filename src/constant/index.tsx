import Home from '../component/home';
import IRoute from '../interfaces/Route';
import Dashboard from '../component/admin/Dashboard';
import Teachers from '../component/admin/Teacher/index';
import EditTeacher from '../component/admin/Teacher/EditTeacher';
import Class from '../component/admin/Class';
import UpdateProfile from '../component/update-profile';
import ChangePassword from '../component/user/ChangePassword';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import DetailClass from '../component/admin/Class/DetailClass';
import Timetable from '../component/timetable';
import TimetableAdmin from '../component/admin/Timetable';
import { Box, Typography } from '@mui/material';
import EditTimetable from '../component/admin/Timetable/EditTimetable';
import Mark from '../component/mark/Mark';

export const PUCLIC_PAGES: IRoute[] = [
  {
    component: Home,
    path: '/',
    exact: true,
  },
  {
    component: Dashboard,
    path: '/admin/Dashboard',
    exact: true,
  },
  {
    component: Teachers,
    path: '/admin/Teacher',
    exact: true,
  },
  {
    component: EditTeacher,
    path: '/admin/Teacher/:id',
    exact: false,
  },
  {
    component: Class,
    path: '/admin/Class',
    exact: true,
  },
  {
    component: UpdateProfile,
    path: '/UpdateProfile',
    exact: true,
  },
  {
    component: ChangePassword,
    path: '/Users/ChangePassword',
    exact: true,
  },
  {
    component: DetailClass,
    path: '/Class/:id',
    exact: true,
  },
  {
    component: Timetable,
    path: '/timetable',
    exact: true,
  },
  {
    component: TimetableAdmin,
    path: '/admin/Timetable',
    exact: true,
  },
  {
    component: EditTimetable,
    path: '/admin/Timetable/:id',
    exact: true,
  },
  {
    component: Mark,
    path: '/student-mark',
    exact: true,
  },
];

export const teacherColumns: GridColDef[] = [
  //{field: 'id', headerName: 'ID', hideable: false, width: 100},
  { field: 'firstName', headerName: 'Họ và tên đệm', width: 150 },
  { field: 'lastName', headerName: 'Tên', width: 100 },
  {
    field: 'fullName',
    headerName: 'Họ và Tên',
    sortable: false,
    width: 170,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  { field: 'gender', headerName: 'Giới tính', width: 70 },
  {
    field: 'dateofBirth',
    type: 'dateTime',
    headerName: 'Ngày sinh',
    width: 120,
    valueGetter: ({ value }) => value && new Date(value).toLocaleDateString(),
  },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'subject', headerName: 'Môn dạy', width: 100 },
];

export const classColumns: GridColDef[] = [
  //{field: 'id', headerName: 'ID', width: 100},
  { field: 'name', headerName: 'Tên lớp', width: 100 },
  { field: 'teacher', headerName: 'Giáo viên chủ nhiệm', width: 200 },
  { field: 'totalStudent', headerName: 'Tổng số học sinh', width: 200 },
];

export const listClass1 = [
  '10A1',
  '10A2',
  '10A3',
  '10A4',
  '10A5',
  '10A6',
  '10A7',
  '10A8',
  '10A9',
];

export const listClass2 = [
  '11A1',
  '11A2',
  '11A3',
  '11A4',
  '11A5',
  '11A6',
  '11A7',
  '11A8',
  '11A9',
];

export const listClass3 = [
  '12A1',
  '12A2',
  '12A3',
  '12A4',
  '12A5',
  '12A6',
  '12A7',
  '12A8',
  '12A9',
];

export const teachingColumns: GridColDef[] = [
  { field: 'subject', headerName: 'Môn học', width: 100 },
  { field: 'teacher', headerName: 'Giáo viên', width: 200 },
];

export const studentColumns: GridColDef[] = [
  {
    field: 'fullName',
    headerName: 'Họ và tên',
    sortable: false,
    width: 170,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  { field: 'gender', headerName: 'Giới tính', width: 70 },
  {
    field: 'dateofBirth',
    type: 'dateTime',
    headerName: 'Ngày sinh',
    width: 120,
    valueGetter: ({ value }) => value && new Date(value).toLocaleDateString(),
  },
  { field: 'phoneNumber', headerName: 'Số điện thoại', width: 150 },
];

export const days = [
  {
    headerName: 'Thứ 2',
    field: 'monday',
  },
  {
    headerName: 'Thứ 3',
    field: 'tusday',
  },
  {
    headerName: 'Thứ 4',
    field: 'wednesday',
  },
  {
    headerName: 'Thứ 5',
    field: 'thursday',
  },
  {
    headerName: 'Thứ 6',
    field: 'friday',
  },
  {
    headerName: 'Thứ 7',
    field: 'saturday',
  },
];

export const lessons = [1, 2, 3, 4, 5];

export const timetableColumns1: GridColDef[] = days.map((day) => {
  return {
    field: day.field,
    headerName: day.headerName,
    width: 120,
    renderCell: (params) => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        {params.row[day.field].map((p: any, index: any) => (
          <Typography key={index} variant="subtitle1" fontSize={15}>
            {p}
          </Typography>
        ))}
      </Box>
    ),
  };
});

export const classGroup = ['10', '11', '12'];

export const listProperty = ['SubJect', 'Gender'];

export const listSubJect = ['Toán', 'Hóa'];

export const listGender = ['Nam', 'Nữ'];

export const listWeek = ['1', '2', '3', '4', '5', '6'];

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

export const AVATAR_STUDENT_URL = 'http://localhost:3000/students/avatar';

export const AVATAR_TEACHER_URL = 'http://localhost:3000/teachers/avatar';
