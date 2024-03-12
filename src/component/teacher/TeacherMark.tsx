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
  TextField,
  Collapse,
  Grid,
  IconButton,
  Button,
} from '@mui/material';
import {
  ChangeEvent,
  Fragment,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { StudentMark } from '../../interfaces/StudetMark';
import { MarkTeacher } from '../../interfaces/MarkTeacher';
import Header from '../../templates/header';
import { defaultTeacherMark } from '../../interfaces/MarkTeacher';
import axios from 'axios';
import { BASE_URL } from '../../constant';
import { authHeader } from '../shared/helper';
import { useSelector } from 'react-redux';

interface HeadCell {
  id: keyof StudentMark;
  headerName: string;
  colSpan: number;
}

const headCells: HeadCell[] = [
  {
    id: 'fullName',
    headerName: 'Họ và Tên',
    colSpan: 1,
  },
  {
    id: 'factor1',
    headerName: 'Điểm hệ số 1',
    colSpan: 5,
  },
  {
    id: 'factor2',
    headerName: 'Điểm hệ số 2',
    colSpan: 5,
  },
  {
    id: 'factor3',
    headerName: 'Điểm hệ số 3',
    colSpan: 1,
  },
];

function TeacherMark() {
  const classes = useStyles();
  const semester = useSelector((state: any) => state.semester.semester);
  const user = useSelector((state: any) => state.user.user);
  const [teacherMarks, setTeacherMarks] = useState<MarkTeacher[]>([
    defaultTeacherMark,
  ]);
  const [open, setOpen] = useState<boolean[]>([false]);

  useEffect(() => {
    const fetchAPI = async () => {
      if (user !== null && semester?.name !== '') {
        try {
          const respone = await axios.get(
            `${BASE_URL}/teachers/student-mark/${user.id}?semester=${semester?.name}`,
            {
              headers: authHeader(),
            },
          );
          setTeacherMarks(respone.data);
          let check: boolean[] = [];
          for (let i = 0; i < respone.data.length; i++) check.push(false);
          setOpen(check);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchAPI();
  }, [semester?.name]);

  const RenderColSpan = (field: keyof StudentMark) => {
    if (field === 'fullName' || field === 'factor3') return 1;
    return 5;
  };

  const handleChangeMark =
    (
      index: number,
      field: keyof StudentMark,
      idTeacherMark: number,
      idStudentMark: number,
      mark: StudentMark,
    ) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setTeacherMarks((preTeacherMarks) => {
        let newTeacherMarks = [...preTeacherMarks];
        let newStudentMarks = [...newTeacherMarks[idTeacherMark].studentmarks];
        let newStudentMark = { ...newStudentMarks[idStudentMark] };
        let newFactor: any = mark[field];
        if (newFactor.length < index) newFactor.push(+event.target.value);
        else newFactor[index] = +event.target.value;
        newStudentMark = { ...newStudentMark, [field]: newFactor };
        newStudentMarks[idStudentMark] = newStudentMark;
        newTeacherMarks[idTeacherMark].studentmarks = newStudentMarks;
        return newTeacherMarks;
      });
    };

  const RenderCell = (
    field: keyof StudentMark,
    id: number,
    idTeacherMark: number,
    idStudentMark: number,
  ) => {
    const mark: StudentMark = {
      ...teacherMarks[idTeacherMark].studentmarks[idStudentMark],
    };
    if (field === 'fullName')
      return (
        <TableCell
          key={field}
          className={clsx(classes.tableCell, {
            [classes.tableCell1]: id === 0,
          })}
          align="center"
        >
          {mark[field]}
        </TableCell>
      );
    const factor: any = mark[field];
    const colSpan = RenderColSpan(field);
    while (factor.length < colSpan) factor.push('');
    return factor.map((p: any, index: number) => {
      return (
        <TableCell
          key={index}
          className={clsx(classes.tableCell, {
            [classes.tableCell1]: id === 0,
          })}
          align="center"
        >
          <TextField
            className={classes.textField}
            value={p !== null ? p : ''}
            onChange={handleChangeMark(
              index,
              field,
              idTeacherMark,
              idStudentMark,
              mark,
            )}
          />
        </TableCell>
      );
    });
  };

  const handleUpdateOne =
    (idTeacherMark: number, idStudentMark: number) =>
    async (event: SyntheticEvent) => {
      event.preventDefault();
      const data = teacherMarks[idTeacherMark].studentmarks[idStudentMark];
      try {
        const url = `${BASE_URL}/student-marks/${data.id}`;
        const respone = await axios({
          method: 'put',
          url: url,
          headers: authHeader(),
          data: { ...data },
        });
        if (respone.data !== false) alert('Cập nhật điểm thành công');
        else alert('Cập nhật điểm thất bại');
      } catch (err) {
        console.log(err);
      }
    };

  const handleUpdateMany =
    (idTeacherMark: number) => async (event: SyntheticEvent) => {
      event.preventDefault();
      const data = teacherMarks[idTeacherMark].studentmarks;
      console.log(data);
      try {
        const url = `${BASE_URL}/student-marks/update-many`;
        const respone = await axios({
          method: 'put',
          url: url,
          headers: authHeader(),
          data: [...data],
        });
        if (respone.data !== false) alert('Cập nhập tất cả điểm thành công');
        else alert('Cập nhật điểm thất bại');
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <>
      <Header id={2} />
      <Box className="container">
        <Box className="mainTitle">
          <Typography variant="h3">Bảng điểm</Typography>
          <hr></hr>
        </Box>
        <Grid sx={{ p: 3 }}>
          {teacherMarks.map((teacherMark, i) => {
            return (
              <Grid
                key={i}
                container
                spacing={2}
                sx={{
                  border: '1px solid #eee',
                  pb: () => (open[i] === true ? 0 : 1),
                  mb: 4,
                  boxShadow:
                    '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
                }}
              >
                <Grid item xs={1}>
                  <IconButton
                    size="small"
                    onClick={() => setOpen({ ...open, [i]: !open[i] })}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h6" fontSize={18}>
                    Lớp {teacherMark.class}
                  </Typography>
                </Grid>
                <Collapse in={open[i]} timeout="auto" unmountOnExit>
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
                                className={clsx(
                                  classes.tableCell,
                                  classes.tableHead,
                                  {
                                    [classes.tableCell1]: index === 0,
                                  },
                                )}
                                align="center"
                                colSpan={p.colSpan}
                                sx={{ minWidth: '13em' }}
                              >
                                {p.headerName}
                              </TableCell>
                            );
                          })}
                          <TableCell
                            className={clsx(
                              classes.tableCell,
                              classes.tableHead,
                            )}
                            sx={{ minWidth: '13em' }}
                          ></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {teacherMark.studentmarks.map((studentmark, ii) => {
                          return (
                            <TableRow key={ii}>
                              {headCells.map((p, index) => {
                                return (
                                  <Fragment key={index}>
                                    {RenderCell(p.id, index, i, ii)}
                                  </Fragment>
                                );
                              })}
                              <TableCell
                                className={classes.tableCell}
                                align="center"
                              >
                                <Button
                                  variant="outlined"
                                  onClick={handleUpdateOne(i, ii)}
                                >
                                  Cập nhật
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box
                    sx={{
                      px: 3,
                      py: 2,
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button variant="contained" onClick={handleUpdateMany(i)}>
                      Cập nhật tất cả
                    </Button>
                  </Box>
                </Collapse>
              </Grid>
            );
          })}
        </Grid>
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
  textField: {
    '& .MuiOutlinedInput-input': {
      padding: '0',
      textAlign: 'center',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '0',
      border: 'none',
    },
  },
});

export default TeacherMark;
