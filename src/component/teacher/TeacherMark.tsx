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
  } from '@mui/material';
  import { ChangeEvent, Fragment, useState } from 'react';
  import { makeStyles } from '@mui/styles';
  
  import { StudentMark } from '../../interfaces/StudetMark';
  import Header from '../../templates/header';
  import clsx from 'clsx';
  
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
  
    const RenderColSpan = (field: keyof StudentMark) => {
      if (field === 'student') return 1;
      const factor: any = mark[field];
      return factor.length;
    };

    const handleChangeMark = (index: number, field: keyof StudentMark) => (event: ChangeEvent<HTMLInputElement>) => {
        const newFactor: any = mark[field];
        newFactor[index] = +event.target.value;
        setMark({...mark, [field]: newFactor});
    }
  
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
                        sx={{ minWidth: '13em' }}
                      >
                        {p.headerName}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {headCells.map((p, index) => {
                    return (
                      <Fragment key={index}>{RenderCell(p.id, index)}</Fragment>
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
    textField: {
        '& .MuiOutlinedInput-input': {
          padding: '0',
          textAlign: 'center',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderRadius: '0',
          border: 'none'
        },
      },
});
  
  export default TeacherMark;
  