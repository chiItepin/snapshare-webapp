import React, { FunctionComponent, useState, useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import withAuth from '../components/HOC/withAuth';
import Post from '../apiHandlers/Post';
import IPost, { IPostsData } from '../templates/post';
import PostsList from '../components/posts/PostsList';
import useApi from '../useApi';

interface IProps {
  postsData: IPostsData,
}

const Home: FunctionComponent<IProps> = ({
  postsData,
}: IProps) => {
  const [posts, setPosts] = useState<IPost[]>(postsData?.docs || []);
  const [nextPage, setNextPage] = useState(postsData.nextPage || null);
  const { fetchPosts, apiLoaded } = useApi();

  const handleLoadingNextPosts = React.useCallback((): void => {
    if (!nextPage) return;

    const toastInfo = toast.loading('Loading more snaps...');
    fetchPosts.getPosts(nextPage)
      .then((res) => {
        toast.dismiss(toastInfo);
        const responseData = res.data.data as IPostsData;
        setNextPage(responseData.nextPage);
        const newPosts = [...posts, ...responseData.docs];
        setPosts(newPosts);
      })
      .catch((err: AxiosError) => {
        toast.error(err?.response?.data?.message || 'Unknown error occurred');
      });
  }, [nextPage, apiLoaded]);

  const handlePostLike = React.useCallback((postId: string): void => {
    const toastInfo = toast.loading('Sending your like...');
    fetchPosts.togglePostLike(postId)
      .then((res) => {
        toast.dismiss(toastInfo);
        const responseData = res.data.data as IPost;
        setPosts((items) => items.map((i) => {
          const newPost = { ...i };
          if (i._id === postId) {
            newPost.likes = responseData.likes;
          }
          return newPost;
        }));
      })
      .catch((err: AxiosError) => {
        toast.error(err?.response?.data?.message || 'Unknown error occurred');
      });
  }, [posts, apiLoaded]);

  useEffect(() => {
    const postObserved = document.querySelector('.post-card:last-child');

    const handleNextPage = (entries: IntersectionObserverEntry[], obs: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          obs.unobserve(entry.target);
          handleLoadingNextPosts();
        }
      });
    };

    const options = {
      rootMargin: '0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleNextPage, options);

    if (apiLoaded) {
      observer.observe(postObserved);
    }

    return () => {
      if (postObserved) observer.unobserve(postObserved);
    };
  }, [posts, apiLoaded]);

  if (!apiLoaded) return null;

  return (
    <PostsList
      posts={posts}
      handlePostLike={handlePostLike}
    />
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
