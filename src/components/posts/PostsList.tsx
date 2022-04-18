import React, { FunctionComponent } from 'react';
import {
  Grid,
} from '@nextui-org/react';
import Post from './Post';
import IPost from '../../templates/post';

interface IProps {
  posts: IPost[],
}

const PostsList: FunctionComponent<IProps> = ({
  posts,
}: IProps) => (
  <Grid.Container gap={2} justify="center">

    {posts.map((post) => <Post key={post._id} post={post} />)}

  </Grid.Container>
);

export default PostsList;
