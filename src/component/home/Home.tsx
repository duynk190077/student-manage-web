import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import LocalStorage from '../../service/LocalStorage';
import Header from '../../templates/header';
import StudentHome from './StudentHome';
import TeacherHome from './TeacherHome';

export default function Home() {
  const role = useMemo(() => {
    return LocalStorage.getRole();
  }, []);
  console.log(role);
  return (
    <>
      <Header id={0} />
      <Box className="container">
        <Box className="mainTitle">
          <Typography variant="h3">THÔNG TIN CÁ NHÂN</Typography>
          <hr></hr>
        </Box>
        {role === 'Student' ? <StudentHome /> : <TeacherHome />}
      </Box>
    </>
  );
}
