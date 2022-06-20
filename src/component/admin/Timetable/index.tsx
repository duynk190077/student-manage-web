import { Typography, Box, Button, TextField, Autocomplete, Grid } from "@mui/material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";

import { BASE_URL, listWeek, timetableColumns1, classGroup } from "../../../constant";
import AdminDrawer, { DrawerHeader } from "../AdminDrawer";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { defaultTimetable, Timetable } from "../../../interfaces/Timetable";
import axios from "axios";
import { authHeader } from "../../shared/helper";


function TimetableAdmin() {
    const classes = useStyles();
    const history = useHistory();
    const [timetables, setTimetable] = useState<Timetable[]>([defaultTimetable]);
    const [filter, setFilter] = useState<any>({
        week: '1',
        classGroup: '10',
    })

    const timetableConcat: GridColDef[] = [
        {
            field: 'class',
            headerName: 'Lớp',
            width: 120
        }
    ]

    const actionColumn: GridColDef[] = [
        {
          field: 'action',
          headerName: 'Thao tác',
          width: 120,
          renderCell: (params: GridValueGetterParams) => {
            return (
              <Box sx={{ display: 'flex' }}>
                <Button
                  variant="outlined"
                  onClick={() => handleLinkClick(params.row.id)}
                  sx={{ mr: 1, color: '#FFA500', border: '1px solid rgba(255, 165, 0, 0.5)' }}
                >
                  Chỉnh sửa
                </Button>
              </Box>
            );
          },
        },
      ];

    const handleLinkClick = (name: string) => {
    history.push(`/admin/Timetable/${name}`);
    }

    useEffect(() => {
        const fectAPI = async() => {
            const respone = await axios({
                method: 'get',
                url: `${BASE_URL}/timetables?_v=filter&semester=20222&week=${filter.week}&class-group=${filter.classGroup}`,
                headers: authHeader(),
            })
            setTimetable(respone.data);
        }

        fectAPI();
    }, [filter])



    return (
        <Box sx={{ display: 'flex' }}>
            <AdminDrawer name='Thời khóa biểu'/>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
                <DrawerHeader />
                <Typography variant="h4" noWrap component="div" sx={{ mb: 2 }}>
                    Thời khóa biểu
                </Typography>
                <Button variant='contained' sx={{ mb: 2 }} component={Link} to="/admin/Timetable/Add">Thêm thời khóa biểu</Button>
                <Box sx={{ flexGrow: 1, p: 3, bgcolor: '#fff', width: '100%', height: '1200px'}}>
                    <Grid container sx={{ mb: 3 }} spacing={2}>
                        <Grid item xs={4}>
                            <TextField 
                                className={classes.textField}
                                value={`20222`}
                                disabled={true}
                                label='semester'
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Autocomplete 
                                className={classes.textField}
                                value={filter.week}
                                options={listWeek}
                                getOptionLabel={(option) => option}
                                freeSolo
                                onChange={(event: any, newValue) => {
                                    setFilter({...filter, week: newValue});
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-input': {
                                        height: '10px'
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        className={classes.textField}
                                        label='Week'
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Autocomplete 
                                className={classes.textField}
                                value={filter.classGroup}
                                options={classGroup}
                                getOptionLabel={(option) => option}
                                freeSolo
                                onChange={(event: any, newValue) => {
                                    setFilter({...filter, classGroup: newValue});
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-input': {
                                        height: '10px'
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        className={classes.textField}
                                        label='Week'
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ flexGrow: 1, height: '80%' }}>
                        <DataGrid 
                            rows={timetables}
                            rowHeight={140}
                            columns={(timetableConcat.concat(timetableColumns1)).concat(actionColumn)}
                            pageSize={9}
                            rowsPerPageOptions={[9]}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

const useStyles = makeStyles({
    textField: {
        flex: 1,
        '& .MuiOutlinedInput-input': {
          padding: '10px 14px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderRadius: '0',
        },
    },
})

export default TimetableAdmin;