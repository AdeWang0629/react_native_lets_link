/* eslint-disable react-native/no-inline-styles */
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useState} from 'react';
import {theme} from '../../../theme';
import {Text} from 'react-native-paper';
import {Styles} from '../../assets/styling/style';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import Loader from '../../components/Loader';
import {types} from '../../store/actiontypes';
import {useDispatch} from 'react-redux';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const {height, width} = Dimensions.get('window');
import moment from 'moment';
const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const [showIndicator, setShowIndicator] = useState(false);
  const [exitVisible2, setexitVisible2] = useState(false);

  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [gender, setgender] = useState('');
  const [image, setImage] = useState({});
  const [idcard, setIdCard] = useState({});
  const [birth, setBirth] = useState('');

  const {colors} = theme;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    // console.warn('A date has been picked: ', date);
    let newdate = moment(date).format('DD-MM-YYYY');
    setBirth(newdate);
    hideDatePicker();
  };
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

  const HandleSignup = () => {
    if (Object.keys(image)?.length === 0) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Please Select Profile Image',
        autoClose: 2000,
      });
    } else if (!username) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Please Enter UserName',
        autoClose: 2000,
      });
    } else if (!email) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Please Enter Email',
        autoClose: 2000,
      });
    } else if (!password) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Please Enter Password',
        autoClose: 2000,
      });
    } else if (!confirmpassword) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Please Enter Confirm Password',
        autoClose: 2000,
      });
    } else if (confirmpassword !== password) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Both passwords should be same',
        autoClose: 2000,
      });
    } else if (!gender) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Please Select Gender',
        autoClose: 2000,
      });
    } else {
      setShowIndicator(true);
      const formdata = new FormData();
      formdata.append('avatars', {
        name: image.path.split('/')[image.path.split('/').length - 1],
        type: image.mime,
        size: image.size,
        uri: image.path,
        lastModified: image.modificationDate,
        lastModifiedDate: new Date(),
      });

      const requestOptions = {
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
          // console.log(result)
          const data1 = JSON.parse(result);
          if (data1?.length > 0) {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            const raw = JSON.stringify({
              userName: username,
              image: data1[0]?.url,
              email: email,
              gender: gender,
              password: password,
              dateOfBirth: birth,
            });

            const requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow',
            };

            fetch(
              'http://50.18.33.245:4000/user/register',
              requestOptions,
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
                  navigation.navigate('Home');
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
                  type: ALERT_TYPE.SUCCESS,
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
            type: ALERT_TYPE.SUCCESS,
            title: 'Error',
            textBody: 'Network Error',
            autoClose: 2000,
          });
        });
    }
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
  return (
    <View
      
      style={{flex: 1}}>
      <ScrollView style={Styles.background_image_container} contentContainerStyle={{paddingBottom:30}}>
        {showIndicator === true ? <Loader /> : null}
        <View style={Styles.auth_heading_View}>
          <Text variant="titleLarge" style={Styles.heading}>
            Sign up with Email
          </Text>
        </View>

        <Pressable
          onPress={() => setexitVisible2(true)}
          style={{
            height: 100,
            width: 100,
            alignSelf: 'center',
            borderRadius: 10,
            marginTop: 20,
          }}>
          <Image
            source={
              Object.keys(image).length > 0
                ? {uri: image?.path}
                : require('../../assets/images/dummy.jpeg')
            }
            style={{height: '100%', width: '100%', borderRadius: 10}}
          />
          <View
            style={{
              height: 30,
              width: 30,
              right: -5,
              position: 'absolute',
              backgroundColor: colors.button_color,
              alignSelf: 'center',
              bottom: -5,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign name="edit" color={'white'} size={18} />
          </View>
        </Pressable>
        <View style={{margin: 20}}>
          <Text
            variant="titleLarge"
            style={{
              fontSize: 16,
              color: '#000000',
              // fontWeight: '500',
              padding: 10,
              paddingBottom: 0,
              marginTop: 0,
              fontFamily: 'Poppins-Medium',
            }}>
            Username
          </Text>

          <TextInput
            value={username}
            onChangeText={yourname => setusername(yourname)}
            placeholder="@jhon"
            style={[Styles.textFeild]}
            placeholderTextColor={colors.placeHolderTextColor}
          />

          <Text
            variant="titleLarge"
            style={{
              fontSize: 16,
              color: '#000000',
              // fontWeight: '500',
              padding: 10,
              paddingBottom: 0,
              marginTop: 0,
              fontFamily: 'Poppins-Medium',
            }}>
            Your email
          </Text>

          <TextInput
            value={email}
            onChangeText={email => setemail(email)}
            placeholder="Jhon@gmail.com"
            style={[Styles.textFeild]}
            placeholderTextColor={colors.placeHolderTextColor}
          />

          <Text
            variant="titleLarge"
            style={{
              fontSize: 16,
              color: '#000000',
              // fontWeight: '500',
              padding: 10,
              paddingBottom: 0,
              marginTop: 0,
              fontFamily: 'Poppins-Medium',
            }}>
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={password => setpassword(password)}
            placeholder="***********"
            style={[Styles.textFeild]}
            placeholderTextColor={colors.placeHolderTextColor}
            secureTextEntry={true}
          />

          <Text
            variant="titleLarge"
            style={{
              fontSize: 16,
              color: '#000000',
              // fontWeight: '500',
              padding: 10,
              paddingBottom: 0,
              marginTop: 0,
              fontFamily: 'Poppins-Medium',
            }}>
            Confirm Password
          </Text>
          <TextInput
            value={confirmpassword}
            onChangeText={confirmPassword =>
              setconfirmpassword(confirmPassword)
            }
            placeholder="***********"
            style={[Styles.textFeild]}
            placeholderTextColor={colors.placeHolderTextColor}
            secureTextEntry={true}
          />

          <Text
            variant="titleLarge"
            style={{
              fontSize: 16,
              color: '#000000',
              // fontWeight: '500',
              padding: 10,
              paddingBottom: 0,
              marginTop: 0,
              fontFamily: 'Poppins-Medium',
            }}>
            Gender
          </Text>

          <View
            style={{
              height: 50,
              width: '90%',
              // backgroundColor: "red",
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                height: 40,
                width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => setgender('male')}
                style={{
                  height: 25,
                  width: 25,
                  backgroundColor:
                    gender === 'male' ? colors.button_color : 'grey',
                  borderRadius: 30,
                }}></Pressable>
              <Text
                style={{
                  color: gender === 'male' ? colors.button_color : 'grey',
                  fontSize: 14,
                  // fontWeight: '500',
                  fontFamily: 'Poppins-Regular',
                  marginLeft: 10,
                }}>
                Male
              </Text>
            </View>
            <View
              style={{
                height: 40,
                width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => setgender('female')}
                style={{
                  height: 25,
                  width: 25,
                  backgroundColor:
                    gender === 'female' ? colors.button_color : 'grey',
                  borderRadius: 30,
                }}></Pressable>
              <Text
                style={{
                  color: gender === 'female' ? colors.button_color : 'grey',
                  fontSize: 14,
                  fontFamily: 'Poppins-Regular',
                  marginLeft: 10,
                }}>
                Female
              </Text>
            </View>
          </View>
          {gender === 'female' ? (
            <>
              <Text
                variant="titleLarge"
                style={{
                  fontSize: 16,
                  color: '#000000',
                  fontWeight: '500',
                  padding: 10,
                  paddingBottom: 0,
                  marginTop: 0,
                  fontFamily: 'Poppins-Medium',
                }}>
                Date of Birth
              </Text>
              <Pressable
                onPress={showDatePicker}
                style={{
                  height: 50,
                  borderRadius: 6,
                  justifyContent: 'center',
                  borderBottomWidth: 1,
                  borderColor: '#E2E4E7',

                  padding: 10,
                }}>
                <Text
                  style={{
                    color: '#000000',

                    fontSize: 16,
                    fontFamily: 'Poppins-Medium',
                  }}>
                 {birth ? birth :"22-08-1991"} 
                </Text>
              </Pressable>
              {/* <TextInput
                value={birth}
                onChangeText={(dateOfBirth) => setBirth(dateOfBirth)}
                placeholder=""
                style={[Styles.textFeild]}
                placeholderTextColor={colors.placeHolderTextColor}
              /> */}
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              <Text
                variant="titleLarge"
                style={{
                  fontSize: 16,
                  color: '#000000',
                  // fontWeight: '500',
                  padding: 10,
                  paddingBottom: 0,
                  marginTop: 10,
                  fontFamily: 'Poppins-Medium',
                }}>
                ID/Drivers License
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#B6B6B6',
                  borderWidth: 1,
                  borderStyle: 'dashed',
                  height: 40,
                  borderRadius: 10,
                  padding: 10,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    color: '#000E08',
                    fontWeight: '500',
                    fontSize: 12,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Please Upload
                </Text>
                <MaterialCommunityIcons
                  name={'camera-enhance-outline'}
                  size={20}
                  color={'#ffffff'}
                />
              </View>
            </>
          ) : null}
        </View>

        <TouchableOpacity
          style={[Styles.loginButton, {backgroundColor: colors.button_color}]}
          onPress={() => HandleSignup()}>
          <Text
            style={{
              color: '#ffffff',
              fontWeight: '600',
              fontSize: 18,
              fontFamily: 'Poppins-Medium',
            }}>
            Create an account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.register_now]}
          onPress={() => navigation.navigate('Login')}>
          <Text
            variant="titleMedium"
            style={{color: 'black',   fontFamily: 'Poppins-Medium',}}>
            Already have an account?{' '}<Text style={{color:theme.colors.button_color,  fontFamily: 'Poppins-SemiBold',}}>Login</Text> 
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
    </View>
  );
};

export default SignUp;
