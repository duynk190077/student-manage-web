import { memo, useState } from 'react';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

function CusTextField(props: any) {
  const [focused, setFocused] = useState<boolean>(false);
  const [blured, setBlured] = useState<boolean>(false);
  const classes = useStyle(props);
  return (
    <TextField
      className={classes.textField}
      value={props.value}
      onChange={props.onChange}
      error={focused && blured ? props?.validate?.status : false}
      helperText={
        props?.validate?.status === true && focused && blured
          ? props?.validate?.error
          : ''
      }
      onFocus={(event) => {
        setFocused(true);
        setBlured(false);
      }}
      onBlur={(event) => setBlured(true)}
      sx={{ width: `${props.width}` }}
    />
  );
}

const useStyle = makeStyles({
  textField: {
    '& .MuiFormHelperText-root': {
      animation: 'FadeOut linear 2s 3s forwards ',
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px 14px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '0',
    },
  },
});

export default memo(CusTextField);
