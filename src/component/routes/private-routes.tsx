import { PRIVATE_PAGES } from '../../constant';
import { Navigate, Route } from 'react-router-dom';
import { GetRoleFromStorage, GetTokenFromStorage } from '../shared/helper';

const AdminUrl = () => {
  const auth = GetTokenFromStorage();
  const role = GetRoleFromStorage();

  const privateR = PRIVATE_PAGES.map((p) => {
    const Component = p.component;
    return (
      <Route
        key={p.path}
        path={p.path}
        element={
          !auth && role === 'Admin' ? <Navigate to={'/login'} /> : <Component />
        }
      />
    );
  });
  return <>{privateR}</>;
};
export default AdminUrl;
