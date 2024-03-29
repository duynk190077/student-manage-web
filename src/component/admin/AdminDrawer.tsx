import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ClassIcon from '@mui/icons-material/Class';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate, useLocation } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import { Avatar, Tooltip } from '@mui/material';
import Avatars from './img/Avatars.jpg';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const ListItem = [
  {
    name: 'Trang chủ',
    id: 'dashboard',
    icon: DashboardIcon,
  },
  {
    name: 'Học sinh',
    id: 'student',
    icon: PersonOutlineIcon,
  },
  {
    name: 'Giáo viên',
    id: 'teacher',
    icon: PeopleOutlineIcon,
  },
  {
    name: 'Thời khóa biểu',
    id: 'timetable',
    icon: AccessTimeIcon,
  },
  {
    name: 'Lớp học',
    id: 'class',
    icon: ClassIcon,
  },
  {
    name: 'Phân công nhiệm vụ',
    id: 'teaching',
    icon: AdminPanelSettingsIcon,
  },
];
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const TooltipUser = () => {
  const navigate = useNavigate();
  return (
    <List>
      <ListItemButton
        onClick={(e: React.SyntheticEvent) => {
          localStorage.clear();
          navigate('/login');
          navigate(0);
        }}
      >
        Đăng xuất
      </ListItemButton>
    </List>
  );
};

function AdminDrawer(props: any) {
  const theme = useTheme();
  const location = useLocation();
  const selectedIndex = React.useMemo(() => {
    const selectedId = location.pathname.split('/')[2];
    return ListItem.findIndex((Item) => Item.id === selectedId);
  }, [location]);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOnClick = (name: string) => {
    navigate(`/admin/${name}`);
  };
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flex: 1 }}>
            {props?.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SchoolIcon />
            <Typography variant="h6" noWrap component="div" sx={{ ml: 1 }}>
              Thanh Thủy High School
            </Typography>
          </Box>
          <Tooltip title={<TooltipUser />} placement="bottom" arrow>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 3, mr: 3 }}>
              <Avatar alt="admin" src={Avatars} />
              <Typography
                variant="inherit"
                noWrap
                component="div"
                sx={{ ml: 1 }}
              >
                admin
              </Typography>
            </Box>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {ListItem.map((Item, index) => {
            const Component = Item.icon;
            return (
              <ListItemButton
                selected={selectedIndex === index}
                key={Item.name}
                onClick={() => handleOnClick(Item.id)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Component />
                </ListItemIcon>
                <ListItemText
                  primary={Item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}

export default React.memo(AdminDrawer);
