import { Avatar, Grid, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useMemo } from 'react';
import { AVATAR_TEACHER_URL } from '../../constant';
import Teacher, { defaultTeacher } from '../../interfaces/Teacher';
import { useSelector } from 'react-redux/es/exports';
import { useAppDispatch } from '../../redux/store';
import { getUserInfo } from '../../redux/userSlice';

interface TeacherField {
  id: keyof Teacher;
  headerName: string;
}

const teacherField: TeacherField[] = [
  {
    id: 'gender',
    headerName: 'Giới tính',
  },
  {
    id: 'dateofBirth',
    headerName: 'Ngày sinh',
  },
  {
    id: 'phoneNumber',
    headerName: 'Số điện thoại',
  },
  {
    id: 'email',
    headerName: 'Email',
  },
  {
    id: 'subject',
    headerName: 'Môn dạy',
  },
];

function TeacherHome() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useAppDispatch();
  const teacher = useMemo(() => {
    if (user !== null) return user.userInfo;
    return defaultTeacher;
  }, [user]);
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  const RenderAvatar = useMemo(() => {
    if (teacher === null)
      return (
        <AccountCircleIcon
          sx={{ width: '200px', height: '200px', color: '#ccc' }}
        />
      );
    const imageName = teacher?.image;
    if (imageName === '' || imageName === undefined)
      return (
        <AccountCircleIcon
          sx={{ width: '200px', height: '200px', color: '#ccc' }}
        />
      );
    return (
      <Avatar
        src={`${AVATAR_TEACHER_URL}/${imageName}`}
        alt="Avatar"
        sx={{ width: '200px', height: '200px', marginRight: 1 }}
      />
    );
  }, [teacher]);
  const GetDateFormat = (dateofBirth: any) => {
    const date = new Date(dateofBirth);
    return date.toLocaleDateString();
  };
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={3}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {RenderAvatar}
      </Grid>
      <Grid
        item
        xs={6}
        container
        spacing={2}
        direction="column"
        sx={{ justifyContent: 'space-evenly' }}
      >
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h6" fontSize={16}>
              Họ và Tên:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">{`${teacher.firstName} ${teacher.lastName}`}</Typography>
          </Grid>
        </Grid>
        {teacherField.map((p, index) => {
          return (
            <Grid container spacing={2} key={index}>
              <Grid item xs={3}>
                <Typography variant="h6" fontSize={16}>
                  {p.headerName}:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  {p.id === 'dateofBirth'
                    ? GetDateFormat(teacher[p.id])
                    : teacher[p.id]}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default TeacherHome;
