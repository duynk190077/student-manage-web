import { Box } from '@mui/material';
import AdminDrawer from '../AdminDrawer';

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDrawer name="Dashboard" />
    </Box>
  );
}
