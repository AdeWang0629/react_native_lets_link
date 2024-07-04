import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Lightbox from 'react-native-lightbox-v2';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import Entypo from 'react-native-vector-icons/Entypo';

const AllChat = ({navigation, route}) => {
  const imagePlaceHolder =
    'https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg';
  const userdata = useSelector(state => state.auth.userData);
  console.log('user data ===>>>', userdata);
  const data = route?.params?.data;
  console.log('data ======', data);
  const [edit, setedit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [radius, setradius] = useState(500);
  const [bw, setbw] = useState(5);
  const [exitVisible1, setexitVisible1] = useState(false);
  const [checkingImage, setCheckingImage] = useState('');
  const [width, setWidth] = useState(2.4);
  const [height, setheight] = useState(5);
  const [showIndicator, setShowIndicator] = useState(false);
  const [loader, serloader] = useState(true);
  const [images, setImages] = useState([]);
  const [profileImages, setProfileImages] = useState({});
  const CreateChat = () => {
    setShowIndicator(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      user: userdata?._id,
      other: data?._id,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'http://50.18.33.245:4000/user/createChat',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        // console.log(result)
        setShowIndicator(false);
        const data = JSON.parse(result);
        navigation.navigate('Chat', {data: data?.data});
      })
      .catch(error => console.error(error));
  };
  return (
    <View style={{flex: 1, backgroundColor: '#000000'}}>
      {showIndicator === true ? <Loader /> : null}

      <View
        style={{
          height: windowWidth / 1.2,
        }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <MaterialIcons name={'arrow-back'} size={20} color={'#ffffff'} />
          </TouchableOpacity>
          <Text style={styles.heading}>Profile</Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={{
              flexDirection: 'row',
              width: 50,
              marginRight: -20,
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/icons/edit.png')}
              style={{height: 20, marginLeft: 20}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Lightbox
            onClose={() => {
              setradius(500);
              setbw(5);
              setWidth(2.4);
              setheight(5);
            }}
            onOpen={() => {
              setbw(0);
              setradius(0);
            }}>
            <Image
              style={{
                height: 140,
                width: 140,
                borderRadius: radius,
                alignSelf: 'center',
                borderWidth: bw,
                borderColor: '#6515AC',
                marginTop: 10,
              }}
              source={{
                uri: data?.image,
                // 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
              }}
            />
          </Lightbox>

          <Text
            style={[
              styles.heading,
              {alignSelf: 'center', marginTop: 10, fontSize: 20},
            ]}>
            {data?.userName}
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
            @ {data?.userName}
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
                onPress={() => {
                  if (data?.profileImages[0]?.url) {
                    setexitVisible1(true);
                    setCheckingImage(data?.profileImages[0]?.url);
                  }
                }}>
                <Image
                  style={styles.image_card}
                  source={{
                    uri:
                      data?.profileImages?.length > 0
                        ? data?.profileImages[0]?.url
                        : null,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{width: '30%'}}>
              <TouchableOpacity
                style={styles.cardImg}
                onPress={() => {
                  if (data?.profileImages[1]?.url) {
                    setexitVisible1(true);
                    setCheckingImage(data?.profileImages[1]?.url);
                  }
                }}>
                <Image
                  style={styles.image_card}
                  source={{
                    uri:
                      data?.profileImages?.length > 1
                        ? data?.profileImages[1]?.url
                        : null,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{width: '30%'}}>
              <TouchableOpacity
                style={styles.cardImg}
                onPress={() => {
                  if (data?.profileImages[2]?.url) {
                    setexitVisible1(true);
                    setCheckingImage(data?.profileImages[2]?.url);
                  }
                }}>
                <Image
                  style={styles.image_card}
                  source={{
                    uri:
                      data?.profileImages?.length > 2
                        ? data?.profileImages[2]?.url
                        : null,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* row 2  */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '30%'}}>
              <TouchableOpacity
                style={styles.cardImg}
                onPress={() => {
                  if (data?.profileImages[3]?.url) {
                    setexitVisible1(true);
                    setCheckingImage(data?.profileImages[3]?.url);
                  }
                }}>
                <Image
                  style={styles.image_card}
                  source={{
                    uri:
                      data?.profileImages?.length > 3
                        ? data?.profileImages[3]?.url
                        : null,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{width: '30%'}}>
              <TouchableOpacity
                style={styles.cardImg}
                onPress={() => {
                  if (data?.profileImages[4]?.url) {
                    setexitVisible1(true);
                    setCheckingImage(data?.profileImages[4]?.url);
                  }
                }}>
                <Image
                  style={styles.image_card}
                  source={{
                    uri:
                      data?.profileImages?.length > 4
                        ? data?.profileImages[4]?.url
                        : null,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{width: '30%'}}>
              <TouchableOpacity
                style={styles.cardImg}
                onPress={() => {
                  if (data?.profileImages[5]?.url) {
                    setexitVisible1(true);
                    setCheckingImage(data?.profileImages[5]?.url);
                  }
           
                }}>
                <Image
                  style={styles.image_card}
                  source={{
                    uri:
                      data?.profileImages?.length > 5
                        ? data?.profileImages[5]?.url
                        : null,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            CreateChat();
          }}
          style={{
            backgroundColor: '#6515AC',
            width: '75%',
            height: 45,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            bottom: 10,
            position: 'absolute',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#ffffff',
              fontWeight: '700',
              fontFamily: 'Poppins',
            }}>
            Chat Now
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              width: '100%',
              height: 200,
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
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#000000',
                  marginRight: 40,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Report
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
              <View
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
              </View>

              <View
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
                    style={{height: 22, aspectRatio: 4 / 4}}
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
              </View>
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
            {/* <Pressable
              style={{position: 'absolute', top: -10, right: -5}}
              onPress={() => {
                setexitVisible1(false);
                setCheckingImage('');
              }}>
              <Entypo name="circle-with-cross" color={'red'} size={28} />
            </Pressable> */}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default AllChat;

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
    marginTop: 20,
    // height: 350
  },
  heading: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
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
  },

  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: '100%',
    height: 250,
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
    elevation: 2,
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
