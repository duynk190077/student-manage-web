import { useStore } from "../../store";
import TimetableStudent from "./TimetableStudent";
import TimetableTeacher from "./TimetableTeacher";


function Timetable() {
  const [state, dispatch] = useStore();
  return (
    <>
      {state?.role === 'Student' ? <TimetableStudent /> : <TimetableTeacher />}
    </>
  )
}

export default Timetable;
