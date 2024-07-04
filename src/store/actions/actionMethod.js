import {httpRequest} from '../../config';
import {store} from '../index';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
export const getPublicData = async (
  dispatch,
  url,
  types,
  successMsg,
  callback,
) => {
  try {
    dispatch({type: types.start});
    let response = await httpRequest(url);
    response = response.data;
    //  console.log("RES-------", url, typeof response ,response)
    if (response.status && response.status === 'fail') {
      {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: result.message,
          position: 'top',
        });
      }
    } else {
      dispatch({type: types.success, payload: response});
      callback && callback(response);
      // dispatch(setToast('success', response.message || successMsg));
    }
  } catch (error) {
    // console.log("Error: action  getPublicData from url",url, error)
    dispatch({type: types.failed});
    if (error.message.toLowerCase() === 'network error') {
      getPublicData(dispatch, url, types, successMsg, callback);
    } else {
      error.message && Toast.show({
        type: 'error',
        text1: 'oops!',
        text2: 'Something went wrong',
        position: 'top',
      });
    }
  }
};

export const postData = async (
  dispatch,
  url,
  data,
  header,
  types,
  successMsg,
  callback,
  successNotifyStatus = 'success',
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (typeof url !== 'string') return alert(url.toString());
    dispatch({type: types.start});
    console.log('cccccccccccccccccccccccccc', data, url, config);



    const response = await httpRequest.post(url, data, config);


    
    const result = response.data;
    // let temp= data // the reason to save data in temp is because it becomes undefined once twe get the result

    console.log(
      'POST DATA.............................................',
      result,
    );
    if (result.error) throw result.error;
    if (result.result && result.result === 'Please enter correct password')
      throw result.result;
    if (result.status !== 'success') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: result.message,
        position: 'top',
      });
    } else {
      // console.log('data',temp)

      // let data = url==='login'?{...result,username:temp.username }:result
      // alert(result.message)

      dispatch({type: types.success, payload: result.data});
      callback && callback(result.data);
      Toast.show({
        type: 'success',
        text1: 'success',
        text2: result?.message,
        position: 'top',
      });
    }
  } catch (error) {
    console.log(
      'Error from action  --------------------------------',
      url,
      types,
      error,
      // error.message,
      typeof error === 'string',
    );
    dispatch({type: types.failed});
    error.message ||
      (error &&
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: typeof error === 'string' ? error : error?.message,
          position: 'top',
        }));
  }
};
export const LikeData = async (
  dispatch,
  url,
  data,
  header,
  types,
  successMsg,
  callback,
  successNotifyStatus = 'success',
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (typeof url !== 'string') return alert(url.toString());
    dispatch({type: types.start});
    console.log('cccccccccccccccccccccccccc', data, url, config);



    const response = await httpRequest.post(url, data, config);


    
    const result = response.data;
    // let temp= data // the reason to save data in temp is because it becomes undefined once twe get the result

    console.log(
      'POST DATA.............................................',
      result,
    );
    if (result.error) throw result.error;
    if (result.result && result.result === 'Please enter correct password')
      throw result.result;
    if (result.status !== 'success') {
      // Toast.show({
      //   type: 'error',
      //   text1: 'Error',
      //   text2: result.message,
      //   position: 'top',
      // });
    } else {
      // console.log('data',temp)

      // let data = url==='login'?{...result,username:temp.username }:result
      // alert(result.message)

      dispatch({type: types.success, payload: result.data});
      callback && callback(result.data);
      // Toast.show({
      //   type: 'success',
      //   text1: 'success',
      //   text2: result?.message,
      //   position: 'top',
      // });
    }
  } catch (error) {
    console.log(
      'Error from action  --------------------------------',
      url,
      types,
      error,
      // error.message,
      typeof error === 'string',
    );
    dispatch({type: types.failed});
    error.message ||
      (error &&
        // Toast.show({
        //   type: 'error',
        //   text1: 'Error',
        //   text2: typeof error === 'string' ? error : error?.message,
        //   position: 'top',
        // })
        console.log(typeof error === 'string' ? error : error?.message)
        );
  }
};

