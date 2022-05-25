import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../../templates/header';
import DetailStudent from './detailStudent';
import avatarStudent from './img/avatarStudent.png';
import DetailPersonal from './detailPersonal';
import { BASE_URL } from '../../constant';
import { GetIdFromStroage } from '../shared/helper';

export default function Home() {
  const classes = useStyles();
  const [student, setStudent] = useState<any>();

  useEffect(() => {
    const id = GetIdFromStroage();
    axios
      .get(`${BASE_URL}/students/${id}`)
      .then((respone) => setStudent(respone.data));
  }, []);
  return (
    <>
      <Header />
      <Box className={classes.container}>
        <Box className={classes.mainTitle}>
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
  mainTitle: {
    width: '100%',
    padding: '5px',
    textAlign: 'center',
    '& h3': {
      fontWeight: '500',
      textTransform: 'uppercase',
      fontSize: '24px',
    },
    '& hr': {
      margin: '20px 0',
      border: '0',
      borderTop: '1px solid #eee',
    },
  },
  container: {
    width: '1200px',
    verticalAlign: 'top',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#fff',
    marginTop: '20px',
  },
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
