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
import PostsList from '../components/posts/PostsList';

interface IProps {
  postsData: IPostsData,
}

const Home: FunctionComponent<IProps> = ({
  postsData,
}: IProps) => {
  const [posts, setPosts] = useState<IPost[]>(postsData?.docs || []);
  return (
    <PostsList posts={posts} />
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

export default withAuth(Home);
