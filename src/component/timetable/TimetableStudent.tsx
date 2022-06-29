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
import axios from 'axios';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import { BASE_URL } from '../../constant';
import { defaultTimetable, Timetable } from '../../interfaces/Timetable';
import { useStore } from '../../store';
import Header from '../../templates/header';
import { authHeader } from '../shared/helper';
import { lessons } from '../../constant';

interface Day {
  field: keyof Timetable;
  headerName: string;
}

const days: Day[] = [
  {
    headerName: 'Thứ 2',
    field: 'monday',
  },
  {
    headerName: 'Thứ 3',
    field: 'tusday',
  },
  {
    headerName: 'Thứ 4',
    field: 'wednesday',
  },
  {
    headerName: 'Thứ 5',
    field: 'thursday',
  },
  {
    headerName: 'Thứ 6',
    field: 'friday',
  },
  {
    headerName: 'Thứ 7',
    field: 'saturday',
  },
];

function TimetableStudent() {
  const classes = useStyles();
  const [state, dispatch] = useStore();
  const [timetable, setTimetable] = useState<Timetable>(defaultTimetable);

  useEffect(() => {
    const fetchAPI = async () => {
      if (state.userInfo !== null) {
        try {
          const respone = await axios({
            method: 'post',
            url: `${BASE_URL}/timetables/${state.userInfo.class.name}`,
            headers: authHeader(),
            data: {
              semester: '20222',
              week: '1',
            },
          });
          setTimetable(respone.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchAPI();
  }, [state]);

  const getSubjectName = (field: keyof Timetable, lesson: number) => {
    if (timetable[field] === null) return '';
    if (timetable[field] === undefined) return '';
    const timetableDay: any = timetable[field];
    if (timetableDay?.length < lesson - 1) return '';
    return timetableDay[lesson - 1];
  };
  return (
    <>
      <Header id={1} />
      <Box className="container">
        <Box className="mainTitle">
          <Typography variant="h3">Thời khóa biểu</Typography>
          <hr></hr>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  className={clsx(classes.tableCell, classes.tableHead)}
                >
                  Buổi
                </TableCell>
                <TableCell
                  align="center"
                  className={clsx(classes.tableCell, classes.tableHead)}
                >
                  Tiết
                </TableCell>
                {days.map((day, index) => {
                  return (
                    <TableCell
                      align="center"
                      key={index}
                      className={clsx(classes.tableCell, classes.tableHead)}
                    >
                      {day.headerName}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {lessons.map((lesson) => {
                return (
                  <TableRow key={lesson}>
                    {lesson === 1 && (
                      <TableCell
                        align="center"
                        rowSpan={5}
                        className={classes.tableCell}
                      >
                        Sáng
                      </TableCell>
                    )}
                    <TableCell align="center" className={classes.tableCell}>
                      {lesson}
                    </TableCell>
                    {days.map((day) => {
                      return (
                        <TableCell
                          align="center"
                          key={day.headerName}
                          className={classes.tableCell}
                        >
                          {getSubjectName(day.field, lesson)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell className={classes.tableCell} align="center">
                  Chiều
                </TableCell>
                <TableCell className={classes.tableCell}></TableCell>
                <TableCell className={classes.tableCell} align="center">
                  Toán
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  Toán
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  Toán
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  Toán
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  Toán
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  Toán
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

const useStyles = makeStyles({
  tableCell: {
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
  tableHead: {
    borderTop: '1px solid rgba(224, 224, 224, 1)',
  },
  tableCell1: {
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
  },
});

export default TimetableStudent;
