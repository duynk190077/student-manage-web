import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Box, TextField, Typography, Stack, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Header from '../../templates/header';
import { useNavigate } from 'react-router-dom';

interface Password {
  oldPassword: string;
  newPassword: string;
  reNewPassword: string;
}

function ChangePassword() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [password, SetPassword] = useState<Password>({
    oldPassword: '',
    newPassword: '',
    reNewPassword: '',
  });

  const handleChangeInput =
    (prop: keyof Password) => (event: ChangeEvent<HTMLInputElement>) => {
      SetPassword({ ...password, [prop]: event.target.value });
    };

  const handleChangePassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };
  return (
    <>
      <Header />
      <Box className="container">
        <Box className="mainTitle">
          <Typography variant="h3">Thay đổi mật khẩu</Typography>
          <hr></hr>
        </Box>
        <Stack direction="column" spacing={3}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                width: '200px',
              }}
            >
              <Typography variant="subtitle1">Mật khẩu hiện tại:*</Typography>
            </Box>
            <TextField
              className={classes.textField}
              type="password"
              value={password.oldPassword}
              onChange={handleChangeInput('oldPassword')}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                width: '200px',
              }}
            >
              <Typography variant="subtitle1">Mật khẩu mới:*</Typography>
            </Box>
            <TextField
              className={classes.textField}
              type="password"
              value={password.newPassword}
              onChange={handleChangeInput('newPassword')}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                width: '200px',
              }}
            >
              <Typography variant="subtitle1">
                Xác nhận lại mật khẩu:*
              </Typography>
            </Box>
            <TextField
              className={classes.textField}
              type="password"
              value={password.reNewPassword}
              onChange={handleChangeInput('reNewPassword')}
            />
          </Box>
        </Stack>
        <Box>
          <hr></hr>
          <Button variant="contained" onClick={handleChangePassword}>
            Cập nhật
          </Button>
        </Box>
      </Box>
    </>
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
export default ChangePassword;
