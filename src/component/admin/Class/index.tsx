import AdminDrawer, { DrawerHeader } from '../AdminDrawer';
import { Box, Typography } from '@mui/material';
import { classColumns, classRows } from '../../../constant';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

function Class() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDrawer name="Class" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h4">Danh sách lớp</Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={classRows}
            columns={classColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </Box>
    </Box>
  );
}

export default Class;
