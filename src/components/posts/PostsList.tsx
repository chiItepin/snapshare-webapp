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

interface IProps {
  posts: IPost[],
}

const PostsList: FunctionComponent<IProps> = ({
  posts,
}: IProps) => (
  <Grid.Container gap={2} justify="center">

    {posts.map((post) => (
      <Grid key={post._id} xs={12} sm={8}>
        <Card css={{ width: '100%' }} bordered shadow={false} borderWeight="light">
          <Card.Header>
            <User
              src={post?.authorId.image ? `data:image/png;base64, ${post?.authorId.image}` : ''}
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
    ))}

  </Grid.Container>
);

export default PostsList;
