import { makeStyles } from '@mui/styles';

export default function DetailStudent(props: any) {
  const classes = useStyles();
  return (
    <>
      <div className="col-md-4">
        <span className={classes.normalText}>
          <strong>Họ và Tên&emsp;: </strong>
          {props.name}
          <br></br>
          <strong>Giới tính&emsp;: </strong>
          {props.gender}
          <br></br>
          <strong>Năm vào trường&emsp;: </strong>
          {props.yearJoin}
          <br></br>
          <strong>Lớp&emsp;: </strong>
          {props.class}
          <br></br>
          <strong>Giáo viên chủ nhiệm&emsp;: </strong>
          {props.teacher}
          <br></br>
          <strong>Tình trạng học tập&emsp;: </strong>
          {props.status}
          <br></br>
        </span>
      </div>
    </>
  );
}

const useStyles = makeStyles({
  normalText: {
    fontFamily: 'Arimo sans-serif',
    fontSize: '16px',
    lineHeight: '2em',
  },
});
