interface IUser {
  _id?: string;
  email: string;
  password?: string;
  token?: string;
  image?: string;
  loggedInDate?: string;
  createdAt?: string;
  updatedAt?: string;
  expireDate?: string;
}

export const userData = {
  _id: 'xxxxx',
  email: 'hector@gmail.com',
  token: 'xxx',
  image: '',
};

export default IUser;
