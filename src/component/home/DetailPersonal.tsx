import { makeStyles } from '@mui/styles';
export default function DetailPersonal(props: any) {
  const classes = useStyles();
  const { student, father, mother } = props;
  return (
    <div className="row">
      <div className="col-md-6">
        <span className={classes.normalText}>
          <strong>Dân tộc&emsp;: </strong>
          {student?.nation}
          <br></br>
          <strong>Địa chỉ&emsp;: </strong>
          {student?.address}
          <br></br>
          <strong>Số CMND&emsp;: </strong>
          {student?.nationId}
          <br></br>
          <strong>Họ tên bố&emsp;: </strong>
          {father?.fullName}
          <br></br>
          <strong>Năm sinh&emsp;: </strong>
          {father?.yearofBirth}
          <br></br>
          <strong>Nghề nghiệp&emsp;: </strong>
          {father?.job}
          <br></br>
          <strong>Số điện thoại&emsp;: </strong>
          {father?.phoneNumber}
          <br></br>
        </span>
      </div>
      <div className="col-md-6">
        <span className={classes.normalText}>
          <strong>Tôn giáo&emsp;: </strong>
          {student?.religion}
          <br></br>
          <strong>Hộ khẩu&emsp;: </strong>
          {student?.permanentResidence}
          <br></br>
          <strong>Số điện thoại&emsp;: </strong>
          {student?.phoneNumber}
          <br></br>
          <strong>Họ tên mẹ&emsp;: </strong>
          {mother?.fullName}
          <br></br>
          <strong>Năm sinh&emsp;: </strong>
          {mother?.yearofBirth}
          <br></br>
          <strong>Nghề nghiệp&emsp;: </strong>
          {mother?.job}
          <br></br>
          <strong>Số điện thoại&emsp;: </strong>
          {mother?.phoneNumber}
          <br></br>
        </span>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  normalText: {
    fontFamily: 'Arimo sans-serif',
    fontSize: '16px',
    lineHeight: '2em',
  },
});
