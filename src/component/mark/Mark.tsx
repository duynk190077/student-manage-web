import { useStore } from '../../store';
import StudentMarks from '../student/StudentMark';
import TeacherMark from '../teacher/TeacherMark';

function Mark() {
  const [state, dispatch] = useStore();
  return <>{state?.role === 'Student' ? <StudentMarks /> : <TeacherMark />}</>;
}

export default Mark;
