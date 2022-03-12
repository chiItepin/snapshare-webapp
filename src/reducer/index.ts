import IUser from '../templates/user';

interface IFollower {
  user: string & IUser;
  byUserId: string;
}

export interface IState {
  user: IUser;
  posts: any[];
  followers: IFollower[];
  unSeenNotificationsCount: number;
}

export interface IActions {
  type: string;
  payload: any;
}

export const initialState: IState = {
  user: {
    _id: '',
    email: '',
    token: '',
    loggedInDate: '',
    image: '',
  },
  posts: [],
  followers: [],
  unSeenNotificationsCount: 0,
};

// eslint-disable-next-line default-param-last
const Reducer = (state: IState = initialState, action: IActions): IState => {
  switch (action?.type || '') {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_FOLLOWERS':
      return {
        ...state,
        followers: action.payload,
      };
    case 'SET_UNSEEN_NOTIFICATIONS_COUNT':
      return {
        ...state,
        unSeenNotificationsCount: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
