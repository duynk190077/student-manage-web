import { Box, Typography } from "@mui/material";
import Header from "../../templates/header";

function TimetableTeacher() {
    return (
        <>
            <Header id={1}/>
            <Box className="container">
                <Box className="mainTitle">
                    <Typography variant="h3">Thời khóa biểu</Typography>
                    <hr></hr>
                </Box>
            </Box>
        </>
    )
}

export default TimetableTeacher;