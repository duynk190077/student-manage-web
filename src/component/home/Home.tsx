import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useStore } from '../../store';
import Header from '../../templates/header';
import StudentHome from './StudentHome';
import TeacherHome from './TeacherHome';

export default function Home() {
  const [state, dispatch] = useStore();
  const role = useMemo(() => {
    return state?.role;
  }, [state]);
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
