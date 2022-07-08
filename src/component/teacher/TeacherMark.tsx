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
import { ChangeEvent, Fragment, useState } from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { StudentMark } from '../../interfaces/StudetMark';
import Header from '../../templates/header';

interface HeadCell {
  id: keyof StudentMark;
  headerName: string;
}

const headCells: HeadCell[] = [
  {
    id: 'student',
    headerName: 'Họ và Tên',
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

const rows: StudentMark = {
  semester: '20222',
  student: 'Trần Thị Huyền Trang',
  factor1: [5, 6, 7, 8, 8],
  factor2: [5, 7, 8, 10],
  factor3: [3],
};

function TeacherMark() {
  const classes = useStyles();
  const [mark, setMark] = useState<StudentMark>(rows);
  const [open, setOpen] = useState<boolean>(false);

  const RenderColSpan = (field: keyof StudentMark) => {
    if (field === 'student') return 1;
    const factor: any = mark[field];
    return factor.length;
  };

  const handleChangeMark =
    (index: number, field: keyof StudentMark) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const newFactor: any = mark[field];
      newFactor[index] = +event.target.value;
      setMark({ ...mark, [field]: newFactor });
    };

  const RenderCell = (field: keyof StudentMark, id: number) => {
    if (field === 'student')
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
            value={p}
            onChange={handleChangeMark(index, field)}
          />
        </TableCell>
      );
    });
  };

  console.log(mark);

  return (
    <>
      <Header id={2} />
      <Box className="container">
        <Box className="mainTitle">
          <Typography variant="h3">Bảng điểm</Typography>
          <hr></hr>
        </Box>
        <Grid sx={{ p: 3 }}>
          <Grid
            container
            spacing={2}
            sx={{
              border: '1px solid #eee',
              pb: () => open === true ? 0 : 1,
              boxShadow:
                '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
            }}
          >
            <Grid item xs={1}>
              <IconButton size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h6" fontSize={18}>
                Lớp 10A1
              </Typography>
            </Grid>
            <Collapse in={open} timeout="auto" unmountOnExit>
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
                            colSpan={RenderColSpan(p.id)}
                            sx={{ minWidth: '13em' }}
                          >
                            {p.headerName}
                          </TableCell>
                        );
                      })}
                      <TableCell className={clsx(classes.tableCell, classes.tableHead)} sx={{ minWidth: '13em' }}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {headCells.map((p, index) => {
                        return (
                          <Fragment key={index}>
                            {RenderCell(p.id, index)}
                          </Fragment>
                        );
                      })}
                      <TableCell className={classes.tableCell} align='center'>
                        <Button variant='outlined'>Cập nhật</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Collapse>
          </Grid>
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