export const singinPost = async (
  dispatch,
  url,
  data,
  header,
  types,
  successMsg,
  callback,
  successNotifyStatus = 'success',
) => {
  try {
    const config = {
      headers: {
        // 'Accept': 'application/json',
        'Content-Type':  "multipart/form-data",
      },
    };
    dispatch({type: types.start});
console.log('data for header----',data);
    // const config = {
    //   headers: {
    //     // 'Accept': 'application/json',
    //     'Content-Type':  "multipart/form-data",
    //     'Authorization' :'Bearer ' + data
    //   },
    // };


    var myHeaders = new Headers();
      // myHeaders.append(
      //   'Authorization',
      //   'Bearer ' + data);
      myHeaders.append('Content-Type', "multipart/form-data");

   

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow',
      };
      // setShowindicator(true);

      fetch('http://164.92.224.155:4545/api/user/login', requestOptions)
        .then(response => response.text())
        .then(result => {
          let data = JSON.parse(result);
          // setShowindicator(false);
          console.log(data, 'response after upload');
          // if (data.status === 'success') {
            // Toast.show({
            //   type: 'success',
            //   text1: 'success',
            //   text2: data.messages[0],
            // });
            dispatch({type: types.success, payload: data});
            callback && callback(data);
            // navigation.replace('drawer');
          // } else {
          //   Toast.show({
          //     type: 'error',
          //     text1: 'Error',
          //     text2: data.messages[0],
          //   });
          //   console.log('response from server---', data);
          // }
        })
        .catch(error => console.log('error', error));
    // if (typeof url !== 'string') return alert(url.toString());
    // dispatch({type: types.start});
    // console.log('cccccccccccccccccccccccccc', data, url, config);



    // const response = await httpRequest.post(url, data, config);


    
    // const result = response.data;
    // let temp= data // the reason to save data in temp is because it becomes undefined once twe get the result

    // console.log(
    //   'POST DATA.............................................',
    //   result,
    // );
    // if (result.error) throw result.error;
    // if (result.result && result.result === 'Please enter correct password')
    //   throw result.result;
    // if (result.status !== 'success') {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Error',
    //     text2: result.message,
    //     position: 'top',
    //   });
    // } 
    // else {
    //   // console.log('data',temp)

    //   // let data = url==='login'?{...result,username:temp.username }:result
    //   // alert(result.message)

    //   dispatch({type: types.success, payload: result});
    //   callback && callback(result);
    //   // Toast.show({
    //   //   type: 'success',
    //   //   text1: 'success',
    //   //   text2: result.message,
    //   //   position: 'top',
    //   // });
    // }
  } catch (error) {
    console.log(
      'Error from action  --------------------------------',
      url,
      types,
      error,
      // error.message,
      typeof error === 'string',
    );
    dispatch({type: types.failed});
    error.message ||
      (error &&
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: typeof error === 'string' ? error : error?.message,
          position: 'top',
        }));
  }
};

export const authPost = async (
  dispatch,
  url,
  data,
  header,
  types,
  successMsg,
  callback,
  successNotifyStatus = 'success',
) => {
  try {
    const config = {
      headers: {
        // 'Accept': 'application/json',
        'Content-Type':  "multipart/form-data",
      },
    };
    if (typeof url !== 'string') return alert(url.toString());
    dispatch({type: types.start});
    console.log('cccccccccccccccccccccccccc', data, url, config);



    const response = await httpRequest.post(url, data, config);


    
    const result = response.data;
    // let temp= data // the reason to save data in temp is because it becomes undefined once twe get the result

    console.log(
      'POST DATA.............................................',
      result,
    );
    if (result.error) throw result.error;
    if (result.result && result.result === 'Please enter correct password')
      throw result.result;
    // if (result.status !== 'success') {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Error',
    //     text2: result.message,
    //     position: 'top',
    //   });
    // } 
    else {
      // console.log('data',temp)

      // let data = url==='login'?{...result,username:temp.username }:result
      // alert(result.message)

      dispatch({type: types.success, payload: result});
      callback && callback(result);
      // Toast.show({
      //   type: 'success',
      //   text1: 'success',
      //   text2: result.message,
      //   position: 'top',
      // });
    }
  } catch (error) {
    console.log(
      'Error from action  --------------------------------',
      url,
      types,
      error,
      // error.message,
      typeof error === 'string',
    );
    dispatch({type: types.failed});
    error.message ||
      (error &&
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: typeof error === 'string' ? error : error?.message,
          position: 'top',
        }));
  }
};

