import AsyncStorage from '@react-native-async-storage/async-storage';
import {httpRequest, url} from '../../config';
import {types} from '../actiontypes';
import { authPost, singinPost,logoutPost} from './actionMethod';

export const registerAction = (data, callback) => dispatch => {
  authPost(dispatch, url.register, data, null, types.REGISTER, null, callback);
};

export const loginAction = (data, callback) => async dispatch => {
  singinPost(dispatch, url.login, data, null, types.LOGIN, null, callback);
};
export const logoutAction = (data, callback) => async dispatch => {
  logoutPost(dispatch, url.logout, data, null, types.LOGOUT, null, callback);
};










