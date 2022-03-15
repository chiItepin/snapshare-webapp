import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../reducer';

const withAuth = (WrappedComponent: React.FunctionComponent<{}>) => (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user._id) {
      // check if a persisted user exists
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [user]);

  if (isAuthenticated) return (<WrappedComponent {...props} />);

  return null;
};

export default withAuth;
