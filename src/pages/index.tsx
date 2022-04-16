import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  Card,
  Grid,
  Text,
  Divider,
  Button,
} from '@nextui-org/react';
import { GetServerSidePropsContext } from 'next';
import withAuth from '../components/HOC/withAuth';
import Post from '../api/Post';
import IPost, { IPostsData } from '../templates/post';

interface IProps {
  postsData: IPostsData,
}

const PostsList: FunctionComponent<IProps> = ({
  postsData,
}: IProps) => {
  const [posts, setPosts] = useState<IPost[]>(postsData?.docs || []);
  return (
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
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const userToken = ctx.req.cookies?.userToken || '';
  const userId = ctx.req.cookies?.userId || '';

  if (!userToken || !userId) return { props: {} };

  const postApi = new Post(userToken);
  const posts = await postApi.getPosts(1);

  return {
    props: {
      postsData: posts.data.data as IPostsData,
    },
  };
};

export default withAuth(PostsList);
