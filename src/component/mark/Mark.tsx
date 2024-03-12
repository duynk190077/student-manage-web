import { useMemo } from 'react';
import StudentMarks from '../student/StudentMark';
import TeacherMark from '../teacher/TeacherMark';
import LocalStorage from '../../service/LocalStorage';

function Mark() {
  const role = useMemo(() => {
    return LocalStorage.getRole();
  }, []);
  return <>{role === 'Student' ? <StudentMarks /> : <TeacherMark />}</>;
}

export default Mark;
