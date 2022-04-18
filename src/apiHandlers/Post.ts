import axios, { AxiosResponse } from 'axios';
import Api from './index';

class Post extends Api {
  public getPosts(page: number): Promise<AxiosResponse<any>> {
    return axios.get(`${this.getBaseUrl()}/api/posts?page=${page}`, {
      headers: { ...this.getHeaders() },
    });
  }

  public getPost(postId: string): Promise<AxiosResponse<any>> {
    return axios.get(`${this.getBaseUrl()}/api/posts/${postId}`, {
      headers: { ...this.getHeaders() },
    });
  }

  public searchPost(searchQuery: string, page: number): Promise<AxiosResponse<any>> {
    return axios.get(`${this.getBaseUrl()}/api/posts/search/${searchQuery}?page=${page}`, {
      headers: { ...this.getHeaders() },
    });
  }

  public deletePost(postId: string): Promise<AxiosResponse<any>> {
    return axios.delete(`${this.getBaseUrl()}/api/posts/${postId}`, {
      headers: { ...this.getHeaders() },
    });
  }

  // createPost: (content: string, images: IImage[]): Promise<AxiosResponse<any>> => axios.post(`${baseUrl}/api/posts`, {
  //   content,
  //   images,
  // }, {
  //   headers,
  // }),

  public togglePostLike(postId: string): Promise<AxiosResponse<any>> {
    return axios.patch(`${this.getBaseUrl()}/api/posts/${postId}/like`, {}, {
      headers: { ...this.getHeaders() },
    });
  }

  public createPostComment(postId: string, content: string): Promise<AxiosResponse<any>> {
    return axios.post(`${this.getBaseUrl()}/api/posts/${postId}/comments`, {
      content,
    }, {
      headers: { ...this.getHeaders() },
    });
  }
}

export default Post;
