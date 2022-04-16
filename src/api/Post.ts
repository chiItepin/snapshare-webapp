import axios, { AxiosResponse } from 'axios';
import Api from './index';

class Post extends Api {
  public getPosts(page: number): Promise<AxiosResponse<any>> {
    return axios.get(`${this.getBaseUrl()}/api/posts?page=${page}`, {
      headers: { ...this.getHeaders() },
    });
  }
}

export default Post;
