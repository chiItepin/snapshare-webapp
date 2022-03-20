import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useAppSelector, IActions } from '../../reducer';

const withAuth = (WrappedComponent: React.FunctionComponent<{}>) => (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user._id) {
      // check if a persisted user exists
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }

    if (user?.expireDate) {
      if (moment(user.expireDate).diff(moment(), 'days') < 0) {
        router.push('/login');
        dispatch({
          type: 'SET_USER',
          payload: {},
        } as IActions);
      }
    }
  }, [user]);

  if (isAuthenticated) return (<WrappedComponent {...props} />);

  return null;
};

export default withAuth;
