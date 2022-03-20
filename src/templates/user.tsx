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

export default IUser;
