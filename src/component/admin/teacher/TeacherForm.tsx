import { memo, useState, ChangeEvent, useEffect, SyntheticEvent } from 'react';
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

import Teacher, { defaultTeacher } from '../../../interfaces/Teacher';
import AdminDrawer, { DrawerHeader } from '../AdminDrawer';
import { BASE_URL, listGender } from '../../../constant';
import {
  validateName,
  validateEmail,
  validatePhoneNumber,
  authHeader,
  validateTeacher,
} from '../../shared/helper';
import CusTextField from '../../shared/TextField';
import { useStore } from '../../../store';
import { useParams } from 'react-router-dom';
import { ParamTypes } from '../../../interfaces/ParamTypes';

function TeacherForm() {
  const { id } = useParams<ParamTypes>();
  const classes = useStyle();
  const [state, dispatch] = useStore();
  const [teacher, setTeacher] = useState<Teacher>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '',
    dateofBirth: null,
    email: '',
    subject: '',
    image: '',
  });

  useEffect(() => {
    if (id !== 'Add') {
      axios
      .get(`${BASE_URL}/teachers/${id}`)
      .then((respone) => setTeacher(respone.data));
    }
  }, [])

  const handleChangeInput =
    (prop: keyof Teacher) => (event: ChangeEvent<HTMLInputElement>) => {
      setTeacher({ ...teacher, [prop]: event.target.value });
    };
  const handleChangeDate = (date: Date | null) => {
    setTeacher({ ...teacher, dateofBirth: date });
  };
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!validateTeacher(teacher)) {
      if ( id === "Add") {
        const respone = await axios.post(
          `${BASE_URL}/teachers`,
          { ...teacher },
          {
            headers: authHeader(),
          },
        );
        if (respone.data !== false) {
          alert('Add teacher successfully');
          setTeacher(defaultTeacher);
        } else alert('Add teacher fail');
      } else {
        axios.put(`${BASE_URL}/teachers/${id}`, { teacher });
      }
    } else alert('Input is in valid');
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
                className={classes.textField}
                select
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
                  inputFormat="dd/MM/yyyy"
                  value={teacher.dateofBirth}
                  onChange={handleChangeDate}
                  renderInput={(params) => (
                    <TextField
                      className={classes.textField}
                      {...params}
                      sx={{ width: '80%' }}
                    />
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
                className={classes.textField}
                select
                value={teacher.subject}
                onChange={handleChangeInput('subject')}
                sx={{ width: '80%' }}
              >
                {state.listSubject.map((option: any) => (
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
  textField: {
    '& .MuiOutlinedInput-input': {
      padding: '10px 14px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '0',
    },
  },
});

export default memo(TeacherForm);
