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
import logo from '../../../public/icon.png';

interface IProps {
  backgroundColor?: string;
  hasLogo?: boolean;
  hasBounceOnScroll?: boolean,
  hasShadow?: boolean,
}

const NavBar: FunctionComponent<IProps> = ({
  backgroundColor,
  hasLogo,
  hasBounceOnScroll,
  hasShadow,
}: IProps) => {
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
    if (!loaded || !hasBounceOnScroll) return undefined;

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
  }, [loaded, hasBounceOnScroll]);

  if (!loaded) return null;

  return (
    <nav>
      <Grid.Container gap={2} justify="center" wrap="wrap">
        <div className="after-header" />
        <Grid xs={12} sm={12} className="nav-bar">
          <Card css={{ width: '100%', backgroundColor }} shadow={hasShadow}>
            <Grid.Container gap={2} justify="flex-start" css={{ padding: 0, paddingLeft: 10, paddingRight: 10 }}>
              <Grid xs={6} sm={6} css={{ padding: 0 }} alignItems="center">
                {hasLogo && (
                <Link href={user?._id ? '/' : '/login'}>
                  <a>
                    <Image src={logo} alt="home" width={40} height={40} />
                  </a>
                </Link>
                )}
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

NavBar.defaultProps = {
  backgroundColor: 'white',
  hasLogo: true,
  hasBounceOnScroll: true,
  hasShadow: true,
};

export default NavBar;
