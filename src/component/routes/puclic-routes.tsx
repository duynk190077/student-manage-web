import { PUCLIC_PAGES } from '../../constant';
import { Redirect, Route } from 'react-router-dom';
import { GetTokenFromStroage } from '../shared/helper';

const UserUrl = () => {
  const auth = GetTokenFromStroage();
  const publicR = PUCLIC_PAGES.map((p) => {
    const Component = p.component;
    return (
      <Route
        key={p.path}
        path={p.path}
        exact={p.exact}
        render={(props) =>
          auth ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login' }} />
          )
        }
      />
    );
  });
  return <>{publicR}</>;
};
export default UserUrl;
