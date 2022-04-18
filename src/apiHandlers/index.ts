export interface IHeaders {
  Authorization: string;
  'Content-type': 'application/json; charset=UTF-8';
}

class Api {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;

  private headers: IHeaders = {
    Authorization: '',
    'Content-type': 'application/json; charset=UTF-8',
  };

  constructor(Authorization: string) {
    this.headers.Authorization = `Bearer ${Authorization}`;
  }

  public getBaseUrl() {
    return this.baseUrl;
  }

  public getHeaders() {
    return this.headers;
  }
}

export default Api;
