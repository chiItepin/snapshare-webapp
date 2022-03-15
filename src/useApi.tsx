import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import IUser from './templates/user';
import { useAppSelector } from './reducer';

interface IRequestPosts {
  // createPost: (content: string, images: IImage[]) => Promise<AxiosResponse<any>>;
  togglePostLike: (postId: string) => Promise<AxiosResponse<any>>;
  getPosts: (page: number) => Promise<AxiosResponse<any>>;
  getPost: (postId: string) => Promise<AxiosResponse<any>>;
  deletePost: (postId: string) => Promise<AxiosResponse<any>>;
  searchPost: (searchQuery: string, page: number) => Promise<AxiosResponse<any>>;
  createPostComment: (postId: string, content: string) => Promise<AxiosResponse<any>>;
}

interface IRequestUser {
  updateImage: (id: string, image: string) => Promise<AxiosResponse<any>>;
  getUser: (id: string) => Promise<AxiosResponse<any>>;
  getUserPosts: (id: string, page: number) => Promise<AxiosResponse<any>>;
  createUser: (email: string, password: string, confirmPassword: string)
  => Promise<AxiosResponse<any>>;
  getUserNotifications: (page: number) => Promise<AxiosResponse<any>>;
  getUserUnSeenNotifications: (page: number) => Promise<AxiosResponse<any>>;
  updateNotificationsSeenStatus: (status: boolean) => Promise<AxiosResponse<any>>;
}

interface IRequestFollower {
  getFollowers: (userId: string, page: number) => Promise<AxiosResponse<any>>;
  addFollower: (byUserId: string, userId: string) => Promise<AxiosResponse<any>>;
}

export interface IApi {
  apiLoaded: boolean;
  fetchPosts: IRequestPosts;
  User: IRequestUser;
  loginUser: (email: string, password: string) => Promise<AxiosResponse<any>>;
  fetchFollowers: IRequestFollower;

}

const useApi = (): IApi => {
  const [loaded, setLoaded] = useState(false);
  const [token, setToken] = useState('');
  const user = useAppSelector((state) => state.user);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const headers = {
    'Content-type': 'application/json; charset=UTF-8',
    Authorization: `Bearer ${token}`,
  };

  const loginUser = (email: string, password: string): Promise<AxiosResponse<any>> => axios.post(`${baseUrl}/api/users/login`, {
    email,
    password,
  }, {
    headers,
  });

  const User = {
    getUser: (id: string): Promise<AxiosResponse<any>> => axios.get(`${baseUrl}/api/users/${id}`, {
      headers,
    }),
    getUserPosts: (id: string, page: number): Promise<AxiosResponse<any>> => axios.get(`${baseUrl}/api/users/${id}/posts?page=${page}`, {
      headers,
    }),
    createUser: (email: string, password: string, confirmPassword: string): Promise<AxiosResponse<any>> => axios.post(`${baseUrl}/api/users/create`, {
      email,
      password,
      confirmPassword,
    }, {
      headers,
    }),
    updateImage: (id: string, image: string): Promise<AxiosResponse<any>> => axios.patch(`${baseUrl}/api/users/${id}`, {
      image,
    }, {
      headers,
    }),
    getUserNotifications: (page: number): Promise<AxiosResponse<any>> => axios.get(`${baseUrl}/api/notifications?page=${page}`, {
      headers,
    }),
    getUserUnSeenNotifications: (page: number): Promise<AxiosResponse<any>> => axios.get(`${baseUrl}/api/notifications/unseen?page=${page}`, {
      headers,
    }),
    updateNotificationsSeenStatus: (status: boolean): Promise<AxiosResponse<any>> => axios.patch(`${baseUrl}/api/notifications/status`, {
      status,
    }, {
      headers,
    }),
  };

  const fetchPosts = {
    getPosts: (page: number): Promise<AxiosResponse<any>> => axios.get(`${baseUrl}/api/posts?page=${page}`, {
      headers,
    }),
    getPost: (postId: string): Promise<AxiosResponse<any>> => axios.get(`${baseUrl}/api/posts/${postId}`, {
      headers,
    }),
    searchPost: (searchQuery: string, page: number): Promise<AxiosResponse<any>> => axios.get(`${baseUrl}/api/posts/search/${searchQuery}?page=${page}`, {
      headers,
    }),
    deletePost: (postId: string): Promise<AxiosResponse<any>> => axios.delete(`${baseUrl}/api/posts/${postId}`, {
      headers,
    }),
    // createPost: (content: string, images: IImage[]): Promise<AxiosResponse<any>> => axios.post(`${baseUrl}/api/posts`, {
    //   content,
    //   images,
    // }, {
    //   headers,
    // }),
    togglePostLike: (postId: string): Promise<AxiosResponse<any>> => axios.patch(`${baseUrl}/api/posts/${postId}/like`, {}, {
      headers,
    }),
    createPostComment: (postId: string, content: string): Promise<AxiosResponse<any>> => axios.post(`${baseUrl}/api/posts/${postId}/comments`, {
      content,
    }, {
      headers,
    }),
  };

  const fetchFollowers = {
    getFollowers: (userId: string, page: number): Promise<AxiosResponse<any>> => axios.get(`${baseUrl}/api/followers/${userId}?page=${page}&limit=500`, {
      headers,
    }),
    addFollower: (byUserId: string, userId: string): Promise<AxiosResponse<any>> => axios.post(`${baseUrl}/api/followers`, {
      byUserId,
      user: userId,
    }, {
      headers,
    }),
  };

  useEffect(() => {
    const getToken = () => {
      const value = localStorage.getItem('@user');
      const userModel = JSON.parse(value) as IUser;
      setToken(userModel?.token || '');
      setLoaded(true);
    };
    if (!user?.token) {
      getToken();
    } else {
      setToken(user.token);
      setLoaded(true);
    }
  }, [user?.token]);

  return {
    apiLoaded: loaded,
    loginUser,
    fetchPosts,
    User,
    fetchFollowers,
  };
};

export default useApi;
