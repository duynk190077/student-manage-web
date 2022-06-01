import { useReducer } from 'react';

import reducer, { initState } from './reducer';
import Context from './Context';

function Provider(props: any) {
  const [state, dispatch] = useReducer<any>(reducer, initState);

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
}

export default Provider;