export const logoutPost = async (
  dispatch,
  url,
  data,
  header,
  types,
  successMsg,
  callback,
  successNotifyStatus = 'success',
) => {
  try {
//     const authselector = useSelector(state => state.auth.userAccessKey);
// console.log('authselector--- data',authselector);
dispatch({type: types.start});
console.log('data for header----',data);
    // const config = {
    //   headers: {
    //     // 'Accept': 'application/json',
    //     'Content-Type':  "multipart/form-data",
    //     'Authorization' :'Bearer ' + data
    //   },
    // };


    var myHeaders = new Headers();
      myHeaders.append(
        'Authorization',
        'Bearer ' + data);
      myHeaders.append('Content-Type', 'application/json');

   

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: '',
        redirect: 'follow',
      };
      // setShowindicator(true);

      fetch('http://164.92.224.155:4545/api/user/logout', requestOptions)
        .then(response => response.text())
        .then(result => {
          let data = JSON.parse(result);
          // setShowindicator(false);
          console.log(data, 'response after upload');
          if (data.status === 'success') {
            Toast.show({
              type: 'success',
              text1: 'success',
              text2: data.messages[0],
            });
            dispatch({type: types.success, payload: data});
            callback && callback(data);
            // navigation.replace('drawer');
          } else {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: data.messages[0],
            });
            console.log('response from server---', data);
          }
        })
        .catch(error => console.log('error', error));


  


    
  
  } catch (error) {
    console.log(
      'Error from action  --------------------------------',
      url,
      types,
      error,
      // error.message,
      typeof error === 'string',
    );
    dispatch({type: types.failed});
    error.message ||
      (error &&
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: typeof error === 'string' ? error : error?.message,
          position: 'top',
        }));
  }
};


export const postArticles = async (
  dispatch,
  url,
  data,
  header,
  types,
  successMsg,
  callback,
  successNotifyStatus = 'success',
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    if (typeof url !== 'string') return alert(url.toString());
    dispatch({type: types.start});
    console.log('cccccccccccccccccccccccccc', data, url, config);



    const response = await httpRequest.post(url, data, config);


    
    const result = response.data;
    // let temp= data // the reason to save data in temp is because it becomes undefined once twe get the result

    console.log(
      'POST DATA.............................................',
      result,
    );
    // if (result.error) throw result.error;
    // if (result.result && result.result === 'Please enter correct password')
    //   throw result.result;
    if (result.status !== 'success') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: result.message,
        position: 'top',
      });
    } else {
      // console.log('data',temp)

      // let data = url==='login'?{...result,username:temp.username }:result
      // alert(result.message)

      dispatch({type: types.success, payload: result.data});
      callback && callback(result.data);
      Toast.show({
        type: 'success',
        text1: 'success',
        text2: result?.message,
        position: 'top',
      });
    }
  } catch (error) {
    console.log(
      'Error from action  --------------------------------',
      url,
      types,
      error,
      // error.message,
      typeof error === 'string',
    );
    dispatch({type: types.failed});
    error.message ||
      (error &&
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: typeof error === 'string' ? error : error?.message,
          position: 'top',
        }));
  }
};


export const postProfile = async (
  dispatch,
  url,
  data,
  header,
  types,
  successMsg,
  callback,
  successNotifyStatus = 'success',
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    if (typeof url !== 'string') return alert(url.toString());
    dispatch({type: types.start});
    console.log('cccccccccccccccccccccccccc', data, url, config);



    const response = await httpRequest.post(url, data, config);


    
    const result = response.data;
    // let temp= data // the reason to save data in temp is because it becomes undefined once twe get the result

    console.log(
      'POST DATA.............................................',
      result,
    );
    // if (result.error) throw result.error;
    // if (result.result && result.result === 'Please enter correct password')
    //   throw result.result;
    if (result.status !== 'success') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: result.message,
        position: 'top',
      });
    } else {
      // console.log('data',temp)

      // let data = url==='login'?{...result,username:temp.username }:result
      // alert(result.message)

      dispatch({type: types.success, payload: result});
      callback && callback(result.data);
      Toast.show({
        type: 'success',
        text1: 'success',
        text2: result?.message,
        position: 'top',
      });
    }
  } catch (error) {
    console.log(
      'Error from action  --------------------------------',
      url,
      types,
      error,
      // error.message,
      typeof error === 'string',
    );
    dispatch({type: types.failed});
    error.message ||
      (error &&
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: typeof error === 'string' ? error : error?.message,
          position: 'top',
        }));
  }
};