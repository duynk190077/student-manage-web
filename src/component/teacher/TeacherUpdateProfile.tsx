import { PhotoCamera } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Typography,
  Badge,
  Avatar,
  Stack,
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  useEffect,
  useState,
  useMemo,
  ChangeEvent,
  SyntheticEvent,
} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { AVATAR_TEACHER_URL, BASE_URL, listGender } from '../../constant';
import Teacher, { defaultTeacher } from '../../interfaces/Teacher';
import Header from '../../templates/header';
import axios from 'axios';
import { authHeader } from '../shared/helper';
import { makeStyles } from '@mui/styles';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useSelector } from 'react-redux';

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

function TeacherUpdateProfile() {
  const classes = useStyles();
  const user = useSelector((state: any) => state.user.user);
  const [teacher, setTeacher] = useState<Teacher>(defaultTeacher);
  const [error, setError] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (user !== null) setTeacher(user);
  }, [user]);

  const handleChangeInputTeacher =
    (prop: keyof Teacher) => (event: ChangeEvent<HTMLInputElement>) => {
      setTeacher({ ...teacher, [prop]: event.target.value });
    };

  const handleChangeDate = (date: Date | null) => {
    setTeacher({ ...teacher, dateofBirth: date });
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;
    setError(false);
    const formData = new FormData();
    formData.append('file', fileList[0]);
    const respone = await axios.post(`${BASE_URL}/teachers/upload`, formData, {
      headers: authHeader(),
    });

    if (respone.data !== false) {
      setError(false);
      if (teacher.image !== '') {
        axios.delete(`${AVATAR_TEACHER_URL}/${teacher.image}`, {
          headers: authHeader(),
        });
      }
    } else setError(true);
    setOpen(true);
  };

  const RenderAvatar = useMemo(() => {
    if (teacher === null)
      return (
        <AccountCircleIcon
          sx={{ width: '100px', height: '100px', color: '#ccc' }}
        />
      );
    const imageName = teacher?.image;
    if (imageName === '' || imageName === undefined)
      return (
        <AccountCircleIcon
          sx={{ width: '100px', height: '100px', color: '#ccc' }}
        />
      );
    return (
      <Avatar
        src={`${AVATAR_TEACHER_URL}/${imageName}`}
        alt="Avatar"
        sx={{ width: '100px', height: '100px', marginRight: 1 }}
      />
    );
  }, [teacher]);

  const handleUpdateTeacher = async (event: SyntheticEvent) => {
    event.preventDefault();
    setError(false);
    const respone = await axios({
      method: 'put',
      url: `${BASE_URL}/teachers/${teacher.id}`,
      data: {
        ...teacher,
      },
    });
    setError(!respone.data || error);
    setOpen(true);
  };

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Header id={0} />
      <Box className="container">
        <Box className="mainTitle">
          <Typography variant="h3">Cập nhật thông tin cá nhân</Typography>
          <hr></hr>
        </Box>
        <Stack
          direction="column"
          spacing={3}
          sx={{ justifyContent: 'center', alignItems: 'center', p: 3 }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <label
                htmlFor="icon-button-file"
                style={{ borderRadius: '50%', backgroundColor: '#ccc' }}
              >
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={handleFileChange}
                  hidden
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera sx={{ color: '#fff' }} />
                </IconButton>
              </label>
            }
          >
            {RenderAvatar}
          </Badge>
          <Grid container spacing={1} sx={{ alignItems: 'center' }}>
            <Grid item xs={2}>
              <Typography variant="h6" fontSize={16}>
                Họ và Tên:*
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                value={`${teacher.firstName} ${teacher.lastName}`}
                disabled
                className={classes.textField}
              />
            </Grid>
          </Grid>
          {teacherField.map((p, index) => {
            return (
              <Grid
                container
                spacing={1}
                key={index}
                sx={{ alignItems: 'center' }}
              >
                <Grid item xs={2}>
                  <Typography variant="h6" fontSize={16}>
                    {p.headerName}:*
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  {p.id === 'dateofBirth' ? (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        inputFormat="dd/MM/yyyy"
                        value={teacher[p.id]}
                        onChange={handleChangeDate}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            className={classes.textField}
                            sx={{ width: '100%' }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  ) : p.id === 'gender' ? (
                    <RadioGroup
                      value={teacher[p.id]}
                      onChange={handleChangeInputTeacher(p.id)}
                      sx={{
                        flexDirection: 'row',
                        flex: '1',
                      }}
                    >
                      {listGender.map((role, index) => {
                        return (
                          <FormControlLabel
                            key={role}
                            value={role}
                            control={<Radio />}
                            label={role}
                            sx={{ width: '48%' }}
                          />
                        );
                      })}
                    </RadioGroup>
                  ) : (
                    <TextField
                      fullWidth
                      value={teacher[p.id]}
                      onChange={handleChangeInputTeacher(p.id)}
                      className={classes.textField}
                    />
                  )}
                </Grid>
              </Grid>
            );
          })}
        </Stack>
        <Grid container spacing={1} sx={{ p: 3 }}>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleUpdateTeacher}>
              Cập nhật
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={error === false ? 'success' : 'error'}
          >
            {error === false ? 'Cập nhật thành công' : 'Cập nhật thất bại'}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}

const useStyles = makeStyles({
  textField: {
    flex: 1,

    '& .MuiOutlinedInput-input': {
      padding: '10px 14px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '0',
    },
  },
});

export default TeacherUpdateProfile;
