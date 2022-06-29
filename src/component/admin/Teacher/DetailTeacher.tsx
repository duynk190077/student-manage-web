import {
  Box,
  Grid,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { memo, useState, ChangeEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import AdminDrawer, { DrawerHeader } from '../AdminDrawer';
import Avatars from '../img/Avatars.jpg';
import Teacher from '../../../interfaces/Teacher';
import { listGender, listSubJect } from '../../../constant';
import ParamTypes from '../../../interfaces/ParamTypes';
import { BASE_URL } from '../../../constant';

function DetailTeacher() {
  const { id } = useParams<ParamTypes>();

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

  const [editable, setEditable] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/teachers/${id}`)
      .then((respone) => setTeacher(respone.data));
  }, []);

  const handleChangeInput =
    (prop: keyof Teacher) => (event: ChangeEvent<HTMLInputElement>) => {
      setTeacher({ ...teacher, [prop]: event.target.value });
    };
  const handleChangeDate = (date: Date | null) => {
    setTeacher({ ...teacher, dateofBirth: date });
  };
  const handleChangeEditable = (state: boolean) => {
    setEditable(state);
    axios.put(`${BASE_URL}/teachers/${id}`, { teacher });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDrawer name="Teacher" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h4" noWrap component="div" sx={{ mb: 3 }}>
          {`${teacher.firstName} ${teacher.lastName}`}
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mb: 3 }}>
          <Button
            variant="contained"
            onClick={() => handleChangeEditable(false)}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            onClick={() => handleChangeEditable(true)}
          >
            Save Profile
          </Button>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <img
              alt="avatar"
              src={Avatars}
              style={{ width: '80%', objectFit: 'cover', borderRadius: '4px' }}
            />
          </Grid>
          <Grid item xs={8}>
            <Stack spacing={2} direction="column">
              <TextField
                label="FirstName"
                value={teacher.firstName}
                onChange={handleChangeInput('firstName')}
                disabled={editable}
                sx={{ width: '98%' }}
              />
              <TextField
                label="LastName"
                value={teacher.lastName}
                onChange={handleChangeInput('lastName')}
                disabled={editable}
                sx={{ width: '98%' }}
              />
              <TextField
                select
                label="Gender"
                onChange={handleChangeInput('gender')}
                disabled={editable}
                sx={{ width: '98%' }}
                value={teacher.gender}
              >
                {listGender.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date of Birth"
                  inputFormat="dd/MM/yyyy"
                  value={teacher.dateofBirth}
                  disabled={editable}
                  onChange={handleChangeDate}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ width: '98%' }} />
                  )}
                />
              </LocalizationProvider>
              <TextField
                label="PhoneNumber"
                value={teacher.phoneNumber}
                onChange={handleChangeInput('phoneNumber')}
                disabled={editable}
                sx={{ width: '98%' }}
              />
              <TextField
                label="Email"
                value={teacher.email}
                onChange={handleChangeInput('email')}
                disabled={editable}
                sx={{ width: '98%' }}
              />
              <TextField
                select
                label="SubJect"
                onChange={handleChangeInput('subject')}
                disabled={editable}
                sx={{ width: '98%' }}
                value={teacher.subject}
              >
                {listSubJect.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default memo(DetailTeacher);
