import { useStore } from '../../store';
import TeacherUpdateProfile from '../teacher/TeacherUpdateProfile';
import StudentUpdateProfile from '../student/StudentUpdateProfile';
function UpdateProfile() {
  const [state, dispatch] = useStore();
  return (
    <>
      {state?.role === 'Student' ? (
        <StudentUpdateProfile />
      ) : (
        <TeacherUpdateProfile />
      )}
    </>
  );
}

export default UpdateProfile;
