import {
  Box,
  Stack,
  Typography,
  FormControl,
  Radio,
  RadioGroup,
  TextField,
  FormLabel,
  FormControlLabel,
  Button,
  Autocomplete,
} from '@mui/material';
import { useState, ChangeEvent, SyntheticEvent } from 'react';
import { BASE_URL, listGender } from '../../../constant';
import { defaultParent, ParentField } from '../../../interfaces/Parent';
import Student, {
  defaultStudent,
  StudentField,
} from '../../../interfaces/Student';
import Parent from '../../../interfaces/Parent';
import AdminDrawer, { DrawerHeader } from '../AdminDrawer';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { authHeader } from '../../shared/helper';
import { useStore } from '../../../store';

function StudentAdmin() {
  const [state, dispatch] = useStore();
  const classes = useStyles();
  const [student, setStudent] = useState<Student | any>(defaultStudent);
  const [father, setFather] = useState<Parent | any>(defaultParent);
  const [mother, setMother] = useState<Parent | any>(defaultParent);
  const studentField: StudentField[] = [
    {
      name: 'Họ và tên đệm',
      field: 'firstName',
      input: true,
      editable: true,
      listSelect: [],
    },
    {
      name: 'Tên',
      field: 'lastName',
      input: true,
      editable: true,
      listSelect: [],
    },
    {
      name: 'Giới tính',
      field: 'gender',
      editable: true,
      radio: true,
      listRadio: listGender,
      listSelect: [],
    },
    {
      name: 'Ngày sinh',
      field: 'dateofBirth',
      editable: true,
      date: true,
      listSelect: [],
    },
    {
      name: 'Số điện thoại',
      field: 'phoneNumber',
      editable: true,
      input: true,
      listSelect: [],
    },
    {
      name: 'Lớp',
      field: 'class',
      editable: true,
      select: true,
      listSelect: state.listClass,
    },
    {
      name: 'Dân tộc',
      field: 'nation',
      editable: true,
      input: true,
      listSelect: [],
    },
    {
      name: 'CCCD',
      field: 'nationId',
      editable: true,
      input: true,
      listSelect: [],
    },
    {
      name: 'Tôn giáo',
      field: 'religion',
      editable: true,
      input: true,
      listSelect: [],
    },
    {
      name: 'Địa chỉ',
      field: 'address',
      editable: true,
      input: true,
      listSelect: [],
    },
    {
      name: 'Hộ khẩu',
      field: 'permanentResidence',
      editable: true,
      input: true,
      listSelect: [],
    },
    {
      name: 'Năm vào trường',
      field: 'yearJoin',
      editable: true,
      input: true,
      listSelect: [],
    },
  ];
  const fatherField: ParentField[] = [
    {
      name: 'Họ và tên bố',
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
      editable: true,
    },
  ];
  const motherField: ParentField[] = [
    {
      name: 'Họ và tên mẹ',
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
      editable: true,
    },
  ];
  const handleChangeInputStudent =
    (prop: keyof Student) => (event: ChangeEvent<HTMLInputElement>) => {
      setStudent({ ...student, [prop]: event.target.value });
    };

  const handleChangeDate = (date: Date | null) => {
    setStudent({ ...student, dateofBirth: date });
  };

  const handleChangeInputFather =
    (prop: keyof Parent) => (event: ChangeEvent<HTMLInputElement>) => {
      setFather({ ...father, [prop]: event.target.value });
    };
  const handleChangeInputMother =
    (prop: keyof Parent) => (event: ChangeEvent<HTMLInputElement>) => {
      setMother({ ...mother, [prop]: event.target.value });
    };
  const handleAddStudent = async (event: SyntheticEvent) => {
    event.preventDefault();
    const respone = await axios({
      url: `${BASE_URL}/students`,
      method: 'post',
      headers: authHeader(),
      data: {
        ...student,
        father: father,
        mother: mother,
      },
    });
    if (respone.data !== false) alert('Thêm mới học sinh thành công');
    else alert('Thêm mới học sinh thất bại');
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDrawer name="Student" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h4" sx={{ mb: 3 }}>
          Học sinh
        </Typography>
        <Box sx={{ bgcolor: '#fff', p: 3, flexGrow: 1 }}>
          <Stack direction="column" spacing={2} sx={{ mb: 3 }}>
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
              ) : p?.date === true ? (
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
                  <Autocomplete
                    className={classes.textField}
                    value={student[p.field]}
                    options={p.listSelect}
                    getOptionLabel={(option) => option}
                    freeSolo
                    disabled={!p.editable}
                    onChange={(event: any, newValue) => {
                      setStudent({ ...student, [p.field]: newValue });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} className={classes.textField} />
                    )}
                    sx={{
                      '& .MuiOutlinedInput-input': {
                        height: '10px',
                      },
                      flex: 1,
                    }}
                  />
                </Box>
              );
            })}
            {motherField.map((p, index) => {
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
              );
            })}
            {fatherField.map((p, index) => {
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
              );
            })}
          </Stack>
          <Button variant="contained" onClick={handleAddStudent}>
            Thêm mới
          </Button>
        </Box>
      </Box>
    </Box>
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

export default StudentAdmin;
