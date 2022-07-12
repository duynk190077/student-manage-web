import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import UpdateIcon from '@mui/icons-material/Update';
import AddIcon from '@mui/icons-material/Add';

import AdminDrawer, { DrawerHeader } from '../AdminDrawer';
const statusArr = ['Đang diễn ra', 'Kết thúc'];
export default function Dashboard() {
  const [status, setStatus] = useState<string | null>(statusArr[0]);
  const classes = useStyles();
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
                value="20222"
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                className={classes.textField}
                label="Tuần học hiện tại"
                value="1"
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                className={classes.textField}
                options={statusArr}
                freeSolo
                value={status}
                onChange={(event, newValue) => setStatus(newValue)}
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
