import { makeStyles } from '@mui/styles';
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  Tooltip,
} from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { memo, SyntheticEvent, useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import clsx from 'clsx';

import LOGO2 from './img/LOGO2.png';
import Avatars from '../../component/home/img/avatarStudent.png';
import axios from 'axios';
import { AVATAR_STUDENT_URL, BASE_URL } from '../../constant';
import { actions, useStore } from '../../store';
import { initState } from '../../store/reducer';
const menuList = [
  {
    name: 'Trang chủ',
    path: '',
  },
  {
    name: 'Thời khóa biểu',
    path: '/timetable',
  },
  {
    name: 'Bảng điểm',
    path: '/student-mark',
  },
  {
    name: 'Tài liệu',
    path: '/document',
  },
  {
    name: 'Hỗ trợ',
    path: '/support',
  },
];

const menuListTeacher = [
  {
    name: 'Trang chủ',
    path: '',
  },
  {
    name: 'Lịch dạy',
    path: '/timetable',
  },
  {
    name: 'Nhập điểm',
    path: '/teacher/mark',
  },
];

const TooltipUser = (props: any) => {
  const history = useHistory();
  return (
    <List>
      <ListItemButton component={Link} to="/Students/UpdateProfile">
        Cập nhật thông tin cá nhân
      </ListItemButton>
      <ListItemButton component={Link} to="/Users/ChangePassword">
        Đổi mật khẩu
      </ListItemButton>
      <ListItemButton
        onClick={(e: SyntheticEvent) => {
          e.preventDefault();
          axios({
            method: 'post',
            url: `${BASE_URL}/users/logout`,
            data: {
              id: props.id,
            },
          }).then((respone) => {
            if (respone.data?.error === undefined) {
              props.dispatch(actions.setState(initState));
              localStorage.clear();
              history.push('/login');
              history.go(0);
            }
          });
        }}
      >
        Đăng xuất
      </ListItemButton>
    </List>
  );
};

function Header() {
  const classes = useStyles();
  const [state, dispatch] = useStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const imageUrl = useMemo(() => {
    if (state.userInfo === null) return Avatars;
    const imageName = state.userInfo?.image;
    if (imageName === undefined) return Avatars;
    return `${AVATAR_STUDENT_URL}/${imageName}`;
  }, [state.userInfo]);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <header className={classes.header}>
      <Box className={classes.grid}>
        <nav className={classes.nav}>
          <Link to="/">
            <img src={LOGO2} alt="logo" className={classes.logo} />
          </Link>
          <Box className={classes.collapse}>
            <Box className={clsx(classes.search, 'search-focus')}>
              <input type="text" placeholder="Search" />
              <button>
                <SearchIcon />
              </button>
            </Box>
            <List className={classes.menu}>
              {menuList.map((item, index) => {
                return (
                  <ListItemButton
                    key={index}
                    selected={selectedIndex === index}
                    onClick={() => handleListItemClick(index)}
                    component={Link}
                    to={item.path}
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                );
              })}
            </List>
            <Tooltip
              title={<TooltipUser id={state.userId} dispatch={dispatch} />}
              placement="bottom"
              arrow
            >
              <Box className={classes.menu}>
                <Avatar
                  src={imageUrl}
                  alt="avatar"
                  sx={{ width: '30px', height: '30px', marginRight: 1 }}
                />
                <Typography>{`${state.userInfo?.firstName} ${state.userInfo?.lastName}`}</Typography>
              </Box>
            </Tooltip>
          </Box>
        </nav>
      </Box>
    </header>
  );
}

const useStyles = makeStyles({
  header: {
    width: '100%',
    padding: '20px 0px',
    backgroundColor: '#fff',
  },
  grid: {
    padding: '0 40px',
    margin: '0 auto',
  },
  nav: {
    width: '100%',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: '300px',
  },
  collapse: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  search: {
    width: '300px',
    marginLeft: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid rgba(224, 216, 216, 0.3)',
    borderRadius: '96px',
    backgroundColor: '#f5f5f5',
    fontWeight: '400',
    overflow: 'hidden',
    '& input': {
      flex: '1',
      border: 'none',
      outline: 'none',
      backgroundColor: '#f5f5f5',
      color: '#221638',
      height: '48px',
      padding: '15px',
      fontWeight: '500',
    },
    '& input:focus::placeholder': {
      color: 'transparent',
    },
    '& button': {
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      color: '#fd596f',
      backgroundColor: 'transparent',
      padding: '0 15px 0 15px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      '& :hover': {
        backgroundColor: '#fff',
      },
    },
  },
  menu: {
    marginLeft: 'auto!important',
    display: 'flex',
    flexDirection: 'row',
    padding: '0',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default memo(Header);
