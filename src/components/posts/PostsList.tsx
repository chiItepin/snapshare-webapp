import React, { FunctionComponent } from 'react';
import {
  Grid,
} from '@nextui-org/react';
import Post from './Post';
import IPost from '../../templates/post';

interface IProps {
  posts: IPost[],
  handlePostLike: (postId: string) => void,
}

const PostsList: FunctionComponent<IProps> = ({
  posts,
  handlePostLike,
}: IProps) => (
  <Grid.Container gap={2} justify="center">

    {posts.map((post) => <Post key={post._id} post={post} handlePostLike={handlePostLike} />)}

  </Grid.Container>
);

export default PostsList;
