/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {Text, ActivityIndicator} from 'react-native-paper';
import {Styles} from '../../assets/styling/style';
import {connect} from 'react-redux';
import Loader from '../../components/Loader';
import {types} from '../../store/actiontypes';
import {useDispatch} from 'react-redux';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
const {height, width} = Dimensions.get('window');
function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const [showIndicator, setShowIndicator] = useState(false);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const logIn = () => {
    if (!email) {
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
    } else {
      setShowIndicator(true);
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        email: email,
        password: password,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(
        'http://50.18.33.245:4000/user/login',
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
  };

  return (
    <View style={{flex: 1, height: (height / 100) * 100}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, height: '100%', paddingTop: 60}}>
        {showIndicator === true ? <Loader /> : null}
        <View style={Styles.auth_heading_View}>
          <Text
            variant="titleLarge"
            style={[Styles.heading, {fontSize: 24, color: '#000000'}]}>
            Log in to Let’s Link
          </Text>
        </View>
        <View style={{alignSelf: 'center', width: '90%', marginTop: 20}}>
          <Text variant="bodyMedium" style={Styles.parah}>
            Welcome back! Sign in using your social account or email to continue
            us
          </Text>
        </View>

        <View style={{margin: 20}}>
          <Text
            variant="titleLarge"
            style={{
              fontSize: 16,
              color: '#000000',
              // fontWeight: "500",
              padding: 10,
              paddingBottom: 0,
              fontFamily: 'Poppins-Medium',
            }}>
            Your Email
          </Text>
          <TextInput
            value={email}
            onChangeText={email => setemail(email)}
            placeholder="Jhon@gmail.com"
            placeholderTextColor="#797C7B"
            style={[Styles.textFeild, {color: '#252525'}]}
          />
          <Text
            variant="titleLarge"
            style={{
              fontSize: 16,
              color: '#000000',
              // fontWeight: "500",
              padding: 10,
              paddingBottom: 0,
              marginTop: 20,
              fontFamily: 'Poppins-Medium',
            }}>
            Password
          </Text>
          <TextInput
            value={password}
            placeholderTextColor="#797C7B"
            onChangeText={password => setpassword(password)}
            placeholder="***********"
            style={[Styles.textFeild, {color: '#252525'}]}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={[
            Styles.loginButton,
            {backgroundColor: '#6515AC', marginTop: (height / 100) * 22},
          ]}
          onPress={() => logIn()}>
          <Text
            style={{
              color: '#ffffff',
              // fontWeight: "600",
              fontSize: 18,
              fontFamily: 'Poppins-Medium',
            }}>
            Log in
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[Styles.register_now, {marginTop: 10}]}
          onPress={() => navigation.navigate('SignUp')}>
          <Text
            variant="titleMedium"
            style={{color: '#252525', fontFamily: 'Poppins-Medium'}}>
            New User?
            <Text style={{color: '#6515AC', fontFamily: 'Poppins-SemiBold'}}>
              {' '}
              Register
            </Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    login: product =>
      dispatch(
        {type: 'login', payload: product},
        console.log('===============action====================='),
      ),
  };
};
const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
