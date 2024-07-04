import {types} from '../actiontypes';

const inititalState = {
  isLoading: false,
  userAccessKey: {},
  userData: {},
  profileData: {},
  userAddress:"",
  video:false,
};
export const authReducer = (state = inititalState, {type, payload}) => {
  switch (type) {
    // REGISTER
    case types.REGISTER.start:
      return {...state, isLoading: true};
    case types.REGISTER.failed:
      return {...state, isLoading: false};
    case types.REGISTER.success:
      return {...state, isLoading: false, userAccessKey: payload};

    // LOGIN
    case types.LOGIN.start:
      return {...state, isLoading: true};
    case types.LOGIN.failed:
      return {...state, isLoading: false};
    case types.LOGIN.success:
      return {...state, isLoading: false, userAccessKey: payload};

    // USER DATA
    case types.USERDATA.start:
      return {...state, isLoading: true};
    case types.USERDATA.failed:
      return {...state, isLoading: false};
    case types.USERDATA.success:
      return {...state, isLoading: false, userData: payload};

    // UPDATE ADDRESS
    case types.USER_ADDRESS.start:
      return {...state, isLoading: true};
    case types.USER_ADDRESS.failed:
      return {...state, isLoading: false};
    case types.USER_ADDRESS.success:
      return {...state, isLoading: false, userAddress: payload};

      // video chat
      case types.USER_VIDEO.start:
        return {...state, isLoading: true};
      case types.USER_VIDEO.failed:
        return {...state, isLoading: false};
      case types.USER_VIDEO.success:
        return {...state, isLoading: false, video: payload};
    default:
      return state;
  }
};
