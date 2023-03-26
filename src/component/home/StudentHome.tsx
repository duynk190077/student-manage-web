import { Avatar, Box } from '@mui/material';
import { useMemo } from 'react';

import { useStore } from '../../store';
import avatarStudent from './img/avatarStudent.png';
import { AVATAR_STUDENT_URL } from '../../constant';
import DetailStudent from './DetailStudent copy';
import DetailPersonal from './DetailPersonal copy';

function StudentHome() {
  const [state, dispatch] = useStore();
  const student = useMemo(() => {
    return state.userInfo;
  }, [state]);
  const imageUrl = useMemo(() => {
    if (student === null) return avatarStudent;
    const imageName = student?.image;
    if (imageName === undefined) return avatarStudent;
    return `${AVATAR_STUDENT_URL}/${imageName}`;
  }, [student]);
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
          name={`${student?.firstName} ${student?.lastName}`}
          gender={student?.gender}
          yearJoin={student?.yearJoin}
          class={student?.class?.name}
          teacher={student?.class?.teacher}
          status={student?.status}
        />
      </Box>
      <hr></hr>
      <DetailPersonal
        student={student}
        father={student?.parents[0]}
        mother={student?.parents[1]}
      />
    </>
  );
}

export default StudentHome;
