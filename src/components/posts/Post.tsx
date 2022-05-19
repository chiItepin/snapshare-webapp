import React, { FunctionComponent } from 'react';
import {
  Card,
  Grid,
  Text,
  Divider,
  Button,
  User,
  Image,
  Spacer,
} from '@nextui-org/react';
import moment from 'moment';
import IPost from '../../templates/post';
import { useAppSelector } from '../../reducer';

interface IProps {
  post: IPost,
  handlePostLike: (postId: string) => void,
}

const Post: FunctionComponent<IProps> = ({
  post,
  handlePostLike,
}: IProps) => {
  const user = useAppSelector((state) => state.user);

  const hasUserLiked = (): boolean => {
    const [like] = post.likes.filter((l) => l.authorId === user._id);
    return !!like;
  };

  return (
    <Grid
      xs={12}
      sm={8}
      lg={6}
      className="post-card"
    >
      <Card css={{ width: '100%' }} bordered shadow={false} borderWeight="light">
        <Card.Header>
          <User
            src={post?.authorId?.image ? `data:image/png;base64, ${post?.authorId.image}` : ''}
            text={post.authorId.email}
            name={`${post.authorId.email} - ${moment(post.createdAt).fromNow()}`}
            bordered
            squared
            altText={post.authorId.email}
          />
        </Card.Header>
        <Divider />

        <Card.Body css={{ py: '$10' }}>
          <Text b size={post.content.length > 50 ? 'inherit' : 20}>{post.content}</Text>

          <Spacer />

          {React.Children.toArray(post.images.map((image) => (
            <Image
              showSkeleton
              width="100%"
              height="auto"
              maxDelay={1000}
              objectFit="contain"
              src={`data:image/png;base64, ${image.url}`}
              alt={post.authorId.email}
            />
          )))}
        </Card.Body>

        <Divider />
        <Card.Footer>
          <Grid.Container gap={2} justify="center">
            <Grid xs={4} justify="center">
              <Button
                type="submit"
                size="sm"
                onClick={() => handlePostLike(post._id)}
                color={hasUserLiked() ? 'secondary' : 'default'}
                light
              >
                {`Likes ${post.likes.length}`}
              </Button>
            </Grid>

            <Grid xs={4} justify="center">
              <Button
                type="submit"
                size="sm"
                light
              >
                {`Comments ${post.comments.length}`}
              </Button>
            </Grid>

            <Grid xs={4} justify="center">
              <Button
                type="submit"
                size="sm"
                light
              >
                Share
              </Button>
            </Grid>
          </Grid.Container>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

const propsAreEqual = (prevProps: IProps, nextProps: IProps) => (
  prevProps.post._id === nextProps.post._id
  && prevProps.post.content === nextProps.post.content
  && prevProps.post.comments.length === nextProps.post.comments.length
  && prevProps.post.likes.length === nextProps.post.likes.length
);

export default React.memo(Post, propsAreEqual);
