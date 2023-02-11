import AdminDrawer, { DrawerHeader } from '../AdminDrawer';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState, memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { teacherColumns, BASE_URL } from '../../../constant';
import Teacher from '../../../interfaces/Teacher';
import { authHeader } from '../../shared/helper';

function Teachers() {
  const [teachers, setTeachers] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [idSelected, setIdSelected] = useState<string | ''>('');
  const [filterTeacherRows, setFilterTeacherRows] = useState<Teacher[]>([]);
  const history = useHistory();
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
              onClick={() => handleLinkClick(params.row.id)}
              sx={{ mr: 1 }}
            >
              Chi tiết
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleClickOpen(params.row.id)}
              sx={{ color: '#ef5050' }}
            >
              Xóa
            </Button>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchAPI = async () => {
      const respone = await axios({
        method: 'get',
        url: `${BASE_URL}/teachers`,
        headers: authHeader(),
      });
      setTeachers(respone.data);
    };

    fetchAPI();
  }, []);

  const handleClickOpen = (id: string) => {
    setIdSelected(id);
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleLinkClick = (name: string) => {
    history.push(`/admin/teacher/${name}`);
  };
  const handleDeleteAction = async (id: string) => {
    await axios.delete(`${BASE_URL}/teachers/${id}`);
    let data: Teacher[] = teachers;
    data = data.filter((element) => element.id !== id);
    setFilterTeacherRows(data);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDrawer name="Teacher" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h4" noWrap component="div" sx={{ mb: 2 }}>
          Danh sách giáo viên
        </Typography>
        <Button variant="contained" onClick={() => handleLinkClick('Add')}>
          Thêm giáo viên mới
        </Button>
        <Box sx={{ height: 400, width: '100%', bgcolor: '#fff', p: 3, mt: 3 }}>
          <DataGrid
            rows={teachers}
            columns={teacherColumns.concat(actionColumn)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
        <Dialog
          open={open}
          onClose={handleClickClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Xóa giáo viên</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bạn có chắc chắn muốn xóa giáo viên này
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => handleDeleteAction(idSelected)}
            >
              Xóa
            </Button>
            <Button variant="contained" onClick={handleClickClose}>
              Hủy
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default memo(Teachers);
