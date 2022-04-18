import axios, { AxiosResponse } from 'axios';
import Api from './index';

class User extends Api {
  public getUser(id: string): Promise<AxiosResponse<any>> {
    return axios.get(`${this.getBaseUrl()}/api/users/${id}`, {
      headers: { ...this.getHeaders() },
    });
  }
}

export default User;
