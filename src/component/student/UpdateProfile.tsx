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
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { BASE_URL, listGender } from '../../constant';
import Student, { defaultStudent, StudentField } from '../../interfaces/Student';
import Header from '../../templates/header';
import { GetIdFromStroage } from '../shared/helper';
import Parent, { defaultParent, ParentField } from '../../interfaces/Parent';

function UpdateProfile() {
  const classes = useStyles();
  const [student, SetStudent] = useState<Student | any>(defaultStudent);
  const [father, SetFather] = useState<Parent | any>(defaultParent);
  const [mother, SetMother] = useState<Parent | any>(defaultParent);
  const [error, setError] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
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
  const parentField: ParentField[] = [
    {
      name: 'Họ và tên',
      field: 'fullName',
      editable: true,
    },
    {
      name: 'Năm sinh',
      field: 'yearofBirth',
      editable: true,
    },
    {
      name: 'Số điện thoại',
      field: 'phoneNumber',
      editable: true,
    },
    {
      name: 'Nghề nghiệp',
      field: 'job',
      editable: true
    }
  ]
  const id = GetIdFromStroage();

  useEffect(() => {
    axios.get(`${BASE_URL}/students/${id}`).then((respone) => {
      const fullName = respone.data.firstName + ' ' + respone.data.lastName;
      SetStudent({ ...respone.data, fullName });
      SetFather(respone.data.parents[0]);
      SetMother(respone.data.parents[1]);
    });
  }, []);

  const handleChangeInputStudent =
    (prop: keyof Student) => (event: ChangeEvent<HTMLInputElement>) => {
      SetStudent({ ...student, [prop]: event.target.value });
    };

  const handleChangeDate = (date: Date | null) => {
    SetStudent({ ...student, dateofBirth: date });
  };

  const handleChangeInputFather =
    (prop: keyof Parent) => (event: ChangeEvent<HTMLInputElement>) => {
      SetFather({ ...father, [prop]: event.target.value });
    };
  const handleChangeInputMother =
  (prop: keyof Parent) => (event: ChangeEvent<HTMLInputElement>) => {
    SetMother({ ...mother, [prop]: event.target.value });
  };

  const handleUpdateStudent = (event: SyntheticEvent) => {
    event.preventDefault();
    axios({
      method: 'put',
      url: `${BASE_URL}/students/${student.id}`,
      data: { ...student, parents: [father._id, mother._id], class: student.class.id, teacher: student.class.teacher.id }
    })
      .then(respone => setError(!respone.data || error));
    axios({
      method: 'put',
      url: `${BASE_URL}/parents/${father.id}`,
      data: father
    })
      .then(respone => setError(!respone.data || error));
    axios({
      method: 'put',
      url: `${BASE_URL}/parents/${mother.id}`,
      data: mother
    })
      .then(respone => setError(!respone.data || error));
    setOpen(true);
  }
  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }
  return (
    <>
      <Header />
      <Box className={classes.container}>
        <Box className={classes.mainTitle}>
          <Typography variant="h3">Cập nhật thông tin học sinh</Typography>
          <hr></hr>
        </Box>
        <Box className={classes.mainContent}>
          <Box className={classes.wrapContent}>
            <Typography variant='h5'>Thông tin cá nhân</Typography>
            <hr></hr>
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
                        onChange={handleChangeInputStudent(p.field)}
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
                        onChange={handleChangeInputStudent(p.field)}
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
          <Box className={classes.wrapContent}>
            <Typography variant='h5'>Thông tin bố</Typography>
            <hr></hr>
            <Stack direction='column' spacing={3}>
              {parentField.map((p, index) => {
                return (
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
                    value={father[p.field]}
                    onChange={handleChangeInputFather(p.field)}
                    disabled={!p.editable}
                    />
                  </Box>
                )
              })}
            </Stack>
          </Box>
          <Box className={classes.wrapContent}>
            <Typography variant='h5'>Thông tin mẹ</Typography>
            <hr></hr>
            <Stack direction='column' spacing={3}>
              {parentField.map((p, index) => {
                return (
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
                    value={mother[p.field]}
                    onChange={handleChangeInputMother(p.field)}
                    disabled={!p.editable}
                    />
                  </Box>
                )
              })}
            </Stack>
          </Box>
          <Box className={classes.wrapContent}>
            <hr></hr>
            <Button 
              variant='contained' 
              onClick={handleUpdateStudent}
              sx={{ml: 2}}
            >
              Cập nhật
            </Button>
          </Box>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={ error === false ? 'success': 'error'}>
            { error === false ? 'Cập nhật thành công' : 'Cập nhật thất bại'  }
          </Alert>
        </Snackbar>
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
  wrapContent: {
    marginBottom: '40px',
    '& h5': {
      fontWeight: '500',
      fontSize: '18px',
      marginLeft: '8px',
    }
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
