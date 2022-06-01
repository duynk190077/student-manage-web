import { memo } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

function CusInput(props: any) {
  const classes = useStyles();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '200px',
        }}
      >
        <Typography variant="subtitle1">{props.title}:*</Typography>
      </Box>
      <TextField className={classes.textField} type={props.type} />
    </Box>
  );
}

const useStyles = makeStyles({
  textField: {
    '& .MuiOutlinedInput-input': {
      padding: '10px 14px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '0',
    },
  },
});

export default CusInput;
