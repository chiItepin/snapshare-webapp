import React, { FunctionComponent, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import cookieCutter from 'cookie-cutter';
import {
  Card,
  Grid,
  Button,
} from '@nextui-org/react';
import { useAppSelector, IActions } from '../../reducer';
import logo from '../../assets/icon.png';

const NavBar: FunctionComponent = () => {
  const user = useAppSelector((state) => state.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    toast.success('Logged out successfully!');

    cookieCutter.set('userToken', '', { expires: new Date(0) });
    cookieCutter.set('userId', '', { expires: new Date(0) });

    dispatch({
      type: 'SET_USER',
      payload: {},
    } as IActions);
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const navBarRef = document.querySelector('.nav-bar');
    const handleNavBarPadding = () => {
      if (window.scrollY > 40 && navBarRef) {
        navBarRef.classList.add('scrolled');
      } else if (navBarRef) {
        navBarRef.classList.remove('scrolled');
      }
    };
    document.addEventListener('scroll', handleNavBarPadding);

    return () => {
      document.removeEventListener('scroll', handleNavBarPadding);
    };
  }, [loaded]);

  if (!loaded) return null;

  return (
    <nav>
      <Grid.Container gap={2} justify="center" wrap="wrap">
        <div className="after-header" />
        <Grid xs={12} sm={12} className="nav-bar">
          <Card css={{ width: '100%' }}>
            <Grid.Container gap={2} justify="flex-start" css={{ padding: 0, paddingLeft: 10, paddingRight: 10 }}>
              <Grid xs={6} sm={6} css={{ padding: 0 }} alignItems="center">
                <Link href={user?._id ? '/' : '/login'}>
                  <a>
                    <Image src={logo} alt="home" width={40} height={40} />
                  </a>
                </Link>
              </Grid>
              <Grid xs={6} sm={6} css={{ padding: 0 }} alignItems="center" justify="flex-end">
                {!user?._id && <Link href="/login" passHref><Button ghost color="gradient" size="xs">Login</Button></Link>}
                {user?._id && <Button onClick={handleLogout} ghost color="gradient" size="xs">Logout</Button>}
              </Grid>
            </Grid.Container>
          </Card>
        </Grid>
      </Grid.Container>
    </nav>
  );
};

export default NavBar;
