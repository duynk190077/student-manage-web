import { useParams } from 'react-router-dom';
import { memo } from 'react';

import ParamTypes from '../../../interfaces/ParamTypes';
import AddTimetable from './AddTimetable';
import DetailTimetable from './DetailTimetable';
function EditTimetable() {
  const { id } = useParams<ParamTypes>();
  return <>{id === 'Add' ? <AddTimetable /> : <DetailTimetable />}</>;
}

export default memo(EditTimetable);
