import React, { FunctionComponent, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
  Card,
  Grid,
  Button,
  Loading,
} from '@nextui-org/react';
import { useAppSelector, IActions } from '../../reducer';
import logo from '../../assets/icon.png';

const NavBar: FunctionComponent = () => {
  const user = useAppSelector((state) => state.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    toast.success('Logged out successfully!');
    dispatch({
      type: 'SET_USER',
      payload: {},
    } as IActions);
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <Loading />;

  return (
    <Grid.Container gap={2} justify="center" wrap="wrap">
      <Grid xs={12} sm={12}>
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
              {user?._id && (
              <>
                <Button.Group ghost color="gradient" size="xs" css={{ margin: 0, marginRight: 5 }}>
                  <Button>Notifications</Button>
                  <Button>Account</Button>
                  <Button>Profile</Button>
                </Button.Group>

                <Button size="xs" ghost onClick={handleLogout}>Logout</Button>
              </>
              )}

              {!user?._id && (
              <Button.Group ghost color="gradient" size="xs" css={{ margin: 0, marginRight: 5 }}>
                <Link href="/login" passHref><Button>Login</Button></Link>
                <Link href="/signup" passHref><Button>Sign up</Button></Link>
              </Button.Group>
              )}
            </Grid>
          </Grid.Container>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default NavBar;
