import {
  Box,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Table,
  TableBody,
} from '@mui/material';
import Header from '../../templates/header';

const rows = {
  title: 'Sáng',
  monday: ['Chào cờ', 'Toán', 'Lý', 'Hóa', 'Sinh'],
  tusday: ['Chào cờ', 'Toán', 'Lý', 'Hóa', 'Sinh'],
  wednesday: ['Chào cờ', 'Toán', 'Lý', 'Hóa', 'Sinh'],
  thurday: ['Chào cờ', 'Toán', 'Lý', 'Hóa', 'Sinh'],
  friday: ['Chào cờ', 'Toán', 'Lý', 'Hóa', 'Sinh'],
  saturday: ['Chào cờ', 'Toán', 'Lý', 'Hóa', 'Sinh'],
};

const rows1 = {
  title: 'Chiều',
  monday: 'Toán',
  tusday: 'Lý',
  wednesday: 'Hóa',
  thurday: 'Sinh',
  friday: 'Sử',
  saturday: 'Địa',
};
const MorningTable = (props: any) => {
  const lesson = props.lesson;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {lesson.map((p: any, index: any) => (
        <Typography
          variant="subtitle1"
          key={index}
          sx={{ fontSize: '0.875rem' }}
        >
          {p}
        </Typography>
      ))}
    </Box>
  );
};

const AfternoonTable = (props: any) => {
  const lesson = props.lesson;
  return <TableCell>{lesson}</TableCell>;
};

function Timetable() {
  return (
    <>
      <Header />
      <Box className="container">
        <Box className="mainTitle">
          <Typography variant="h3">Thời khóa biểu</Typography>
          <hr></hr>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Thứ 2</TableCell>
                <TableCell>Thứ 3</TableCell>
                <TableCell>Thứ 4</TableCell>
                <TableCell>Thứ 5</TableCell>
                <TableCell>Thứ 6</TableCell>
                <TableCell>Thứ 7</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{rows.title}</TableCell>
                <TableCell>
                  <MorningTable lesson={rows.monday} />
                </TableCell>
                <TableCell>
                  <MorningTable lesson={rows.tusday} />
                </TableCell>
                <TableCell>
                  <MorningTable lesson={rows.wednesday} />
                </TableCell>
                <TableCell>
                  <MorningTable lesson={rows.thurday} />
                </TableCell>
                <TableCell>
                  <MorningTable lesson={rows.friday} />
                </TableCell>
                <TableCell>
                  <MorningTable lesson={rows.saturday} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{rows1.title}</TableCell>
                <AfternoonTable lesson={rows1.monday} />
                <AfternoonTable lesson={rows1.tusday} />
                <AfternoonTable lesson={rows1.wednesday} />
                <AfternoonTable lesson={rows1.thurday} />
                <AfternoonTable lesson={rows1.friday} />
                <AfternoonTable lesson={rows1.saturday} />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Timetable;
