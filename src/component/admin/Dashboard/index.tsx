import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import UpdateIcon from '@mui/icons-material/Update';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';

import AdminDrawer, { DrawerHeader } from '../AdminDrawer';
import { useStore } from '../../../store';
import { defaultSemester, Semester } from '../../../interfaces/Semester';
import {
  defaultSemesterAnalytic,
  SemesterAnalytic,
} from '../../../interfaces/SemesterAnalytic';
import axios from 'axios';
import { BASE_URL } from '../../../constant';
import { authHeader } from '../../shared/helper';

const statusArr = ['Đang diễn ra', 'Kết thúc'];
export default function Dashboard() {
  const [state, dispatch] = useStore();
  const [semester, setSemester] = useState<Semester>(defaultSemester);
  const [semesterAnalytic, setSemesterAnalytic] = useState<SemesterAnalytic>(
    defaultSemesterAnalytic,
  );
  const classes = useStyles();

  const RenderAnalytic = (props: any) => {
    const { title, total, Icon, color, bgcolor } = props;
    return (
      <Box
        sx={{
          p: 2,

          border: '1px solid #ccc',
          bgcolor: '#fff',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            borderRadius: '50%',
            bgcolor: `${bgcolor}`,
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <Icon sx={{ color: `${color}`, fontSize: '32px' }} />
        </Box>
        <Typography variant="h4">{total}</Typography>
        <Typography variant="subtitle1">{title}</Typography>
      </Box>
    );
  };

  useEffect(() => {
    if (state.semester !== '') {
      setSemester({
        semester: state.semester,
        week: state.week,
        status: state.status,
      });
    }
  }, [state.semester, state.week, state.status]);

  useEffect(() => {
    const fetchAPI = async () => {
      if (semester.semester !== '') {
        try {
          const url = BASE_URL + `/semesters/analytics/${semester.semester}`;
          const respone = await axios({
            method: 'get',
            url: url,
            headers: authHeader(),
          });
          setSemesterAnalytic(respone.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchAPI();
  }, [semester.semester]);

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDrawer name="Dashboard" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h4" noWrap component="div" sx={{ mb: 3 }}>
          Trang chủ
        </Typography>
        <Button variant="contained" sx={{ mb: 2 }} startIcon={<AddIcon />}>
          Bắt đầu kỳ học mới
        </Button>
        <Box sx={{ bgcolor: '#fff', p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                className={classes.textField}
                label="Kỳ học"
                value={semester.semester}
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                className={classes.textField}
                label="Tuần học hiện tại"
                value={semester.week}
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                className={classes.textField}
                options={statusArr}
                freeSolo
                value={semester.status}
                onChange={(event, newValue) =>
                  setSemester({ ...semester, status: newValue })
                }
                getOptionLabel={(option) => option}
                sx={{
                  '& .MuiOutlinedInput-input': {
                    height: '10px',
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    className={classes.textField}
                    {...params}
                    label="Trạng thái"
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                startIcon={<UpdateIcon />}
                sx={{ height: '100%', fontSize: '12px' }}
              >
                Cập nhật trạng thái
              </Button>
            </Grid>
            <Grid item xs={3}>
              <RenderAnalytic
                title="Tổng số học sinh"
                total={semesterAnalytic.totalStudent}
                Icon={PersonIcon}
                color="#ff0000"
                bgcolor="#ffeaea"
              />
            </Grid>
            <Grid item xs={3}>
              <RenderAnalytic
                title="Học sinh nam"
                total={semesterAnalytic.totalStudentMale}
                Icon={ManIcon}
                color="#3cb878"
                bgcolor="#d1f3e0"
              />
            </Grid>
            <Grid item xs={3}>
              <RenderAnalytic
                title="Học sinh nữ"
                total={semesterAnalytic.totalStudentFemale}
                Icon={WomanIcon}
                color="#ffa001"
                bgcolor="#fff2d8"
              />
            </Grid>
            <Grid item xs={3}>
              <RenderAnalytic
                title="Tổng số giáo viên"
                total={semesterAnalytic.totalTeacher}
                Icon={PeopleIcon}
                color="#3f7afc"
                bgcolor="#e1f1ff"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  textField: {
    '& .MuiOutlinedInput-input': {
      padding: '10px 14px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '0',
    },
  },
});
