import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {url} from '../../services/url';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import moment from 'moment';
const AllChat = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [token, setToken] = useState(0);
  const userdata = useSelector(state => state.auth.userData);

  console.log('user data ===>>>', userdata);
  const [allchats, setAllchats] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        uid: userdata?._id,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(
        'http://50.18.33.245:4000/user/getUserChat',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          console.log(result);
          const data = JSON.parse(result);
          if (data?.status === 'success') {
            setAllchats(data?.data);
          }
        })
        .catch(error => console.error(error));
    }, []),
  );

  return (
    <View style={{flex: 1, backgroundColor: '#000000', marginBottom: '15%'}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            //  props.navigation.toggleDrawer();
          }}>
          <MaterialCommunityIcons
            name={'menu'}
            size={35}
            color={'transparent'}
            style={{width: 65}}
          />
        </TouchableOpacity>

        <Text style={styles.heading}>Chats</Text>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../assets/icons/coin.png')}
            style={styles.logo}
          />
          <View>
            <Text
              style={[styles.heading, {fontSize: 14, fontFamily: 'Poppins'}]}>
              {userdata?.coins ? userdata?.coins : '0'}
            </Text>
            <Text
              style={[styles.heading, {fontSize: 14, fontFamily: 'Poppins'}]}>
              Coins
            </Text>
          </View>
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
        <FlatList
          data={allchats}
          renderItem={({item}) => {
            console.log('response from single msg==', item);
            if (item?.blockedBy?.length > 0) {
              return (
                <>
                  {item?.blockedBy?.map(e => {
                    if (e === userdata?._id) {
                      return null;
                    } else {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('Chat', {data: item});
                          }}
                          style={styles.card}>
                          <View
                            style={{
                              flexDirection: 'row',
                              height: '100%',
                              marginTop: 10,
                              width: '20%',
                            }}>
                            <Image
                              style={styles.image}
                              source={{
                                uri: item?.other?.image,
                              }}
                            />
                            <View
                              style={{
                                backgroundColor: '#0FE16D',
                                borderRadius: 50,
                                width: 10,
                                height: 10,
                                bottom: 2,
                                position: 'absolute',
                                right: 7,
                              }}></View>
                          </View>

                          <View style={{width: '50%', marginLeft: 5}}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: '#000000',
                                // fontWeight: '600',
                                marginTop: 10,
                                textTransform: 'capitalize',
                                fontFamily: 'Poppins-Medium',
                              }}>
                              {item?.other?.userName}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#797C7B',
                                top: -5,
                                fontFamily: 'Poppins-Regular',
                              }}>
                              {item?.lastMessage?.text}
                            </Text>
                          </View>

                          <View style={{flexDirection: 'column', width: '20%'}}>
                            <Text
                              style={{
                                fontSize: 10,
                                color: '#797C7B',

                                marginTop: 10,
                                fontFamily: 'Poppins-Regular',
                                textTransform: 'capitalize',
                              }}
                              numberOfLines={1}>
                              {moment(item?.lastMessage?.createdAt).fromNow()}
                            </Text>
                            {/* <View
                          style={{
                            borderRadius: 20,
                            backgroundColor: '#F04A4C',
                            width: 20,
                            height: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'flex-end',
                          
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#ffffff',
                              fontWeight: '600',
                              marginTop: 0,
                              fontFamily: 'Poppins',
                            }}>
                            2
                          </Text>
                        </View> */}
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  })}
                </>
              );
            } else {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Chat', {data: item});
                  }}
                  style={styles.card}>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: '100%',
                      marginTop: 10,
                      width: '20%',
                    }}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: item?.other?.image,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: '#0FE16D',
                        borderRadius: 50,
                        width: 10,
                        height: 10,
                        bottom: 2,
                        position: 'absolute',
                        right: 7,
                      }}></View>
                  </View>

                  <View style={{width: '50%', marginLeft: 5}}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000000',
                        // fontWeight: '600',
                        marginTop: 10,
                        textTransform: 'capitalize',
                        fontFamily: 'Poppins-Medium',
                      }}>
                      {item?.other?.userName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#797C7B',
                        top: -5,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {item?.lastMessage?.text}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'column', width: '20%'}}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: '#797C7B',

                        marginTop: 10,
                        fontFamily: 'Poppins-Regular',
                        textTransform: 'capitalize',
                      }}
                      numberOfLines={1}>
                      {moment(item?.lastMessage?.createdAt).fromNow()}
                    </Text>
                    {/* <View
                    style={{
                      borderRadius: 20,
                      backgroundColor: '#F04A4C',
                      width: 20,
                      height: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'flex-end',
                    
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#ffffff',
                        fontWeight: '600',
                        marginTop: 0,
                        fontFamily: 'Poppins',
                      }}>
                      2
                    </Text>
                  </View> */}
                  </View>
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    </View>
  );
};

export default AllChat;

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
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',

    // backgroundColor:"red",
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
});
