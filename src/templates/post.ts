import IUser from './user';
import IPaginatedList from './pagination';

export interface IComment {
  _id: string;
  content: string;
  authorId: IUser;
  createdAt?: string;
  updatedAt?: string;
}

export interface IImage {
  _id?: string;
  url: string;
}

export interface ILike {
  _id?: string;
  authorId: string;
}

interface IPost {
  _id: string;
  tags: string[];
  categories: [];
  content: string;
  authorId: IUser;
  images: IImage[];
  comments: IComment[];
  likes: ILike[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IPostsData extends IPaginatedList {
  docs: IPost[];
}

export default IPost;
