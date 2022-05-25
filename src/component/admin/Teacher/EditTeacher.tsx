import { useParams } from 'react-router-dom';
import { memo } from 'react';

import ParamTypes from '../../../interfaces/ParamTypes';
import AddTeacher from './AddTeacher';
import DetailTeacher from './DetailTeacher';
function EditTeacher() {
  const { id } = useParams<ParamTypes>();
  return <>{id === 'Add' ? <AddTeacher /> : <DetailTeacher />}</>;
}

export default memo(EditTeacher);
