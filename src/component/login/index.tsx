import { makeStyles } from '@mui/styles';
import {
  Typography,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Alert,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { useState, ChangeEvent, SyntheticEvent } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import LOGO from './img/LOGO.png';
import { BASE_URL, roles } from '../../constant';
import { useStore, actions } from '../../store';

export default function Login() {
  const classes = useStyles();
  const [state, dispatch] = useStore();
  const [role, setRole] = useState<string>(roles[0].name);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const handleChangeRole = (event: ChangeEvent<HTMLInputElement>) => {
    setRole((event.target as HTMLInputElement).value);
  };

  const handleLogin = (event: SyntheticEvent) => {
    event.preventDefault();
    axios
      .post(`${BASE_URL}/users/login`, { username, password, role })
      .then((respone) => {
        if (respone.data?.error === undefined) {
          dispatch(
            actions.setState({
              ...respone.data,
              role: role,
            }),
          );
          localStorage.setItem('access_token', respone.data.accessToken);
          localStorage.setItem('role', role);
          if (role === 'Admin') {
            history.push('/admin/dashboard');
            history.go(0);
          } else {
            history.push('/');
            history.go(0);
          }
        } else setError(respone.data.error);
      });
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.wrapLogin}>
        <Box className={classes.wrapImg}>
          <img alt="logo" src={LOGO}></img>
        </Box>
        <Box className="formLogin">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingBottom: '25px',
              justifyContent: 'center',
            }}
          >
            <PersonIcon fontSize="large" />
            <Typography
              variant="h5"
              sx={{
                textAlign: 'center',
                fontWeight: '500',
                textTransform: 'uppercase',
              }}
            >
              Đăng nhập
            </Typography>
          </Box>
          <FormControl sx={{ mb: 2 }}>
            <FormLabel id="roles-radio">
              Vui lòng chọn vai trò đăng nhập
            </FormLabel>
            <RadioGroup
              aria-labelledby="roles-radio"
              value={role}
              onChange={handleChangeRole}
            >
              {roles.map((role, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={role.name}
                    control={<Radio />}
                    label={role.value}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
          <Box className={classes.wrapInput}>
            <input
              type="text"
              name="PhoneNumber"
              placeholder="PhoneNumber"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setError(null);
              }}
            />
            <span></span>
            <span>
              <PhoneIcon />
            </span>
          </Box>
          <Box className={classes.wrapInput}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError(null);
              }}
            />
            <span></span>
            <span>
              <LockOutlinedIcon />
            </span>
          </Box>
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              width: '100%',
              borderRadius: '25px',
              height: '50px',
              fontWeight: '500',
              marginTop: '30px',
            }}
          >
            LOGIN
          </Button>
          <Box className={classes.wrapText}>
            <span>Forgot </span>
            <Link to="/">Username / Password</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  '@keyframes animShadow': {
    to: {
      boxShadow: '0 0 70px 25px',
      opacity: '0',
    },
  },
  container: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
    background: 'linear-gradient(-135deg, #c850c0, #4158d0)',
  },
  wrapLogin: {
    width: '960px',
    padding: '100px 130px 0 95px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    '& img': {
      width: '316px',
    },
  },
  wrapImg: {
    willChange: 'transform',
    transform: 'perspective(300px) rotateX(0deg) rotateY(0deg)',
    '& :hover': {},
  },
  wrapInput: {
    position: 'relative',
    width: '100%',
    marginBottom: '10px',
    zIndex: '1',
    '& :nth-child(3)': {
      display: 'flex',
      fontSize: '15px',
      alignItems: 'center',
      borderRadius: '25px',
      position: 'absolute',
      color: '#666',
      left: 0,
      bottom: 0,
      height: '100%',
      paddingLeft: '35px',
      transition: 'all .4s',
    },
    '& :nth-child(2)': {
      display: 'block',
      position: 'absolute',
      left: '0',
      bottom: '0',
      width: '100%',
      height: '100%',
      zIndex: '-1',
      boxShadow: '0 0',
      color: '#0c91cd',
      borderRadius: '25px',
    },
    '& input': {
      fontFamily: 'Poppins-Medium',
      fontSize: '15px',
      display: 'block',
      height: '50px',
      lineHeight: '1.5',
      color: '#666',
      borderRadius: '25px',
      padding: '0 30px 0 68px',
      backgroundColor: '#e6e6e6',
      outline: 'none',
      border: 'none',
      overflow: 'visible',
    },
    '& input:focus::placeholder': {
      color: 'transparent',
    },
    '& input:focus + :nth-child(2)': {
      animation: `$animShadow 0.5s ease-in-out forwards`,
    },
    '& input:focus + :nth-child(2) + :nth-child(3)': {
      color: '#0c91cd',
      paddingLeft: '28px',
    },
  },
  wrapText: {
    textAlign: 'center',
    paddingTop: '12px',
    paddingBottom: '180px',
    fontFamily: 'Poppins-Regular',
    fontSize: '16px',
    lineHeight: '1.5',
    '& span': {
      color: '#999',
    },
    '& a': {
      textDecoration: 'none',
      color: '#666',
      '&:hover': {
        color: '#0c91cd',
      },
    },
  },
});
