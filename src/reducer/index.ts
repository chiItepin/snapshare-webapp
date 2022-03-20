/* eslint-disable default-param-last */
import {
  useSelector,
  TypedUseSelectorHook,
} from 'react-redux';
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

export type IActionTypes = 'SET_USER' | 'SET_FOLLOWERS' | 'SET_UNSEEN_NOTIFICATIONS_COUNT';

export interface IActions {
  type: IActionTypes;
  payload: any;
}

const getUser = (): IUser => ({
  _id: '',
  email: '',
  token: '',
  loggedInDate: '',
  image: '',
  expireDate: '',
});

export const initialState: IState = (typeof window !== 'undefined' && localStorage.getItem('persistedState'))
  ? JSON.parse(localStorage.getItem('persistedState'))
  : {
    user: getUser(),
    posts: [],
    followers: [],
    unSeenNotificationsCount: 0,
  };

const Reducer = (
  state: IState = initialState,
  action: IActions,
): IState => {
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

export const useAppSelector: TypedUseSelectorHook<IState> = useSelector;

export default Reducer;
