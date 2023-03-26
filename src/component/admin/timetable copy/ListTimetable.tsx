import {
    Typography,
    Box,
    Button,
    TextField,
    Autocomplete,
    Grid,
  } from '@mui/material';
  import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
  import { DataGrid } from '@mui/x-data-grid';
  import { makeStyles } from '@mui/styles';
  
  import { BASE_URL, timetableColumns1, classGroup } from '../../../constant';
  import AdminDrawer, { DrawerHeader } from '../AdminDrawer';
  import { Link, useNavigate } from 'react-router-dom';
  import { useEffect, useState } from 'react';
  import { defaultTimetable, Timetable } from '../../../interfaces/Timetable';
  import axios from 'axios';
  import { authHeader, getListWeek } from '../../shared/helper';
  import { useStore } from '../../../store';
  
  const typesArr = ['Sáng', 'Chiều'];
  function ListTimetable() {
    const [state, dispatch] = useStore();
    const classes = useStyles();
    const navigate = useNavigate();
    const [timetables, setTimetable] = useState<Timetable[]>([defaultTimetable]);
    const [filter, setFilter] = useState<any>({
      semester: '',
      type: 'Sáng',
      week: '1',
      classGroup: '10',
    });
  
    const timetableConcat: GridColDef[] = [
      {
        field: 'class',
        headerName: 'Lớp',
        width: 120,
      },
    ];
  
    const actionColumn: GridColDef[] = [
      {
        field: 'action',
        headerName: '',
        width: 120,
        renderCell: (params: GridValueGetterParams) => {
          return (
            <Box sx={{ display: 'flex' }}>
              <Button
                variant="outlined"
                onClick={() => handleLinkClick(params.row.id)}
                sx={{
                  mr: 1,
                  color: '#FFA500',
                  border: '1px solid rgba(255, 165, 0, 0.5)',
                }}
              >
                Chỉnh sửa
              </Button>
            </Box>
          );
        },
      },
    ];
  
    const handleLinkClick = (name: string) => {
      navigate(`/admin/timetable/${name}`);
    };
  
    useEffect(() => {
      const fectAPI = async () => {
        if (filter.semester !== '') {
          const respone = await axios({
            method: 'get',
            url: `${BASE_URL}/timetables?_v=filter&semester=${filter.semester}&week=${filter.week}&class-group=${filter.classGroup}&type=${filter.type}`,
            headers: authHeader(),
          });
          setTimetable(respone.data);
        }
      };
  
      fectAPI();
    }, [filter]);
  
    useEffect(() => {
      if (state.semester !== null) {
        setFilter({
          ...filter,
          semester: state.semester,
          week: state.week.toString(),
        });
      }
    }, [state.semester]);
  
    return (
      <Box sx={{ display: 'flex' }}>
        <AdminDrawer name="Thời khóa biểu" />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography variant="h4" noWrap component="div" sx={{ mb: 2 }}>
            Thời khóa biểu
          </Typography>
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            component={Link}
            to="/admin/Timetable/Add"
          >
            Thêm thời khóa biểu
          </Button>
          <Box
            sx={{
              flexGrow: 1,
              p: 3,
              bgcolor: '#fff',
              width: '100%',
              height: '1200px',
            }}
          >
            <Grid container sx={{ mb: 3 }} spacing={2}>
              <Grid item xs={3}>
                <TextField
                  className={classes.textField}
                  value={filter.semester}
                  disabled={true}
                  label="Kỳ học"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  className={classes.textField}
                  value={filter.week}
                  options={getListWeek(state.week)}
                  getOptionLabel={(option) => option}
                  freeSolo
                  onChange={(event: any, newValue) => {
                    setFilter({ ...filter, week: newValue });
                  }}
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      height: '10px',
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className={classes.textField}
                      label="Tuần học"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  className={classes.textField}
                  options={typesArr}
                  freeSolo
                  value={filter.type}
                  onChange={(event, newValue) =>
                    setFilter({ ...filter, type: newValue })
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
                      label="Buổi"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  className={classes.textField}
                  value={filter.classGroup}
                  options={classGroup}
                  getOptionLabel={(option) => option}
                  freeSolo
                  onChange={(event: any, newValue) => {
                    setFilter({ ...filter, classGroup: newValue });
                  }}
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      height: '10px',
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className={classes.textField}
                      label="Khối"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Box sx={{ flexGrow: 1, height: '80%' }}>
              <DataGrid
                rows={timetables}
                rowHeight={140}
                columns={timetableConcat
                  .concat(timetableColumns1)
                  .concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                disableSelectionOnClick
              />
            </Box>
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
  
  export default ListTimetable;
  