import { makeStyles } from '@mui/styles';
import { Avatar, Box, Typography } from '@mui/material';
import { useMemo } from 'react';

import Header from '../../templates/header';
import DetailStudent from './DetailStudent';
import avatarStudent from './img/avatarStudent.png';
import DetailPersonal from './DetailPersonal';
import { useStore } from '../../store';
import { AVATAR_STUDENT_URL } from '../../constant';

export default function Home() {
  const classes = useStyles();
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
      <Header />
      <Box className="container">
        <Box className="mainTitle">
          <Typography variant="h3">THÔNG TIN CÁ NHÂN</Typography>
          <hr></hr>
        </Box>
        <Box className="row">
          <Box className="col-md-3">
            <Avatar
              className={classes.avatarStudent}
              src={imageUrl}
              alt="avatar"
              sx={{ width: '200px', height: '200px', marginRight: 1 }}
            />
          </Box>
          <DetailStudent
            name={`${student?.firstName} ${student?.lastName}`}
            gender={student?.gender}
            yearJoin={student?.yearJoin}
            class={student?.class.name}
            teacher={student?.class.teacher}
            status={student?.status}
          />
        </Box>
        <hr></hr>
        <DetailPersonal
          student={student}
          father={student?.parents[0]}
          mother={student?.parents[1]}
        />
      </Box>
    </>
  );
}

const useStyles = makeStyles({
  avatarStudent: {
    maxWidth: '80%',
    display: 'inline-block',
    backgroundColor: '#fff',
    padding: '4px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    height: 'auto',
  },
});
