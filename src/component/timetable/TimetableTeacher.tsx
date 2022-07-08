import {
  Box,
  TableContainer,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { defaultTimetable, Timetable } from '../../interfaces/Timetable';
import Header from '../../templates/header';
import { authHeader } from '../shared/helper';
import { BASE_URL, lessons } from '../../constant';
import { useStore } from '../../store';

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

function TimetableTeacher() {
  const classes = useStyles();
  const [state, dispatch] = useStore();
  const [timetable, setTimetable] = useState<Timetable>(defaultTimetable);
  const [timetable1, setTimetable1] = useState<Timetable>(defaultTimetable); 

  useEffect(() => {
    const fetchAPI = async () => {
      if (state.userInfo !== null) {
        try {
          const respone = await axios({
            method: 'post',
            url: `${BASE_URL}/timetables/teacher/${state.userInfo.id}`,
            headers: authHeader(),
            data: {
              semester: '20222',
              week: '2',
              type: 'Sáng'
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

  useEffect(() => {
    const fetchAPI = async () => {
      if (state.userInfo !== null) {
        try {
          const respone = await axios({
            method: 'post',
            url: `${BASE_URL}/timetables/teacher/${state.userInfo.id}`,
            headers: authHeader(),
            data: {
              semester: '20222',
              week: '2',
              type: 'Chiều'
            },
          });
          setTimetable1(respone.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchAPI();
  }, [state]);
  const getSubjectName = (field: keyof Timetable, lesson: number, timetable: Timetable) => {
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
        <TableContainer
          component={Paper}
          sx={{
            p: 3,
            boxShadow: 'none',
            border: 'none',
          }}
        >
          <Table size="small" sx={{ borderCollapse: 'unset' }}>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  className={clsx(
                    classes.tableCell,
                    classes.tableHead,
                    classes.tableCell1,
                  )}
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
                        className={clsx(classes.tableCell, classes.tableCell1)}
                      >
                        Sáng
                      </TableCell>
                    )}
                    <TableCell align="center" className={classes.tableCell}>
                      {lesson}
                    </TableCell>
                    {days.map((day, index) => {
                      return (
                        <TableCell
                          align="center"
                          key={day.headerName}
                          className={classes.tableCell}
                        >
                          {getSubjectName(day.field, lesson, timetable)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell
                  className={clsx(classes.tableCell, classes.tableCell1)}
                  align="center"
                >
                  Chiều
                </TableCell>
                <TableCell className={classes.tableCell}></TableCell>
                  {days.map((day, index) => {
                    return (
                      <TableCell
                        align="center"
                        key={day.headerName}
                        className={classes.tableCell}
                      >
                        {getSubjectName(day.field, 1, timetable1)}
                      </TableCell>
                    );
                  })}
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

export default TimetableTeacher;
