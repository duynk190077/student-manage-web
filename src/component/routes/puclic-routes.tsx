import { PUCLIC_PAGES } from '../../constant';
import { Redirect, Route } from 'react-router-dom';
import { authHeader, GetTokenFromStroage } from '../shared/helper';
import { useStore, actions } from '../../store';
import axios from 'axios';
import { BASE_URL } from '../../constant';

const UserUrl = () => {
  const [state, dispatch] = useStore();
  const auth = GetTokenFromStroage();
  if (auth) {
    if (state.userId === '') {
      axios({
        method: 'get',
        url: `${BASE_URL}/users/user-info`,
        headers: authHeader(),
      }).then((respone) => {
        dispatch(
          actions.setState({
            ...respone.data,
            accessToken: auth,
          }),
        );
      });
    }
  }

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
