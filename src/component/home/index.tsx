import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../../templates/header';
import DetailStudent from './detailStudent';
import avatarStudent from './img/avatarStudent.png';
import DetailPersonal from './detailPersonal';
import { BASE_URL } from '../../constant';
import { useStore } from '../../store';

export default function Home() {
  const classes = useStyles();
  const [state, dispatch] = useStore();
  const student = state.userInfo;
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
            <img
              alt="avatarStudent"
              src={avatarStudent}
              className={classes.avatarStudent}
            ></img>
          </Box>
          <DetailStudent
            name={`${student?.firstName} ${student?.lastName}`}
            gender={student?.gender}
            yearJoin={student?.yearJoin}
            class={student?.class.name}
            teacher={student?.class.teacher.name}
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
    maxWidth: '60%',
    display: 'inline-block',
    backgroundColor: '#fff',
    padding: '4px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    height: 'auto',
  },
});
