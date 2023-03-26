import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Box, TextField, Typography, Stack, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Header from '../../templates/header';
import axios from 'axios';
import { BASE_URL } from '../../constant';
import { useStore } from '../../store';
import { useNavigate } from 'react-router-dom';

interface Password {
  oldPassword: string;
  newPassword: string;
  reNewPassword: string;
}

function ChangePassword() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [state, dispatch] = useStore();
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
    const id = state.userId;
    if (password.newPassword === password.reNewPassword) {
      axios({
        method: 'put',
        url: `${BASE_URL}/users/${id}/changePassword`,
        data: {
          oldPassword: password.oldPassword,
          newPassword: password.newPassword,
        },
      }).then((respone) => {
        if (respone.data === true) {
          axios({
            method: 'post',
            url: `${BASE_URL}/users/logout`,
            data: {
              id: id,
            },
          });
          localStorage.clear();
          navigate('/login');
          navigate(0);
        } else {
          alert('Thay đổi mật khẩu thất bại');
        }
      });
    } else alert('Mật khẩu xác nhận không chính xác');
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
