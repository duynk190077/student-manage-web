import {
  Box,
  Paper,
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

import { defaultStudentMark, StudentMark } from '../../interfaces/StudetMark';
import Header from '../../templates/header';
import clsx from 'clsx';
import { useStore } from '../../store';
import axios from 'axios';
import { BASE_URL } from '../../constant';
import { authHeader } from '../shared/helper';

interface HeadCell {
  id: keyof StudentMark;
  headerName: string;
}

const headCells: HeadCell[] = [
  {
    id: 'subject',
    headerName: 'Môn học',
  },
  {
    id: 'factor1',
    headerName: 'Điểm hệ số 1',
  },
  {
    id: 'factor2',
    headerName: 'Điểm hệ số 2',
  },
  {
    id: 'factor3',
    headerName: 'Điểm hệ số 3',
  },
];

function StudentMarks() {
  const classes = useStyles();
  const [state, dispatch] = useStore();
  const [studentMarks, setStudentMarks] = useState<StudentMark[]>([
    defaultStudentMark,
  ]);

  useEffect(() => {
    const fetchAPI = async () => {
      if (state.userInfo !== null && state.semester !== '') {
        try {
          const respone = await axios({
            method: 'get',
            url: `${BASE_URL}/student-marks/student/${state.userInfo._id}?semester=${state.semester}`,
            headers: authHeader(),
          });
          if (respone.data !== false) setStudentMarks(respone.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchAPI();
  }, [state.semester]);

  const RenderColSpan = (field: keyof StudentMark) => {
    if (field === 'subject' || field === 'factor3') return 1;
    return 5;
  };

  const RenderCell = (
    field: keyof StudentMark,
    id: number,
    studentMark: StudentMark,
  ) => {
    if (field === 'subject')
      return (
        <TableCell
          key={field}
          className={clsx(classes.tableCell, {
            [classes.tableCell1]: id === 0,
          })}
          align="center"
        >
          {studentMark[field]}
        </TableCell>
      );
    const factor: any = studentMark[field];
    const colSpan = RenderColSpan(field);
    while (factor.length < colSpan) factor.push('');
    return factor.map((p: any, index: any) => {
      return (
        <TableCell
          key={index}
          className={clsx(classes.tableCell, {
            [classes.tableCell1]: id === 0,
          })}
          align="center"
        >
          {p}
        </TableCell>
      );
    });
  };

  return (
    <>
      <Header id={2} />
      <Box className="container">
        <Box className="mainTitle">
          <Typography variant="h3">Bảng điểm</Typography>
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
                {headCells.map((p, index) => {
                  return (
                    <TableCell
                      key={index}
                      className={clsx(classes.tableCell, classes.tableHead, {
                        [classes.tableCell1]: index === 0,
                      })}
                      align="center"
                      colSpan={RenderColSpan(p.id)}
                    >
                      {p.headerName}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {studentMarks.map((studentMark, index) => {
                return (
                  <TableRow key={index}>
                    {headCells.map((p, index) => {
                      return (
                        <Fragment key={index}>
                          {RenderCell(p.id, index, studentMark)}
                        </Fragment>
                      );
                    })}
                  </TableRow>
                );
              })}
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

export default StudentMarks;
