import {
  Box,
  Typography,
  TextField,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Stack,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useState, useEffect, ChangeEvent } from 'react';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { BASE_URL, listGender } from '../../constant';
import Student, { defaultStuden, StudentField } from '../../interfaces/Student';
import Header from '../../templates/header';
import { GetIdFromStroage } from '../shared/helper';

function UpdateProfile() {
  const classes = useStyles();
  const [student, SetStudent] = useState<Student | any>(defaultStuden);
  const studentField: StudentField[] = [
    {
      name: 'Họ và tên',
      field: 'fullName',
      input: true,
      editable: false,
    },
    {
      name: 'Giới tính',
      field: 'gender',
      editable: true,
      radio: true,
      listRadio: listGender,
    },
    {
      name: 'Ngày sinh',
      field: 'dateofBirth',
      editable: true,
      date: true,
    },
    {
      name: 'Số điện thoại',
      field: 'phoneNumber',
      editable: true,
      input: true,
    },
    {
      name: 'Dân tộc',
      field: 'nation',
      editable: true,
      input: true,
    },
    {
      name: 'Tôn giáo',
      field: 'religion',
      editable: true,
      input: true,
    },
    {
      name: 'Địa chỉ',
      field: 'address',
      editable: true,
      input: true,
    },
    {
      name: 'Hộ khẩu',
      field: 'permanentResidence',
      editable: true,
      input: true,
    },
  ];

  const id = GetIdFromStroage();

  useEffect(() => {
    axios.get(`${BASE_URL}/students/${id}`).then((respone) => {
      const fullName = respone.data.firstName + ' ' + respone.data.lastName;
      SetStudent({ ...respone.data, fullName });
    });
  }, []);

  const handleChangeInput =
    (prop: keyof Student) => (event: ChangeEvent<HTMLInputElement>) => {
      SetStudent({ ...student, [prop]: event.target.value });
    };

  const handleChangeDate = (date: Date | null) => {
    SetStudent({ ...student, dateofBirth: date });
  };
  return (
    <>
      <Header />
      <Box className={classes.container}>
        <Box className={classes.mainTitle}>
          <Typography variant="h3">Cập nhật thông tin cá nhân</Typography>
          <hr></hr>
        </Box>
        <Box className={classes.mainContent}>
            <Stack direction='column' spacing={3}>
                {studentField.map((p, index) => {
                    return p?.input === true ? (
                    <Box
                        key={index}
                        sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        }}
                    >
                        <Box
                        sx={{
                            width: '150px',
                        }}
                        >
                        <Typography variant="subtitle1">{p.name}:*</Typography>
                        </Box>
                        <TextField
                        className={classes.textField}
                        value={student[p.field]}
                        onChange={handleChangeInput(p.field)}
                        disabled={!p.editable}
                        />
                    </Box>
                    ) : p?.radio === true ? (
                    <FormControl
                        key={index}
                        sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        }}
                    >
                        <FormLabel
                        id={`${p.field}-radio`}
                        sx={{
                            width: '150px',
                            color: '#000000',
                        }}
                        >
                        {p.name}:*
                        </FormLabel>
                        <RadioGroup
                        aria-labelledby={`${p.field}-radio`}
                        value={student[p.field]}
                        onChange={handleChangeInput(p.field)}
                        sx={{
                            flexDirection: 'row',
                            flex: '1',
                        }}
                        >
                        {p.listRadio?.map((role, index) => {
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
                    </FormControl>
                    ) : (
                    <Box
                        key={index}
                        sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        }}
                    >
                        <Box
                        sx={{
                            width: '150px',
                        }}
                        >
                        <Typography variant="subtitle1">{p.name}:*</Typography>
                        </Box>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            inputFormat="dd/MM/yyyy"
                            value={student[p.field]}
                            onChange={handleChangeDate}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                className={classes.textField}
                                sx={{ width: '80%' }}
                            />
                            )}
                        />
                        </LocalizationProvider>
                    </Box>
                    );
                })}
            </Stack>
        </Box>
      </Box>
    </>
  );
}

const useStyles = makeStyles({
  container: {
    width: '1200px',
    verticalAlign: 'top',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#fff',
    marginTop: '20px',
  },
  mainTitle: {
    width: '100%',
    padding: '5px',
    textAlign: 'center',
    '& h3': {
      fontWeight: '500',
      textTransform: 'uppercase',
      fontSize: '24px',
    },
    '& hr': {
      margin: '20px 0',
      border: '0',
      borderTop: '1px solid #eee',
    },
  },
  mainContent: {
    width: '100%',
  },
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
export default UpdateProfile;
