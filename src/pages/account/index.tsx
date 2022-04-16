import React, { FunctionComponent } from 'react';
import moment from 'moment';
import {
  Card,
  Grid,
  Divider,
  Text,
  User,
} from '@nextui-org/react';
import { useAppSelector } from '../../reducer';
import withAuth from '../../components/HOC/withAuth';

const AccountView: FunctionComponent = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={12} sm={6}>
        <Card css={{ width: '100%' }}>
          <Card.Header>
            <User
              src={user?.image ? user.image : ''}
              name={user.email}
              text={user.email}
              bordered
              squared
              altText={user.email}
            />
          </Card.Header>
          <Divider />

          <Card.Body css={{ py: '$10' }}>
            <Text>sss</Text>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default withAuth(AccountView);
