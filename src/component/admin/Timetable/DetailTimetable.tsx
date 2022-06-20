import { Box, Typography, TextField, Autocomplete, Stack, Divider, Button } from "@mui/material";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

import { BASE_URL, listClass1, listWeek } from "../../../constant";
import { defaultTimetable, Timetable, TimetableField } from "../../../interfaces/Timetable";
import { useStore } from "../../../store";
import AdminDrawer, { DrawerHeader } from "../AdminDrawer";
import axios from "axios";
import { authHeader } from "../../shared/helper";
import { useParams } from "react-router-dom";
import ParamTypes from "../../../interfaces/ParamTypes";

function DetailTimetable() {
    const { id } = useParams<ParamTypes>();
    const [state, dispatch] = useStore();
    const classes = useStyles();
    const [timetable, setTimetable] = useState<Timetable>(defaultTimetable);

    const timetableField: TimetableField[] = [
        {
            name: 'Kỳ học',
            field: 'semester',
            editable: false,
            input: true,
            listSelect: [],
        },
        {
            name: 'Tuần',
            field: 'week',
            editable: false,
            select: true,
            multiple: false,
            listSelect: listWeek
        },
        {
            name: 'Lớp',
            field: 'class',
            editable: false,
            select: true,
            multiple: false,
            listSelect: listClass1,
        },
        {
            name: 'Thứ 2',
            field: 'monday',
            editable: true,
            select: true,
            multiple: true,
            listSelect: state.listSubject
        },
        {
            name: 'Thứ 3',
            field: 'tusday',
            editable: true,
            select: true,
            multiple: true,
            listSelect: state.listSubject
        },
        {
            name: 'Thứ 4',
            field: 'wednesday',
            editable: true,
            select: true,
            multiple: true,
            listSelect: state.listSubject
        },
        {
            name: 'Thứ 5',
            field: 'thursday',
            editable: true,
            select: true,
            multiple: true,
            listSelect: state.listSubject
        },
        {
            name: 'Thứ 6',
            field: 'friday',
            editable: true,
            select: true,
            multiple: true,
            listSelect: state.listSubject
        },
        {
            name: 'Thứ 7',
            field: 'saturday',
            editable: true,
            select: true,
            multiple: true,
            listSelect: state.listSubject
        },
    ]

    const handleChangeInputTimetable = (prop: keyof Timetable) => (event: ChangeEvent<HTMLInputElement>) => {
        setTimetable({...timetable, [prop]: event.target.value })
    } 

    const handleUpdateTimetable = async (event: SyntheticEvent) => {
        event.preventDefault();
        const respone = await axios({
            method: 'put',
            url: `${BASE_URL}/timetables/${id}`,
            headers: authHeader(),
            data: {
                ...timetable
            }
        })

        if (respone.data !== false) {
            alert('Cập nhật thời khóa biểu thành công');
            //setTimetable(defaultTimetable);
        }
        else {
            alert('Cập nhật thời khóa biểu thất bại')
        }
    }

    useEffect(() => {
        const fetchAPI = async() => {
            const respone = await axios({
                method: 'get',
                url: `${BASE_URL}/timetables/${id}`
            })
            setTimetable(respone.data);
        }

        fetchAPI();
    }, [])
    return (
        <Box sx={{ display: 'flex' }}>
            <AdminDrawer name="Timetable"/>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Typography variant="h4" noWrap component="div" sx={{ mb: 2 }}>
                    Cập nhật thời khóa biểu
                </Typography>
                <Box sx={{ bgcolor: '#fff', p: 3, flexGrow: 1 }}>
                    <Stack direction='column' spacing={2} sx={{ mb: 3 }}>
                        {timetableField.map((p: TimetableField, index: any) => {
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '90%',
                                    }}
                                >
                                    <Box
                                    sx={{
                                        width: '150px',
                                    }}
                                    >
                                        <Typography variant="subtitle1">{p.name}:*</Typography>
                                    </Box>
                                    {p?.input === true ? (
                                            <TextField
                                            className={classes.textField}
                                            value={timetable[p.field]}
                                            onChange={handleChangeInputTimetable(p.field)}
                                            disabled={!p.editable}
                                        />
                                    ) : p?.select === true ? (
                                        <Autocomplete 
                                            className={classes.textField}
                                            value={timetable[p.field]}
                                            options={p.listSelect}
                                            getOptionLabel={(option) => option}
                                            freeSolo
                                            disabled={!p.editable}
                                            multiple={p?.multiple}
                                            onChange={(event: any, newValue) => {
                                                setTimetable({...timetable, [p.field]: newValue})
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className={classes.textField}
                                                    label={p.name}
                                                />
                                            )}
                                            sx={{
                                                '& .MuiOutlinedInput-input': {
                                                    height: '10px'
                                                },
                                                flex: 1
                                            }}
                                        />
                                    ): <></>}
                                    
                                </Box>
                            )
                        })}
                    </Stack>
                    <Divider/>
                    <Button variant="contained" onClick={handleUpdateTimetable} sx={{ mt: 3 }} >Cập nhật thời khóa biểu</Button>
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
export default DetailTimetable;