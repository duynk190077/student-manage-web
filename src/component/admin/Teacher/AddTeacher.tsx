import { memo, useState, ChangeEvent } from 'react';
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Stack,
  Button,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

import Teacher from '../../../interfaces/Teacher';
import AdminDrawer, { DrawerHeader } from '../AdminDrawer';
import { BASE_URL, listGender, listSubJect } from '../../../constant';
import {
  validateName,
  validateEmail,
  validatePhoneNumber,
} from '../../shared/helper';
import CusTextField from '../../shared/TextField';

function AddTeacher() {
  const classes = useStyle();
  const [teacher, setTeacher] = useState<Teacher>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '',
    dateofBirth: null,
    email: '',
    subject: '',
  });

  const handleChangeInput =
    (prop: keyof Teacher) => (event: ChangeEvent<HTMLInputElement>) => {
      setTeacher({ ...teacher, [prop]: event.target.value });
    };
  const handleChangeDate = (date: Date | null) => {
    setTeacher({ ...teacher, dateofBirth: date });
  };
  const handleSubmit = async () => {
    await axios.post(`${BASE_URL}/teachers`, { teacher });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDrawer name="Teacher" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h4" noWrap component="div" sx={{ mb: 3 }}>
          Thêm giáo viên mới
        </Typography>
        <hr></hr>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
          <Stack spacing={4} direction="column" sx={{ mb: 4, width: '80%' }}>
            <Box className={classes.wrapForm}>
              <Typography
                variant="subtitle1"
                noWrap
                component="div"
                sx={{ width: '150px' }}
              >
                Họ và Tên đệm:
              </Typography>
              <CusTextField
                label="Họ và tên đệm"
                value={teacher.firstName}
                onChange={handleChangeInput('firstName')}
                validate={validateName(teacher.firstName)}
                width="80%"
              />
            </Box>
            <Box className={classes.wrapForm}>
              <Typography
                variant="subtitle1"
                noWrap
                component="div"
                sx={{ width: '150px' }}
              >
                Tên:
              </Typography>
              <CusTextField
                label="Tên"
                value={teacher.lastName}
                onChange={handleChangeInput('lastName')}
                validate={validateName(teacher.lastName)}
                width="80%"
              />
            </Box>
            <Box className={classes.wrapForm}>
              <Typography
                variant="subtitle1"
                noWrap
                component="div"
                sx={{ width: '150px' }}
              >
                Giới tính:
              </Typography>
              <TextField
                select
                label="Giới tính"
                value={teacher.gender}
                onChange={handleChangeInput('gender')}
                sx={{ width: '80%' }}
              >
                {listGender.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box className={classes.wrapForm}>
              <Typography
                variant="subtitle1"
                noWrap
                component="div"
                sx={{ width: '150px' }}
              >
                Ngày sinh:
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Ngày sinh"
                  inputFormat="dd/MM/yyyy"
                  value={teacher.dateofBirth}
                  onChange={handleChangeDate}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ width: '80%' }} />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box className={classes.wrapForm}>
              <Typography
                variant="subtitle1"
                noWrap
                component="div"
                sx={{ width: '150px' }}
              >
                Số điện thoại:
              </Typography>
              <CusTextField
                label="Số điện thoại"
                value={teacher.phoneNumber}
                onChange={handleChangeInput('phoneNumber')}
                validate={validatePhoneNumber(teacher.phoneNumber)}
                width="80%"
              />
            </Box>
            <Box className={classes.wrapForm}>
              <Typography
                variant="subtitle1"
                noWrap
                component="div"
                sx={{ width: '150px' }}
              >
                Email:
              </Typography>
              <CusTextField
                label="Email"
                value={teacher.email}
                onChange={handleChangeInput('email')}
                validate={validateEmail(teacher.email)}
                width="80%"
              />
            </Box>
            <Box className={classes.wrapForm}>
              <Typography
                variant="subtitle1"
                noWrap
                component="div"
                sx={{ width: '150px' }}
              >
                Môn giảng dạy:
              </Typography>
              <TextField
                select
                label="Môn học"
                value={teacher.subject}
                onChange={handleChangeInput('subject')}
                sx={{ width: '80%' }}
              >
                {listSubJect.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Stack>
        </Box>
        <Button
          variant="contained"
          sx={{ width: '100px' }}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
const useStyle = makeStyles({
  wrapForm: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default memo(AddTeacher);