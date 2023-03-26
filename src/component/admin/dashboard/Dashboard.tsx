import {
    Autocomplete,
    Box,
    Button,
    Grid,
    TextField,
    Typography,
  } from '@mui/material';
  import { makeStyles } from '@mui/styles';
  import { SyntheticEvent, useEffect, useState } from 'react';
  import PersonIcon from '@mui/icons-material/Person';
  import ManIcon from '@mui/icons-material/Man';
  import WomanIcon from '@mui/icons-material/Woman';
  import UpdateIcon from '@mui/icons-material/Update';
  import AddIcon from '@mui/icons-material/Add';
  import PeopleIcon from '@mui/icons-material/People';
  import GradeIcon from '@mui/icons-material/Grade';
  import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
  
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
  import { useNavigate } from 'react-router-dom';
  
  const statusArr = ['Đang diễn ra', 'Kết thúc'];
  export default function Dashboard() {
    const navigate = useNavigate();
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
  
    const handleSemsterResult = async (event: SyntheticEvent) => {
      event.preventDefault();
      if (semester.status === 'Kết thúc') {
        const respone = await axios({
          method: 'get',
          url: `${BASE_URL}/semesters/get-result/${semester.semester}`,
          headers: authHeader(),
        });
  
        if (respone.data !== false)
          setSemesterAnalytic((preState) => {
            return {
              ...preState,
              ...respone.data,
            };
          });
        await axios({
          method: 'put',
          url: `${BASE_URL}/students/update-many`,
          headers: authHeader(),
        });
      }
    };
  
    const handleCreateSemester = async (event: SyntheticEvent) => {
      event.preventDefault();
      const respone = await axios({
        method: 'post',
        url: `${BASE_URL}/semesters/start`,
        headers: authHeader(),
      });
      if (respone.data !== false) {
        alert('Kỳ học mới khởi tạo thành công');
        navigate(0);
      } else alert('Kỳ học mới khởi tạo thất bại');
    };
  
    return (
      <Box sx={{ display: 'flex' }}>
        <AdminDrawer name="Dashboard" />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography variant="h4" noWrap component="div" sx={{ mb: 3 }}>
            Trang chủ
          </Typography>
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            startIcon={<AddIcon />}
            onClick={handleCreateSemester}
          >
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
                  disabled={state.status !== 'Đang diễn ra'}
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
                  onClick={handleSemsterResult}
                  disabled={state.status === 'Kết thúc'}
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
              {semester.status === 'Kết thúc' && (
                <>
                  {semesterAnalytic?.excellentStudent !== undefined && (
                    <Grid item xs={3}>
                      <RenderAnalytic
                        title="Học sinh giỏi"
                        total={semesterAnalytic.excellentStudent}
                        Icon={GradeIcon}
                        color="#ff00fa"
                        bgcolor="#c300ff"
                      />
                    </Grid>
                  )}
                  {semesterAnalytic?.goodStudent !== undefined && (
                    <Grid item xs={3}>
                      <RenderAnalytic
                        title="Học sinh khá"
                        total={semesterAnalytic.goodStudent}
                        Icon={ThumbUpAltIcon}
                        color="#fffe00"
                        bgcolor="#ffe000"
                      />
                    </Grid>
                  )}
                </>
              )}
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
  