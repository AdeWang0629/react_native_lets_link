import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
const Splash = ({navigation}) => {
  const userdata = useSelector(state => state.auth.userData);
  console.log('response from user data ====', userdata);
  const isLoggedIn = true;
  useEffect(() => {
    if (userdata?._id) {
      setTimeout(() => {
        navigation.replace('Home');
      }, 3000);
    } else {
      setTimeout(() => {
        navigation.replace('Login');
      }, 3000);
    }
  }, []);
  // if (isLoggedIn === false) {
  //   setTimeout(() => {
  //     navigation.navigate('SignUp');
  //   }, 3000);
  // } else {
  //   setTimeout(() => {
  //     navigation.navigate('SignUp');
  //   }, 3000);
  // }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets//images/splash.png')}
        style={styles.logo}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '110%',
  },
  logo: {
    width: '50%',
    height: 200,
    aspectRatio: 1,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'OleoScript-Regular',
    fontSize: 48,
    fontWeight: 400,
    textAlign: 'center',
    color: 'white',
    marginTop: 20,
  },
});
