import { PUCLIC_PAGES } from '../../constant';
import { Redirect, Route } from 'react-router-dom';
import { authHeader, GetTokenFromStroage } from '../shared/helper';
import { useStore, actions } from '../../store';
import axios from 'axios';
import { BASE_URL } from '../../constant';
import { useEffect } from 'react';

async function initState(state: any, dispatch: any) {
  try {
    if (state.userId === '') {
      const respone = await axios.get(`${BASE_URL}/users/user-info`, {
        headers: authHeader(),
      });
      dispatch(actions.setState(respone.data));
    }
    if (!state.listSubject.length) {
      const respone = await axios.get(`${BASE_URL}/subjects`, {
        headers: authHeader(),
      });
      const subjects = respone.data;
      dispatch(
        actions.setListSubject({
          listSubject: subjects.map((p: { name: any }) => p.name),
        }),
      );
    }
  } catch (error) {
    throw error;
  }
}

const UserUrl = () => {
  const [state, dispatch] = useStore();
  const auth = GetTokenFromStroage();
  useEffect(() => {
    if (auth) {
      initState(state, dispatch);
    }
  }, []);

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
