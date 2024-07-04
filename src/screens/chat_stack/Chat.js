import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ChatList from '../../components/Chatlist';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const Chat = ({navigation, route}) => {
  const [mennumodal, setMenuModal] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const userdata = useSelector(state => state.auth.userData);
  console.log('response from user dta ====', userdata);
  const uservideo = useSelector(state => state.auth.video);
  // console.log('user video ===>>>', uservideo);
  const data = route?.params?.data;

  useFocusEffect(
    React.useCallback(() => {
      // Initialize Zego Cloud video call service

      const Request = async () => {
        ZegoUIKitPrebuiltCallService.init(
          1041886742,
          'd5a3c8d4ffa9b0e7ce99d3951321bce4a02c1a66a9e88f3ad128429abe2bf71d',
          `chaty${userdata?._id}`,
          userdata?.userName,
          // 'abvcer' + userID,
          [ZIM, ZPNs],
          {
            // innerText:{},
            ringtoneConfig: {
              incomingCallFileName: require('./IPhonetune.mp3'),
              outgoingCallFileName: require('./Outgoingtune.mp3'),
            },
            notifyWhenAppRunningInBackgroundOrQuit: true,
            isIOSSandboxEnvironment: true,
            androidNotificationConfig: {
              channelID: 'ZegoUIKit',
              channelName: 'ZegoUIKit',
            },
          },
        );
      };
      Request();
    }, []),
  );

  const BlockFn = () => {
    setMenuModal(false);
    setShowIndicator(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      chatId: data?.chatId,
      userId: userdata?._id,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'http://50.18.33.245:4000/user/block',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        console.log(result);
        const data = JSON.parse(result);
        setShowIndicator(false);
        if (data?.status === 'success') {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: data?.message,
            autoClose: 2000,
          });
          navigation.goBack();
        } else {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: data?.message,
            autoClose: 2000,
          });
        }
      })
      .catch(error => console.error(error));
  };
  const DeleteChat = () => {
    setMenuModal(false);
    setShowIndicator(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      chatId: data?.chatId,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'http://50.18.33.245:4000/user/delete',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        console.log(result);
        const data = JSON.parse(result);
        setShowIndicator(false);
        if (data?.status === 'success') {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: data?.message,
            autoClose: 2000,
          });
          navigation.goBack();
        } else {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: data?.message,
            autoClose: 2000,
          });
        }
      })
      .catch(error => console.error(error));
  };
  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      {showIndicator === true ? <Loader /> : null}
      <View style={{height: 80}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{width: 40, marginLeft: 0}}
            onPress={() => {
              navigation.goBack();
            }}>
            <MaterialIcons name={'arrow-back'} size={28} color={'#000000'} />
          </TouchableOpacity>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                marginRight: 10,
              }}
              source={{
                uri: data?.other?.image,
              }}
            />
            <View>
              <Text style={styles.header_heading}>{data?.other?.userName}</Text>
              <Text
                style={{
                  color: '#0000000',
                  fontSize: 12,
                  fontFamily: 'Poppins',
                }}>
                Active now
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 40,
             
              right: 5,
              position: 'absolute',
            }}>
            <ZegoSendCallInvitationButton
              invitees={[`chaty${data?.other._id}`].map(inviteeID => ({
                userID: inviteeID,
                userName: data?.other.userName,
              }))}
              isVideoCall={false}
              resourceID={'zegouikit_call'}
              style={{
                height: 45,
                width: 45,
                backgroundColor: 'white',
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}></ZegoSendCallInvitationButton>
            {uservideo === true ? (
              <ZegoSendCallInvitationButton
                invitees={[`chaty${data?.other?._id}`].map(inviteeID => ({
                  userID: inviteeID,
                  userName: data?.other?.userName,
                }))}
                isVideoCall={true}
                resourceID={'zegouikit_call'}
              />
            ) : null}

            <TouchableOpacity
              onPress={() => {
                setMenuModal(!mennumodal);
              }}>
              <Image
                source={require('../../assets/icons/darkMenu.png')}
                style={{
                  width: 5,
                  height: 22,
                  tintColor: '#000000',
                  marginLeft: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        <ChatList data={data} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={mennumodal}
        onRequestClose={() => {
          setMenuModal(!mennumodal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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
                onPress={() => setMenuModal(!mennumodal)}>
                <Image
                  style={{height: 25, width: 25}}
                  source={require('../../assets/icons/remove.png')}
                />
              </Pressable>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#000000',
                  marginRight: 40,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                More
              </Text>
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
            <View style={{marginLeft: 15}}>
              <TouchableOpacity
                onPress={() => {
                  setMenuModal(false);
                  Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: 'You have mute this user',
                    autoClose: 2000,
                  });
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  marginTop: 20,
                  paddingHorizontal: 10,
                }}>
                <View
                  style={{
                    backgroundColor: '#F2F8F7',
                    borderRadius: 50,
                    alignItems: 'center',
                    height: 35,
                    width: 35,
                    justifyContent: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name={'volume-mute'}
                    size={25}
                    color={'#797C7B'}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#000000',
                    marginLeft: 20,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Mute User
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setMenuModal(false);
                  Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: 'You have report this image',
                    autoClose: 2000,
                  });
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  marginTop: 20,
                  paddingHorizontal: 10,
                }}>
                <View
                  style={{
                    backgroundColor: '#F2F8F7',
                    borderRadius: 50,
                    alignItems: 'center',
                    height: 35,
                    width: 35,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../assets/icons/userBlock.png')}
                    style={{height: 20}}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000000',
                    marginLeft: 20,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Report Picture
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => BlockFn()}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  marginTop: 20,
                  paddingHorizontal: 10,
                }}>
                <View
                  style={{
                    backgroundColor: '#F2F8F7',
                    borderRadius: 50,
                    alignItems: 'center',
                    height: 35,
                    width: 35,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../assets/icons/block.png')}
                    style={{height: 20}}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 16,

                    color: '#000000',
                    marginLeft: 20,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Block User
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => DeleteChat()}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  marginTop: 20,
                  paddingHorizontal: 10,
                }}>
                <View
                  style={{
                    backgroundColor: '#F2F8F7',
                    borderRadius: 50,
                    alignItems: 'center',
                    height: 35,
                    width: 35,
                    justifyContent: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name={'delete-outline'}
                    size={25}
                    color={'#797C7B'}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000000',
                    marginLeft: 20,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Delete Chat
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  header: {
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  header_heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginLeft: 0,
    fontFamily: 'Poppins',
  },
  input_container: {
    margin: 10,
    marginBottom: 0,
    height: 50,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  input_view: {
    width: '85%',
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button_send: {
    height: 40,
    width: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#ffffff',
    // borderRadius: 50,
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#ffffff',
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
