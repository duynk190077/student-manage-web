import { Avatar, Box } from '@mui/material';
import { useEffect, useMemo } from 'react';
import avatarStudent from './img/avatarStudent.png';
import { AVATAR_STUDENT_URL } from '../../constant';
import DetailStudent from './DetailStudent';
import DetailPersonal from './DetailPersonal';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { getUserInfo } from '../../redux/userSlice';

function StudentHome() {
  const dispatch = useAppDispatch();
  const user = useSelector((state: any) => state.user.user);
  const imageUrl = useMemo(() => {
    if (user === null) return avatarStudent;
    const imageName = user.userInfo?.image;
    if (imageName === undefined) return avatarStudent;
    return `${AVATAR_STUDENT_URL}/${imageName}`;
  }, [user]);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  if (user === null) return null;
  return (
    <>
      <Box className="row">
        <Box className="col-md-3">
          <Avatar
            src={imageUrl}
            alt="avatar"
            sx={{ width: '200px', height: '200px', marginRight: 1 }}
          />
        </Box>
        <DetailStudent
          name={`${user.userInfo?.firstName} ${user.userInfo?.lastName}`}
          gender={user.userInfo?.gender}
          yearJoin={user.userInfo?.yearJoin}
          class={user.userInfo?.class?.name}
          teacher={user.userInfo?.class?.teacher}
          status={user.userInfo?.status}
        />
      </Box>
      <hr></hr>
      <DetailPersonal
        student={user.userInfo}
        father={user.userInfo?.parents[0]}
        mother={user.userInfo?.parents[1]}
      />
    </>
  );
}

export default StudentHome;
