import { useMemo } from 'react';
import TimetableStudent from './TimetableStudent';
import TimetableTeacher from './TimetableTeacher';
import LocalStorage from '../../service/LocalStorage';

function Timetable() {
  const role = useMemo(() => {
    return LocalStorage.getRole();
  }, []);
  return (
    <>{role === 'Student' ? <TimetableStudent /> : <TimetableTeacher />}</>
  );
}

export default Timetable;
