import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AdminDrawer, { DrawerHeader } from '../AdminDrawer';
import Teaching, { defaultTeaching } from '../../../interfaces/Teaching';
import Teacher, { defaultTeacher } from '../../../interfaces/Teacher';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { BASE_URL } from '../../../constant';
import { authHeader } from '../../shared/helper';
import { useSelector } from 'react-redux';

function TeachingForm() {
  const classRooms = useSelector((state: any) => state.classrooms.classRooms);
  const subjects = useSelector((state: any) => state.subjects.subjects);
  const semester = useSelector((state: any) => state.semester.semester);

  const classes = useStyles();
  const [teaching, setTeaching] = useState<Teaching>(defaultTeaching);
  const [teacher, setTeacher] = useState<Teacher>(defaultTeacher);
  const [teachers, setTeachers] = useState<Teacher[]>([defaultTeacher]);

  useEffect(() => {
    if (semester?.name !== '')
      setTeaching((preTeaching) => {
        return { ...preTeaching, semester: semester?.name };
      });
  }, [semester]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        if (teaching.subject !== null) {
          const respone = await axios({
            method: 'get',
            url: `${BASE_URL}/teachers?_v=filter&subject=${teaching.subject}`,
            headers: authHeader(),
          });
          if (respone.data) setTeachers(respone.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAPI();
  }, [teaching.subject]);

  const handleChangeTeaching =
    (prop: keyof Teaching) => (event: ChangeEvent<HTMLInputElement>) => {
      setTeaching({ ...teaching, [prop]: event.target.value });
    };

  const handleAddTeaching = async (event: SyntheticEvent) => {
    event.preventDefault();
    const respone = await axios({
      url: `${BASE_URL}/teachings`,
      method: 'post',
      headers: authHeader(),
      data: {
        ...teaching,
      },
    });
    if (respone.data !== false) alert('Thêm mới thành công');
    else alert('Thêm mới thất bại');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDrawer name="Teaching" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h4" sx={{ mb: 2 }}>
          Phân công giảng dạy
        </Typography>
        <Box sx={{ bgcolor: '#fff', p: 3 }}>
          <Stack direction="column" spacing={2} sx={{ mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '90%',
              }}
            >
              <Box
                sx={{
                  width: '150px',
                }}
              >
                <Typography variant="subtitle1">Kỳ học:*</Typography>
              </Box>
              <TextField
                className={classes.textField}
                value={teaching.semester}
                onChange={handleChangeTeaching('semester')}
                disabled={true}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '90%',
              }}
            >
              <Box
                sx={{
                  width: '150px',
                }}
              >
                <Typography variant="subtitle1">Lớp:*</Typography>
              </Box>
              <Autocomplete
                className={classes.textField}
                value={teaching.class}
                options={classRooms.map((value: any) => value.name)}
                getOptionLabel={(option: any) => option}
                freeSolo
                onChange={(event: any, newValue) => {
                  setTeaching({ ...teaching, class: newValue });
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '90%',
              }}
            >
              <Box
                sx={{
                  width: '150px',
                }}
              >
                <Typography variant="subtitle1">Môn học:*</Typography>
              </Box>
              <Autocomplete
                className={classes.textField}
                value={teaching.subject}
                options={subjects.map((subject: any) => subject.name)}
                getOptionLabel={(option: any) => option}
                freeSolo
                onChange={(event: any, newValue) => {
                  setTeaching({ ...teaching, subject: newValue });
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '90%',
              }}
            >
              <Box
                sx={{
                  width: '150px',
                }}
              >
                <Typography variant="subtitle1">Giáo viên:*</Typography>
              </Box>
              <Autocomplete
                className={classes.textField}
                value={teacher}
                options={teachers}
                getOptionLabel={(option: Teacher) =>
                  `${option.firstName} ${option.lastName}`
                }
                freeSolo
                onChange={(event: any, newValue: any) => {
                  setTeacher(newValue);
                  setTeaching({
                    ...teaching,
                    teacher: newValue?.id === undefined ? null : newValue.id,
                  });
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
          </Stack>
          <Button variant="contained" onClick={handleAddTeaching}>
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

export default TeachingForm;
