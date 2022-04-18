import React, { FunctionComponent } from 'react';
import {
  Card,
  Grid,
  Text,
  Divider,
  Button,
} from '@nextui-org/react';
import IPost from '../../templates/post';

interface IProps {
  posts: IPost[],
}

const PostsList: FunctionComponent<IProps> = ({
  posts,
}: IProps) => (
  <Grid.Container gap={2} justify="center">

    {posts.map((post) => (
      <Grid key={post._id} xs={12} sm={8}>
        <Card css={{ width: '100%' }}>
          <Card.Header>
            <Text b size={20}>Login</Text>
          </Card.Header>
          <Divider />

          <Card.Body css={{ py: '$10' }}>
            <Text>ssss</Text>
          </Card.Body>

          <Divider />
          <Card.Footer>
            <Grid.Container gap={2} justify="center">
              <Grid xs={6} justify="center">
                <Button
                  type="submit"
                  size="xs"
                >
                  Submit
                </Button>
              </Grid>

              <Grid xs={6} justify="center">
                <Text>ss</Text>
              </Grid>
            </Grid.Container>
          </Card.Footer>
        </Card>
      </Grid>
    ))}

  </Grid.Container>
);

export default PostsList;
