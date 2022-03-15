import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import Link from 'next/link';
import {
  Card,
  Grid,
  Divider,
  Text,
  Button,
  Input,
  Spacer,
} from '@nextui-org/react';
import { IActions } from '../../reducer';
import IUser from '../../templates/user';
import useApi from '../../useApi';

const LoginView: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { loginUser } = useApi();
  const router = useRouter();

  const handleSubmit = () => {
    if (!email || !password) return;

    setIsLoading(true);
    toast.promise(loginUser(email, password), {
      loading: 'Loading...',
      success: 'Logged in successfully!',
      error: (err: AxiosError) => err.response.data?.message || 'Unknown error',
    })
      .then((res) => {
        setIsLoading(false);

        const userModel = {
          email,
          _id: res.data.userId,
          token: res.data.data,
        } as IUser;

        dispatch({
          type: 'SET_USER',
          payload: userModel,
        } as IActions);

        router.push('/');
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={12} sm={6}>
        <Card css={{ width: '100%' }}>
          <Card.Header>
            <Text b size={20}>Login</Text>
          </Card.Header>
          <Divider />

          <Card.Body css={{ py: '$10' }}>
            <Input
              label="Enter your email"
              placeholder="Email"
              clearable
              bordered
              initialValue={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              required
            />

            <Spacer y={1} />

            <Input.Password
              label="Enter your password"
              placeholder="Password"
              clearable
              bordered
              initialValue={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              required
            />
          </Card.Body>

          <Divider />
          <Card.Footer>
            <Grid.Container gap={2} justify="center">
              <Grid xs={6} justify="center">
                <Button
                  type="submit"
                  size="xs"
                  disabled={!email || !password || isLoading}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>

              <Grid xs={6} justify="center">
                <Link href="/signup" passHref><Button size="xs" ghost>Sign up</Button></Link>
              </Grid>
            </Grid.Container>
          </Card.Footer>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default LoginView;
