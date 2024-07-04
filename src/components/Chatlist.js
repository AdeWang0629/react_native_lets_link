import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import userSocket from '../socket';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import Loader from './Loader';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();
import Icons from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
const ChatList = props => {
  const data = props?.data;
  // console.log('response from data ===', data);
  const userdata = useSelector(state => state.auth.userData);
  const [modalVisible, setModalVisible] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [marginBottom, setMarginBottom] = useState('0%');
  const [showIndicator, setShowIndicator] = useState(false);
  const [exitVisible1, setexitVisible1] = useState(false);
  const [checkingImage, setCheckingImage] = useState('');
  const [messages, setMessages] = useState([]);
  const [exitVisible2, setexitVisible2] = useState(false);
  const [image, setImage] = useState({});
  const [lockmedia, setLockMedia] = useState(false);
  const [lockcoins, setlockCoins] = useState('');
  const audioRecorderPlayer1 = useRef(new AudioRecorderPlayer()).current;
  const [recordingActive, setRecordingActive] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState(0);
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [voicepressed, setvoicepressed] = useState(false);
  const [pressmmike, setPressMike] = useState(false);
  const [voiceData, setVoiceData] = useState('');
  const [pressed, setPressed] = useState(false);
  const [currentPositionSec1, setCurrentPositionSec1] = useState(0);
  const [loadingAudio1, setLoadingAudio1] = useState(false);
  const [currentDurationSec1, setCurrentDurationSec1] = useState(0);
  const [paused1, setPaused1] = useState(false);
  const [playTime1, setPlayTime1] = useState(0);
  const [duration1, setDuration1] = useState(0);
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const grants = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);

          // console.log('write external stroage', grants);

          if (
            grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.READ_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.RECORD_AUDIO'] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            // console.log('Permissions granted');
          } else {
            // console.log('All required permissions not granted');
            return;
          }
        } catch (err) {
          // console.warn(err);
          return;
        }
      }
    };

    requestPermissions();
  }, []);

  const sendVoiceMessage = async uri => {
    if (uri) {
      setvoicepressed(true);
      const formdata = new FormData();
      formdata.append('avatars', {
        uri: uri,
        size: 200,
        type: 'audio/mp4',
        name: 'voice.mp4',
        lastModified: new Date(),
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
          setvoicepressed(false);
          setPaused(false);

          setVoiceData(data1[0]?.url);
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  };
  console.log('resocrd time ====>>', recordTime);
  const onStartRecord = async () => {
    setVoiceData('');
    setRecordingActive(true);

    await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordSecs(e.currentPosition);
      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setRecordingActive(false);

      return;
    });
  };

  const onStopRecord = async () => {
    setRecordingActive(false);
    setPressed(false);
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    // setCurrentPositionSec(0);
    // console.log('response from voice record ===>>', result);
    await sendVoiceMessage(result);
  };

  const onStartPlay = async () => {
    // setPaused(false);
    setLoadingAudio(true);
    setPaused(true);
    await audioRecorderPlayer1.startPlayer(
      `http://5.78.112.149:5000/images/${voiceData}`,
    );

    setLoadingAudio(false);
    audioRecorderPlayer1.addPlayBackListener(e => {
      if (e.currentPosition < 0) {
        return;
      }

      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer1.mmssss(Math.floor(e.currentPosition)));
      setDuration(audioRecorderPlayer1.mmssss(Math.floor(e.duration)));

      if (e.currentPosition === e.duration) {
        onStopPlay();
      }
      return;
    });
  };

  const onPausePlay = async () => {
    setPaused(true);
    await audioRecorderPlayer1.pausePlayer();
  };

  const onStopPlay = async () => {
    setPaused(false);
    setCurrentPositionSec(0);
    setPlayTime(0);
    audioRecorderPlayer1.stopPlayer();
    audioRecorderPlayer1.removePlayBackListener();
  };
  const sendMessage = () => {
    if (currentMessage) {
      const obj = {
        text: currentMessage,
        sender: userdata?._id,
        chatId: data?.chatId,
      };
      console.log('send message obj ====', obj);

      userSocket.emit('sendMessage', obj);
      setCurrentMessage('');
    }
    // userSocket.initializeSocket();
  };
  const sendVoice = () => {
    if (voiceData) {
      const obj = {
        voice: voiceData,
        sender: userdata?._id,
        chatId: data?.chatId,
      };
      console.log('send message obj ====', obj);

      userSocket.emit('sendMessage', obj);
      setVoiceData('');
      setPressMike(false);
    }
    // userSocket.initializeSocket();
  };
  const sendImage = () => {
    setexitVisible2(false);
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
          const obj = {
            text: currentMessage,
            sender: userdata?._id,
            lockmedia: lockmedia,
            mediacoins: lockcoins,
            media: data1[0]?.url,
            chatId: data?.chatId,
          };
          console.log('send message obj ====', obj);
          setShowIndicator(false);
          userSocket.emit('sendMessage', obj);
          setCurrentMessage('');
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
  };
  useEffect(() => {
    userSocket.initializeSocket();
  }, []);
  const isMountedRef = React.useRef(false);
  useEffect(() => {
    userSocket.initializeSocket();
    if (!isMountedRef.current) {
      const handleReceiveAcceptedOrder = data => {
        console.log('response from orders ===', data);
        if (data?.status === 'success') {
          setMessages(prev => [data?.data, ...prev]);
        }
      };
      userSocket.on('receiveMessage', handleReceiveAcceptedOrder);
      isMountedRef.current = true;

      return () => {
        userSocket.off('receiveMessage', handleReceiveAcceptedOrder);
      };
    }
  }, [userSocket]);

  useFocusEffect(
    React.useCallback(() => {
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
        'http://50.18.33.245:4000/user/getUserMessages',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          // console.log(result);
          const data = JSON.parse(result);
          if (data?.status === 'success') {
            if (data?.data?.length > 0) {
              setMessages(data?.data?.reverse());
            }
          }
        })
        .catch(error => console.error(error));
    }, []),
  );
  const onClickImagePicker = () => {
    setModalOpen(false);
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setexitVisible2(true);
      setImage(image);
    });
  };
  const takePhotoFromCamera = () => {
    setModalOpen(false);
    ImagePicker.openCamera({
      compressImageMaxWidth: 450,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 1.0,
    }).then(image => {
      setexitVisible2(true);
      setImage(image);
    });
  };
  const onStartPlay1 = async val => {
    // console.log('val data ===>>', val);
    setPaused1(true);
    setLoadingAudio1(true);
    await audioRecorderPlayer1.startPlayer(val);

    setLoadingAudio1(false);
    audioRecorderPlayer1.addPlayBackListener(e => {
      if (e.currentPosition < 0) {
        return;
      }

      setCurrentPositionSec1(e.currentPosition);
      setCurrentDurationSec1(e.duration);
      setPlayTime1(audioRecorderPlayer1.mmssss(Math.floor(e.currentPosition)));
      setDuration1(audioRecorderPlayer1.mmssss(Math.floor(e.duration)));

      if (e.currentPosition === e.duration) {
        onStopPlay1();
      }
      return;
    });
  };

  const onPausePlay1 = async () => {
    setPaused1(false);
    await audioRecorderPlayer1.pausePlayer();
  };

  const onStopPlay1 = async () => {
    setPaused1(false);
    setCurrentPositionSec1(0);
    setPlayTime1(0);
    audioRecorderPlayer1.stopPlayer();
    audioRecorderPlayer1.removePlayBackListener();
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1, backgroundColor: '#ffffff'}}>
      {showIndicator === true ? <Loader /> : null}
      <FlatList
        data={messages}
        inverted
        showsVerticalScrollIndicator={false}
        renderItem={item => {
          return (
            <View
              style={{
                alignSelf:
                  item?.item?.sender == userdata?._id
                    ? 'flex-end'
                    : 'flex-start',
                paddingLeft: 10,
              }}>
              <View
                style={[
                  styles.card_container,
                  {
                    borderRadius: item?.item.media ? 20 : 8,
                    backgroundColor:
                      item?.item?.sender == userdata?._id
                        ? '#AB4BFF'
                        : '#F2F7FB',

                    alignSelf:
                      item?.item?.sender == userdata?._id
                        ? 'flex-start'
                        : 'flex-end',
                    padding: 2,
                    marginLeft: item?.item?.user == userdata?._id ? '24%' : 0,
                    // marginTop: item.item.user == data.user ? -20 : 20,
                  },
                ]}>
                {item?.item.media && (
                  <View style={{height: 200, width: 200, borderRadius: 20}}>
                    {item?.item?.lockmedia === true ? (
                      <View
                        style={{
                          height: '100%',
                          width: '100%',
                          backgroundColor: 'rgba(0, 0, 0, 0.2)',
                          borderRadius: 20,
                        }}>
                        <Image
                          source={{uri: item?.item?.media}}
                          blurRadius={5}
                          style={{
                            height: 200,
                            width: 200,
                            borderRadius: 20,
                            position: 'absolute',
                          }}
                        />
                        <View
                          style={{
                            height: 100,
                            width: '90%',
                            alignSelf: 'center',
                            marginTop: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Image
                            source={require('../assets/icons/padlock.png')}
                            style={{height: 30, width: 30}}
                          />
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 12,
                              fontFamily: 'Poppins-Medium',
                              marginTop: 5,
                            }}>
                            {item?.item?.mediacoins} coins for unlock image
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={{
                          height: 200,
                          width: 200,
                        }}
                        onPress={() => {
                          setexitVisible1(true);
                          setCheckingImage(item?.item?.media);
                        }}>
                        <Image
                          source={{uri: item?.item?.media}}
                          style={{
                            height: 200,
                            width: 200,
                            borderRadius: 20,
                            position: 'absolute',
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                {item?.item.text ? (
                  <View>
                    <Text
                      style={{
                        color:
                          item?.item?.sender == userdata?._id
                            ? '#ffffff'
                            : 'black',
                        fontSize: 12,
                        // fontWeight: '400',
                        fontFamily: 'Poppins-Medium',
                        marginHorizontal: 6,
                        marginTop: 5,
                      }}>
                      {item?.item?.text}
                    </Text>
                  </View>
                ) : null}
                {item?.item?.voice ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 5,
                      width: 180,
                      paddingTop: 10,
                    }}>
                    {paused === false ? (
                      <Entypo
                        name="controller-play"
                        onPress={() => onStartPlay1(item?.item?.voice)}
                        size={20}
                        color={
                          item?.item?.sender == userdata?._id
                            ? 'white'
                            : 'black'
                        }
                      />
                    ) : (
                      <AntDesign
                        name="pause"
                        onPress={onPausePlay1}
                        size={20}
                        color={
                          item?.item?.sender == userdata?._id
                            ? 'white'
                            : 'black'
                        }
                      />
                    )}
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: '#e2e2e2',
                        marginRight: 10,
                      }}>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor:
                            item?.item?.sender == userdata?._id
                              ? 'white'
                              : 'black',
                          width: `${
                            (currentPositionSec / currentDurationSec) * 100
                          }%`,
                        }}
                      />
                    </View>
                  </View>
                ) : null}
                <Text
                  style={{
                    alignSelf: 'flex-end',
                    fontSize: 8,
                    marginTop: 2,
                    fontFamily: 'Poppins-Medium',
                    marginHorizontal: 6,
                    color:
                      item?.item?.sender == userdata?._id
                        ? '#ffffff'
                        : '#000000',
                  }}>
                  {moment(item?.item?.createdAt).fromNow()}
                </Text>
              </View>
            </View>
          );
        }}
      />
      {pressmmike ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
            // backgroundColor:"red",
            width: '90%',
            alignSelf: 'center',

            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <View
            style={{
              height: 50,
              width: '85%',
              backgroundColor: '#F3F6F6',
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {voiceData ? (
              <View style={{padding: 5, width: 250}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {paused === false ? (
                    <Entypo
                      name="controller-play"
                      onPress={onStartPlay}
                      size={20}
                    />
                  ) : (
                    <AntDesign name="pause" onPress={onPausePlay} size={20} />
                  )}
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#e2e2e2',
                      marginRight: 10,
                    }}>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: 'black',
                        width: `${
                          (currentPositionSec / currentDurationSec) * 100
                        }%`,
                      }}
                    />
                  </View>
                  <Feather
                    name="trash-2"
                    color={'black'}
                    size={22}
                    onPress={() => {
                      setVoiceData('');
                      setRecordTime(0);
                    }}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 14,
                    marginLeft: 20,
                  }}>
                  Recording Voice
                </Text>

                <Text
                  style={{
                    color: 'black',
                    fontSize: 14,
                    marginLeft: 20,
                  }}>
                  {recordTime}
                </Text>
              </View>
            )}
          </View>
          {voiceData ? (
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 50,
                backgroundColor: '#AB4BFF',
              }}
              onPress={() => {
                sendVoice();
              }}>
              <MaterialCommunityIcons
                name={'send'}
                size={20}
                color={'#ffffff'}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPressIn={() => setPressed(true)}
              onLongPress={() => onStartRecord()}
              onPressOut={() => onStopRecord()}
              style={{
                height: 50,
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#AB4BFF',
                marginLeft: 10,
              }}>
              <Icons name="microphone" size={22} color={'white'} />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View
          style={[
            styles.input_container,
            {marginBottom: 10, justifyContent: 'space-between'},
          ]}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                setModalOpen(true);
              }}
              style={{transform: [{rotate: '135deg'}], marginLeft: -6}}>
              <MaterialCommunityIcons
                name={'attachment'}
                size={28}
                color={'#000000'}
              />
            </TouchableOpacity>
            {userdata?.gender === 'female' && (
              <TouchableOpacity
                style={{marginLeft: 6}}
                onPress={() => {
                  setShareModal(!shareModal);
                }}>
                <MaterialCommunityIcons
                  name={'lock-outline'}
                  size={28}
                  color={'#000000'}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.input_view}>
            <TextInput
              placeholder="Type Message ..."
              placeholderTextColor={'#797C7B'}
              value={currentMessage}
              onFocus={() => {
                setMarginBottom(Platform.OS === 'ios' ? '42%' : '0%');
              }}
              onBlur={() => {
                setMarginBottom('0%');
              }}
              onChangeText={message => {
                setCurrentMessage(message);
              }}
              style={{
                height: 40,
                width: '80%',
                color: '#000000',
                flexGrow: 10,
              }}
            />
          </View>

          {!currentMessage ? (
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 50,
                // backgroundColor: '#AB4BFF',
              }}
              onPress={() => {
                setPressMike(true);
              }}>
              <Image
                source={require('../assets/icons/microphone.png')}
                style={{height: 30, width: 25}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 50,
                backgroundColor: '#AB4BFF',
              }}
              onPress={() => {
                sendMessage(null, null);
              }}>
              <MaterialCommunityIcons
                name={'send'}
                size={20}
                color={'#ffffff'}
              />
            </TouchableOpacity>
          )}
        </View>
      )}

      <Modal
        transparent={true}
        visible={exitVisible2}
        onRequestClose={() => {}}>
        <View style={styles.centeredView}>
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              width: '100%',
              height: 420,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
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
                  styles.button,
                  ,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 20,
                  },
                ]}
                onPress={() => setexitVisible2(false)}>
                <Image
                  style={{height: 25, width: 25}}
                  source={require('../assets/icons/remove.png')}
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
                Share Content
              </Text>
              <Pressable
                style={[
                  styles.button,
                  ,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}></Pressable>
            </View>
            <Image
              style={{
                height: 300,
                width: '90%',
                borderRadius: 10,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
              source={{uri: image?.path}}
            />
            <View
              style={[
                styles.input_container,
                {marginBottom: marginBottom, justifyContent: 'space-between'},
              ]}>
              <View
                style={{
                  padding: 5,
                  width: '85%',
                  height: 40,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#F3F6F6',
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#F3F6F6',
                  justifyContent: 'space-around',
                }}>
                <TextInput
                  placeholder="Type Message ..."
                  placeholderTextColor={'#797C7B'}
                  value={currentMessage}
                  onFocus={() => {
                    setMarginBottom(Platform.OS === 'ios' ? '42%' : '0%');
                  }}
                  onBlur={() => {
                    setMarginBottom('0%');
                  }}
                  onChangeText={message => {
                    setCurrentMessage(message);
                  }}
                  style={{
                    height: 40,
                    width: '80%',
                    color: '#000000',
                    flexGrow: 10,
                  }}
                />
              </View>

              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 50,
                  backgroundColor: '#AB4BFF',
                }}
                onPress={() => {
                  sendImage();
                }}>
                <MaterialCommunityIcons
                  name={'send'}
                  size={20}
                  color={'#ffffff'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={modalOpen} onRequestClose={() => {}}>
        <View style={styles.centeredView}>
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              width: '100%',
              height: 200,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
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
                  styles.button,
                  ,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 20,
                  },
                ]}
                onPress={() => setModalOpen(false)}>
                <Image
                  style={{height: 25, width: 25}}
                  source={require('../assets/icons/remove.png')}
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
                Share Content
              </Text>
              <Pressable
                style={[
                  styles.button,
                  ,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}></Pressable>
            </View>
            <Pressable
              onPress={() => takePhotoFromCamera()}
              style={{
                width: '100%',
                alignSelf: 'center',
                height: 50,

                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: '5%',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 30,
                  backgroundColor: 'rgba(242, 248, 247, 1)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/icons/camera.png')}
                  style={{height: 20, width: 20}}
                />
              </View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  marginLeft: 10,
                  fontFamily: 'Poppins-SemiBold',
                  width: '70%',
                }}>
                Take Photo
              </Text>
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 30,

                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </Pressable>
            <Pressable
              onPress={() => onClickImagePicker()}
              style={{
                width: '100%',
                alignSelf: 'center',
                height: 50,

                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: '5%',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 30,
                  backgroundColor: 'rgba(242, 248, 247, 1)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/icons/gallery.png')}
                  style={{height: 20, width: 20}}
                />
              </View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  marginLeft: 10,
                  fontFamily: 'Poppins-SemiBold',
                  width: '70%',
                }}>
                Photo Gallery
              </Text>
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 30,

                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        // animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
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
                  styles.button,
                  ,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 20,
                  },
                ]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  style={{height: 25, width: 25}}
                  source={require('../assets/icons/remove.png')}
                />
              </Pressable>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#000000',

                  fontFamily: 'Poppins-SemiBold',
                }}>
                Share Content
              </Text>
              <Pressable
                style={[
                  styles.button,
                  ,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 20,
                  },
                ]}
                onPress={() => setModalVisible(!modalVisible)}></Pressable>
            </View>
            <View style={{marginLeft: 15}}>
              <TouchableOpacity
                onPress={() => {
                  setlockCoins('90');
                  setModalVisible(false);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  padding: 20,
                }}>
                <View
                  style={{
                    backgroundColor: '#F2F8F7',
                    borderRadius: 50,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/icons/dollar.png')}
                    style={{height: 22, aspectRatio: 4 / 4}}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 14,

                    color: '#000000',
                    marginLeft: 20,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Lock for 90 coins
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setlockCoins('110');
                  setModalVisible(false);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  padding: 20,
                }}>
                <View
                  style={{
                    backgroundColor: '#F2F8F7',
                    borderRadius: 50,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/icons/dollar.png')}
                    style={{height: 22, aspectRatio: 4 / 4}}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 14,

                    color: '#000000',
                    marginLeft: 20,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Lock for 110 coins
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setlockCoins('130');
                  setModalVisible(false);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  padding: 20,
                }}>
                <View
                  style={{
                    backgroundColor: '#F2F8F7',
                    borderRadius: 50,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/icons/dollar.png')}
                    style={{height: 22, aspectRatio: 4 / 4}}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 14,

                    color: '#000000',
                    marginLeft: 20,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Lock for 130 coins
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        // animationType="slide"
        transparent={true}
        visible={shareModal}
        onRequestClose={() => {
          setShareModal(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {height: 220}]}>
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
                  styles.button,
                  styles.buttonClose,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 20,
                  },
                ]}
                onPress={() => setShareModal(!shareModal)}>
                <Image
                  style={{height: 25, width: 25}}
                  source={require('../assets/icons/remove.png')}
                />
              </Pressable>
              <Text
                style={{
                  fontSize: 16,
                  // fontWeight: '600',
                  color: '#000000',

                  fontFamily: 'Poppins-SemiBold',
                }}>
                Share Content
              </Text>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 20,
                  },
                ]}></Pressable>
            </View>
            <View style={{marginLeft: 15}}>
              <TouchableOpacity
                onPress={() => {
                  setShareModal(false);
                  setLockMedia(true);
                  setTimeout(() => {
                    setModalVisible(true);
                  }, 100);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  padding: 20,
                }}>
                <View
                  style={{
                    backgroundColor: '#F2F8F7',
                    borderRadius: 50,
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name={'camera-enhance-outline'}
                    size={25}
                    color={'#797C7B'}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 14,

                    color: '#000000',
                    marginLeft: 20,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Locked Photos
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setShareModal(false);
                  setLockMedia(true);
                  setTimeout(() => {
                    setModalVisible(true);
                  }, 100);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  padding: 20,
                }}>
                <View
                  style={{
                    backgroundColor: '#F2F8F7',
                    borderRadius: 50,
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name={'play-circle-outline'}
                    size={25}
                    color={'#797C7B'}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 14,

                    color: '#000000',
                    marginLeft: 20,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Locked Videos
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
            height: '100%',
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
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  card_container: {
    maxWidth: 220,
    borderRadius: 8,
    margin: 10,
  },
  user_name: {},
  header: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    // justifyContent:'space-between',
    alignItems: 'center',
  },
  header_heading: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginLeft: 30,
    fontFamily: 'Poppins',
  },
  input_container: {
    margin: 10,
    marginBottom: 10,
    height: 50,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  input_view: {
    padding: 5,
    width: '75%',
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F3F6F6',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F3F6F6',
    justifyContent: 'space-around',
  },
  button_send: {
    height: 40,
    width: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_card_view: {
    flex: 1,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(45, 45, 45, 0.4)',
  },
  modalView: {
    backgroundColor: 'white',
    // borderRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
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
    // borderRadius: 20,
    padding: 10,
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

{
  /* <Pressable
              style={{position: 'absolute', top: -10, right: -5}}
              onPress={() => {
                setexitVisible1(false);
                setCheckingImage('');
              }}>
              <Entypo name="circle-with-cross" color={'red'} size={28} />
            </Pressable> */
}
