import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Autocomplete,
  TextField,
} from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import Classroom, { defaultClassroom } from '../../../interfaces/Class';
import { ParamTypes } from '../../../interfaces/ParamTypes';
import { authHeader } from '../../shared/helper';
import AdminDrawer, { DrawerHeader } from '../AdminDrawer';
import { BASE_URL, studentColumns, teachingColumns } from '../../../constant';
import Teaching, { defaultTeaching } from '../../../interfaces/Teaching';
import Teacher, { defaultTeacher } from '../../../interfaces/Teacher';

interface TeachingDialog {
  open: boolean;
  selectedSubject: string;
  id: string | undefined;
  teachers: Teacher[];
  type: string;
  onClose: () => void;
  onChange: () => void;
}

const EditTeachingDialog = (props: TeachingDialog) => {
  const { onClose, open, selectedSubject, id, teachers, onChange, type } =
    props;
  const [teacher, setTeacher] = useState<Teacher | null>(defaultTeacher);

  const handleClose = () => {
    onClose();
  };

  const handleUpdate = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (teacher?.id !== '') {
      const respone = await axios({
        method: 'put',
        url: `${BASE_URL}/${type}/${id}`,
        headers: authHeader(),
        data: {
          teacher: teacher?.id,
        },
      });
      if (respone.data === true) {
        onClose();
        onChange();
        alert('Cập nhập thành công');
      } else alert('Cập nhập thất bại');
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        textAlign: 'center',
      }}
    >
      <DialogTitle>
        Cập nhật giáo viên{' '}
        {type === 'teachings' ? selectedSubject : 'chủ nhiệm'}
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <Box sx={{ width: '100px' }}>Giáo viên:</Box>
        <Autocomplete
          options={teachers}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          onChange={(event, value) => setTeacher(value)}
          sx={{
            '& .MuiOutlinedInput-input': {
              height: '10px',
            },
            '& .MuiOutlinedInput-root': {
              padding: '5px 7px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderRadius: '0',
            },
            flex: '1',
            width: '200px',
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleUpdate}
          sx={{
            bgcolor: 'rgba(255, 165, 0, .8)',
            '&:hover': {
              bgcolor: 'rgba(255, 165, 0, 1)',
            },
          }}
        >
          Cập nhật
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function DetailClass() {
  const { id } = useParams<ParamTypes>();
  const [classroom, setClassroom] = useState<Classroom>(defaultClassroom);
  const [teachings, setTeachings] = useState<Teaching[]>([defaultTeaching]);
  const [type, setType] = useState<string>('');
  const [teachers, setTeachers] = useState<Teacher[]>([defaultTeacher]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [updatedTeacher, setUpdatedTeacher] = useState(false);
  const [updatedTeaching, setUpdatedTeaching] = useState(false);
  const actionColumn: GridColDef[] = [
    {
      field: 'action',
      headerName: '',
      width: 200,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <Box sx={{ display: 'flex' }}>
            <Button
              variant="outlined"
              onClick={() => handleEditClick('teachings', params.row)}
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
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchClassroom = async () => {
      try {
        const respone = await axios({
          method: 'get',
          url: `${BASE_URL}/classrooms/${id}`,
          headers: authHeader(),
          cancelToken: source.token,
        });
        setClassroom(respone.data);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else throw error;
      }
    };

    fetchClassroom();

    return function cleanup() {
      source.cancel();
    };
  }, [id, updatedTeacher]);

  useEffect(() => {
    const fetchTeaching = async () => {
      try {
        if (classroom.name !== '') {
          const respone = await axios({
            method: 'get',
            url: `${BASE_URL}/teachings/${classroom.name}`,
            headers: authHeader(),
          });
          setTeachings(respone.data);
        }
      } catch (err) {
        throw err;
      }
    };

    fetchTeaching();
  }, [classroom, updatedTeaching]);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        if (selectedSubject !== '' || type !== '') {
          let url;
          if (type === 'teachings')
            url = `${BASE_URL}/teachers?_v=filter&subject=${selectedSubject}`;
          else url = `${BASE_URL}/teachers`;
          console.log(url);
          const respone = await axios({
            method: 'get',
            url: url,
            headers: authHeader(),
          });
          setTeachers(respone.data);
        }
      } catch (err) {
        throw err;
      }
    };
    fetchTeacher();
  }, [selectedSubject, type]);

  const handleEditClick = (type: string, teaching: any) => {
    console.log(type);
    setOpen(true);
    setType(type);
    if (type === 'teachings') {
      setSelectedSubject(teaching.subject);
      setSelectedId(teaching.id);
    } else {
      return;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTeaching = () => {
    setUpdatedTeaching(!updatedTeaching);
  };

  const handleChangeTeacher = () => {
    setUpdatedTeacher(!updatedTeacher);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDrawer name="Class" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h4" sx={{ mb: 3 }}>
          Lớp {classroom.name}
        </Typography>
        <Box sx={{ flexGrow: 1, bgcolor: '#fff', textAlign: 'center', p: 3 }}>
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'left',
                pl: 1,
              }}
            >
              <Typography variant="h6" fontSize={18} sx={{ mr: 3 }}>
                Giáo viên chủ nhiệm:
              </Typography>
              <Typography variant="subtitle1" sx={{ mr: 3 }}>
                {classroom.teacher}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => handleEditClick('classrooms', null)}
                sx={{
                  mr: 1,
                  color: '#FFA500',
                  border: '1px solid rgba(255, 165, 0, 0.5)',
                }}
              >
                Chỉnh sửa
              </Button>
            </Box>
            <hr></hr>
            <Box
              sx={{
                textAlign: 'left',
                pl: 1,
              }}
            >
              <Typography variant="h6" fontSize={18}>
                Giáo viên bộ môn:
              </Typography>
              <Box sx={{ height: '300px', width: '40%', mt: 2 }}>
                <DataGrid
                  rows={teachings}
                  columns={teachingColumns.concat(actionColumn)}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </Box>
            </Box>
            <hr></hr>
            <Box
              sx={{
                textAlign: 'left',
                pl: 1,
              }}
            >
              <Typography variant="h6">
                Tổng số học sinh: {classroom.totalStudent}
              </Typography>
              <Box sx={{ height: '400px', width: '100%', mt: 2 }}>
                <DataGrid
                  rows={classroom.students}
                  columns={studentColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </Box>
            </Box>
            <hr></hr>
          </Box>
        </Box>
      </Box>
      <EditTeachingDialog
        open={open}
        selectedSubject={selectedSubject}
        type={type}
        onClose={handleClose}
        teachers={teachers}
        id={type === 'teachings' ? selectedId : id}
        onChange={
          type === 'teachings' ? handleChangeTeaching : handleChangeTeacher
        }
      />
    </Box>
  );
}

export default DetailClass;
