import TeacherUpdateProfile from '../teacher/TeacherUpdateProfile';
import StudentUpdateProfile from '../student/StudentUpdateProfile';
import { useMemo } from 'react';
import LocalStorage from '../../service/LocalStorage';
function UpdateProfile() {
  const role = useMemo(() => {
    return LocalStorage.getRole();
  }, []);
  return (
    <>
      {role === 'Student' ? <StudentUpdateProfile /> : <TeacherUpdateProfile />}
    </>
  );
}

export default UpdateProfile;
