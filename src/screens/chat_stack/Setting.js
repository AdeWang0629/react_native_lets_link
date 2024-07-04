import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Switch,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {types} from '../../store/actiontypes';
import Loader from '../../components/Loader';
const SettingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const userdata = useSelector(state => state.auth.userData);
  const uservideo = useSelector(state => state.auth.video);
  console.log('user video ===>>>', uservideo);
  const [modalVisible, setModalVisible] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  console.log('user data ===>>>', userdata);
  const [token, setToken] = useState(0);
  const [isEnabled, setIsEnabled] = useState(uservideo);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    dispatch({
      type: types.USER_VIDEO.success,
      payload: !isEnabled,
    });
  };
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  const LogoutFn = () => {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'User Logout Successfully!',
      autoClose: 2000,
    });
    dispatch({
      type: types.USERDATA.success,
      payload: {},
    });
    navigation.replace('Splash');
  };

  const deleteAccount = () => {
    setModalVisible(false);
    setShowIndicator(true);
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch(
      `http://50.18.33.245:4000/user/delete/${userdata?._id}`,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        // console.log(result)
        const data = JSON.parse(result);
        setShowIndicator(false);
        if (data?.status === 'success') {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: data?.message,
            autoClose: 2000,
          });
          dispatch({
            type: types.USERDATA.success,
            payload: {},
          });
          navigation.replace('Splash');
        }
      })
      .catch(error => console.error(error));
  };
  return (
    <View style={{flex: 1, backgroundColor: '#000000'}}>
      {showIndicator === true ? <Loader /> : null}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name={'arrowleft'} size={20} color={'white'} />
        </TouchableOpacity>

        <Text style={styles.heading}>Settings </Text>
        <Pressable
          onPress={() => navigation.navigate('Package')}
          style={{flexDirection: 'row'}}>
          <Image
            source={require('../../assets/icons/coin.png')}
            style={styles.logo}
          />
          <View>
            <Text style={[styles.heading, {fontSize: 14}]}>{token}</Text>
            <Text style={[styles.heading, {fontSize: 14}]}>Coins</Text>
          </View>
        </Pressable>
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
        <ScrollView
          contentContainerStyle={{paddingBottom: 30}}
          showsVerticalScrollIndicator={false}>
          <Pressable
            onPress={() => navigation.navigate('ContactUs')}
            style={{
              width: '100%',
              alignSelf: 'center',
              height: 70,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(245, 246, 246, 1)',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '5%',
            }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 30,
                backgroundColor: 'rgba(242, 248, 247, 1)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/images/Keys.png')}
                style={{height: 30, width: 30}}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                marginLeft: 10,
                fontFamily: 'Poppins-Medium',
              }}>
              Contact Support
            </Text>
          </Pressable>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              height: 70,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(245, 246, 246, 1)',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '5%',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 30,
                backgroundColor: 'rgba(242, 248, 247, 1)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/images/video.png')}
                style={{height: 30, width: 30}}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                marginLeft: 10,
                fontFamily: 'Poppins-Medium',
                width: '70%',
              }}>
              Video Chat
            </Text>
            <Switch
              trackColor={{false: '#3e3e3e', true: 'rgba(101, 21, 172, 0.4)'}}
              thumbColor={isEnabled ? 'rgba(101, 21, 172, 1)' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <Pressable
            onPress={() => navigation.navigate('payout')}
            style={{
              width: '100%',
              alignSelf: 'center',
              height: 70,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(245, 246, 246, 1)',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '5%',
              marginTop: 10,
            }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 30,
                backgroundColor: 'rgba(242, 248, 247, 1)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/images/payout.png')}
                style={{height: 30, width: 30}}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                marginLeft: 10,
                fontFamily: 'Poppins-Medium',
              }}>
              Your Payouts
            </Text>
          </Pressable>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              height: 70,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(245, 246, 246, 1)',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '5%',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 30,
                backgroundColor: 'rgba(242, 248, 247, 1)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/images/notification.png')}
                style={{height: 30, width: 30}}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                marginLeft: 10,
                fontFamily: 'Poppins-Medium',
                width: '70%',
              }}>
              Notification Settings
            </Text>
            <Switch
              trackColor={{false: '#3e3e3e', true: 'rgba(101, 21, 172, 0.4)'}}
              thumbColor={isEnabled1 ? 'rgba(101, 21, 172, 1)' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch1}
              value={isEnabled1}
            />
          </View>
          <Pressable
            onPress={() => navigation.navigate('Terms')}
            style={{
              width: '100%',
              alignSelf: 'center',
              height: 70,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(245, 246, 246, 1)',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '5%',
              marginTop: 10,
            }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 30,
                backgroundColor: 'rgba(242, 248, 247, 1)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/images/term.png')}
                style={{height: 30, width: 30}}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                marginLeft: 10,
                fontFamily: 'Poppins-Medium',
              }}>
              Terms of Service
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Privacy')}
            style={{
              width: '100%',
              alignSelf: 'center',
              height: 70,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(245, 246, 246, 1)',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '5%',
              marginTop: 10,
            }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 30,
                backgroundColor: 'rgba(242, 248, 247, 1)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/images/privacy.png')}
                style={{height: 30, width: 30}}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                marginLeft: 10,
                fontFamily: 'Poppins-Medium',
              }}>
              Privacy Policy
            </Text>
          </Pressable>
          <Pressable
            onPress={() => LogoutFn()}
            style={{
              width: '100%',
              alignSelf: 'center',
              height: 70,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(245, 246, 246, 1)',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '5%',
              marginTop: 10,
            }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 30,
                backgroundColor: 'rgba(242, 248, 247, 1)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/images/logout.png')}
                style={{height: 25, width: 25}}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                marginLeft: 10,
                fontFamily: 'Poppins-Medium',
              }}>
              Logout
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={{
              width: '100%',
              alignSelf: 'center',
              height: 70,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(245, 246, 246, 1)',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '5%',
              marginTop: 10,
            }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 30,
                backgroundColor: 'rgba(242, 248, 247, 1)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/images/delete.png')}
                style={{height: 25, width: 25}}
              />
            </View>
            <Text
              style={{
                color: 'rgba(255, 48, 48, 1)',
                fontSize: 18,
                marginLeft: 10,
                fontFamily: 'Poppins-Medium',
              }}>
              Delete Account
            </Text>
          </Pressable>
        </ScrollView>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 14, 8, 0.8)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              width: '100%',
              height: 300,
              // alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 10,
              }}>
              <Pressable
                style={[
                  ,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 20,
                    padding: 10,
                  },
                ]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  style={{height: 25, width: 25}}
                  source={require('../../assets/icons/remove.png')}
                />
              </Pressable>

              <Pressable
                style={[
                  ,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                  },
                ]}></Pressable>
            </View>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                color: '#000000',

                fontFamily: 'Poppins-SemiBold',
              }}>
              Delete Account
            </Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                color: '#000000',
                width: '85%',
                alignSelf: 'center',
                fontFamily: 'Poppins-Regular',
                marginTop: 10,
              }}>
              Deleting your account will remove all of your information form our
              data base. This cannot be undone.
            </Text>
            <TouchableOpacity
            onPress={()=> deleteAccount()}
              style={{
                height: 50,
                backgroundColor: 'rgba(172, 21, 21, 1)',
                alignItems: 'center',
                justifyContent: 'center',
                width: '85%',
                borderRadius: 20,
                alignSelf: 'center',

                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  alignSelf: 'center',
                  color: '#ffffff',
                  fontFamily: 'Poppins-Bold',
                }}>
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  logo: {
    width: 20,
    height: 35,
    marginRight: 10,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    padding: 10,
    marginTop: 10,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '33.3%',
    borderRadius: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 30,
    // backgroundColor: "red",
  },

  image: {
    width: 100,
    borderRadius: 100,
    height: 100,
    backgroundColor: 'grey',
  },
});
