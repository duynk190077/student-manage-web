import { PRIVATE_PAGES } from '../../constant';
import { Redirect, Route } from 'react-router-dom';
import { GetRoleFromStorage, GetTokenFromStorage } from '../shared/helper';
import React from 'react';

const AdminUrl = () => {
  const auth = GetTokenFromStorage();
  const role = GetRoleFromStorage();

  const privateR = PRIVATE_PAGES.map((p) => {
    const Component = p.component;
    return (
      <Route
        key={p.path}
        path={p.path}
        exact={p.exact}
        render={(props) =>
          auth && role === 'Admin' ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login' }} />
          )
        }
      />
    );
  });
  return <>{privateR}</>;
};
export default AdminUrl;
