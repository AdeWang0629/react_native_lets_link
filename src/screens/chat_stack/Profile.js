import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Lightbox from 'react-native-lightbox-v2';
import {ActivityIndicator} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Loader from '../../components/Loader';
import {types} from '../../store/actiontypes';
import {useDispatch} from 'react-redux';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useFocusEffect} from '@react-navigation/native';
// import Entypo from 'react-native-vector-icons/Entypo';
const UserProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const imagePlaceHolder =
    'https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg';
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [showIndicator, setShowIndicator] = useState(false);
  const [uploadImages, setUploadImages] = useState([]);
  const [radius, setradius] = useState(500);
  const [bw, setbw] = useState(5);
  const [width, setWidth] = useState(140);
  const [height, setheight] = useState(140);
  const [token, setToken] = useState(0);
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [image5, setImage5] = useState('');
  const [image6, setImage6] = useState('');
  const [imageUpload, setImageUpload] = useState([]);
  const [exitVisible2, setexitVisible2] = useState(false);
  const [exitVisible1, setexitVisible1] = useState(false);
  const [checkingImage, setCheckingImage] = useState('');
  const [image, setImage] = useState({});
  const [active, setActive] = useState(false);
  const userdata = useSelector(state => state.auth.userData);
  // console.log('user data ===>>>', userdata);

  const onClickImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setexitVisible2(false);
      setImage(image);
    });
  };
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 450,
      compressImageMaxHeight: 350,
      cropping: true,
      compressImageQuality: 1.0,
    }).then(image => {
      setexitVisible2(false);
      setImage(image);
    });
  };

  const onClickImagePicker1 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setImageUpload(pre => [...pre, image]);
      setImage1(image.path);
    });
  };
  const onClickImagePicker2 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setImageUpload(pre => [...pre, image]);
      setImage2(image.path);
    });
  };
  const onClickImagePicker3 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setImageUpload(pre => [...pre, image]);
      setImage3(image.path);
    });
  };
  const onClickImagePicker4 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setImageUpload(pre => [...pre, image]);
      setImage4(image.path);
    });
  };
  const onClickImagePicker5 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setImageUpload(pre => [...pre, image]);
      setImage5(image.path);
    });
  };
  const onClickImagePicker6 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setImageUpload(pre => [...pre, image]);
      setImage6(image.path);
    });
  };
  const handleRemove = () => {
    let indexToRemove = 0;
    setImage1('');

    let newArray = imageUpload.filter(
      (element, index) => index !== indexToRemove,
    );
    console.log('response from updation', newArray);
    setImageUpload(newArray);
  };
  const handleRemove1 = () => {
    let indexToRemove = 1;
    setImage2('');

    let newArray = imageUpload.filter(
      (element, index) => index !== indexToRemove,
    );
    console.log('response from updation', newArray);
    setImageUpload(newArray);
  };
  const handleRemove2 = () => {
    let indexToRemove = 2;
    setImage3('');

    let newArray = imageUpload.filter(
      (element, index) => index !== indexToRemove,
    );
    console.log('response from updation', newArray);
    setImageUpload(newArray);
  };
  const handleRemove3 = () => {
    let indexToRemove = 3;
    setImage4('');

    let newArray = imageUpload.filter(
      (element, index) => index !== indexToRemove,
    );
    console.log('response from updation', newArray);
    setImageUpload(newArray);
  };
  const handleRemove4 = () => {
    let indexToRemove = 4;
    setImage5('');

    let newArray = imageUpload.filter(
      (element, index) => index !== indexToRemove,
    );
    console.log('response from updation', newArray);
    setImageUpload(newArray);
  };
  const handleRemove5 = () => {
    let indexToRemove = 5;
    setImage6('');

    let newArray = imageUpload.filter(
      (element, index) => index !== indexToRemove,
    );
    console.log('response from updation', newArray);
    setImageUpload(newArray);
  };

  const updateData = () => {
    if (imageUpload?.length === 0) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Error',
        textBody: 'Please Select Images',
        autoClose: 2000,
      });
    } else {
      setShowIndicator(true);
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'multipart/form-data');

      var formdata = new FormData();
      imageUpload.map(e => {
        formdata.append('avatars', {
          name: e.path.split('/')[e.path.split('/').length - 1],
          type: e.mime,
          size: e.size,
          uri: e.path,
          lastModified: e.modificationDate,
          lastModifiedDate: new Date(),
        });
      });

      var requestOptions = {
        headers: myHeaders,
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        'http://50.18.33.245:4000/user/uploadImage',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          console.log(result);
          const data1 = JSON.parse(result);
          if (data1?.length > 0) {
            if (uploadImages?.length > 0) {
              const myHeaders1 = new Headers();
              myHeaders1.append('Content-Type', 'application/json');

              const raw1 = JSON.stringify({
                profileImages: [ ...uploadImages,...data1],
              });
console.log("response from images");
              const requestOptions1 = {
                method: 'PUT',
                headers: myHeaders1,
                body: raw1,
                redirect: 'follow',
              };

              fetch(
                `http://50.18.33.245:4000/user/update/${userdata?._id}`,
                requestOptions1,
              )
                .then(response => response.text())
                .then(result => {
                  console.log(result);
                  setShowIndicator(false);
                  const data = JSON.parse(result);
                  if (data?.status === 'success') {
                    Toast.show({
                      type: ALERT_TYPE.SUCCESS,
                      title: 'Success',
                      textBody: data?.message,
                      autoClose: 2000,
                    });
                    dispatch({
                      type: types.USERDATA.success,
                      payload: data.data,
                    });
                    setImageUpload([]);
                    GettingImages();
                  } else {
                    Toast.show({
                      type: ALERT_TYPE.SUCCESS,
                      title: 'Error',
                      textBody: data?.message,
                      autoClose: 2000,
                    });
                  }
                })
                .catch(error => {
                  console.log('error', error);
                  setShowIndicator(false);
                  Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: 'Network Error',
                    autoClose: 2000,
                  });
                });
            } else {
              const myHeaders1 = new Headers();
              myHeaders1.append('Content-Type', 'application/json');

              const raw1 = JSON.stringify({
                profileImages: data1,
              });

              const requestOptions1 = {
                method: 'PUT',
                headers: myHeaders1,
                body: raw1,
                redirect: 'follow',
              };

              fetch(
                `http://50.18.33.245:4000/user/update/${userdata?._id}`,
                requestOptions1,
              )
                .then(response => response.text())
                .then(result => {
                  console.log(result);
                  setShowIndicator(false);
                  const data = JSON.parse(result);
                  if (data?.status === 'success') {
                    Toast.show({
                      type: ALERT_TYPE.SUCCESS,
                      title: 'Success',
                      textBody: data?.message,
                      autoClose: 2000,
                    });
                    dispatch({
                      type: types.USERDATA.success,
                      payload: data.data,
                    });
                    setImageUpload([]);
                    GettingImages();
                  } else {
                    Toast.show({
                      type: ALERT_TYPE.SUCCESS,
                      title: 'Error',
                      textBody: data?.message,
                      autoClose: 2000,
                    });
                  }
                })
                .catch(error => {
                  console.log('error', error);
                  setShowIndicator(false);
                  Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: 'Network Error',
                    autoClose: 2000,
                  });
                });
            }
          }
        })
        .catch(error => {
          console.log('error', error);
          setShowIndicator(false);
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: 'Network Error',
            autoClose: 2000,
          });
        });
    }
  };
  const updateData1 = () => {
    if (Object.keys(image)?.length === 0) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Error',
        textBody: 'Please Select Profile Image',
        autoClose: 2000,
      });
    } else {
      setShowIndicator(true);
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'multipart/form-data');

      var formdata = new FormData();

      formdata.append('avatars', {
        name: image.path.split('/')[image.path.split('/').length - 1],
        type: image.mime,
        size: image.size,
        uri: image.path,
        lastModified: image.modificationDate,
        lastModifiedDate: new Date(),
      });

      var requestOptions = {
        headers: myHeaders,
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        'http://50.18.33.245:4000/user/uploadImage',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          console.log(result);
          const data1 = JSON.parse(result);
          if (data1?.length > 0) {
            const myHeaders1 = new Headers();
            myHeaders1.append('Content-Type', 'application/json');

            const raw1 = JSON.stringify({
              image: data1[0]?.url,
            });

            const requestOptions1 = {
              method: 'PUT',
              headers: myHeaders1,
              body: raw1,
              redirect: 'follow',
            };

            fetch(
              `http://50.18.33.245:4000/user/update/${userdata?._id}`,
              requestOptions1,
            )
              .then(response => response.text())
              .then(result => {
                console.log(result);
                setShowIndicator(false);
                const data = JSON.parse(result);
                if (data?.status === 'success') {
                  Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: data?.message,
                    autoClose: 2000,
                  });
                  dispatch({
                    type: types.USERDATA.success,
                    payload: data.data,
                  });
                  setImage({});
                  GettingImages();
                } else {
                  Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Error',
                    textBody: data?.message,
                    autoClose: 2000,
                  });
                }
              })
              .catch(error => {
                console.log('error', error);
                setShowIndicator(false);
                Toast.show({
                  type: ALERT_TYPE.DANGER,
                  title: 'Error',
                  textBody: 'Network Error',
                  autoClose: 2000,
                });
              });
          }
        })
        .catch(error => {
          console.log('error', error);
          setShowIndicator(false);
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: 'Network Error',
            autoClose: 2000,
          });
        });
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      GettingImages();
    }, []),
  );

  const GettingImages = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `http://50.18.33.245:4000/user/get/${userdata?._id}`,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        // console.log(result)
        const data = JSON.parse(result);
        if (data?.status === 'success') {
          if (data?.data?.profileImages?.length > 0) {
            setUploadImages(data?.data?.profileImages);
            if (data?.data?.profileImages?.length > 0) {
              setImage1(data?.data?.profileImages[0]?.url);
            }
            if (data?.data?.profileImages?.length > 1) {
              setImage2(data?.data?.profileImages[1]?.url);
            }
            if (data?.data?.profileImages?.length > 2) {
              setImage3(data?.data?.profileImages[2]?.url);
            }
            if (data?.data?.profileImages?.length > 3) {
              setImage4(data?.data?.profileImages[3]?.url);
            }
            if (data?.data?.profileImages?.length > 4) {
              setImage5(data?.data?.profileImages[4]?.url);
            }
            if (data?.data?.profileImages?.length > 5) {
              setImage6(data?.data?.profileImages[5]?.url);
            }
          }
        }
      })
      .catch(error => console.error(error));
  };
  return (
    <View style={{flex: 1, backgroundColor: '#000000', marginBottom: '15%'}}>
      {showIndicator === true ? <Loader /> : null}
      <View
        style={{
          height: windowWidth / 1.2,
        }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('setting');
            }}>
            <Ionicons name="settings-outline" color={'white'} size={24} />
          </TouchableOpacity>

          {/* <Text style={styles.heading}>Let’s Chat </Text> */}
          <Pressable
            onPress={() => navigation.navigate('Package')}
            style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/icons/coin.png')}
              style={styles.logo}
            />
            <View>
              <Text style={[styles.heading, {fontSize: 14}]}>
                {userdata?.coins ? userdata?.coins : '0'}
              </Text>
              <Text style={[styles.heading, {fontSize: 14}]}>Coins</Text>
            </View>
          </Pressable>
        </View>
        <View>
          <Lightbox
            onClose={() => {
              setradius(500);
              setbw(5);
              setWidth(140);
              setheight(140);
            }}
            onOpen={() => {
              setbw(0);
              setradius(0);
              setWidth(400);
              setheight(400);
              // setWidth(1)
              // setheight(2)
            }}>
            <Image
              style={{
                height: 140,
                width: 140,
                borderRadius: radius,
                alignSelf: 'center',
                borderWidth: bw,
                top: -10,
                borderColor: '#6515AC',
              }}
              source={{
                uri:
                  Object?.keys(image)?.length > 0
                    ? image?.path
                    : userdata?.image,
              }}
            />
          </Lightbox>
          {Object?.keys(image).length > 0 ? (
            <Pressable
              onPress={() => updateData1()}
              style={{
                alignSelf: 'center',
                marginTop: -40,
                marginRight: '-20%',
                backgroundColor: '#ffffff',
                borderRadius: 50,
                padding: 4,
                borderWidth: 2,
                borderColor: '#AB4BFF',
              }}>
              <Entypo name="check" size={24} color={'#AB4BFF'} />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => setexitVisible2(true)}
              style={{
                alignSelf: 'center',
                marginTop: -40,
                marginRight: '-20%',
                backgroundColor: '#ffffff',
                borderRadius: 50,
                padding: 4,
                borderWidth: 2,
                borderColor: '#AB4BFF',
              }}>
              <MaterialCommunityIcons
                name={'pencil-outline'}
                size={24}
                color={'#AB4BFF'}
              />
            </Pressable>
          )}
          <Text
            style={[
              styles.heading,
              {alignSelf: 'center', fontSize: 20, textTransform: 'capitalize'},
            ]}>
            {userdata?.userName}
          </Text>
          <Text
            style={[
              styles.heading,
              {
                alignSelf: 'center',

                fontSize: 12,
                color: '#797C7B',
              },
            ]}>
            @{userdata?.userName}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 0,
          backgroundColor: '#ffffff',
          flex: 1,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingTop: 20,
        }}>
        <View
          style={{width: '85%', alignSelf: 'center', alignItems: 'flex-end'}}>
          <Pressable
            onPress={() => setActive(!active)}
            style={{
              height: 35,
              width: 35,
              marginTop: -10,

              backgroundColor: '#ffffff',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: '#AB4BFF',
            }}>
            <MaterialCommunityIcons
              name={'pencil-outline'}
              size={24}
              color={'#AB4BFF'}
            />
          </Pressable>
        </View>
        {active ? (
          <View style={{width: '90%', alignSelf: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                overflow: 'hidden',
              }}>
              <View style={{width: '30%'}}>
                <TouchableOpacity
                  style={styles.cardImg}
                  onPress={() => onClickImagePicker1()}>
                  <Image
                    style={styles.image_card}
                    source={{
                      uri: image1 ? image1 : imagePlaceHolder,
                    }}
                  />
                </TouchableOpacity>

                {image1 ? (
                  <Entypo
                    name="circle-with-cross"
                    color="red"
                    size={22}
                    onPress={() => handleRemove()}
                    style={{position: 'absolute', top: 1, right: -5}}
                  />
                ) : null}
              </View>
              <View style={{width: '30%'}}>
                <TouchableOpacity
                  style={styles.cardImg}
                  onPress={() => onClickImagePicker2()}>
                  <Image
                    style={styles.image_card}
                    source={{
                      uri: image2 ? image2 : imagePlaceHolder,
                    }}
                  />
                </TouchableOpacity>

                {image2 ? (
                  <Entypo
                    name="circle-with-cross"
                    color="red"
                    size={22}
                    onPress={() => handleRemove1()}
                    style={{position: 'absolute', top: 1, right: -5}}
                  />
                ) : null}
              </View>
              <View style={{width: '30%'}}>
                <TouchableOpacity
                  style={styles.cardImg}
                  onPress={() => onClickImagePicker3()}>
                  <Image
                    style={styles.image_card}
                    source={{
                      uri: image3 ? image3 : imagePlaceHolder,
                    }}
                  />
                </TouchableOpacity>

                {image3 ? (
                  <Entypo
                    name="circle-with-cross"
                    color="red"
                    size={22}
                    onPress={() => handleRemove2()}
                    style={{position: 'absolute', top: 1, right: -5}}
                  />
                ) : null}
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '30%'}}>
                <TouchableOpacity
                  style={styles.cardImg}
                  onPress={() => onClickImagePicker4()}>
                  <Image
                    style={styles.image_card}
                    source={{
                      uri: image4 ? image4 : imagePlaceHolder,
                    }}
                  />
                </TouchableOpacity>

                {image4 ? (
                  <Entypo
                    name="circle-with-cross"
                    color="red"
                    size={22}
                    onPress={() => handleRemove3()}
                    style={{position: 'absolute', top: 1, right: -5}}
                  />
                ) : null}
              </View>
              <View style={{width: '30%'}}>
                <TouchableOpacity
                  style={styles.cardImg}
                  onPress={() => onClickImagePicker5()}>
                  <Image
                    style={styles.image_card}
                    source={{
                      uri: image5 ? image5 : imagePlaceHolder,
                    }}
                  />
                </TouchableOpacity>

                {image5 ? (
                  <Entypo
                    name="circle-with-cross"
                    color="red"
                    size={22}
                    onPress={() => handleRemove4()}
                    style={{position: 'absolute', top: 1, right: -5}}
                  />
                ) : null}
              </View>
              <View style={{width: '30%'}}>
                <TouchableOpacity
                  style={styles.cardImg}
                  onPress={() => onClickImagePicker6()}>
                  <Image
                    style={styles.image_card}
                    source={{
                      uri: image6 ? image6 : imagePlaceHolder,
                    }}
                  />
                </TouchableOpacity>

                {image6 ? (
                  <Entypo
                    name="circle-with-cross"
                    color="red"
                    size={22}
                    onPress={() => handleRemove5()}
                    style={{position: 'absolute', top: 1, right: 1}}
                  />
                ) : null}
              </View>
            </View>
          </View>
        ) : (
          <View style={{width: '90%', alignSelf: 'center'}}>
            <FlatList
              data={uploadImages}
              numColumns={3}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              renderItem={data => {
                return (
                  <TouchableOpacity
                    style={styles.cardImg}
                    onPress={() => {
                      setexitVisible1(true);
                      setCheckingImage(data?.item?.url);
                    }}>
                    <Image
                      style={styles.image_card}
                      source={{
                        uri: data?.item?.url,
                      }}
                    />
                  </TouchableOpacity>
                );
              }}
            />
            {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              overflow: 'hidden',
            }}>
            <View style={{width: '30%'}}>
              {image1 ? (
                <TouchableOpacity
                  style={styles.cardImg}
                  onPress={() => onClickImagePicker1()}>
                  <Image
                    style={styles.image_card}
                    source={{
                      uri: image1 ? image1 : imagePlaceHolder,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.cardImg}
                  onPress={() => {
                    setexitVisible1(true);
                    setCheckingImage(uploadImages[0]?.url);
                  }}>
                  <Image
                    style={styles.image_card}
                    source={{
                      uri:
                        uploadImages?.length > 0
                          ? uploadImages[0]?.url
                          : imagePlaceHolder,
                    }}
                  />
                </TouchableOpacity>
              )}

              {image1 ? (
                <Entypo
                  name="circle-with-cross"
                  color="red"
                  size={22}
                  onPress={() => handleRemove()}
                  style={{position: 'absolute', top: 1, right: -5}}
                />
              ) : null}
            </View>
            <View style={{width: '30%'}}>
              {image2 ? (
                <TouchableOpacity
                  style={styles.cardImg}
                  onPress={() => onClickImagePicker2()}>
                  <Image
                    style={styles.image_card}
                    source={{
                      uri: image2 ? image2 : imagePlaceHolder,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.cardImg}
                  onPress={() => {
                    setexitVisible1(true);
                    setCheckingImage(uploadImages[1]?.url);
                  }}>
                  <Image
                    style={styles.image_card}
                    source={{
                      uri:
                        uploadImages?.length > 1
                          ? uploadImages[1]?.url
                          : imagePlaceHolder,
                    }}
                  />
                </TouchableOpacity>
              )}

              {image2 ? (
                <Entypo
                  name="circle-with-cross"
                  color="red"
                  size={22}
                  onPress={() => handleRemove1()}
                  style={{position: 'absolute', top: 1, right: -5}}
                />
              ) : null}
            </View>
            <View style={{width: '30%'}}>
             
                {image3 ? (
                   <TouchableOpacity
                   style={styles.cardImg}
                   onPress={() => onClickImagePicker3()}>
                  <Image
                    style={styles.image_card}
                    source={{
                      uri: image3 ? image3 : imagePlaceHolder,
                    }}
                  />
                   </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                   style={styles.cardImg}
                   onPress={() => {
                    setexitVisible1(true);
                    setCheckingImage(uploadImages[2]?.url);
                  }}>
                  <Image
                    style={styles.image_card}
                    source={{
                      uri:
                        uploadImages?.length > 2
                          ? uploadImages[2]?.url
                          : imagePlaceHolder,
                    }}
                  />
                  </TouchableOpacity>
                )}
             
              {image3 ? (
                <Entypo
                  name="circle-with-cross"
                  color="red"
                  size={22}
                  onPress={() => handleRemove2()}
                  style={{position: 'absolute', top: 1, right: -5}}
                />
              ) : null}
            </View>
          </View>
       
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '30%'}}>
             
                {image4 ? (
                   <TouchableOpacity
                   style={styles.cardImg}
                   onPress={() => onClickImagePicker4()}>
                  <Image
                    style={styles.image_card}
                    source={{
                      uri: image4 ? image4 : imagePlaceHolder,
                    }}
                  />
                   </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                  style={styles.cardImg}
                  onPress={() => {
                    setexitVisible1(true);
                    setCheckingImage(uploadImages[3]?.url);
                  }}>
                  <Image
                    style={styles.image_card}
                    source={{
                      uri:
                        uploadImages?.length > 3
                          ? uploadImages[3]?.url
                          : imagePlaceHolder,
                    }}
                  />
                         </TouchableOpacity>
                )}
             
              {image4 ? (
                <Entypo
                  name="circle-with-cross"
                  color="red"
                  size={22}
                  onPress={() => handleRemove3()}
                  style={{position: 'absolute', top: 1, right: -5}}
                />
              ) : null}
            </View>
            <View style={{width: '30%'}}>
             
                {image5 ? (
                   <TouchableOpacity
                   style={styles.cardImg}
                   onPress={() => onClickImagePicker5()}>
                  <Image
                    style={styles.image_card}
                    source={{
                      uri: image5 ? image5 : imagePlaceHolder,
                    }}
                  />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                  style={styles.cardImg}
                  onPress={() => {
                    setexitVisible1(true);
                    setCheckingImage(uploadImages[4]?.url);
                  }}>
                  <Image
                    style={styles.image_card}
                    source={{
                      uri:
                        uploadImages?.length > 4
                          ? uploadImages[4]?.url
                          : imagePlaceHolder,
                    }}
                  />
                      </TouchableOpacity>
                )}
              
              {image5 ? (
                <Entypo
                  name="circle-with-cross"
                  color="red"
                  size={22}
                  onPress={() => handleRemove4()}
                  style={{position: 'absolute', top: 1, right: -5}}
                />
              ) : null}
            </View>
            <View style={{width: '30%'}}>
           
                {image6 ? (
                     <TouchableOpacity
                     style={styles.cardImg}
                     onPress={() => onClickImagePicker6()}>
                  <Image
                    style={styles.image_card}
                    source={{
                      uri: image6 ? image6 : imagePlaceHolder,
                    }}
                  />
                   </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                  style={styles.cardImg}
                  onPress={() => {
                    setexitVisible1(true);
                    setCheckingImage(uploadImages[5]?.url);
                  }}>
                  <Image
                    style={styles.image_card}
                    source={{
                      uri:
                        uploadImages?.length > 5
                          ? uploadImages[5]?.url
                          : imagePlaceHolder,
                    }}
                  />
                         </TouchableOpacity>
                )}
             
              {image6 ? (
                <Entypo
                  name="circle-with-cross"
                  color="red"
                  size={22}
                  onPress={() => handleRemove5()}
                  style={{position: 'absolute', top: 1, right: 1}}
                />
              ) : null}
            </View>
          </View> */}
          </View>
        )}

        {imageUpload?.length > 0 && (
          <TouchableOpacity
            onPress={() => updateData()}
            style={{
              backgroundColor: '#6515AC',
              width: '75%',
              height: 45,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 30,
              position: 'relative',
              // bottom: '-20%'
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#ffffff',
                fontWeight: '700',
                fontFamily: 'Poppins',
              }}>
              Update Profile
            </Text>
          </TouchableOpacity>
        )}
        {userdata?.gender === 'male' ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('Package')}
            style={{
              backgroundColor: '#6515AC',
              width: '75%',
              height: 45,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 30,
              position: 'relative',
              // bottom: '-20%'
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#ffffff',
                fontWeight: '700',
                fontFamily: 'Poppins',
              }}>
              Buy Coins
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: '#6515AC',
              width: '75%',
              height: 45,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 30,
              position: 'relative',
              // bottom: '-20%'
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#ffffff',
                fontWeight: '700',
                fontFamily: 'Poppins',
              }}>
              Request Payout
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={exitVisible2}
        onRequestClose={() => {
          setexitVisible2(!exitVisible2);
        }}>
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: (height / 100) * 100,
            // marginTop: 22
            backgroundColor: '#70707070',
            // bottom:"50%"
          }}
          onPress={() => setexitVisible2(!exitVisible2)}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              height: 100,
              width: '70%',
              // paddingTop: 10,
              paddingHorizontal: 10,
              // alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              // bottom:'49%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'absolute',
            }}>
            <View
              style={{
                // backgroundColor: 'red',
                height: 100,
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Pressable onPress={() => takePhotoFromCamera()}>
                <Image
                  source={require('../../assets/images/camera1.png')}
                  style={{height: 50, width: 50}}
                  resizeMode={'contain'}
                />
              </Pressable>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Poppins',
                  marginTop: 10,
                  color: 'black',
                }}>
                From Camera
              </Text>
            </View>
            <View
              style={{
                // backgroundColor: 'red',
                height: 100,
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Pressable onPress={() => onClickImagePicker()}>
                <Image
                  source={require('../../assets/images/gallery1.png')}
                  style={{height: 50, width: 50}}
                  resizeMode={'contain'}
                />
              </Pressable>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Poppins',
                  marginTop: 10,
                  color: 'black',
                }}>
                From Gallery
              </Text>
            </View>
          </View>
        </Pressable>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={exitVisible1}
        onRequestClose={() => {
          setexitVisible1(!exitVisible1);
        }}>
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: (height / 100) * 100,
            // marginTop: 22
            backgroundColor: '#70707070',
            // bottom:"50%"
          }}
          onPress={() => setexitVisible1(!exitVisible1)}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              height: '40%',
              width: '90%',

              position: 'absolute',
            }}>
            <Image
              source={{uri: checkingImage}}
              style={{height: '100%', width: '100%', borderRadius: 20}}
            />
            <Pressable
              style={{position: 'absolute', top: -10, right: -5}}
              onPress={() => {
                setexitVisible1(false);
                setCheckingImage('');
              }}>
              <Entypo name="circle-with-cross" color={'red'} size={28} />
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  logo: {
    width: 20,
    height: 40,
    marginRight: 10,
  },
  header: {
    // alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    padding: 10,
    paddingHorizontal: '5%',
    marginTop: 20,
    // height: 350
  },
  heading: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    borderRadius: 100,
    height: 60,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 30,
  },

  image: {
    width: 60,
    borderRadius: 100,
    height: 60,
  },

  cardImg: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // width: '34%',
    borderRadius: 100,
    height: 60,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 30,
    padding: 10,
  },
  image_card: {
    width: 100,
    borderRadius: 20,
    height: 100,
    alignSelf: 'center',
    borderWidth: 0.2,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    // borderRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    height: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    // backgroundColor: '#ffffff',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
});
