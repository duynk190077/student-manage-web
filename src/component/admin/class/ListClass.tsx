import { Box, Typography, Button } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { authHeader } from '../../shared/helper';
import AdminDrawer, { DrawerHeader } from '../AdminDrawer';
import { BASE_URL, classColumns } from '../../../constant';
import Classroom from '../../../interfaces/Class';
import { useHistory } from 'react-router-dom';

function ListClass() {
  const history = useHistory();
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
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
              sx={{ mr: 1 }}
              onClick={() => handleLinkClick(params.row.id)}
            >
              Chi tiết
            </Button>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    async function fetchAPI() {
      const respone = await axios.get(`${BASE_URL}/classrooms`, {
        headers: authHeader(),
      });
      setClassrooms(respone.data);
    }

    fetchAPI();
  }, []);

  const handleLinkClick = (name: string) => {
    history.push(`/admin/class/${name}`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDrawer name="Class" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h4" sx={{ mb: 3 }}>
          Danh sách lớp
        </Typography>
        <Box sx={{ height: 650, width: '100%', bgcolor: '#fff', p: 3 }}>
          <DataGrid
            rows={classrooms}
            columns={classColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ListClass;
